import { app, runServer, closeServer } from './../../server/index';

import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import { Message } from './../../server/models';

describe('Hello world', function() {
  before(function() {
    return runServer(() => {
      Message.create({text: 'Hello from mongoose in before()'});
    });
  });

  after(function() {
    Message.remove({}, () => {});

    return closeServer();
  });

  it('should get hello world', function() {
    return chai.request(app)
      .get('/helloworld')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.text.should.equal('Hello from mongoose in before()')
        });
      });
})
