import express from "express";
import catchAsync from "../utils/catchAsync";
import stock from "../controller/stockController";

const stockRouter = express.Router();

stockRouter.post("/stock", catchAsync(stock));

export default stockRouter;
