const logger = require("../utils/logger/log");
const router = require("express").Router();
require("dotenv").config();
const Crud = require("../models/Crud");
const validateAPIKey = require("../utils/validation/api_key_validation");
const { v4: uuidv4 } = require("uuid");

router.get("/", validateAPIKey, async (req, res) => {
  try {
    const crud = await Crud.find({}, { _id: 0 });
    res.status(200).json({
      status: "success",
      message: "Data successfully found",
      data: crud,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/:uid", validateAPIKey, async (req, res) => {
  try {
    const findData = await Crud.findOne({ uid: req.params.uid }, { _id: 0 });
    if (!findData) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data successfully found",
      data: findData,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/", validateAPIKey, async (req, res) => {
  try {
    const { name, age, address } = req.body;

    const crud = new Crud({
      uid: uuidv4(),
      name,
      age,
      address,
    });

    const saveCrud = await crud.save();
    res.status(201).json({
      status: "success",
      message: "Data successfully created",
      data: saveCrud,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.put("/:uid", validateAPIKey, async (req, res) => {
  try {
    const findData = await Crud.findOne({ uid: req.params.uid });

    if (!findData) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    await Crud.updateOne(
      { uid: req.params.uid },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          address: req.body.address,
          updatedAt: Date.now(),
        },
      }
    );

    res.status(200).send({
      status: "success",
      message: "Data successfully updated",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.delete("/:uid", validateAPIKey, async (req, res) => {
  try {
    const findData = await Crud.findOne({ uid: req.params.uid });

    if (!findData) {
      res.status(404).send({
        status: "error",
        message: "Data not found",
      });
    }
    await Crud.deleteOne({ uid: req.params.uid });

    res.status(200).send({
      status: "success",
      message: "Data successfully deleted",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
