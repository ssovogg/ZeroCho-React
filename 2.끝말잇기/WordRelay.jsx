const React = require('react');
const { useState, useRef } = require('react');

const WordRelay = () => {
  const [word, setWord] = useState('수영');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('')
  const inputRef = useRef(null);
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length-1] === value[0]){
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
      <>
        <h2>{word}</h2>
        <form onSubmit={onSubmitForm}>
          <label htmlFor='wordInput'>끝말잇기 : </label>
          <input id="wordInput" ref={inputRef} value={value} onChange={onChangeInput}></input>
          <button>입력</button>
        </form>
        <h3>{result}</h3>
      </>
    );
}

module.exports = WordRelay;