const React = require("react");
const { useState } = require("react");
const Try = require("/Try");

//숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [tries, setTries] = useState([]);
  // getNumbers()를 써도 상관없음. 리렌더링시 항상 다시 실행되지만 쓸데없이 계속 호출되는게 문제.
  const [answer, setAnswer] = useState(getNumbers); // lazy init (늦은 초기화 기법)

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(answer);
    // 입력값이 정답과 같으면 (정답을 맞춘 경우)
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: `홈런!` }];
      });
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      alert("게임을 다시 시작합니다.");
      // 오답일 경우
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      // 오답: 10번째일경우
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`);
        alert("게임을 다시 시작합니다.");
        setValue("");
        setTries([]);
        setAnswer(getNumbers());
        // 오답: 10번 이하일경우
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [
            ...prevTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼` },
          ];
        });
        setValue("");
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h2>{result}</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="number"
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        ></input>
        <button>입력</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ol>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도:`} tryInfo={v} index={i} />;
        })}
      </ol>
    </>
  );
};

module.exports = NumberBaseball;

/**
 * render가 다시 되는 경우 : state나 props가 변경됐을때
 */