const DatabaseService = require('./database');
/**
 * The service for managing Clients/Clients
 *
 * @class ClientsService
 */
class ClientsService {
  /**
   * Finds one or more Clients that have an ID on the clientIds array.
   *
   * @param {string} clientIds The list of IDs of Clients.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof ClientsService
   */
  searchByID(...clientIds) {
    if (clientIds.filter((x) => x).length == 0) {
      throw new TypeError('There were no IDs to look for');
    } else {
      const database = new DatabaseService();
      const clientList = database.fetchClients();
      return clientList.filter((client) => clientIds.includes(client.id));
    }
  }
  /**
   * Finds one or more Clients that have a Name on the names array.
   *
   * @param {string} names The list of Names of Clients.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof ClientsService
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

module.exports = ClientsService;
