"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import SelectedCountry from "./SelectedCountry";
import Option from "./Option";

export default function Game() {
  const [countries, setCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState("❤ ❤ ❤");
  const [answered, setAnswered] = useState(false);
  const [guessStatus, setGuessStatus] = useState(null);

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
        i -= 1;
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
    if ((score + 1) % 5 === 0 && score != 0) setLives((prev) => prev + " ❤");
    setAnswered(true);
    if (option === selected.name.common) {
      setGuessStatus("correct");
      setScore((prev) => (prev += 1));
    } else {
      setGuessStatus("wrong");
      setLives((prev) => prev.slice(0, -2));
    }

    setTimeout(pickOptions, 1000);
  };

  const resetGame = () => {
    setLives("❤ ❤ ❤");
    setScore(0);
    pickOptions();
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
                selected={selected?.name?.common}
                answered={answered}
                guessStatus={guessStatus}
              />
            </li>
          ))}
        </div>
      ) : (
        <>
          <p>game over</p>
          <button className={styles.button} onClick={resetGame}>
            Play Again
          </button>
        </>
      )}
    </>
  );
}
