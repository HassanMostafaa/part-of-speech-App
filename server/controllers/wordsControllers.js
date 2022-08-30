const axios = require("axios");

// random 10 words generator with no requirments
function genRandomTen(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const getRandomTen = async (req, res) => {
  try {
    // fetching all the words
    const results = await axios.get(" http://localhost:3001/wordList");
    const data = await results.data;

    // assigning loop controller [repeat], and words variable
    let repeat = true;
    let tenWords;

    /* 
    a while loop to check that the list has the
    at least one of the requirments 
    */
    while (repeat) {
      // generating random 10
      tenWords = genRandomTen(data, 10);

      // check that there is least 1 of [verb,adverb,adject,noun]
      const noun = tenWords.find((x) => x.pos === "noun");
      const adjective = tenWords.find((x) => x.pos === "adjective");
      const adverb = tenWords.find((x) => x.pos === "adverb");
      const verb = tenWords.find((x) => x.pos === "verb");

      // if all is set close the loop and return the results
      if (noun && adjective && adverb && verb) {
        repeat = false;
      }
    }

    // returning the results
    return res.status(200).json({ results: tenWords });
  } catch (error) {
    return res.status(404).json({ results: error.message });
  }
};

module.exports = { getRandomTen };
