import React from "react";
import { Card } from "./ui/card";
import { useTheme } from "../contexts/ThemeContext";
import DrugInfoDialog from "./DrugInfoDialog";

/**
 * PatientCard component
 * @param {Object} props
 * @param {Object} props.patient - Patient object
 */
const PatientCard = ({ patient }) => {
  const { isDark } = useTheme();
  if (!patient) return null;
  return (
    <Card className={`w-full max-w-md mt-4 p-4 ${
      isDark 
        ? 'bg-gray-800/90 text-gray-100' 
        : 'bg-white/90 text-gray-900'
    }`}>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-lg">{patient.name}</span>
        <span className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>سن: {patient.age} سال</span>
        <span className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>جنسیت: {patient.gender}</span>
        <span className="text-sm mt-2 font-semibold">سوابق پزشکی:</span>
        <ul className={`list-disc pr-5 text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {patient.medicalHistory.map((mh, idx) => (
            <li key={idx}>{mh}</li>
          ))}
        </ul>
  <span className="text-sm mt-2 font-semibold">داروهای فعلی:</span>
  <DrugInfoDialog drugs={patient.currentMedications} patientName={patient.name} />
      </div>
    </Card>
  );
};

export default PatientCard;
