import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/score/scoreSlice";
import { nextQuestion } from "../redux/words/wordsSlice";
import { Link } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";
import { AiOutlineProfile } from "react-icons/ai";
import { motion } from "framer-motion";

export const Question = ({ word }) => {
  const [showOptions, setShowOptions] = useState(true);
  const questionIndex = useSelector(
    (state) => state.wordsReducer.questionIndex
  );
  const score = useSelector((state) => state.scoreReducer.score);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [seeRank, setSeeRank] = useState(false);
  const dispatch = useDispatch();

  const submitAns = (e) => {
    let ans = e.target.innerText;

    // score adjust
    if (ans.toLowerCase() === word.pos) {
      // if the ans is correct update the score
      dispatch(addScore());
    }
    // show options adjust
    setShowOptions(false);
    // show ans adjust
    setSelectedAns(ans);
    // show next btn to get to next question ... [questionIndex +1]
    if (questionIndex !== 9) {
      setShowNextBtn(true);
    } else {
      setShowNextBtn(false);
      setSeeRank(true);

      /*
      this one to keep the score set in the ranking page
      in case of refreshing
      */
      localStorage.setItem("score", score);
    }
  };

  const nextBtn = () => {
    dispatch(nextQuestion());
    // show options adjust
    setShowOptions(true);
    // show ans adjust
    setSelectedAns(null);
    // show next btn to get to next question ... [questionIndex +1]
    setShowNextBtn(false);
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    transition: { type: "spring", duration: 2.5 },
  };

  const wordOptions = ["Noun", "Verb", "Adjective", "Adverb"];

  return (
    <motion.div
      className="question"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, type: "spring", duration: 2.5 }}
    >
      <motion.div
        className="question-text"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <p>{word.word}</p>
      </motion.div>
      {showOptions && (
        <motion.div
          className="question-options"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          {wordOptions.map((option, ix) => (
            <motion.button
              key={ix}
              onClick={submitAns}
              initial={{
                opacity: 0,
                y: ix % 2 ? -30 : 30,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ix * 0.1, type: "tween", duration: 0.2 }}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      )}

      {selectedAns && (
        <motion.div
          className="selectedAns"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <p
            className={
              selectedAns.toLowerCase() === word.pos
                ? "ans correct"
                : "ans wrong"
            }
          >
            {selectedAns}
          </p>
        </motion.div>
      )}

      {seeRank && (
        <motion.div
          className="see-rank-btn"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          {" "}
          <Link to="/rank">
            See Your Rank{" "}
            <span className="react-icon">{AiOutlineProfile()}</span>
          </Link>
        </motion.div>
      )}

      {showNextBtn && (
        <div className="next-question-btn">
          <button onClick={nextBtn}>
            Next <span className="react-icon">{HiChevronDoubleRight()}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
