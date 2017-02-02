import { app, runServer, closeServer } from './../../server/index';

import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

describe('Hello world', () => {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should get hello world', () => {
    return chai.request(app)
      .get('/helloworld')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.message.should.equal('hello world')
        });
      });
})
