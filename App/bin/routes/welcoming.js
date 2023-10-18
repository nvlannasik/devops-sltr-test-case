const logger = require("../utils/logger/log");
const router = require("express").Router();
require("dotenv").config();

router.get("/:nama", (req, res) => {
  try {
    const nama = req.params.nama;

    if (!nama) {
      return res.status(200).json({
        status: "Berhasil",
        message: "Selamat Datang Anonymous",
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
