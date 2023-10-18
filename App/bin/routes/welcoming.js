const logger = require("../utils/logger/log");
const router = require("express").Router();
require("dotenv").config();

router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      status: "Berhasil",
      message: "Selamat Datang Anonymous",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: "Gagal",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/:nama", (req, res) => {
  try {
    const nama = req.params.nama;

    if (!nama) {
      return res.status(404).json({
        status: "Gagal",
        message: "Nama tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "Berhasil",
      message: `Selamat Datang ${nama}`,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: "Gagal",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
