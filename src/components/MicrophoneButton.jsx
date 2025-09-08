import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

/**
 * MicrophoneButton component with Framer Motion animation
 * @param {Object} props
 * @param {boolean} props.isRecording - Whether recording is active
 * @param {function} props.onClick - Click handler
 */
const MicrophoneButton = ({ isRecording, onClick }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.button
      aria-label={isRecording ? "توقف ضبط صدا" : "شروع ضبط صدا"}
      className={`rounded-full p-6 shadow-lg flex items-center justify-center focus:outline-none transition-colors duration-200 text-white ${
        isRecording 
          ? "bg-red-500" 
          : isDark 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-primary hover:bg-blue-600"
      }`}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: isRecording ? [1, 1.15, 1] : 1,
        boxShadow: isRecording
          ? [
              "0 0 0 0 rgba(239,68,68,0.7)",
              "0 0 0 12px rgba(239,68,68,0.1)",
              "0 0 0 0 rgba(239,68,68,0.7)"
            ]
          : "0 0 0 0 rgba(0,0,0,0.1)",
      }}
      transition={{
        duration: 1.2,
        repeat: isRecording ? Infinity : 0,
        ease: "easeInOut",
      }}
      onClick={onClick}
      type="button"
    >
      {isRecording ? (
        <FaStop className="w-8 h-8" />
      ) : (
        <FaMicrophone className="w-8 h-8" />
      )}
    </motion.button>
  );
};

export default MicrophoneButton;
