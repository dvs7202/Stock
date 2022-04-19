import jwt from "jsonwebtoken";
import config from "../config/config";

export const signJwt = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1h",
  });
};

export const verifyJwt = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
