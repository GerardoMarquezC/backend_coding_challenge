const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "you want to verify the role without first validating the token",
    });
  }

  const { role, full_name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "insufficient privileges",
    });
  }
  next();
};

const containsRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "you want to verify the role without first validating the token",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ msg: "insufficient privileges" });
    }
    next();
  };
};
module.exports = { isAdminRole, containsRoles };
