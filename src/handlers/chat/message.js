export default class Message {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  get command() {
    return this.text.substring(1);
  }

  get isCommand() {
    return this.text.startsWith('!');
  }

  get hasAuthorizedUser() {
    return this.user.username == this.channel.substring(1);
  }
}