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
            return next(error);
        });

});

router.post("/validate/userPin/", (request, response, next) => {
    const pin = request.body.validatePin;
    userLogic.validate(pin).then(
        (data) => {
            response.json(data)
        }).catch(error => {
            return next(error);
        })
})


module.exports = router