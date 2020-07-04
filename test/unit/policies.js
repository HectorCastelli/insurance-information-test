const expect = require('chai').expect;

const policiesService = require('../../src/services/policies');

describe('Policies Service', () => {
  describe('Search by ID', () => {
    it('Fail when searching for null', done => {
      expect(policiesService.searchByID(null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Policy', done => {
      const invalidID = "000";
      expect(policiesService.searchByID(invalidID)).to.be.null;
      done();
    });
    it('Search for a single Policy', done => {
      const validID = "64cceef9-3a01-49ae-a23b-3761b604800b";
      expect(policiesService.searchByID(validID)).to.have.property('policies').and.to.be('array').and.to.have.lengthOf.at.least(1);
      done();
    });
  });
  describe('Search by Name', () => {
    it('Fail when searching for null', done => {
      expect(policiesService.searchByName(null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Policy', done => {
      const invalidName = "ABC";
      expect(policiesService.searchByName(invalidName)).to.be.null;
      done();
    });
    it('Search for a single Policy', done => {
      const validName = "Britney";
      expect(policiesService.searchByName(validName)).to.have.property('policies').and.to.be('array').and.to.have.lengthOf.at.least(1);
      done();
    });
    it('Search for multiple Policies', done => {
      const validName = ["Britney", "Manning"];
      expect(policiesService.searchByName(validName)).to.have.property('policies').and.to.be('array').and.to.have.lengthOf.at.least(2);
      done();
    });
  });
}