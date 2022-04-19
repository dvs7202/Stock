import dotenv from "dotenv";
dotenv.config();

const server = {
  port: process.env.PORT,
};

const db = {
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default {
  db,
  server,
  jwtSecret: process.env.JWT_SECRET,
  node_env: process.env.NODE_ENV,
};
