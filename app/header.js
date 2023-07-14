"use client";

import styles from "./header.module.css";

export default function Header() {
  function handleClick() {
    const navLinks = document.querySelector(`.${styles.navLinks}`);
    const bars = document.querySelectorAll(`.${styles.bar}`);
    navLinks.classList.toggle(`${styles.open}`);
    bars.forEach((bar) => bar.classList.toggle(`${styles.x}`));
  }
  return (
    <>
      <nav className={styles.navBar}>
        <div className="logo">
          <h1>
            <a href="/">Geography</a>
          </h1>
        </div>
        <div className={styles.hamburger} onClick={handleClick}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="/game">Game</a>
          </li>
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
