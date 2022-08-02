const React = require('react');
const { Component } = require('react');

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v)=> {
    return v[1] === imgCoord;
  })[0];
}

class RockSicorsPaper extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: rspCoords.바위,
  };

  interval;

  // 컴포넌트 렌더가 처음, 성공적으로 실행됐다면 실행한다.
  componentDidMount(){
    this.interval = setInterval(this.changeHand, 100);
  }

  // 컴포넌트가 제거되기 직전 실행
  // componentDidMount에서 했던 작업들을 제거하는 용도
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  changeHand= ()=>{
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위){
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위){
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보){
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    // 점수 계산
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0){
      this.setState({
        result: '비겼습니다.',
      });
    } else if ([-1,2].includes(diff)){
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        }
      })
    }
    // 다시 시작
    setTimeout(()=>{
      this.interval = setInterval(this.changeHand, 1000);
    }, 1000);
    };
  

  render(){
    // render 안에는 setState가 들어가면 안된다. 무한렌더링이 발생하기 때문.
    const { result, score, imgCoord } = this.state;
    return(
      <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
    )
  };
}

module.exports = RockSicorsPaper;