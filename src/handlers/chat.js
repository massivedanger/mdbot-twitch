import Commands from '../commands';
import Message from './chat/message';

export default function handleChat(client) {
  const commands = Commands.setup(client);

  return (channel, user, text) => {
    console.log(channel, user, text);

    const message = new Message({
      client, channel, user, text
    });

    if (!message.fromSelf) {
      if (message.isCommand) {
        commands.execute(message.channel, message.user, message.command);
      }
    }
  };
}