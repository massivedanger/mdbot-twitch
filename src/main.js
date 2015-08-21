import tmi from 'tmi.js';
import dotenv from 'dotenv';

dotenv.load();
const { TWITCH_USERNAME, TWITCH_PASSWORD } = process.env;
const channels = [
  'evan_walsh'
];

var options = {
  options: {
    debug: false
  },
  connection: {
    random: 'chat',
    reconnect: true
  },
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_PASSWORD
  },
  channels: channels
};

let client = new tmi.client(options);
client.connect();

client.on('chat', (channel, user, message) => {
  console.log(`[${channel}] ${user.username}: ${message}`);
});

client.on('connected', (address, port) => {
  console.log('Connected!', address, port);
});

client.on('roomstate', (channel, state) => {
  console.log(`Joined ${channel}`, state);
  client.say(channel, 'Hello!');
});