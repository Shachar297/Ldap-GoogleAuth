const express = require('express');
const router = express.Router();
const ldapLogic = require("../logic/ldap-logic");
const ldap = require('ldapjs');


router.post ("/" , (request, response, next) => {

    try {
        const connection = ldapLogic.createClient();
        response.json(connection);
    } catch (error) {
        console.log("er")
        return next(error);
    }
})

router.post("/add/" , (request, response, next) => {
    try {
            const ldapUser = ldapLogic.addUser();
            response.json(ldapUser);
    } catch (error) {
        return next(error);
    }
})

// router.post("/search/", (request, response, next) => {
//     try {
//         const search = ldapLogic.ldapSearch();
//         response.json(search)
//     }catch (error) {
//         console.log(error)
//         return next(error);
//     }
// })

module.exports = router;
