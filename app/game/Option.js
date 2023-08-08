import styles from "./Option.module.css"

export default function Option({ option, checkAnswer, i }) {
  return (
    <div className={`${styles.option} ${option }`} onClick={() => checkAnswer(option)}>
      {option}
    </div>
  );
}
