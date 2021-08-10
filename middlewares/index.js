const validateProperties = require("./validate-properties");
const validateJWT = require("../middlewares/validate-jwt");

module.exports = { ...validateProperties, ...validateJWT };
