import React from "react";
import { motion } from "framer-motion";

export const LogoImg = () => {
  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.1 }}
      src="https://contents.nagwa.com/content/images/logo.svg"
      width={"150px"}
      alt="nagwa logo"
    />
  );
};
