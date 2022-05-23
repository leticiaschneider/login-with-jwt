const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    const userInfo = { name: user.user_full_name, email: user.user_email };

    const token = 'Bearer' + ' ' + jwt.sign(userInfo, "secret", {
        expiresIn: 86400 // seconds, 24h
    });

    res.setHeader('x-access-token', token);

    return res.status(200).json({ message: "User authenticated", token: token, name: user.user_full_name });
};

module.exports = createUserToken;
