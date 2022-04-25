import express, { json, urlencoded } from "express";
import logger from "./config/logger.js";
import res from "express/lib/response";
import router from "./index.js";
import cors from "cors";
import morgan from "morgan";
import db from "./connections/dbConnection.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

import {
  mongoseErrors,
  productionErrors,
  developmentErrors,
} from "./helpers/errorHandler";
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use("/css", express.static("public"));
app.use("/js", express.static("/src/public"));
app.use("/img", express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, re) => {
  res.status(200).json({
    message: "success",
  });
});

//all routes
app.use("/api/v1", router);

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
