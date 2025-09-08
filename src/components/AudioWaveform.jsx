import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const AudioWaveform = ({ isActive, audioLevel = 0 }) => {
  const { isDark } = useTheme();
  
  const bars = Array.from({ length: 12 }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {bars.map((bar) => {
        const baseHeight = 8 + (bar % 3) * 4;
        const animatedHeight = isActive 
          ? baseHeight + (Math.sin(bar * 0.5 + Date.now() * 0.01) * audioLevel * 0.3)
          : baseHeight;
        
        return (
          <motion.div
            key={bar}
            animate={{
              height: isActive ? [baseHeight, animatedHeight, baseHeight] : baseHeight,
              opacity: isActive ? [0.3, 1, 0.3] : 0.3
            }}
            transition={{
              duration: 0.6 + (bar % 4) * 0.1,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut"
            }}
            className={`w-1 rounded-full ${
              isDark 
                ? 'bg-blue-400' 
                : 'bg-blue-500'
            }`}
            style={{ height: `${baseHeight}px` }}
          />
        );
      })}
    </div>
  );
};

export default AudioWaveform;
