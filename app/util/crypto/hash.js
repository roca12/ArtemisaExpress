const bcrypt = require("bcrypt");

exports.hashPassword = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
