import low from 'lowdb';
import path from 'path';

const Database = {
  get: (name) => {
    const db = low(path.resolve(`data.db`));

    return db(name);
  }
};

export default Database;