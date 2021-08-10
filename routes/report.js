const { Router } = require("express");
const { reportProducts } = require("../controllers/reports");
const { validateJWT, validateProperties } = require("../middlewares");
const router = Router();


router.get("/", [validateJWT, validateProperties], reportProducts);

module.exports = router;
