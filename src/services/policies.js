const DatabaseService = require('./database');
/**
 * The Service for managing Policies
 *
 * @class PoliciesService
 */
class PoliciesService {
  /**
   * Finds one or more Clients that have an ID on the clientIds array.
   *
   * @param {string} policyIds The list of IDs of Policies.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof ClientsService
   */
  searchByID(...policyIds) {
    if (policyIds.filter((x) => x).length == 0) {
      throw new TypeError('There were no IDs to look for');
    } else {
      const database = new DatabaseService();
      const policiesList = database.fetchPolicies();
      return policiesList.filter((policy) => policyIds.includes(policy.id));
    }
  }

  /**
   * Finds one of more Policies that belong to a client with an ID listed on the clientIds array
   *
   * @param {*} clientIds The list of ClientIDs of Policies
   * @return {array<Policy>} The list of Policies that match the criteria
   * @memberof PoliciesService
   */
  searchByClientID(...clientIds) {
    if (clientIds.filter((x) => x).length == 0) {
      throw new TypeError('There were no IDs to look for');
    } else {
      const database = new DatabaseService();
      const policiesList = database.fetchPolicies();
      return policiesList.filter((policy) => clientIds.includes(policy.clientId));
    }
  }

  /**
   * Finds one of more Policies that are managed by a client with an Email listed on the emails array
   *
   * @param {*} emails The list of Advisor Emails of Policies
   * @return {array<Policy>} The list of Policies that match the criteria
   * @memberof PoliciesService
   */
  searchByAdvisorEmail(...emails) {
    if (emails.filter((x) => x).length == 0) {
      throw new TypeError('There were no Emails to look for');
    } else {
      const database = new DatabaseService();
      const policiesList = database.fetchPolicies();
      return policiesList.filter((policy) => emails.includes(policy.email));
    }
  }
}

module.exports = PoliciesService;
