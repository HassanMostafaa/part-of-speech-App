import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorHandler } from "../components/ErrorHandler";
import { resetWords } from "../redux/words/wordsSlice";
import { calculateRank } from "./../redux/rank/rankSlice";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";

export const RankPage = () => {
  const { rank, error, loading } = useSelector((state) => state.rankReducer);
  const score = useSelector((state) => state.scoreReducer.score);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // rank page main function is to show the receved rank
  useEffect(() => {
    dispatch(calculateRank({ score }));
    dispatch(resetWords());
  }, [dispatch, score]);

  return (
    <div className="rank-page">
      <motion.div
        className="header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <h1>All Set, Great Job</h1>
        <p>
          Here you can check your Ranking across your peers based on your
          answers. and Try again
        </p>
      </motion.div>

      {loading ? (
        <div className="loader">
          <Triangle
            height="80"
            width="80"
            color="#e51d74"
            ariaLabel="triangle-loading"
            visible={true}
          />
        </div>
      ) : error ? (
        <ErrorHandler msg={error} />
      ) : (
        <motion.div
          className="rank"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className="info">
            Your Rank <span className="info-num">{rank}</span>
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="react-icon"> {AiOutlineReload()}</span> Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
};
