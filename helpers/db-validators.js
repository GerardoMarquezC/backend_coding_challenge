const mongoose = require("mongoose");
const Role = require("../models/role");
const User = require("../models/user");

const isRoleValidate = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`the role "${role}" is not registered in the database`);
  }
};

const isEmailValidate = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(
      `the email "${email}" is already registered in the database`
    );
  }
};

const existUserByID = async (id) => {
  console.log(id);
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (valid) {
    const idExist = await User.findById(id);
    if (!idExist) {
      throw new Error(`the ID "${id}" does not exist in the database`);
    }
  }
};

module.exports = {
  isRoleValidate,
  isEmailValidate,
  existUserByID,
};
