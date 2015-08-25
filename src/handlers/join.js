import Database from '../database';

export default function handleJoin(client) {
  const recordJoin = function(channel, username) {
    const db = Database.get('users');

    var user = db
      .chain()
      .find({ channel, username })
      .value();

    if (user) {
      db
        .chain()
        .find(user)
        .assign({ joins: user.joins + 1 });
    }
    else {
      db.push({ channel, username, joins: 1 });
      client.say(channel, `Welcome, ${username}!`);
    }
  };

  return (channel, username) => {
    console.log(`[${channel}] ${username} joined!`);

    if (username != client.username) {
      recordJoin(channel, username);
    }
  };
}