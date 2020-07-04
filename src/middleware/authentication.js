const AuthenticationService = require('../services/authentication');

/**
 * Checks if a role is on the list of acceptedRoles
 *
 * @param {string} role The current user Role
 * @param {array<string>} acceptedRoles The list of accepted Roles
 * @return {boolean}
 */
function checkPermission(role, acceptedRoles) {
  return acceptedRoles.indexOf(role) > -1;
}

/**
 * Creates a middleware that verifies the Request's Authentication header against a list of roles.
 *
 * @param {array<string>} acceptedRoles The list of roles accepted by this endpoint
 * @return {function} A Express.JS middleware
 */
function authenticationMiddleware(...acceptedRoles) {
  return (request, response, next) => {
    const authHeader = request.header('Authentication');
    if (authHeader) {
      const authService = new AuthenticationService();
      const JWTClaim = authService.decodeData(authHeader);
      if (JWTClaim && this.checkPermission(JWTClaim.role, acceptedRoles)) {
        next();
      } else {
        response.status(403).json({
          'error': 'You lack the necessary access for this functionality.',
        });
      }
    } else {
      response.status(401).json({
        'error': 'You are not authenticated.',
      });
    }
  };
}

module.exports = {
  checkPermission,
  authenticationMiddleware,
};
