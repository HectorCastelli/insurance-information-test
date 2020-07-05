const api = require('../../src/api');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users Controller', () => {
  describe('Search Functionality', () => {
    describe('Returns a valid User', () => {
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
        describe('Using IDs', () => {
          it('When the request is looking for an User with existing ID', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients');
            });
            done();
          });
          it('When the request is looking for Users by two existing IDs', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86', 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(2);
            });
            done();
          });
          it('When the request is looking for Users by an existing ID and an inexistent ID', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86', '000'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(1);
            });
            done();
          });
        });
        describe('Using Names', () => {
          it('When the request is looking for an User by a single existing Name', (done) => {
            const mockSearchObject = {
              names: ['Britney'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients');
            });
            done();
          });
          it('When the request is looking for Users by two existing Names', (done) => {
            const mockSearchObject = {
              names: ['Britney', 'Manning'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(2);
            });
            done();
          });
          it('When the request is looking for Users by an existing Name and an inexistent Name', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
              names: ['Britney'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(1);
            });
            done();
          });
        });

        describe('Using Names and IDs', () => {
          it('When the request is looking for Users by an existing ID or Name', (done) => {
            const mockSearchObject = {
              names: ['Britney', 'Name-That-Does-Not-Exist'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(1);
            });
            done();
          });
        });
      });
      describe('When executing as an User', () => {
        let authenticationToken = '';
        before((done) => {
          // Create Session Token as User for testing.
          const mockAuthenticationObject = {
            email: 'barnettblankenship@quotezart.com',
          };
          chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
            expect(res).to.have.status(200);
            authenticationToken = res.text;
          });
          done();
        });
        describe('Using IDs', () => {
          it('When the request is looking for an User with existing ID', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients');
            });
            done();
          });
          it('When the request is looking for Users by two existing IDs', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86', 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(2);
            });
            done();
          });
          it('When the request is looking for Users by an existing ID and an inexistent ID', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86', '000'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(1);
            });
            done();
          });
        });
        describe('Using Names', () => {
          it('When the request is looking for an User by a single existing Name', (done) => {
            const mockSearchObject = {
              names: ['Britney'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients');
            });
            done();
          });
          it('When the request is looking for Users by two existing Names', (done) => {
            const mockSearchObject = {
              names: ['Britney', 'Manning'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(2);
            });
            done();
          });
          it('When the request is looking for Users by an existing Name and an inexistent Name', (done) => {
            const mockSearchObject = {
              ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
              names: ['Britney'],
            };
            chai.request(api).get('/users').send(mockSearchObject).set('Authentication', authenticationToken).end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('clients').with.lengthOf(1);
            });
            done();
          });
        });
      });
    });
    describe('Fails', (done) => {
      it('When the request is done by an unauthenticated User, then return 401 error', (done) => {
        const mockSearchObject = {
          ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
        };
        chai.request(api).get('/users').send(mockSearchObject).end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
        });
        done();
      });
      it('When the request is done by an unauthorized User, then return 403 error', (done) => {
        const mockSearchObject = {
          ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
        };
        const AuthenticationService = require('../../src/services/authentication');
        const mockAuthenticationClaim = {
          id: 'fake-id',
          role: 'unexpected-role',
        };
        const fakeToken = new AuthenticationService().encodeData(mockAuthenticationClaim);
        chai.request(api).get('/users').send(mockSearchObject).set('Authentication', fakeToken).end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
        });
        done();
      });
    });
  });
  describe('Users Resource', () => {
    describe('Returns a valid User', () => {
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
          const userId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
          chai.request(api).get(`/users/${userId}`).set('Authentication', authenticationToken).end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id');
          });
          done();
        });
      });
      describe('When executing as an User', () => {
        let authenticationToken = '';
        before((done) => {
          // Create Session Token as User for testing.
          const mockAuthenticationObject = {
            email: 'barnettblankenship@quotezart.com',
          };
          chai.request(api).post('/authentication').send(mockAuthenticationObject).end((error, res) => {
            expect(res).to.have.status(200);
            authenticationToken = res.text;
          });
          done();
        });
        it('When using an existing ID', (done) => {
          const userId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
          chai.request(api).get(`/users/${userId}`).set('Authentication', authenticationToken).end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id');
          });
          done();
        });
      });
    });
    describe('Fails', (done) => {
      it('When the request is done by an unauthenticated User, then return 401 error', (done) => {
        const mockSearchObject = {
          ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
        };
        chai.request(api).get('/users').send(mockSearchObject).end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
        });
        done();
      });
      it('When the request is done by an unauthorized User, then return 403 error', (done) => {
        const mockSearchObject = {
          ids: ['a0ece5db-cd14-4f21-812f-966633e7be86'],
        };
        const AuthenticationService = require('../../src/services/authentication');
        const mockAuthenticationClaim = {
          id: 'fake-id',
          role: 'unexpected-role',
        };
        const fakeToken = new AuthenticationService().encodeData(mockAuthenticationClaim);
        chai.request(api).get('/users').send(mockSearchObject).set('Authentication', fakeToken).end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
        });
        done();
        it('When the request is looking for an inexistent ID, then return 404 error with explanation', (done) => {
          const userId = '000';
          chai.request(api).get(`/users/${userId}`).set('Authentication', authenticationToken).end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
          });
          done();
        });
      });
    });
  });
});
