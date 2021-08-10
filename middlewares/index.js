const validateProperties = require("./validate-properties");
const validateJWT = require("../middlewares/validate-jwt");
const validateProduct = require("./validate-product");

module.exports = { ...validateProperties, ...validateJWT, ...validateProduct };
