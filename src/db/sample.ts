interface Message {
  from: string;
  to: string;
  message: string;
}

export const localData: Message[] = [
  {
    from: 'guest@gmail.com',
    to: 'akash@gmail.com',
    message: 'Sample message 1',
  },
  {
    from: 'guest@gmail.com',
    to: 'akash@gmail.com',
    message: 'Sample message 2',
  },
  {
    from: 'guest@gmail.com',
    to: 'akash@gmail.com',
    message: 'Sample message 3',
  },
  {
    from: 'guest@gmail.com',
    to: 'riya@gmail.com',
    message: 'Sample message Riya 1',
  },
  {
    from: 'guest@gmail.com',
    to: 'riya@gmail.com',
    message: 'Sample message Riya 2',
  },
  {
    from: 'guest@gmail.com',
    to: 'neeraj@gmail.com',
    message: 'Sample message Neeraj 1',
  },
  {
    from: 'guest@gmail.com',
    to: 'neeraj@gmail.com',
    message: 'Sample message Neeraj 2',
  },
];

export function addMessage(data: Message) {
  localData.push(data);
}

export function createRoom(data: any) {
  const room: string = data.from + '_' + data.to;
  return room.split('_').sort().join('');
}
