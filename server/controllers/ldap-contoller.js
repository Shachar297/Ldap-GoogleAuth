const express = require('express');
const router = express.Router();
const ldapLogic = require("../logic/ldap-logic");

router.post ("/" , (request, response, next) => {
    try {
        const connection = ldapLogic.createClient();
        console.log(connection)
        response.json(connection);
    } catch (error) {
        console.log("er")
        return next(error);
    }

})


module.exports = router;
