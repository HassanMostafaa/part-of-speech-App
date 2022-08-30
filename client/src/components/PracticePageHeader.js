import React from "react";
import { motion } from "framer-motion";

export const PracticePageHeader = () => {
  return (
    <div className="header">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        Hello, Student, this is a practice app to help you categorizing a set of
        words according to it's part of speech.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.5 }}
      >
        let's get started. you choose the correct part of speed for the shown
        word and get an instant feedback weather if it's corrent and move on to
        the next word. at the End you see your Rank amongst other students.
        <span style={{ margin: "10px 0", display: "block" }}>
          Check this{" "}
          <a
            style={{ color: "#0050F7" }}
            href="https://en.wikipedia.org/wiki/Part_of_speech"
            target={"_blank"}
            rel="noreferrer"
          >
            link
          </a>{" "}
          for more information about part of speech in English
        </span>
      </motion.p>
    </div>
  );
};
