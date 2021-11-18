var
    // The ldap library
    ldap = require('ldapjs'),

    // Colors for output
    colors = require('colors/safe'),

    // Load the configuration
    config = require('../config/config'),

    // The ldap client implementation
    client;


// clientCompare is the function who searches a user in the LDAP DB and returns a boolean indicating.
// In this case, if we find one, we authenticating him via google by a QR Code.
// If we dont find one, we just return false.

function login(username, password) {

    return new Promise((resolve, reject) => {
        client.search(
            `uid=${username},${config.ldap.base_dn}`,
            { attributes: ['sn'] },
            (err, reply) => {

                if (err) {
                    console.log(err);
                    reject(err);
                    //throw new Error(err)
                }

                reply.on('searchRequest', (searchRequest) => {
                    console.log(colors.yellow('searchRequest: ', searchRequest));
                });
                reply.on('searchEntry', (entry) => {
                    console.log(colors.yellow('entry: ' + JSON.stringify(entry.object)));
                });
                reply.on('searchReference', (referral) => {
                    console.log('referral: ' + referral.uris.join());
                });
                reply.on('error', (err) => {
                    console.error(colors.yellow('error: ' + err.message));
                });
                reply.on('end', (result) => {
                    console.log(colors.yellow('status: ' + result.status));
                });


            });
    });
}

module.exports = {
    login
}

/**
 * Init the connection to the LDAP server
 */
function init() {

    // Create the client which will connect to the LDAP server
    client = ldap.createClient({
        url: config.ldap.serverUrl,
        connectTimeout: 5000
    });

    // register error listener
    client.on('error', (err) => {
        console.log(colors.yellow(`* Error while connecting to LDAP : ${err}`));
    });

    // register connect event
    client.on('connect', (err) => {
        console.log(colors.yellow(`* Connected to LDAP server [${config.ldap.serverUrl}]`));

        // bind the admin user for working with the LDAP query
        client.bind(
            config.ldap.credentials.base_cn,
            config.ldap.credentials.adminPassword,
            (error) => {
                // Check to see if there is any error
                if (error) {
                    console.log(error, "bind error");
                    throw new Error(error)
                }

                console.log(colors.yellow('* Admin user is bound to LDAP server'))
            });
    });


}

init();