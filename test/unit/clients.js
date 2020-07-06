const expect = require('chai').expect;

describe('Clients Service', () => {
  const ClientsService = require('../../src/services/clients');
  const clientsService = new ClientsService();
  before((done) => {
    this.clientsService = new ClientsService();
    done();
  });
  describe('Search by ID', () => {
    it('Fail when searching for null', (done) => {
      expect(clientsService.searchByID.bind(clientsService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Client', (done) => {
      const invalidID = '000';
      expect(clientsService.searchByID(invalidID)).to.have.lengthOf(0);
      done();
    });
    it('Search for a single Client', (done) => {
      const validID = 'a0ece5db-cd14-4f21-812f-966633e7be86';
      expect(clientsService.searchByID(validID)).to.have.lengthOf.at.least(1);
      done();
    });
    it('Search for multiple Clients', (done) => {
      const validID = ['a0ece5db-cd14-4f21-812f-966633e7be86', 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'];
      expect(clientsService.searchByID(...validID)).to.have.lengthOf.at.least(2);
      done();
    });
  });
  describe('Search by Name', () => {
    it('Fail when searching for null', (done) => {
      expect(clientsService.searchByName.bind(clientsService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent Client', (done) => {
      const invalidName = 'ABC';
      expect(clientsService.searchByName(invalidName)).to.have.lengthOf(0);
      done();
    });
    it('Search for a single Client', (done) => {
      const validName = 'Britney';
      expect(clientsService.searchByName(validName)).to.have.lengthOf.at.least(1);
      done();
    });
    it('Search for multiple Clients', (done) => {
      const validName = ['Britney', 'Manning'];
      expect(clientsService.searchByName(...validName)).to.have.lengthOf.at.least(2);
      done();
    });
  });
});
