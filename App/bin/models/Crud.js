require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../config/global_config");
const connection = mongoose.createConnection(config.get("/db/mongo/url"));
const { v4: uuidv4 } = require("uuid");

const crudSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const Crud = connection.model("Crud", crudSchema);

module.exports = Crud;
