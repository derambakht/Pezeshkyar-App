import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import PatientCard from "./PatientCard";
import patientsData from "../data/patients.json";

/**
 * PatientSearch component: search and select patient from mock data
 */
const PatientSearch = ({ onSelect }) => {
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
    <div className="w-full max-w-md mx-auto mt-8">
      <Input
        type="text"
        placeholder="جستجوی بیمار بر اساس نام یا کد..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2"
        aria-label="جستجوی بیمار"
      />
      {results.length > 0 && (
        <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto absolute w-full z-10">
          {results.map((p) => (
            <li
              key={p.id}
              className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-right"
              onClick={() => handleSelect(p)}
            >
              {p.name} <span className="text-xs text-gray-500">({p.id})</span>
            </li>
          ))}
        </ul>
      )}
      <PatientCard patient={selected} />
    </div>
  );
};

export default PatientSearch;
