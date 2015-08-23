export default class Message {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  get isSelf() {
    return this.client.username == this.user.username;
  }

  get command() {
    return this.text.substring(1);
  }

  get isCommand() {
    return this.text.startsWith('!');
  }
}