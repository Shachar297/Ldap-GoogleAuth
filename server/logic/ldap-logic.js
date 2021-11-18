var
    ldap = require('ldapjs'),
    credentials = require('../enviorenment/admin.json'),
    ldapOptions = require('../enviorenment/ldapOptions.json'),
    userLogic = require('./user-logic'),
    loginCredentials = require('../enviorenment/login'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({ name: "myapp" }),
    client = ldap.createClient({
        url: [ldapOptions.clientListenIp, ldapOptions.clientListenIp]
    });



// Create An Ldap Client, listen to the server's port. 
async function createClient(username, password) {
    client.on('error', (err) => {
        console.log('------- Err: ', err, "!");
        throw new Error(err);
    });
    bindClient(client, username, password);
    // addUser(client);
    // clientCompare(client);
    return client
}


// Create a new user + a new entry from scratch to ldap DB.

let addUser = (client) => {

    const entry = {
        cn: 'foo23341',
        sn: 'bar1232',
        objectclass: ['organizationalPerson', 'person'],
        userPassword: '1234'
    };

    const user = 'ou=users122,ou=users,dc=demo,dc=com'
    const newClient = client.add(
        user,
        entry,
        (err, response) => {

            if (err) {
                console.error(err);
                throw new Error(err);
            }
        })
    return newClient;
}

// The bindClient function is actualy the function that bind the LDAP DB administrator to the DB
// Only an LDAP administrator can commit actions infront of the DB.

async function bindClient(client, username, password) {
    const answer = client.bind(
        credentials.admin,
        credentials.password, (
            error) => {
        if (error) {
            console.log(error, "bid error");
            throw new Error(error)
        }
        if (answer) {
            console.log(answer, "bind answer")
            return clientCompare(client, username, password);
        }
    });


}

// clientCompare is the function who searches a user in the LDAP DB and returns a boolean indicating.
// In this case, if we find one, we authenticating him via google by a QR Code.
// If we dont find one, we just return false.

async function clientCompare(client, username, password) {
    const answer = client.compare(`uid=${username},ou=${loginCredentials.ou},${loginCredentials.dc}`, 'sn', `Ovadida`, (err) => {

        if (err) {
            console.log(err, "error12222222222")
            throw new Error(err)
        }

        console.log(answer)

        // userLogic.login(loginCredentials.givenName).then((login) => {
        //     if (login) {
        //         let pair = userLogic.pair();
        //         console.log(pair)
        //     }else{
        //         throw new Error("Authentication did not complete. ")
        //     }

        // })
    });
    process.env.userData = username
    process.env.password = password
    return answer;
}

module.exports = {
    createClient,
    bindClient,
    addUser,
    clientCompare
}