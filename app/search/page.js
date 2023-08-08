"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css"

export default function Search() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    }
    getCountries();
    console.log(countries);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };
  return (
    <>
      <h1>Search</h1>
      <input type="text" value={search} onChange={handleChange} />
      {searchResults.map((country, i) => (
        <li key={i}>
        <div className={styles.country}>
            <img className={styles.flagImage} src={country.flags.png} />
            <p className={styles.text}>{country.name.common}</p>
          </div>
        </li>
      ))}
    </>
  );
}
