const api = require('../../src/api');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Policies Controller', () => {
  describe('Search Functionality', () => {
    describe('Returns a valid Policy', () => {
      describe('When executing as an Admin', () => {
        let authenticationToken = '';
        before((done) => {
          // Create Session Token as Admin for testing.
          const mockAuthenticationObject = {
            email: 'britneyblankenship@quotezart.com',
          };
          chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
            expect(res).to.have.status(200);
            authenticationToken = res.text;
          });
          done();
        });
        describe('Using Client IDs', () => {
          it('When the request is looking for an Policy with existing Client ID', (done) => {
            const mockSearchObject = {
              clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies');
            });
            done();
          });
          it('When the request is looking for Policies by two existing Client IDs', (done) => {
            const mockSearchObject = {
              clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb', 'a0ece5db-cd14-4f21-812f-966633e7be86'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies').with.lengthOf(193);
            });
            done();
          });
          it('When the request is looking for Policies by an existing Client ID and an inexistent Client ID', (done) => {
            const mockSearchObject = {
              clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb', '000'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies').with.lengthOf(91);
            });
            done();
          });
        });
        describe('Using Advisor Emails', () => {
          it('When the request is looking for an Policy with existing Advisor Email', (done) => {
            const mockSearchObject = {
              advisors: ['inesblankenship@quotezart.com'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies');
            });
            done();
          });
          it('When the request is looking for Policies by two existing Advisor Emails', (done) => {
            // NOTE: This test-case is good for real-use but here it is meaningless. The dataset only has policies managed by inesblankenship@quotezart.com
            const mockSearchObject = {
              advisors: ['inesblankenship@quotezart.com', 'another-sample-valid@client.domain'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies').with.lengthOf(193);
            });
            done();
          });
          it('When the request is looking for Policies by an existing Advisor Email and an inexistent Advisor Email', (done) => {
            const mockSearchObject = {
              advisors: ['inesblankenship@quotezart.com'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies').with.lengthOf(193);
            });
            done();
          });
        });
        describe('Using Client IDs and Advisor Emails', () => {
          it('When the request is looking for Policies by an existing ID or Advisor Email', (done) => {
            const mockSearchObject = {
              clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
              advisors: ['inesblankenship@quotezart.com'],
            };
            chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {

              expect(res).to.have.status(200);
              expect(res.body).to.have.property('policies').with.lengthOf(193);
            });
            done();
          });
        });
      });
    });
    describe('Fails', () => {
      it('When the request is done by an unauthenticated Client, then return 401 error', (done) => {
        const mockSearchObject = {
          clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
        };
        chai.request(api).get('/policies').send(mockSearchObject).end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
        });
        done();
      });
      it('When the request is done by an unauthorized Client, then return 403 error', (done) => {
        const mockSearchObject = {
          clients: ['e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
        };
        const AuthenticationService = require('../../src/services/authentication');
        const mockAuthenticationClaim = {
          id: 'fake-id',
          role: 'unexpected-role',
        };
        const fakeToken = new AuthenticationService().encodeData(mockAuthenticationClaim);
        chai.request(api).get('/policies').send(mockSearchObject).set('Authentication', fakeToken).end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
        });
        done();
      });
    });
  });
  describe('Policy Resource', () => {
    describe('Returns a valid Policy', () => {
      describe('When executing as an Admin', () => {
        let authenticationToken = '';
        before((done) => {
          // Create Session Token as Admin for testing.
          const mockAuthenticationObject = {
            email: 'britneyblankenship@quotezart.com',
          };
          chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
            expect(res).to.have.status(200);
            authenticationToken = res.text;
          });
          done();
        });
        it('When using an existing ID', (done) => {
          const mockPolicyId = '64cceef9-3a01-49ae-a23b-3761b604800b';
          chai.request(api).get(`/policies/${mockPolicyId}`).set('Authentication', authenticationToken).end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id');
          });
          done();
        });
      });
    });
    describe('Fails', () => {
      it('When the request is done by an unauthenticated Client, then return 401 error', (done) => {
        const mockPolicyId = '64cceef9-3a01-49ae-a23b-3761b604800b';
        chai.request(api).get(`/policies/${mockPolicyId}`).end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
        });
        done();
      });
      it('When the request is done by an unauthorized Client, then return 403 error', (done) => {
        const mockPolicyId = '64cceef9-3a01-49ae-a23b-3761b604800b';
        const AuthenticationService = require('../../src/services/authentication');
        const mockAuthenticationClaim = {
          id: 'fake-id',
          role: 'unexpected-role',
        };
        const fakeToken = new AuthenticationService().encodeData(mockAuthenticationClaim);
        chai.request(api).get(`/policies/${mockPolicyId}`).set('Authentication', fakeToken).end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
        });
        done();
      });
      it('When the request is looking for an inexistent ID, then return 404 error with explanation', (done) => {
        const PolicyId = '000';
        const AuthenticationService = require('../../src/services/authentication');
        const mockAuthenticationObject = {
          email: 'britneyblankenship@quotezart.com',
        };
        const authenticationToken = new AuthenticationService().authenticate(mockAuthenticationObject);
        chai.request(api).get(`/policies/${PolicyId}`).set('Authentication', authenticationToken).end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
        });
        done();
      });
    });
  });
});
