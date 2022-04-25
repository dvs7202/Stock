import jwt from "jsonwebtoken";
import config from "../config/config";

export const signJwt = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1d",
  });
};

export const verifyJwt = (token) => {
  console.log("new ", token);
  var abc = jwt.verify(token, config.jwtSecret);

  return jwt.verify(token, config.jwtSecret);
};
