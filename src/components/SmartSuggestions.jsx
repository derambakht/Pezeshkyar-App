import React from "react";
import { motion } from "framer-motion";
import { FaPills, FaHeartbeat, FaUserMd, FaCalendarAlt, FaSearch, FaStethoscope } from "react-icons/fa";
import { MdHealthAndSafety, MdLocalPharmacy, MdBloodtype } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";

const SmartSuggestions = ({ onSuggestionClick, className = "" }) => {
  const { isDark } = useTheme();
  
  const suggestions = [
    {
      id: 1,
      text: "داروهای فشار خون چیست؟",
      icon: FaHeartbeat,
      color: "bg-red-500",
      keywords: ["فشار خون", "هیپرتانشن", "ACE inhibitor"]
    },
    {
      id: 2,
      text: "عوارض جانبی آسپرین",
      icon: FaPills,
      color: "bg-blue-500",
      keywords: ["آسپرین", "عوارض", "درد"]
    },
    {
      id: 3,
      text: "زمان مصرف دارو",
      icon: FaCalendarAlt,
      color: "bg-green-500",
      keywords: ["زمان مصرف", "دوز", "برنامه"]
    },
    {
      id: 4,
      text: "تداخل دارویی",
      icon: MdLocalPharmacy,
      color: "bg-yellow-500",
      keywords: ["تداخل", "دارو", "واکنش"]
    },
    {
      id: 5,
      text: "آزمایش خون",
      icon: MdBloodtype,
      color: "bg-purple-500",
      keywords: ["آزمایش", "خون", "CBC"]
    },
    {
      id: 6,
      text: "مشاوره پزشکی",
      icon: FaUserMd,
      color: "bg-indigo-500",
      keywords: ["مشاوره", "پزشک", "تشخیص"]
    }
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSuggestionClick(suggestion.text)}
          className={`relative p-4 rounded-xl text-right overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
              : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
          }`}
        >
          {/* Background Gradient */}
          <div className={`absolute top-0 right-0 w-12 h-12 ${suggestion.color} opacity-10 rounded-bl-full`} />
          
          {/* Icon */}
          <div className={`absolute top-2 right-2 p-2 ${suggestion.color} rounded-lg`}>
            <suggestion.icon className={`text-sm ${
              isDark ? 'text-white' : 'text-white'
            }`} />
          </div>
          
          {/* Content */}
          <div className="pt-8">
            <p className="text-sm font-medium leading-relaxed">
              {suggestion.text}
            </p>
            
            {/* Keywords */}
            <div className="mt-2 flex flex-wrap gap-1">
              {suggestion.keywords.slice(0, 2).map((keyword, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isDark 
                      ? 'bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Hover Effect */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${suggestion.color}`}
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default SmartSuggestions;
