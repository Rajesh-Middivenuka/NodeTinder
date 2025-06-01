const adminAuth = (req, res, next) => {
  let token = "xyz";
  const idAdminAutharized = token === "xys z";
  if (!idAdminAutharized) {
    res.status(401).send("Unautharized request");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  let token = "xyz";
  const idAdminAutharized = token === "xyssz";
  if (!idAdminAutharized) {
    res.status(401).send("Unautharized request");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
