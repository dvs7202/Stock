import express from "express";
import catchAsync from "../utils/catchAsync";
import { searchstock } from "../search.js";

const searchRouter = express.Router();

searchRouter.get("/", catchAsync(searchstock));
export default searchRouter;
