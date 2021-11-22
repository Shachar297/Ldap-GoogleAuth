const
    express = require('express'),
    router = express.Router(),
    ldapLogic = require("../src/ldap");

router.post("/", (request, response, next) => {
    const
        username = request.body.username,
        password = request.body.password;

    console.log(request.body);
    try {
        ldapLogic
            .login(username, password)
            .then((reply) => {
                response.json(reply);
            });

    } catch (error) {
        console.log("er")
        return next(error);
    }
})

module.exports = router;
