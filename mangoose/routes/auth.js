const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Atul@Tyagi';

//Route1: create a user using: POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let  success = false;
    // if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this email exists already 
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        //Create User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        success = true;
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
},
);

//Route2: Authenticate a user using: POST "/api/auth/login". Doesn't require auth
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let  success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}
);

//Route1: get a user using: POST "/api/auth/getuser". Login Required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user)
        console.log(userId)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}
)


module.exports = router