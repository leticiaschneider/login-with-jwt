const User = require('../model/userModel');
const userDao = require('../db/userDao');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/userToken')
const getToken = require('../helpers/getToken')

module.exports = {
    signup: async (req, res) => {
        // create user
        const user = new User({
            fullName: req.body.user_full_name,
            email: req.body.user_email.toLowerCase(), // sanitize: convert email to lowercase
            password: req.body.user_password,
        })

        // check if everything is filled
        if (!(user.email && user.password && user.fullName)) {
            res.status(400).json({ msg: "All input is required" });
        }

        // check if this email already exists
        const oldUser = await userDao.findUserByEmail(user.email);

        if (oldUser) {
            return res.status(409).json({ msg: "User Already Exist. Please Login" });
        }

        // encrypting the password to save
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);

        try {
            const newUser = await userDao.add(user);
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    login: async (req, res) => {
        
        // check that the fields have been filled
        if (!(req.body.user_email && req.body.user_password)) {
            res.status(400).json({ msg: "All input is required" });
        }
        
        const user = await userDao.findUserByEmail(req.body.user_email.toLowerCase());

        if (user) {
            // check if the password is the same
            bcrypt.compare(req.body.user_password, user.user_password, function (err, result) {
                if (result) {
                    createUserToken(user, req, res)
                } else {
                    res.status(401).json({ message: `Authentication failed for user ${user.fullName}` });
                }
            });
        } else {
            res.status(401).json({ message: "User does not exist" });
        }
    },
    checkUser: async (req, res) => {

        let currentUser = {};

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')

            currentUser = await userDao.findUserByEmail(decoded.email)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    },
};