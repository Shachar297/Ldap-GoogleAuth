/**
 * This module contain the required configuration for the demo
 */
module.exports = {

  // The ldap settings
  // For this demo we will be using a FREE Ldap server:
  // ldap: {
  //   serverUrl: "ldap://ldap.forumsys.com:389/dc=example,dc=com",
  //   dc: "dc=example,dc=com",
  //   credentials: {
  //     base_cn: "cn=read-only-admin,dc=example,dc=com",
  //     adminPassword: "password"
  //   }
  // },
  ldap: {
    serverUrl: "ldap://ipa.demo1.freeipa.org",
    base_dn: "cn=accounts,dc=demo1,dc=freeipa,dc=org",

    credentials: {
      base_cn: "uid=admin,cn=users,cn=accounts,dc=demo1,dc=freeipa,dc=org",
      adminPassword: "Secret123"
    }
  },

  googleAPI: {
    hostname: "www.authenticatorApi.com",
    method: "GET",
    port: "443"
  }

}