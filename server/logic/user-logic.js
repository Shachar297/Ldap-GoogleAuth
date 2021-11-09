const
    https = require('https'),
    fs = require('fs-extra'),
    config = require('../google-api.json'),
    options = {
        hostname: config.hostname,
        method: config.method,
        port: config.port
    };

// Ensure that the file exist
fs.ensureFileSync(`${__dirname}/../users.json`);

// Load the users
usersList = fs.readJSONSync(`${__dirname}/../users.json`);
// Login logic
async function login(user) {
    // Store the user name. 
    // We need to convert it to string since env stores only string
    process.env.userData = JSON.stringify(usersList[user]);
    return process.env.userData;
}

/**
 * Request Authentication 
 */
async function pair() {

    // Define params
    let req;

    // Return promise
    return new Promise(function (resolve, reject) {
        let userData = JSON.parse(process.env.userData);

        console.log(userData);
        // Check to see if user name found during login
        if (!userData) {
            return reject('User not valid');
        };

        console.log(Object.assign(
            {},
            options, {
            path: `/pair.aspx?AppName=A&AppInfo=${userData.username}&SecretCode=${userData.sercetPhrase}`
        }));

        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                options, {
                path: `/pair.aspx?AppName=A&AppInfo=${userData.username}&SecretCode=${userData.sercetPhrase}`
            }),
            res => {
                console.log(`statusCode: ${res.statusCode}`);

                // Listen for data
                res.on('data', data => {
                    console.log("!!!")
                    process.stdout.write(data);
                    return resolve(data.toString());
                });
            });

        // Listen for error
        req.on('error', error => {
            process.stdout.write(error);
            return resolve(error);
        });

        // Execute the request
        req.end();
    });

}

async function validate(userPin) {
    console.log(userPin);
    // Define params
    let req;

    // Return promise
    return new Promise(function (resolve, reject) {
        let userData = JSON.parse(process.env.userData);

        console.log(userData);
        // Check to see if user name found during login
        if (!userData) {
            return reject('User not valid');
        };

        console.log(Object.assign(
            {},
            options, {
            path: `/pair.aspx?AppName=A&AppInfo=${userData.username}&SecretCode=${userData.sercetPhrase}`
        }));

        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                options, {
                path: `/Validate.aspx?Pin=${userPin}&SecretCode=${userData.sercetPhrase}`
            }),
            res => {
                console.log(`statusCode: ${res.statusCode}`);

                // Listen for data
                res.on('data', data => {
                    console.log("!!!")
                    process.stdout.write(data);
                    return resolve(data.toString());
                });
            });

        // Listen for error
        req.on('error', error => {
            process.stdout.write(error);
            return resolve(error);
        });

        // Execute the request
        req.end();
    });
}
module.exports = {
    login,
    pair,
    validate
}