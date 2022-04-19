import logger from "../config/logger";
import { create, findOne } from "../helpers/common";
import { signJwt } from "../utils/jwt";
import User from "./../models/userModel";

export const registerUser = async (req, res, next) => {
  try {
    logger.info("inside User Controller Register user");
    const { name, email, password, confirmPassword, mobileNo } = req.body;

    const data = {
      name,
      email,
      password,
      confirmPassword,
      mobileNo,
    };
    const user = await create(User, data);

    return user
      ? res.status(201).json({
          message: "registration success",
          data: user,
        })
      : res.status(201).json({
          message: "registration failed",
          data: user,
        });
  } catch (err) {
    next(new Error(error));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    logger.info("inside user controller login user");
    const { email, password } = req.body;

    const user = await findOne(User, { email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = signJwt(payload);

    res.cookie("jwt", token);

    return res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    next(new Error(error));
  }
};
