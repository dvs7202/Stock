import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Creating User schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    validate: [validator.isEmail, "Invalid Email"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please Enter Contact No"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],

    //check confirm password is match with password or not
    validate: {
      validator: function (confpass) {
        return confpass === this.password;
      },
      message: "Password do not match",
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//hashing password before save using bcrypt

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
    this.confirmPassword = undefined;
    next();
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//hide password from doc

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

const User = mongoose.model("User", userSchema);

export default User;
