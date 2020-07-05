const expect = require('chai').expect;

describe('Users Service', () => {
  const UsersService = require('../../src/services/users');
  const usersService = new UsersService();
  before((done) => {
    this.usersService = new UsersService();
    done();
  });
  describe('Search by ID', () => {
    it('Fail when searching for null', (done) => {
      expect(usersService.searchByID.bind(usersService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent User', (done) => {
      const invalidID = '000';
      expect(usersService.searchByID(invalidID)).to.have.lengthOf(0);
      done();
    });
    it('Search for a single User', (done) => {
      const validID = 'a0ece5db-cd14-4f21-812f-966633e7be86';
      expect(usersService.searchByID(validID)).to.have.lengthOf.at.least(1);
      done();
    });
    it('Search for multiple Users', (done) => {
      const validID = ['a0ece5db-cd14-4f21-812f-966633e7be86', 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'];
      expect(usersService.searchByID(...validID)).to.have.lengthOf.at.least(2);
      done();
    });
  });
  describe('Search by Name', () => {
    it('Fail when searching for null', (done) => {
      expect(usersService.searchByName.bind(usersService, null)).to.throw(TypeError);
      done();
    });
    it('Fail when searching for inexistent User', (done) => {
      const invalidName = 'ABC';
      expect(usersService.searchByName(invalidName)).to.have.lengthOf(0);
      done();
    });
    it('Search for a single User', (done) => {
      const validName = 'Britney';
      expect(usersService.searchByName(validName)).to.have.lengthOf.at.least(1);
      done();
    });
    it('Search for multiple Users', (done) => {
      const validName = ['Britney', 'Manning'];
      expect(usersService.searchByName(...validName)).to.have.lengthOf.at.least(2);
      done();
    });
  });
});
