const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '수영',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length -1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
    }
  };

  onChangeInput = (e) => {
    this.setState({value:e.currentTarget.value});
  };
  input;
  onRefInput = (c)=>{
    this.input = c;
  };

  render(){
    return (
      <>
        <h2>{this.state.word}</h2>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}></input>
          <button>입력</button>
        </form>
        <h3>{this.state.result}</h3>
      </>
    );
  }
}

module.exports = WordRelay;