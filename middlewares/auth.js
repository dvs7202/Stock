import User from "../models/userModel";
import { findOne } from "../helpers/common";
import { verifyJwt } from "../utils/jwt";

// auth for user
export const userAuth = async function (req, res, next) {
  try {
    const cookie = req.headers.cookie;
    console.log(req.headers.cookie);
    console.log(req.cookie);
    if (!cookie) {
      res.status(401).json({
        message: "not authenticated user",
      });
    }
    console.log(cookie.jwt);
    const token = cookie.split("=")[1];
    console.log("hello", token);
    const decode = verifyJwt(token);
    //console.log(cookie);

    const user = await findOne(User, { _id: decode.id });
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "you are not authenticated",
      });
    }

    req.user = decode.id;

    next();
  } catch (error) {
    next(new Error(error));
  }
};
export default userAuth;
