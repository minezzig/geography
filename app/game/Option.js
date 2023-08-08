import styles from "./Option.module.css";
//

export default function Option({ option, checkAnswer, selected, answered, guessStatus }) {
  return (
    <div className={`${styles.option} ${answered && (option === selected && styles[guessStatus] )}`} onClick={() => checkAnswer(option)}>
      {option}
      {console.log(option, selected, styles[guessStatus])}
    </div>
  );
}
