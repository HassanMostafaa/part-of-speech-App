//GLOBALS
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/words", require("./routes/wordsRoutes"));
app.use("/api/rank", require("./routes/scoresRoutes"));

// server exe
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
