var ldap = require('ldapjs');
const credentials = require('../users.json')

async function createClient() {

// ldapsearch -x -H ldap://localhost:3890 -b dc=demo,dc=com -D "cn=shachar,uid=shachar" -w 1234

    const client = ldap.createClient({
        url: ['ldap://127.0.0.1:3890', 'ldap://127.0.0.2:3890']
    });
        
    client.on('error', (err) => {
        console.log(err, "errored at line : 13");
        throw new Error(err);
    });

    bindClient(client);
    clientCompare(client);

    return client
}

async function bindClient(client) {
    const answer = client.bind(`cn=${credentials.admin}`,`userpassword=${credentials.password}`, (error) => {
        assert.ifError(error)
    });

    return answer
}

async function clientCompare(client) {
    const answer = client.compare(credentials.admin, credentials.password, (err, matched) => {
        assert.ifError(err);
      
        console.log('matched: ' + matched);
      });

      return client
}

module.exports = {
    createClient,
    bindClient,
    clientCompare
}