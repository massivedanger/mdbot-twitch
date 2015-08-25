const Commands = {
  setup: function(client) {
    this.client = client;

    return this;
  },

  _commands: {
    test: function(twitch) {
      this.client.say(twitch.channel, `Test complete, ${twitch.user.username}`);
    },

    color: function(twitch, color) {
      this.client.color(twitch.channel, color);
    }
  },

  aliases: {
    'quit': 'exit',
    '?': 'help'
  },

  execute: function(channel, user, raw) {
    // Split on spaces, except if inside of double quotes
    var parts = raw.match(/('.*?'|[^'\s]+)+(?=\s*|\s*$)/g);

    var command = parts.shift();
    var args = parts.map((part) => {
      return part.replace(/'/g, '');
    });

    args.unshift({
      channel,
      user
    });

    if (this._commands[command]) {
      return this._commands[command].apply(this, args);
    }
    else if (this.aliases[command]) {
      return this._commands[this.aliases[command]].apply(this, args);
    }
    else {
      return this.error(command, args);
    }
  },

  error: function(command, args) {
    console.error('COMMAND ERROR', command, args);
  },

  _parseTextBoolean(text) {
    switch (text.toLowerCase().trim()) {
    case 'true':
    case 'on':
    case 'yes':
    case '1':
      return true;
    default:
      return false;
    }
  }
};

export default Commands;