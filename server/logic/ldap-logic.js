var
    ldap = require('ldapjs'),
    credentials = require('../enviorenment/admin.json'),
    ldapOptions = require('../enviorenment/ldapOptions.json'),
    userLogic = require('./user-logic'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({ name: "myapp" }),
    client = ldap.createClient({
        url: [ldapOptions.clientListenIp, ldapOptions.clientListenIp]
    });



// Create An Ldap Client, listen to the server's port. 
async function createClient() {

    client.on('error', (err) => {
        console.log('------- Err: ', err);
        throw new Error(err);
    });
    bindClient(client);
    // addUser(client);
    // clientCompare(client);
    return client
}


// Create a new user + new entry to ldap.
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


async function bindClient(client) {
    const answer = client.bind(
        credentials.admin,
        credentials.password, (
            error) => {
        if (error) {
            console.log(error);
            throw new Error(error)
        }
        if (answer) return clientCompare(client);
        return;
    });


}


async function clientCompare(client) {
    const user = {
        username: "Shachar"
    }
    const answer = client.compare('uid=shachar,ou=users,dc=demo,dc=com', 'sn', 'Ovadida', (err, matched) => {
        console.log(matched, "matched")
        console.log(err, "error")
        if (err) {
            console.log(err, "error")
            throw new Error(err)
        }


        userLogic.login(user.username).then((login) => {
            if (login) {
                let pair = userLogic.pair();
                console.log(pair)
            }

        })
    })
    return answer;
}

module.exports = {
    createClient,
    bindClient,
    addUser
}