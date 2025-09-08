import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const StatChart = () => {
  const { isDark } = useTheme();
  const [activeChart, setActiveChart] = useState(0);
  
  const chartData = [
    {
      id: 0,
      title: "بیماران ویزیت شده",
      data: [12, 19, 15, 23, 18, 25, 22],
      labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"],
      color: "bg-blue-500",
      trend: "up",
      percentage: "12%"
    },
    {
      id: 1,
      title: "درآمد هفتگی",
      data: [800, 950, 750, 1200, 890, 1100, 980],
      labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"],
      color: "bg-green-500",
      trend: "up", 
      percentage: "8%"
    },
    {
      id: 2,
      title: "رضایت بیماران",
      data: [95, 92, 98, 94, 96, 93, 97],
      labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"],
      color: "bg-purple-500",
      trend: "equal",
      percentage: "0%"
    }
  ];

  const currentData = chartData[activeChart];
  const maxValue = Math.max(...currentData.data);

  const TrendIcon = currentData.trend === "up" ? FaArrowUp : 
                   currentData.trend === "down" ? FaArrowDown : FaEquals;
  
  const trendColor = currentData.trend === "up" ? "text-green-500" :
                     currentData.trend === "down" ? "text-red-500" : "text-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {currentData.title}
        </h3>
        <div className={`flex items-center space-x-1 space-x-reverse ${trendColor}`}>
          <TrendIcon className="text-sm" />
          <span className="text-sm font-semibold">{currentData.percentage}</span>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex space-x-2 space-x-reverse mb-6">
        {chartData.map((chart) => (
          <motion.button
            key={chart.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChart(chart.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeChart === chart.id
                ? "bg-blue-500 text-white"
                : isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {chart.title.split(" ")[0]}
          </motion.button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-32 mb-4">
        <div className="flex items-end justify-between h-full space-x-1 space-x-reverse">
          {currentData.data.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex-1 ${currentData.color} rounded-t-lg relative group cursor-pointer`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {currentData.id === 1 ? `${value}هزار تومان` : value}
                {currentData.id === 2 && "%"}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className={`flex justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {currentData.labels.map((label, index) => (
          <span key={index} className="text-center">
            {label}
          </span>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
      >
        <div className="flex justify-between items-center">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>میانگین هفتگی:</span>
          <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {Math.round(currentData.data.reduce((a, b) => a + b) / currentData.data.length)}
            {currentData.id === 1 ? " هزار تومان" : currentData.id === 2 ? "%" : " بیمار"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatChart;
