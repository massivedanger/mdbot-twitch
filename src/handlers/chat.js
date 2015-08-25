import Commands from '../commands';
import Message from './chat/message';

export default function handleChat(client) {
  const commands = Commands.setup(client);

  return (channel, user, text, self) => {
    console.log(`[${channel}] ${user['display-name']}: ${text}`);

    const message = new Message({
      client,
      channel,
      user,
      text,
      self
    });

    if (!message.self) {
      if (message.isCommand && message.hasAuthorizedUser) {
        commands.execute(message.channel, message.user, message.command);
      }
    }
  };
}