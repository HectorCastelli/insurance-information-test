describe('Policies Service', () => {
  describe('Returns a valid Policy', () => {
    it('When the request is looking for a Policy from an existing User', (done) => {
      done();
    });
    it('When the request is looking for a Policy from multiple existing User', (done) => {
      done();
    });
    it('When the request is looking for a Policy from an existing User and an inexistent User', (done) => {
      done();
    });
    it('When the request is looking for a valid Policy, then return the related User', (done) => {
      done();
    });
  });
  describe('Returns an error code', () => {
    it('When the request is done by an unauthenticated User, then return 401 error', (done) => {
      done();
    });
    it('When the request is done by an unauthorized User, then return 403 error', (done) => {
      done();
    });
    it('When the relevant User does not have a Policy, then return 204 error with explanation', (done) => {
      done();
    });
    it('When the request has an inexistent User, then return a 404 error with explanation', (done) => {
      done();
    });
  });
});
