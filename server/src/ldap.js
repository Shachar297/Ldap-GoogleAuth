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
    console.log('Login....');
    return new Promise((resolve, reject) => {
        // Search for existing user based upon username 
        const user = client.search(
            // Search with uid=XXX, base_dn
            `uid=${username},${config.ldap.base_dn}`,
            (err, reply) => {

                // Check to see if there is any error
                if (err) {
                    console.log(`Error while trying to login user`);
                    reject(err);
                }

                // reply.on('searchRequest', (searchRequest) => {
                //     console.log(colors.yellow('searchRequest: ', searchRequest));
                // });
                reply.on('searchEntry', (entry) => {
                    // console.log(colors.yellow('entry: ' + JSON.stringify(entry.object)));
                    console.log(colors.yellow('User found'));
                    process.env.username = username;
                    return resolve(entry);
                });
            })
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


// Setup the LDAP connection
init();