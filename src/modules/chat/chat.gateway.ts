import { Logger } from '@nestjs/common/services';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
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

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'https://admin.socket.io',
      'http://127.0.0.1:5500',
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
  joinRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
    socket.join(room);
    this.wss.emit('joined', `${room.email} Join Room ${socket.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(socket: Socket, body: any): void {
    if (body.room) {
      this.wss.to(body.room).emit('msgToClient', body.message);
    } else {
      this.wss.emit('msgToClient', body.message);
    }
  }
}
