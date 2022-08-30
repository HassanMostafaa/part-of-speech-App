const express = require("express");
const router = express.Router();
const { getRandomTen } = require("../controllers/wordsControllers");

router.get("/", getRandomTen);

module.exports = router;
