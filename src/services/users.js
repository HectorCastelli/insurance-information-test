const DatabaseService = require('./database');
/**
 * The service for managing Users/Clients
 *
 * @class UsersService
 */
class UsersService {
  /**
   * Finds one or more Users that have an ID on the userIds array.
   *
   * @param {string} userIds The list of IDs of Users.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof UsersService
   */
  searchByID(...userIds) {
    if (userIds.filter((x) => x).length == 0) {
      throw new TypeError('There were no IDs to look for');
    } else {
      const database = new DatabaseService();
      const clientList = database.fetchClients();
      return clientList.filter((client) => userIds.includes(client.id));
    }
  }
  /**
   * Finds one or more Users that have a Name on the names array.
   *
   * @param {string} names The list of Names of Users.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof UsersService
   */
  searchByName(...names) {
    if (names.filter((x) => x).length == 0) {
      throw new TypeError('There were no Names to look for');
    } else {
      const database = new DatabaseService();
      const clientList = database.fetchClients();
      return clientList.filter((client) => names.includes(client.name));
    }
  }
}

module.exports = UsersService;
