const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users");
const {
  isRoleValidate,
  isEmailValidate,
  existUserByID,
} = require("../helpers/db-validators");
const {
  validateProperties,
  validateJWT,
  containsRoles,
} = require("../middlewares");

const router = Router();

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "It is not a valid id").isMongoId(),
    check("id").custom(existUserByID),
    validateProperties,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("full_name", "the full name is required").not().isEmpty(),
    check("password", "the password must be more than 6 characters").isLength({
      min: 6,
    }),
    check("email", "the email is not valid").isEmail(),
    check("email").custom(isEmailValidate),
    check("role").custom(isRoleValidate),
    validateProperties,
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    validateJWT,
    containsRoles("USER_ROLE", "SEC_ROLE"),
    check("id", "It is not a valid id").isMongoId(),
    check("id").custom(existUserByID),
    validateProperties,
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
