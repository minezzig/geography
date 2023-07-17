export default function Option({ option, checkAnswer }) {
  const style = {
    border: "1px solid black",
    background: "white",
    width: 200,
    margin: 10,
    textAlign: "center",
    cursor: "pointer"
  };

  return (
    <div style={style} onClick={() => checkAnswer(option)}>
      {option}
    </div>
  );
}
