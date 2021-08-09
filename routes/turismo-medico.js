const { Router } = require("express");
const { getTestCirugia, postTestCirugia } = require("../controllers/turismo-medico");

const router = Router();

router.get("/test-cirugia", getTestCirugia);

router.post("/test-cirugia", postTestCirugia)

module.exports = router;
