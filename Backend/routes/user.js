const express = require('express');
const router = express.Router();
const User = require("../models/User");
const token = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require("../middleware/fetchuser");
// please state it in the enivironment file
const JWT_SECRET = "SurajChaitanyTaj";


// sign up the user
router.post("/adduser", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);

        let { username, email } = req.body;

        let hashPassword = await bcrypt.hash(req.body.password, salt);
        let password = hashPassword;
        const user = await new User({ username, email, password });
        const result = await user.save();
        let success =true
        res.status(203).json({ result,success });

    } catch (err) {
        let success = false;
        res.status(400).json({ err: "Email already exists",success });
    }
});



// login 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log(user);

        // checking the password is correct 
        const hashedInputPass = await bcrypt.compare(password, user.password)
        // console.log(hashedInputPass);
        if (!hashedInputPass) {
            let success = false;
            res.status(404).send({ success });
        }
        else {
            let success = true;
            const payload = {
                id: user._id
            }
            const authtoken = token.sign(payload, JWT_SECRET);
            res.status(201).json({ authtoken, success });
        }

    } catch (err) {
        res.status(400).json({ err: "incorrect credentials" });
    }

});

// Get datails of the user
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const _id = req.user.id;
        // console.log(_id);
        const user = await User.findById({ _id }).select("-password");
        // console.log(user);
        const success = true;
        res.status(203).json({ msg: "valid user with its token", success, user });
    } catch (err) {
        res.status(400).json({ err: "please authenticate with valid auth token" });
    }


});

module.exports = router;
