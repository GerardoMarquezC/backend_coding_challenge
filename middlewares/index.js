const validateProperties = require("./validate-properties");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = { ...validateProperties, ...validateJWT, ...validateRoles };
