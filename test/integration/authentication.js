describe('Authentication Service', () => {
  describe('Authenticates a user', () => {
    it('When the request is valid expect the response to be a valid JWT token', (done) => {
      done();
    });
    it('When the request is valid expect the response to contain the appropriate role value ("admin")', (done) => {
      done();
    });
    it('When the request is valid expect the response to contain the appropriate role value ("user")', (done) => {
      done();
    });
  });
  describe('Returns an error code', () => {
    it('When the Request parameters are invalid, then return 403 error with explanation', (done) => {
      done();
    });
    it('When the user is not found, return 404 error with explanation', (done) => {
      done();
    });
    it('When the Request times-out, returns 408 error with explanation', (done) => {
      done();
    });
  });
});
