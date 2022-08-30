import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PracticePageHeader } from "../components/PracticePageHeader";
import { Question } from "../components/Question";
import { resetScore } from "../redux/score/scoreSlice";
import { fetchWords } from "./../redux/words/wordsSlice";
import { ProgressBar } from "./../components/ProgressBar";
import { ErrorHandler } from "../components/ErrorHandler";
import { resetRank } from "../redux/rank/rankSlice";
import { Triangle } from "react-loader-spinner";

export const PracticePage = () => {
  const { questionIndex, words, error, loading } = useSelector(
    (state) => state.wordsReducer
  );
  const [progress, setProgress] = useState((questionIndex + 1) * 10);
  const dispatch = useDispatch();

  // practice page main function is to receive the words
  // and clear the app state
  useEffect(() => {
    dispatch(fetchWords());
    dispatch(resetScore());
    dispatch(resetRank());

    /*
    this one to keep the score set in the ranking page
    in case of refreshing
    */
    localStorage.clear();
  }, [dispatch]);

  // updating the progress bar with every question
  useEffect(() => {
    setProgress((questionIndex + 1) * 10);
  }, [questionIndex]);

  return (
    <div className="practice-page">
      <PracticePageHeader />

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
        <>
          <ProgressBar progress={progress} />
          {words && <Question word={words[questionIndex]} />}
        </>
      )}
    </div>
  );
};
