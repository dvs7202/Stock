import express from "express";
import user from "./users/userRoutes.js";
import stockApi from "./stockapi/stockRoutes.js";
const router = express.Router();

router.use("/users", user);
router.use("/home", stockApi);

export default router;
