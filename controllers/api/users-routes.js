const router = require("express").Router();
const { Users } = require("../../models");

// CREATE new user
/* Example JSON
{
    "username": "testy_mctesterson",
    "email": "test@gmail.com",
    "password": "123456",
    "is_admin": false
}
*/
router.post("/", async (req, res) => {
    console.log(req.body.username);

    try {
        const dbUserData = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_admin: req.body.is_admin,
        });
        console.log(dbUserData);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = dbUserData;
            return res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// user login
/* Example JSON
{
    "email": "test@gmail.com",
    "password": "123456"
}
*/
router.post("/login", async (req, res) => {
    try {
        const dbUserData = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again!",
            });
            return;
        }
        //checks that password is valid using custom instance method in ./models/user.js
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again!",
            });
            return;
        }
        //save data to session for use elsewhere
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = dbUserData;
            console.log("🚀", req.session.cookie);

            res.status(200).json({
                user: dbUserData,
                message: "You are now logged in!",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// User Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
