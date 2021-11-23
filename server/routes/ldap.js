const
    express = require('express'),
    router = express.Router(),
    ldapLogic = require("../src/ldap");

/**
 * Process the LDAP login 
 */
router.post("/", (req, res, next) => {
    const
        username = req.body.username,
        password = req.body.password;

    console.log(`Processing login: ${JSON.stringify(req.body)}`);
    try {
        ldapLogic
            .login(username, password)
            .then((reply) => {
                console.log(`Reply from login: ${reply}`)
                res.status(200).json(reply);
            }).catch(err => {
                console.log(`Error while trying to login: ${err}`)
                res.status(400).send('Error while trying to login');
            });

    } catch (error) {
        console.log("er")
        return next(error);
    }
})

module.exports = router;
