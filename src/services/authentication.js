class AuthenticationService {
  constructor() {
  }

  static getSecretKey() {
    return 'secretKey';
  }

  encodeData(data) {
    return 'token';
  }

  decodeData(encoded) {
    return 'data';
  }

  authenticate(authenticationData) {
    return {};
  }
}

module.exports = AuthenticationService;
