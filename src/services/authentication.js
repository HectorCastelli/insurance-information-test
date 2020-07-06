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
   * @return {string} the Secret Key for JWT signature
   * @memberof AuthenticationService
   */
  get getSecretKey() {
    return this.secretKey;
  }

  /**
   * Encodes an object into a JWT Token
   *
   * @param {*} data The Object you want to encode into a JWT Token
   * @return {string} JWT Token representation of data
   * @memberof AuthenticationService
   */
  encodeData(data) {
    return jwt.sign(data, this.getSecretKey);
  }

  /**
   * Decodes a JWT Token into the original Object
   *
   * @param {string} encoded The already encoded JWT Token you want to decode
   * @return {Object} The Decoded object from the JWT Token
   * @memberof AuthenticationService
   */
  decodeData(encoded) {
    return jwt.verify(encoded, this.getSecretKey);
  }

  /**
   * Finds a Client by email and returns the appropriate object for JWT Token creation
   *
   * @param {Object} authenticationData And object containing the credentials that you want to authenticate in the format: "{email:{string}}"
   * @return {Object} The data to turn into a JWT token
   * @memberof AuthenticationService
   */
  authenticate(authenticationData) {
    const database = new DatabaseService();
    const email = authenticationData.email;
    const selectedClient = database.clients.find((client) => client.email === email);
    if (selectedClient) {
      return this.encodeData({
        'id': selectedClient.id,
        'role': selectedClient.role,
      });
    } else {
      throw new Error(`No client was found with the email: "${email}"`);
    }
  }
}

module.exports = AuthenticationService;
