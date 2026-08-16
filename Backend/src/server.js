import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import https from "https";
import createResponseHandler from "./helper/responseHandler.js";
import routes from "./routes/index.js";

/**
 IMPORT ALL IN ENVS 
 **/

const HTTP = process.env.ENV_TYPE == "production" ? https : http;

const PORT = process.env.PORT || 8022;
const app = express();
const server = HTTP.createServer(app);

import { connect } from "./config/database.js";
connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.handler = new createResponseHandler(req, res);
  next();
})

app.use(routes);

server.listen(PORT, () => {
  console.log(`Server on port ${PORT} has been started.`)
})