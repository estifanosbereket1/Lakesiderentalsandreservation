"use client";
import React, { useState } from "react";

const addisAbabaTowns = [
  "Arada",
  "Bole",
  "Gullele",
  "Kirkos",
  "Kolfe Keranio",
  "Lideta",
  "Nifas Silk-Lafto",
  "Yeka",
  "Addis Ketema",
  "Akaky Kaliti",
  "Jemo",
  "Koye Foche",
  "Bethel",
  "Gerji",
  "Kera",
  "Merkato",
  "Megenagna",
  "Abware",
  "Mebrat Hayl",
  "Ayer tena",
  "Abinet",
  "Sarbet",
  "Mexico",
  "Bole Rwanda",
];

const LocationSelector = ({ onLocationChange }: { onLocationChange: any }) => {
  const [town, setTown] = useState("");

  const handleTownChange = (e: any) => {
    const selectedTown = e.target.value;
    setTown(selectedTown);
    onLocationChange(selectedTown);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Town</label>
      <select
        value={town}
        onChange={handleTownChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled>
          Select Town
        </option>
        {addisAbabaTowns.map((townName) => (
          <option key={townName} value={townName}>
            {townName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
