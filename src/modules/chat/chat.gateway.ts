import { Logger } from '@nestjs/common/services';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import {
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { instrument } from '@socket.io/admin-ui';
import { addMessage, createRoom, localData } from 'src/db/sample';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'https://admin.socket.io',
      'http://127.0.0.1:5500',
      'https://nextjs-chat-app-client.vercel.app',
    ],
    credentials: true,
    transports: ['websocket'],
    upgrade: false,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private _logger: Logger = new Logger('ChatGateWay');
  @WebSocketServer() wss: Server;

  afterInit() {
    instrument(this.wss, {
      auth: false,
      mode: 'development',
    });
    this._logger.log('Gate way Initialized');
  }

  handleConnection(client: Socket) {
    this._logger.log(`Connection established for client ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this._logger.log(`Connection disconnect for client ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  joinRoom2(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const room = createRoom(body);
    socket.join(room);
    this.wss.emit('joined', room);
  }

  @SubscribeMessage('msgToServer')
  handleMessage2(socket: Socket, body: any): void {
    const room = createRoom(body);
    this.wss.to(room).emit('msgToClient', body);
    addMessage(body);
  }

  @SubscribeMessage('oldMessages')
  getOldMessage(socket: Socket, body: any): void {
    const data = localData.filter((val) => {
      return (
        (val.from == body.from && val.to == body.to) ||
        (val.from == body.to && val.to == body.from)
      );
    });
    this.wss.to(socket.id).emit('setOldMessage', data);
  }
}
