import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog, FaVolumeDown, FaVolumeUp, FaMicrophone, FaKeyboard } from "react-icons/fa";
import { MdLanguage, MdSpeed } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";

const VoiceAssistantSettings = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [settings, setSettings] = useState({
    volume: 80,
    speed: 1,
    language: 'fa',
    sensitivity: 70,
    autoResponse: true
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-md mx-4 p-6 rounded-3xl shadow-2xl ${
            isDark 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-gray-800'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">تنظیمات دستیار صوتی</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              ✕
            </motion.button>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Volume */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaVolumeUp className="text-blue-500" />
                <span className="font-medium">صدا</span>
              </div>
              <div className="flex items-center gap-3">
                <FaVolumeDown className="text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) => updateSetting('volume', e.target.value)}
                  className="flex-1 accent-blue-500"
                />
                <FaVolumeUp className="text-gray-400" />
                <span className="text-sm font-mono w-8">{settings.volume}</span>
              </div>
            </div>

            {/* Speed */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MdSpeed className="text-green-500" />
                <span className="font-medium">سرعت گفتار</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">آهسته</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => updateSetting('speed', e.target.value)}
                  className="flex-1 accent-green-500"
                />
                <span className="text-xs text-gray-400">سریع</span>
                <span className="text-sm font-mono w-8">{settings.speed}x</span>
              </div>
            </div>

            {/* Sensitivity */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaMicrophone className="text-red-500" />
                <span className="font-medium">حساسیت میکروفون</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">کم</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.sensitivity}
                  onChange={(e) => updateSetting('sensitivity', e.target.value)}
                  className="flex-1 accent-red-500"
                />
                <span className="text-xs text-gray-400">زیاد</span>
                <span className="text-sm font-mono w-8">{settings.sensitivity}</span>
              </div>
            </div>

            {/* Language */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MdLanguage className="text-purple-500" />
                <span className="font-medium">زبان</span>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <option value="fa">فارسی</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            {/* Auto Response */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaKeyboard className="text-orange-500" />
                <span className="font-medium">پاسخ خودکار</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSetting('autoResponse', !settings.autoResponse)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoResponse ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{
                    x: settings.autoResponse ? 24 : 2
                  }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                />
              </motion.button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium"
            >
              ذخیره تنظیمات
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSettings({
                volume: 80,
                speed: 1,
                language: 'fa',
                sensitivity: 70,
                autoResponse: true
              })}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              بازنشانی
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAssistantSettings;
