"use client";

import React, { useState, useEffect } from "react";
import { Country, State, City } from "react-country-state-city";

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
];

const CountryStateCity = () => {
  const [country, setCountry] = useState("ET");
  const [state, setState] = useState("AA");
  const [town, setTown] = useState("");

  useEffect(() => {
    // Set default country to Ethiopia and state to Addis Ababa
    setCountry("ET");
    setState("AA");
  }, []);

  return (
    <div>
      <Country
        value={country}
        onChange={(val: string) => setCountry(val)}
        disabled={true} // Disable to keep it fixed on Ethiopia
      />
      <State
        country={country}
        value={state}
        onChange={(val: string) => setState(val)}
        disabled={true} // Disable to keep it fixed on Addis Ababa
      />
      <select value={town} onChange={(e) => setTown(e.target.value)}>
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

export default CountryStateCity;
