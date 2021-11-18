const
    https = require('https'),
    fs = require('fs-extra'),
    config = require('../environment/google-api.json');


// Ensure that the file exist
fs.ensureFileSync(`${__dirname}/../environment/users.json`);

// Load the users
usersList = fs.readJSONSync(`${__dirname}/../environment/users.json`);
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
        // let userData = JSON.parse(process.env.userData);

        console.log("1111112222222", process.env.userData);
        // Check to see if user name found during login
        if (!process.env.userData) {
            return reject('User not valid');
        };

        console.log(Object.assign(
            {},
            config, {
            path: `/pair.aspx?AppName=A&AppInfo=${process.env.userData}&SecretCode=${process.env.password}`
        }));

        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                config, {
                path: `/pair.aspx?AppName=A&AppInfo=${process.env.userData}&SecretCode=${process.env.password}`
            }),
            res => {
                console.log(`statusCode: ${res.statusCode}`);

                // Listen for data
                res.on('data', data => {
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
        // let userData = JSON.parse(process.env.userData);

        console.log(process.env.userData);
        // Check to see if user name found during login
        // if (!userData) {
        //     return reject('User not valid');
        // };

        console.log(Object.assign(
            {},
            config, {
            path: `/pair.aspx?AppName=A&AppInfo=${process.env.userData}&SecretCode=${process.env.password}`
        }));

        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                config, {
                path: `/Validate.aspx?Pin=${userPin}&SecretCode=${process.env.password}`
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