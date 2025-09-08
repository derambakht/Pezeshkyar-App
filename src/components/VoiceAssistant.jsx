import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop, FaRobot, FaVolumeUp, FaCog } from "react-icons/fa";
import { MdWavingHand, MdRecordVoiceOver, MdSettingsVoice } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";
import AudioWaveform from "./AudioWaveform";
import StatusIndicator from "./StatusIndicator";
import VoiceAssistantSettings from "./VoiceAssistantSettings";
import TypewriterText from "./TypewriterText";
import SmartSuggestions from "./SmartSuggestions";

const VoiceAssistant = () => {
  const { isDark } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // شبیه‌سازی تشخیص صدا
  const simulateAudioLevel = () => {
    if (isRecording) {
      setAudioLevel(Math.random() * 100);
      setTimeout(simulateAudioLevel, 100);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
    setResponse("");
    setShowWelcome(false);
    simulateAudioLevel();
    
    // شبیه‌سازی تشخیص صدا
    setTimeout(() => {
      setTranscript("سلام، می‌خواهم در مورد داروی آسپرین اطلاعات بگیرم");
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setAudioLevel(0);
    
    // شبیه‌سازی پردازش و پاسخ
    setTimeout(() => {
      setIsProcessing(false);
      setResponse("آسپرین یک داروی ضد التهاب غیر استروئیدی است که معمولاً برای تسکین درد، کاهش تب و کاهش التهاب استفاده می‌شود. مقدار مصرف معمولی برای بزرگسالان 325 تا 650 میلی‌گرم هر 4 ساعت است. لطفاً قبل از مصرف با پزشک خود مشورت کنید.");
    }, 3000);
  };

  const clearConversation = () => {
    setTranscript("");
    setResponse("");
    setShowWelcome(true);
  };

  const handleSuggestionClick = (suggestionText) => {
    setTranscript(suggestionText);
    setIsProcessing(true);
    setShowWelcome(false);
    
    // شبیه‌سازی پردازش بر اساس پیشنهاد
    const responses = {
      "داروهای فشار خون چیست؟": "داروهای فشار خون شامل ACE inhibitors، ARBs، بتابلاکرها، دیورتیک‌ها و کانال بلاک‌های کلسیم می‌باشند. این داروها با مکانیسم‌های مختلف فشار خون را کنترل می‌کنند.",
      "عوارض جانبی آسپرین": "عوارض جانبی آسپرین شامل درد معده، ناراحتی گوارشی، خونریزی، طنین گوش و در موارد نادر آسم می‌باشد. همیشه با پزشک مشورت کنید.",
      "زمان مصرف دارو": "زمان مصرف دارو بستگی به نوع دارو دارد. برخی باید ناشتا، برخی با غذا و برخی در ساعات خاص مصرف شوند. حتماً دستورات پزشک را دنبال کنید.",
      "تداخل دارویی": "تداخل دارویی می‌تواند اثربخشی داروها را کاهش داده یا عوارض جانبی ایجاد کند. همیشه لیست داروهای مصرفی خود را با پزشک در میان بگذارید.",
      "آزمایش خون": "آزمایش خون شامل CBC، بیوشیمی، لیپید پروفایل و سایر آزمایش‌های تخصصی می‌باشد. این آزمایش‌ها برای تشخیص و پیگیری بیماری‌ها ضروری هستند.",
      "مشاوره پزشکی": "مشاوره پزشکی برای تشخیص صحیح، درمان مناسب و پیگیری سلامت ضروری است. در صورت داشتن علائم نگران کننده حتماً به پزشک مراجعه کنید."
    };
    
    setTimeout(() => {
      setIsProcessing(false);
      setResponse(responses[suggestionText] || "متأسفانه در حال حاضر پاسخ مناسبی برای این سوال ندارم. لطفاً با پزشک متخصص مشورت کنید.");
    }, 2500);
  };

  return (
    <div className={`relative p-6 rounded-3xl shadow-xl transition-all duration-300 w-full max-w-4xl mx-auto ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            isDark ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <FaRobot className="text-white text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                دستیار صوتی پزشکیار
              </h3>
              <StatusIndicator 
                status={isRecording ? 'listening' : isProcessing ? 'processing' : 'ready'} 
              />
            </div>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {isRecording ? 'در حال گوش دادن به شما...' : 
               isProcessing ? 'در حال تحلیل و پردازش...' : 
               'آماده برای پاسخگویی'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className={`p-2 rounded-full transition-colors hover:scale-105 ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaCog className="text-sm" />
          </button>
          
          {(transcript || response) && (
            <button
              onClick={clearConversation}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:scale-105 ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              مکالمه جدید
            </button>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      {showWelcome && (
        <div className={`text-center mb-8 p-4 rounded-2xl ${
          isDark 
            ? 'bg-gray-700/50 text-gray-300' 
            : 'bg-blue-50/80 text-blue-700'
        }`}>
          <div className="mb-3">
            <MdWavingHand className={`text-3xl mx-auto ${
              isDark ? 'text-yellow-400' : 'text-yellow-500'
            }`} />
          </div>
          <h4 className="text-lg font-semibold mb-2">به پزشکیار خوش آمدید!</h4>
          <p className="text-sm mb-6">
            برای شروع مکالمه، روی دکمه میکروفون کلیک کنید یا یکی از پیشنهادات زیر را انتخاب کنید
          </p>
          
          {/* Smart Suggestions */}
          <SmartSuggestions onSuggestionClick={handleSuggestionClick} />
        </div>
      )}

      {/* Microphone Button */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Simple Audio Level Visualization */}
          {isRecording && (
            <div className="absolute -inset-12 flex items-center justify-center">
              <AudioWaveform isActive={isRecording} audioLevel={audioLevel} />
            </div>
          )}

          {/* Main Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`relative w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : isDark 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
            }`}
            style={{
              boxShadow: isRecording 
                ? `0 0 30px ${isDark ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.4)'}` 
                : `0 0 30px ${isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.2)'}`
            }}
          >
            {isRecording ? (
              <FaStop className="text-white text-2xl drop-shadow-lg" />
            ) : (
              <FaMicrophone className={`text-2xl drop-shadow-lg ${
                isDark ? 'text-blue-100' : 'text-blue-100'
              }`} />
            )}
          </button>
        </div>
      </div>

      {/* Processing Animation */}
      {isProcessing && (
        <div className={`text-center mb-6 p-4 rounded-2xl ${
          isDark 
            ? 'bg-gray-700/50 text-gray-300' 
            : 'bg-blue-50 text-blue-700'
        }`}>
          <div className="mb-2">
            <MdSettingsVoice className="text-3xl mx-auto" />
          </div>
          <p className="text-sm font-medium">در حال تجزیه و تحلیل...</p>
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div className={`mb-4 p-4 rounded-2xl border-l-4 ${
          isDark 
            ? 'bg-gray-700 border-blue-400 text-gray-200' 
            : 'bg-blue-50 border-blue-500 text-blue-900'
        }`}>
          <div className="flex items-start gap-3">
            <MdRecordVoiceOver className={`text-xl mt-1 flex-shrink-0 ${
              isDark ? 'text-blue-400' : 'text-blue-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1">شما گفتید:</p>
              <p className="text-sm leading-relaxed break-words">{transcript}</p>
            </div>
          </div>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className={`p-4 rounded-2xl border-l-4 min-h-[100px] ${
          isDark 
            ? 'bg-gray-700 border-green-400 text-gray-200' 
            : 'bg-green-50 border-green-500 text-green-900'
        }`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <FaRobot className={`text-xl mt-1 ${
                isDark ? 'text-green-400' : 'text-green-500'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">پزشکیار پاسخ می‌دهد:</p>
                <button className={`p-2 rounded-full flex-shrink-0 hover:scale-105 transition-transform ${
                  isDark 
                    ? 'hover:bg-gray-600 text-green-400' 
                    : 'hover:bg-green-100 text-green-600'
                }`}>
                  <FaVolumeUp className="text-sm" />
                </button>
              </div>
              <div className="overflow-hidden">
                <TypewriterText
                  text={response}
                  speed={20}
                  className="text-sm leading-relaxed break-words"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!showWelcome && !isRecording && !isProcessing && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            "داروهای فشار خون چیست؟",
            "عوارض آسپرین",
            "زمان مصرف دارو",
            "تداخل داروها"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-3 py-2 rounded-full text-xs transition-colors hover:scale-105 ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Settings Modal */}
      <VoiceAssistantSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default VoiceAssistant;
