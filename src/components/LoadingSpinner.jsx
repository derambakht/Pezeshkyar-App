import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const LoadingSpinner = ({ size = "medium", color = "blue" }) => {
  const { isDark } = useTheme();
  
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  const getColorClass = (color) => {
    const lightColors = {
      blue: "border-blue-500",
      purple: "border-purple-500",
      green: "border-green-500",
      white: "border-white"
    };
    
    const darkColors = {
      blue: "border-blue-400",
      purple: "border-purple-400", 
      green: "border-green-400",
      white: "border-gray-200"
    };
    
    return isDark ? darkColors[color] : lightColors[color];
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 ${getColorClass(color)} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default LoadingSpinner;
