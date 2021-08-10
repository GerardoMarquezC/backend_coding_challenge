const { Router } = require("express");
const { check } = require("express-validator");
const { postOrders } = require("../controllers/orders");
const {
  validateProperties,
  validateJWT,
  validateArrayProduct,
  validateTotalPricefromProducts
} = require("../middlewares");

const router = Router();

router.post("/", [
  validateJWT, 
  check("client_name", "the client_name is required").not().isEmpty(), 
  check("total_price", "the total_price is required").not().isEmpty(), 
  check("products", "the products is required").not().isEmpty(), 
  check("products").custom(validateArrayProduct),
  check("products").custom(validateTotalPricefromProducts),
  validateProperties
], postOrders);

module.exports = router;
