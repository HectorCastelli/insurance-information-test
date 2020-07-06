const PoliciesService = require('../../src/services/policies');

const expect = require('chai').expect;


describe('Policies Service', () => {
  const PoliciesService = require('../../src/services/policies');
  const policiesService = new PoliciesService();
  before((done) => {
    this.policiesService = new PoliciesService();
    done();
  });
  describe('Search by Policy ID', () => {
    it('Fail when searching for null', (done) => {
      expect(policiesService.searchByID.bind(policiesService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Policy', (done) => {
      const invalidID = '000';
      expect(policiesService.searchByID(invalidID)).to.be.empty;
      done();
    });
    it('Search for a single Policy', (done) => {
      const validID = '64cceef9-3a01-49ae-a23b-3761b604800b';
      expect(policiesService.searchByID(validID)).to.have.lengthOf(1);
      done();
    });
  });
  describe('Search by Client ID', () => {
    it('Fail when searching for null', (done) => {
      expect(policiesService.searchByClientID.bind(policiesService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Policy', (done) => {
      const invalidClientId = '000';
      expect(policiesService.searchByClientID(invalidClientId)).to.be.empty;
      done();
    });
    it('Search for a single Policy', (done) => {
      const validClientId = 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb';
      expect(policiesService.searchByClientID(validClientId)).to.have.lengthOf(91);
      done();
    });
    it('Search for multiple Policies', (done) => {
      const validClientId = ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb', 'a0ece5db-cd14-4f21-812f-966633e7be86'];
      expect(policiesService.searchByClientID(...validClientId)).to.have.lengthOf(193);
      done();
    });
  });
  describe('Search by Advisor Email', () => {
    it('Fail when searching for null', (done) => {
      expect(policiesService.searchByAdvisorEmail.bind(policiesService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Policy', (done) => {
      const invalidAdvisorEmail = 'invalid@client.domain';
      expect(policiesService.searchByAdvisorEmail(invalidAdvisorEmail)).to.be.empty;
      done();
    });
    it('Search for a single Policy', (done) => {
      const validAdvisorEmail = 'inesblankenship@quotezart.com';
      expect(policiesService.searchByAdvisorEmail(validAdvisorEmail)).to.have.lengthOf(193);
      done();
    });
    it('Search for multiple Policies', (done) => {
      // NOTE: This test-case is good for real-use but here it is meaningless. The dataset only has policies managed by inesblankenship@quotezart.com
      const validAdvisorEmail = ['inesblankenship@quotezart.com', 'another-sample-valid@client.domain'];
      expect(policiesService.searchByAdvisorEmail(...validAdvisorEmail)).to.have.lengthOf(193);
      done();
    });
  });
});
