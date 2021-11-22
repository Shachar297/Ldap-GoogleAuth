const
express = require("express"),
router = express.Router(),
userLogic = require("../logic/user-logic");


router.post("/", async (req, res, next) => {
    try {
        const user = await userLogic.pair();
        res.json(user);
    } catch (error) {
        return next(error);
    }
});


router.post("/pin/", async (req, response, next) => {

    const userPin = req.body.validatePin;
    try {
        const user = await userLogic.validate(userPin);
        response.json(user);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;