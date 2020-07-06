const DatabaseService = require('./database');
/**
 * The Service for managing Policies
 *
 * @class PoliciesService
 */
class PoliciesService {
  /**
   * Finds one or more Users that have an ID on the userIds array.
   *
   * @param {string} policyIds The list of IDs of Policies.
   * @return {array<Client>} The list of Clients that match the criteria
   * @memberof UsersService
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
   * Finds one of more Policies that belong to a user with an ID listed on the userIds array
   *
   * @param {*} userIds The list of UserIDs of Policies
   * @return {array<Policy>} The list of Policies that match the criteria
   * @memberof PoliciesService
   */
  searchByUserID(...userIds) {
    if (userIds.filter((x) => x).length == 0) {
      throw new TypeError('There were no IDs to look for');
    } else {
      const database = new DatabaseService();
      const policiesList = database.fetchPolicies();
      return policiesList.filter((policy) => userIds.includes(policy.clientId));
    }
  }

  /**
   * Finds one of more Policies that are managed by a user with an Email listed on the emails array
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
