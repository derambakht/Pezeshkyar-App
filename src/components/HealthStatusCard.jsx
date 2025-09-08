import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHeartbeat, FaUserFriends, FaTrophy } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const HealthStatusCard = () => {
  const { isDark } = useTheme();
  
  const healthMetrics = [
    {
      id: 1,
      title: "سلامت قلب",
      value: "85%",
      icon: FaHeart,
      color: "from-red-400 to-red-600",
      pulse: true
    },
    {
      id: 2,
      title: "فشار خون",
      value: "طبیعی",
      icon: FaHeartbeat,
      color: "from-green-400 to-green-600",
      pulse: false
    },
    {
      id: 3,
      title: "بیماران فعال",
      value: "142",
      icon: FaUserFriends,
      color: "from-blue-400 to-blue-600",
      pulse: false
    },
    {
      id: 4,
      title: "نرخ موفقیت",
      value: "96%",
      icon: FaTrophy,
      color: "from-yellow-400 to-yellow-600",
      pulse: false
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {healthMetrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="relative"
        >
          <div className={`p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100' 
              : `bg-gradient-to-r ${metric.color} text-white`
          }`}>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <motion.div
                animate={metric.pulse ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="p-1.5 sm:p-2 bg-white/20 rounded-full"
              >
                <metric.icon className="text-base sm:text-lg" />
              </motion.div>
              
              {metric.pulse && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                />
              )}
            </div>
            
            <div>
              <p className="text-xl sm:text-2xl font-bold mb-1">{metric.value}</p>
              <p className="text-xs sm:text-sm opacity-80 leading-tight">{metric.title}</p>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 translate-x-6 sm:-translate-y-8 sm:translate-x-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HealthStatusCard;
