import 'babel-polyfill';
import express from 'express';

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

if (process.env.CLIENT_PATH) {
  app.use(express.static(process.env.CLIENT_PATH));
}

app.get('/helloworld', (req, res) => {
  res.json({message: 'hello world'});
})

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, HOST, () => {
      console.log(`Your app is listening on port ${PORT}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
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
    runServer();
}

export {app, runServer, closeServer};
