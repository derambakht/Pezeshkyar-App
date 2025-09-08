import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const StatusIndicator = ({ status, className = "" }) => {
  const { isDark } = useTheme();
  
  const getStatusConfig = () => {
    switch (status) {
      case 'listening':
        return {
          color: isDark ? 'bg-red-500' : 'bg-red-500',
          text: 'در حال گوش دادن',
          pulse: true
        };
      case 'processing':
        return {
          color: isDark ? 'bg-yellow-500' : 'bg-yellow-500',
          text: 'در حال پردازش',
          pulse: false
        };
      case 'ready':
        return {
          color: isDark ? 'bg-green-500' : 'bg-green-500',
          text: 'آماده',
          pulse: false
        };
      default:
        return {
          color: isDark ? 'bg-gray-500' : 'bg-gray-400',
          text: 'خاموش',
          pulse: false
        };
    }
  };
  
  const config = getStatusConfig();
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`w-3 h-3 rounded-full ${config.color}`}
        animate={config.pulse ? { 
          scale: [1, 1.3, 1],
          opacity: [1, 0.6, 1]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: config.pulse ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      <span className={`text-sm font-medium ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {config.text}
      </span>
    </div>
  );
};

export default StatusIndicator;
