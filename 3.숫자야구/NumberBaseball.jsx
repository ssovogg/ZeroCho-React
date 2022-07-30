const React = require("react");
const { Component } = require("react");
const Try = require("/Try");

function getNumbers() {
  //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
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
    e.preventDefaul();
    // 정답일 경우,
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런",
        tries: [
          ...this.state.tries,
          { try: this.state.value, result: "홈런!" },
        ],
      });
      // 게임 초기화
      alert("게임을 다시 시작합니다!");
      this.setState({
        value: "",
        answer: getNumbers(), //새로운 숫자 뽑기
        tries: [],
      });
    // 오답일 경우,
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
            ","
          )}였습니다!`,
        });
        // 게임 초기화
        alert("게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(), //새로운 숫자 뽑기
          tries: [],
        });
      } else {
        // 10번 이하로 틀렸을 때 (몇볼 몇스트라이크인지 판단)
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [
            ...this.state.tries,
            {
              try: this.state.value,
              result: `${strike}스타라이크, ${ball}볼입니다.`,
            },
          ],
          value: "",
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  render() {
    return (
      <>
        <h2>{this.state.result}</h2>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="number"
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          ></input>
          <button>입력</button>
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ol>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도:`} tryInfo={v} index={i} />;
          })}
        </ol>
      </>
    );
  }
}

module.exports = NumberBaseball;
