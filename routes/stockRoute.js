import express from "express";
import catchAsync from "../utils/catchAsync";
import stock from "../controller/stockController";
import userAuth from "../middlewares/auth.js";

const stockRouter = express.Router();

// stockRouter.post("/stock", catchAsync(stock));

stockRouter
  .post("/stockapi", userAuth, stock.getStockData)
  .get("/stockapi", userAuth, function (req, res) {
    res.render("search", { ohlc: null, error: null, name: null });
  });

export default stockRouter;
