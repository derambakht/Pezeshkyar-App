import React from "react";
import { motion } from "framer-motion";
import { FaThermometerHalf, FaTint, FaWind, FaSun } from "react-icons/fa";

const EnvironmentCard = () => {
  const environmentData = [
    {
      id: 1,
      label: "دما",
      value: "24°C",
      icon: FaThermometerHalf,
      color: "text-orange-500",
      bgColor: "bg-orange-100"
    },
    {
      id: 2,
      label: "رطوبت",
      value: "65%",
      icon: FaTint,
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      id: 3,
      label: "جریان هوا",
      value: "مطلوب",
      icon: FaWind,
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      id: 4,
      label: "نور طبیعی",
      value: "85%",
      icon: FaSun,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow mb-6 overflow-hidden"
    >
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full ml-2 animate-pulse"></span>
        وضعیت محیط مطب
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {environmentData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="text-center"
          >
            <div className={`${item.bgColor} rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
              <item.icon className={`${item.color} text-lg sm:text-xl`} />
            </div>
            <p className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.value}</p>
            <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EnvironmentCard;
