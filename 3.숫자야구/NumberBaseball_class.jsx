const React = require("react");
const { Component } = require("react");
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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [], // react에선 push쓰면 안됨(불변성, react가 뭐가 바꼈는지 감지 못함 => 기존 배열 복사 후 새로운 배열 넣어줘야 함(어려운부분))
  };

  // 내가 만든 메서드는 화살표 함수로 작성.
  // 화살표함수를 안쓰면 cunstructor를 작성해야 하는 번거로움이 있다.
  onSubmitForm = (e) => {
    const { result, value, tries, answer } = this.state;
    e.preventDefault();
    console.log(answer);
    // 입력값이 정답과 같으면 (정답을 맞춘 경우)
    if (value === answer.join('')){
      // 옛날 statef로 현재 state를 만들 때는 이렇게!
      this.setState((prevState) => {
        result: '홈런!',
        tries: [...prevState.tries, {try:value, result:'홈런!'}],
      })
      this.setState({
        value: '',
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        tries: [],
        answer: getNumbers(),
      });
    // 오답일 경우
    } else {
      const answerArray = value.split('').map((v)=>parseInt(v));
      let strike = 0;
      let ball = 0;
      // 오답: 10번째일경우
      if (tries.length >= 9){
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        })
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          tries: [],
          answer: getNumbers(),
        })
      // 오답: 10번 이하일경우
      } else {
        for (let i=0; i<4; i+= 1){
          if (answerArray[i] === answer[i]){
            strike += 1;
          } else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          tries: [...prevState.tries, {try:value, result: `${strike} 스트라이크, ${ball} 볼`}],
          value: '',
        })
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h2>{result}</h2>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="number"
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
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
  }
}

module.exports = NumberBaseball;

// react에서 반복문은 map 사용. (* map은 함수형 프로그래밍의 핵심!)
// class를 구조분해를 사용하면 hooks처럼 사용할 수 있다.
// this를 사용하지 않는 경우, 밖에 뺄 수 있다. (* getNumbers())