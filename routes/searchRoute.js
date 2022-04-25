import express from "express";
import catchAsync from "../utils/catchAsync";
import stockController from "../controller/stockController";
import userAuth from "../middlewares/auth.js";

const searchRouter = express.Router();

searchRouter
  .post("/search", userAuth, stockController.getStockData)
  .get("/search", userAuth, function (req, res) {
    res.render("search", { ohlc: null, error: null, name: null });
  });

export default searchRouter;
