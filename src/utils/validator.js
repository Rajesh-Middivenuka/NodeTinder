const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstName shoulb be bewteen 4 to 50");
  }
  // npm validator
  else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
  }
};

module.exports = { validateSignUpData };
