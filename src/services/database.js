/**
 * Database Service manages the data from the two provided URLs
 * and provides mock methods to access them.
 *
 * @class DatabaseService
 */
class DatabaseService {
  /**
   *Creates an instance of DatabaseService.
   * @memberof DatabaseService
   */
  constructor() {
    this.clients = this.fetchClients();
    this.policies = this.fetchPolicies();
  }

  /**
   * Returns the Client List from the URL.
   *
   * @return {Object} Client
   * @memberof DatabaseService
   */
  fetchClients() {
    const data = require('../data/clients.json').clients;
    return data;
  }
  /**
   * Returns the Policies List from the URL.
   *
   * @return {Object} Policies
   * @memberof DatabaseService
   */
  fetchPolicies() {
    const data = require('../data/policies.json').policies;
    return data;
  }
}

module.exports = DatabaseService;
