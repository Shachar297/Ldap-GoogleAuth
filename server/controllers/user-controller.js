const express = require("express");
const userLogic = require("../logic/user-logic");
const router = express.Router();


// https://www.authenticatorApi.com/pair.aspx?AppName=MyApp&AppInfo=John&SecretCode=12345678BXYT
router.post("/", (request, response, next) => {
    let user = request.body;
    console.log(user)
    try {
        response.json(userLogic.login(user.username));
    } catch (error) {
        return next(error);
    }
});

router.post("/pair/", (request, response, next) => {
    userLogic.pair()
        .then((data) => {
            response.json(data)
        }).catch(error => {
            console.log('error', error);
        });

})
// const authenticator = require('authenticator');
// let formattedKey = authenticator.generateKey();
// var formattedToken = authenticator.generateToken(formattedKey);
// authenticator.verifyToken(formattedKey, formattedToken);
// authenticator.verifyToken(formattedKey, '000 000');
// authenticator.generateTotpUri(formattedKey, "john.doe@email.com", "ACME Co", 'SHA1', 6, 30);

module.exports = router