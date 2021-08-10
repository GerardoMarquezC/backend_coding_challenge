const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  postUsers
} = require("../controllers/users");
const {
  isEmailValidate,
} = require("../helpers/db-validators");
const {
  validateProperties,
} = require("../middlewares");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("full_name", "the full name is required").not().isEmpty(),
    check("password", "the password must be more than 6 characters").isLength({
      min: 6,
    }),
    check("email", "the email is not valid").isEmail(),
    check("email").custom(isEmailValidate),
    validateProperties,
  ],
  postUsers
);


module.exports = router;
