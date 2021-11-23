const
    express = require("express"),
    router = express.Router(),
    userLogic = require("../logic/user-logic");


router.post("/pair", async (req, res, next) => {
    try {
        const user = await userLogic.pair();
        res.json(user);
    } catch (error) {
        return next(error);
    }
});


router.post("/validateMFA/",
    async (req, response, next) => {

        console.log('/validateMFA');
        const userPin = req.body.validatePin;
        console.log('>>>>>>>>>>>>>>>', userPin);
        try {
            const user = await userLogic.validate(userPin);
            response.json(user);
        } catch (error) {
            return next(error);
        }
    });

module.exports = router;