const expect = require('chai').expect;

const authService = require('../../src/services/authentication');

describe('Authentication Service', () => {
  describe('JWT Manipulation', () => {
    it('Verify the secret key for JWT is loaded', (done) => {
      expect(authService.getSecretKey()).to.be.a('string');
      done();
    });
    it('Verify the secret key for JWT is "good"', (done) => {
      expect(authService.getSecretKey()).to.have.lengthOf.at.least(10);
      done();
    });
    it('Successfully encodes and decodes data into JWT token', (done) => {
      const data = 'testData';
      const encoded = authService.encodeData(data);
      const decoded = authService.decodeData(encoded);
      expect(data).to.be.equal(decoded).and.to.not.be.equal(encoded);
      done();
    });
    it('Returns error when invalid JWT token is decoded', (done) => {
      const invalidJWT = '';
      expect(authService.decodeData(invalidJWT)).to.throw(TypeError);
      done();
    });
  });
  describe('User Authentication', () => {
    it('Returns valid JTW for valid User', (done) => {
      const mockAuthenticationObject = {
        email: 'julietteblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.not.throw(TypeError).and.has.property('email').and.has.property('role');
      done();
    });
    it('Returns JWT for User with "user" role', (done) => {
      const mockAuthenticationObject = {
        email: 'goodblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.not.throw(TypeError).and.has.property('email').and.has.property('role', 'user');
      done();
    });
    it('Returns JWT for User with "admin" role', (done) => {
      const mockAuthenticationObject = {
        email: 'julietteblankenship@quotezart.com',
      };
      const encoded = authService.authenticate(mockAuthenticationObject);
      expect(authService.decodeData(encoded)).to.not.throw(TypeError).and.has.property('email').and.has.property('role', 'admin');
      done();
    });
  });
});
