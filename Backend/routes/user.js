const express = require('express');
const router = express.Router();
const User = require("../models/User");
const token = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

        res.status(203).json({ result });

    } catch (err) {
        res.status(400).json({ err:"server issue" });
    }
});



// login 
router.post("/login", async (req, res) => {
try {
    const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log(user);

        // checking the password is correct 
        const hashedInputPass = await bcrypt.compare(password,user.password)
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
    res.status(400).json({ err:"incorrect credentials" });
}
        
})

module.exports = router;
