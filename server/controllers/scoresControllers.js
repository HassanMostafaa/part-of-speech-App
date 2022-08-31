const axios = require("axios");

// get the rank function depending on a given score
const calcRank = async (req, res) => {
  try {
    // save user score
    const { score } = req.body;

    // checking that there's a [score] value and it's a Number()
    if (score && !isNaN(score)) {
      // save databases's scores array length
      const results = await axios.get("http://localhost:3001/scoresList");
      const data = await results.data;
      const len = data.length;

      // num of scores in scoresList which are below the given score.
      let numOfScoresLess = 0;
      for (let ele of data) {
        if (ele < score) {
          numOfScoresLess += 1;
        }
      }

      // calc rank with nearsest hundredth
      const rank = ((numOfScoresLess * 100) / len).toFixed(2);
      return res.status(200).json({ score, rank });
    } else {
      // not a number sents a status, error, and the type of score generated the error
      return res.status(400).json({
        status: "Failed",
        score: `${typeof score}`,
        error: "Please, make sure you sent the right score value [Number]",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
module.exports = { calcRank };
