const DatabaseService = require('./database');
const jwt = require('jsonwebtoken');
/**
 * Services responsible for Authentication and JWT token management
 *
 * @class AuthenticationService
 */
class AuthenticationService {
  /**
   *Creates an instance of AuthenticationService.
   * @memberof AuthenticationService
   */
  constructor() {
    this.secretKey = 'elJx8epoIVilx5QnmorEGq30M1YNgMR9evSDv9djpT2lLNNS4DhbwSoCL4namr6mONi2zOydGj2CNvfG';
  }

  /**
   * Returns the randomly created Secret Key for JWT signing
   *
   * @readonly
   * @memberof AuthenticationService
   */
  get getSecretKey() {
    return this.secretKey;
  }

  /**
   * Encodes an object into a JWT Token
   *
   * @param {*} data
   * @return {string} JWT Token representation of data
   * @memberof AuthenticationService
   */
  encodeData(data) {
    return jwt.sign(data, this.getSecretKey);
  }

  /**
   * Decodes a JWT Token into the original Object
   *
   * @param {string} encoded
   * @return {Object} The Decoded object from the JWT Token
   * @memberof AuthenticationService
   */
  decodeData(encoded) {
    return jwt.verify(encoded, this.getSecretKey);
  }

  /**
   * Finds a Client by email and returns the appropriate object for JWT Token creation
   *
   * @param {Object} authenticationData
   * @return {Object} The data to turn into a JWT token
   * @memberof AuthenticationService
   */
  authenticate(authenticationData) {
    const database = new DatabaseService();
    const email = authenticationData.email;
    const selectedUser = database.clients.find((client) => client.email === email);
    if (selectedUser) {
      return this.encodeData({
        'id': selectedUser.id,
        'role': selectedUser.role,
      });
    } else {
      throw new Error(`No user was found with the email: "${email}"`);
    }
  }
}

module.exports = AuthenticationService;
