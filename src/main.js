#!/usr/bin/env node

import tmi from 'tmi.js';
import dotenv from 'dotenv';
import yargs from 'yargs';
import fs from 'fs-extra';
import path from 'path';

import * as handlers from './handlers';

dotenv.load();

const argv = yargs.argv;
const config = fs.readJsonSync(path.resolve(argv.config || './config.json'));

if (!config.username || !config.password || !config.channels) {
  console.error('NO VALID CONFIG! WHATTTTTT?');
  process.exit(1);
}

const client = new tmi.client({
  identity: {
    username: config.username,
    password: config.password
  },
  channels: config.channels
});

client.connect();

client.on('chat', handlers.chat(client));