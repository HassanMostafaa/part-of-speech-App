import React from "react";
import { motion } from "framer-motion";

export const ProgressBar = ({ progress }) => {
  return (
    <motion.div
      className="progress-div"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, type: "spring" }}
    >
      <p>{progress / 10} / 10</p>
      <motion.div
        layout
        className="progress-bar"
        transition={{ type: "spring" }}
        style={{ width: `${progress}%` }}
      ></motion.div>
    </motion.div>
  );
};
