const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("../config/global_config");
const bodyParser = require("body-parser");
const cors = require("cors");
const morganMiddleware = require("../utils/logger/morgan");
const logger = require("../utils/logger/log");
require("dotenv").config();
const routerWelcoming = require("../routes/welcoming");
const routerCrud = require("../routes/crud");

class AppServer {
  constructor() {
    this.app = app;
    this.config();
    this.mongoSetup();
    this.healthCheck();
    this.routes();
  }

  config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morganMiddleware);
  }

  routes() {
    this.app.use("/welcoming", routerWelcoming);
    this.app.use("/v1/crud", routerCrud);
  }

  healthCheck() {
    this.app.get("/v1/healthz", (req, res) => {
      res.status(200).json({
        status: "success",
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date(Date.now()).toString(),
      });
    });
  }

  mongoSetup() {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(config.get("/db/mongo/url"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      logger.info("Connected to MongoDB" + config.get("/db/mongo/url"));
    } catch (error) {
      logger.error("Could not connect to MongoDB");
      logger.error(error);
      process.exit(1);
    }
  }

  async start() {
    try {
      this.app.listen(config.get("/port"));
      logger.info(
        `Server started on port ${config.get("/port")} (${config.get("/env")})`
      );
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }
}

module.exports = AppServer;
