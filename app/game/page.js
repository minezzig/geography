"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import SelectedCountry from "./SelectedCountry";
import Option from "./Option";

export default function Game() {
  const [countries, setCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({});
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState("❤ ❤ ❤");

  // fetch api on load.  also immediately selects a flag.
  useEffect(() => {
    async function loadCountries() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setSelected(data[Math.floor(Math.random() * data.length)]);
    }
    loadCountries();
  }, []);

  // when selected flag or countries change, pick 5 countries.
  useEffect(() => {
    const optionList = [];
    for (let i = 0; i < 4; i++) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];

      if (optionList.includes(randomCountry)) {
        --i;
        break;
      }
      optionList.push(randomCountry);
    }
    optionList.splice(Math.floor(Math.random() * 5), 0, selected);
    setOptions(optionList);
  }, [countries, selected]);

  // pick 5 options to choose from AND flag
  const pickOptions = () => {
    setSelected(countries[Math.floor(Math.random() * countries.length)]);
    const optionList = [];
    for (let i = 0; i < 4; i++) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];

      if (optionList.includes(randomCountry)) {
        --i;
        break;
      }
      optionList.push(randomCountry);
    }
    optionList.splice(Math.floor(Math.random() * 5), 0, selected);
    setOptions(optionList);
    setAnswered(false);
  };

  // check to see if answer is correct
  const checkAnswer = (option) => {
    console.log(lives.length);
    if (option === selected.name.common) {
      console.log("win")
      setAnswered(true);
      setScore((prev) => (prev += 1));
      setTimeout(pickOptions, 1000)
    } else {
      console.log("try agian")
      setLives((prev) => prev.slice(0, -2));
    }
  };

  return (
    <>
      {lives.length ? (
        <div>
          <h1>Game</h1>
          <SelectedCountry selected={selected} />
          <p>Score: {score}</p>
          <p>Lives: {lives}</p>
          {options.map((option, i) => (
            <li className={styles.listItem} key={Math.random()}>
              <Option
                option={option?.name?.common}
                checkAnswer={checkAnswer}
                i={i}
              />
            </li>
          ))}

          {answered && (
            <button className={styles.button} onClick={pickOptions}>
              Next
            </button>
          )}
        </div>
      ) : (
        <p>game over</p>
      )}
    </>
  );
}
