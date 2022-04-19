import express from "express";
import catchAsync from "../utils/catchAsync";
import { loginUser, registerUser } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", catchAsync(registerUser));
userRouter.post("/login", catchAsync(loginUser));

export default userRouter;
