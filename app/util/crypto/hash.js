const bcrypt = require("bcrypt");
const {text} = require("express");

exports.hashPassword = function (password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};