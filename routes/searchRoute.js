import express from "express";
import catchAsync from "../utils/catchAsync";
import { searchstock, getmysearch } from "../controller/searchController";
import userAuth from "../middlewares/auth.js";

const searchRouter = express.Router();

searchRouter.get("/", userAuth, catchAsync(searchstock));
searchRouter.get("/mysearch", userAuth, catchAsync(getmysearch));
export default searchRouter;
