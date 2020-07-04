describe('Users Service', () => {
  describe('Returns a valid User', () => {
    it('When the request is looking for an User with existing ID', (done) => {
      done();
    });
    it('When the request is looking for an User by a single existing Name', (done) => {
      done();
    });
    it('When the request is looking for Users by two existing Names', (done) => {
      done();
    });
    it('When the request is looking for Users by an existing Name and an inexistent Name', (done) => {
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
    it('When the request is looking for an inexistent ID, then return 404 error with explanation', (done) => {
      done();
    });
    it('When the request is looking for an inexistent Name, then return 404 error with explanation', (done) => {
      done();
    });
  });
});
