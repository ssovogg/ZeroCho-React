const React = require('react');
const { useState, useRef } = React;

function GuGuDan(){
  const [num1, setNum1] = useState(Math.ceil(Math.random() * 9))
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 9))
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  function onSubmitForm(e){
    e.preventDefault();
    if(Number(input) === num1 * num2){
      setResult(input + ' : 정답!');
      setNum1(Math.ceil(Math.random() * 9));
      setNum2(Math.ceil(Math.random() * 9));
      inputRef.current.focus();
    } else {
      setResult('땡!')
      inputRef.current.focus();
    }
    setInput('');
  }
  function onChangeInput (e){
    setInput(e.target.value);
  }
  return (
    <>
      <h2>{num1} X {num2} = ?</h2>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="number" value={input} onChange={onChangeInput}/>  
        <input type="button" value="submit"/>  
      </form>
      <h3>{result}</h3>
    </>
  )
}

module.exports = GuGuDan;