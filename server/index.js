import 'babel-polyfill';

import express from 'express';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import { Message } from './models';

import {PORT, HOST, DATABASE_URL} from './config';

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

if (process.env.CLIENT_PATH) {
  app.use(express.static(process.env.CLIENT_PATH));
}

app.get('/helloworld', (req, res) => {
  Message.findOne()
  .then( message => {
    res.json(message);
  }).catch( err => {
    res.sendStatus(500);
  });
})

let server;

function runServer(callback, databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      if (callback) {
        callback();
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

export {app, runServer, closeServer};
