const api = require('../../src/api');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Authentication Controller', () => {
  const AuthenticationService = require('../../src/services/authentication');
  describe('Authenticates a user', () => {
    it('When the request is valid expect the response to be a valid JWT token', (done) => {
      const mockAuthenticationObject = {
        email: 'britneyblankenship@quotezart.com',
      };
      chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
        expect(res).to.have.status(200);
      });
      done();
    });
    it('When the request is valid expect the response to contain the appropriate role value ("admin")', (done) => {
      const mockAuthenticationObject = {
        email: 'britneyblankenship@quotezart.com',
      };
      chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
        expect(res).to.have.status(200);
        expect(new AuthenticationService().decodeData(res.text)).to.have.property('role', 'admin');
      });
      done();
    });
    it('When the request is valid expect the response to contain the appropriate role value ("user")', (done) => {
      const mockAuthenticationObject = {
        email: 'barnettblankenship@quotezart.com',
      };
      chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
        expect(res).to.have.status(200);
        expect(new AuthenticationService().decodeData(res.text)).to.have.property('role', 'user');
      });
      done();
    });
  });
  describe('Returns an error code', () => {
    it('When the Request parameters are invalid, then return 403 error with explanation', (done) => {
      const mockAuthenticationObject = {};
      chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
      });
      done();
    });
    it('When the user is not found, return 404 error with explanation', (done) => {
      const mockAuthenticationObject = {
        email: 'user-that-does-not-exist@test.com',
      };
      chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
      });
      done();
    });
  });
});
