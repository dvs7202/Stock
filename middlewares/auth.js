import User from "../models/userModel";
import { findOne } from "../helpers/common";
import { verifyJwt } from "../utils/jwt";

// auth for user
const userAuth = async function (req, res, next) {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(401).json({
        message: "not authenticated user",
      });
    }
    const token = cookie.split("=")[1];
    console.log(token);
    const decode = verifyJwt(token);
    console.log(decode);

    const user = await findOne(User, { _id: decode.id });
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "you are not authenticated",
      });
    }

    req.user = decode;

    next();
  } catch (error) {
    next(new Error(error));
  }
};
export default userAuth;
