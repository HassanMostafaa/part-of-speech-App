const express = require("express");
const router = express.Router();

const { calcRank } = require("../controllers/scoresControllers");

router.post("/", calcRank);

module.exports = router;
