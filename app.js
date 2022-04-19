import express, { json, urlencoded } from "express";
import logger from "./config/logger.js";
import res from "express/lib/response";
import router from "./index.js";
import cors from "cors";
import morgan from "morgan";
import db from "./connections/dbConnection.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import Stock from "./models/stockModel";
import {
  mongoseErrors,
  productionErrors,
  developmentErrors,
} from "./helpers/errorHandler";
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use("/css", express.static("public"));
app.use("/img", express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, re) => {
  res.status(200).json({
    message: "success",
  });
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/search", (req, res) => {
  res.render("search.ejs");
});
//all routes
app.use("/api/v1", router);

app.get("/search/:key", async (req, res, next) => {
  console.log(req.params.key);
  let data = await Stock.find({
    $or: [{ symbol: { $regex: req.params.key } }],
  });
  res.send(data);
});

//db connections
db();

//not found error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message,
  });
});

//db error
app.use(mongoseErrors);

//development and production error

if (config.node_env === "development") {
  app.use(developmentErrors);
} else {
  app.use(productionErrors);
}

app.listen(config.server.port, () => {
  logger.info(`server is running on ${config.server.port}`);
});

export default app;
