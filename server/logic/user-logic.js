const
    https = require('https'),
    fs = require('fs-extra'),
    config = require('../config/config.js');

// Login logic

/**
 * Request Authentication 
 */
async function pair() {

    // Define params
    let req;

    // Return promise
    return new Promise(function (resolve, reject) {
        // let userData = JSON.parse(process.env.userData);

        // Check to see if user name found during login
        if (!process.env.username) {
            return reject('User not valid');
        };

        console.log(Object.assign(
            {},
            config.googleAPI, {
            path: `/pair.aspx?AppName=A&AppInfo=${process.env.username}&SecretCode=${config.googleSecrets}`
        }));

        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                config.googleAPI, {
                path: `/pair.aspx?AppName=A&AppInfo=${process.env.username}&SecretCode=${config.googleSecrets}`
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

        // Check to see if user name found during login
        // if (!userData) {
        //     return reject('User not valid');
        // };


        // Execute the API call
        req = https.request(
            Object.assign(
                {},
                config.googleAPI, {
                path: `/Validate.aspx?Pin=${userPin}&SecretCode=${config.googleSecrets}`
            }),
            res => {
                console.log(`statusCode: ${res.statusCode}`);

                // Listen for data
                res.on('data', data => {
                    console.log("!!!", data)
                    process.stdout.write(data);
                    return resolve(data.toString());
                });
            });

        // Listen for error
        req.on('error', error => {
            process.stdout.write(error);
            return reject(error);
        });

        // Execute the request
        req.end();
    });
}
module.exports = {
    pair,
    validate
}