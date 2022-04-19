import express from "express";
import userRouter from "./routes/userRoute.js";
import stockRouter from "./routes/stockRoute.js";
import searchRouter from "./routes/searchRoute.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/stock", stockRouter);
router.use("/search", searchRouter);
export default router;
