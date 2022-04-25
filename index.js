import express from "express";
import userRouter from "./routes/userRoute.js";
import stockRouter from "./routes/stockRoute.js";
import searchRouter from "./routes/searchRoute.js";
import stockController from "./controller/stockController.js";
import { userAuth } from "./middlewares/auth";

const router = express.Router();

router.use("/user", userRouter);
router.use("/stock", stockRouter);
router.use("/home", searchRouter);

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router
  .post("/search", userAuth, stockController.getStockData)
  .get("/search", userAuth, function (req, res) {
    res.render("search", { ohlc: null, error: null, name: null });
  });
export default router;
