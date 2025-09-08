import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import PatientCard from "./PatientCard";
import { useTheme } from "../contexts/ThemeContext";
import patientsData from "../data/patients.json";

/**
 * PatientSearch component: search and select patient from mock data
 */
const PatientSearch = ({ onSelect }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const q = query.trim();
    setResults(
      patientsData.filter(
        (p) =>
          p.name.includes(q) ||
          p.id.includes(q)
      )
    );
  }, [query]);

  const handleSelect = (patient) => {
    setSelected(patient);
    setQuery("");
    setResults([]);
    if (onSelect) onSelect(patient);
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-0">
      <Input
        type="text"
        placeholder="جستجوی بیمار بر اساس نام یا کد..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2 text-sm"
        aria-label="جستجوی بیمار"
      />
      {results.length > 0 && (
        <ul className={`border rounded shadow max-h-40 overflow-y-auto absolute w-full max-w-md z-10 left-1/2 transform -translate-x-1/2 ${
          isDark 
            ? 'bg-gray-800 border-gray-600 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {results.map((p) => (
            <li
              key={p.id}
              className={`px-4 py-2 cursor-pointer text-right transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-100' 
                  : 'hover:bg-primary/10 text-gray-900'
              }`}
              onClick={() => handleSelect(p)}
            >
              {p.name} <span className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>({p.id})</span>
            </li>
          ))}
        </ul>
      )}
      <PatientCard patient={selected} />
    </div>
  );
};

export default PatientSearch;
