const { JsonWebTokenError } = require('jsonwebtoken');

const expect = require('chai').expect;

describe('Authentication Service', () => {
  const AuthenticationService = require('../../src/services/authentication');
  const authService = new AuthenticationService();
  before((done) => {
    this.authService = new AuthenticationService();
    done();
  });
  describe('JWT Manipulation', () => {
    it('Verify the secret key for JWT is loaded', (done) => {
      expect(authService.getSecretKey).to.be.a('string');
      done();
    });
    it('Verify the secret key for JWT is "good"', (done) => {
      expect(authService.getSecretKey).to.have.lengthOf.at.least(10);
      done();
    });
    it('Successfully encodes and decodes data into JWT token', (done) => {
      const data = 'testData';
      const encoded = authService.encodeData(data);
      const decoded = authService.decodeData(encoded);
      expect(decoded).to.be.equal(data).and.to.not.be.equal(encoded);
      done();
    });
    it('Returns error when invalid JWT token is decoded', (done) => {
      const invalidJWT = '';
      expect(authService.decodeData.bind(authService, invalidJWT)).to.throw(JsonWebTokenError);
      done();
    });
  });
  describe('Client Authentication', () => {
    it('Returns valid JTW for valid Client', (done) => {
      const mockAuthenticationObject = {
        email: 'julietteblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.have.property('role');
      done();
    });
    it('Returns JWT for Client with "user" role', (done) => {
      const mockAuthenticationObject = {
        email: 'goodblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.have.property('role', 'user');
      done();
    });
    it('Returns JWT for Client with "admin" role', (done) => {
      const mockAuthenticationObject = {
        email: 'julietteblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.have.property('role', 'admin');
      done();
    });
  });
});
