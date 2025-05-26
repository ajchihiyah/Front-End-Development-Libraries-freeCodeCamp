import {evaluate, round} from "https://cdn.skypack.dev/mathjs";

const endsWithOperator = /[x+/]$/;
const endsWithNegative = /[-]$/;
const endsWithNegativeSign = /\d[x/+‑]{1}‑$/;

function App(){
  return(
    <div>
      <Calculator/>
    </div>
  )
};

function Calculator(props){
  const [display, setDisplay] = React.useState('0');
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState('');
  const [operatorPressed, setOperatorPressed] = React.useState(false);
  const [decimalPressed, setDecimalPressed] = React.useState(false);
  const [isReseted, setIsReseted] = React.useState(true);
  const [secondEqualsPressed, setSecondEqualsPressed] = React.useState(false);
  
  
  const handleClear = () => {
    console.log("ok");
    setResult('');
    setInput('');
    setDisplay('0');
    setIsReseted(true);
    setDecimalPressed(false);
  }
  
  const handleOperation = (e) => {
    setDecimalPressed(false);  
    let currentOperator = e.currentTarget.value;
    let currentExpression = display + ' ' + currentOperator;
    
    if(operatorPressed == false)
      {
        setDisplay(currentExpression);
        setInput(currentOperator);
        setOperatorPressed(true);
      }
    
    else if(endsWithNegative.test(display))
      {
        let displayWithoutLastTwoOperators = display.substring(0,display.length-3);
        setDisplay(displayWithoutLastTwoOperators + ' ' + e.currentTarget.value);
        setInput(e.currentTarget.value); 
      }
    
    else if(endsWithOperator.test(display))
      {
        if(currentOperator == "-")
        {
          setDisplay(display + ' ' + currentOperator);
          setInput(currentOperator);
        }
        else
        {
           let displayWithoutLastOperator = display.substring(0,display.length-1);
           setDisplay(displayWithoutLastOperator + ' ' + e.currentTarget.value);
           setInput(e.currentTarget.value);
        }
        
      }
    
  }
  
  
  const handleNumber = (e) => {
   setOperatorPressed(false);
     
   
   if(isReseted == false)
   {
          //display one single number at a time
          let lastChar = display.charAt(display.length - 1);
          if(lastChar == 'x' || lastChar == '/' || lastChar == '+' || lastChar == '-')
            { 
              setInput(e.currentTarget.value);
              setDisplay(display + ' ' + e.currentTarget.value);
            }
          //If not finished entering the number yet, you can keep adding digits to build it completely
          else
            {
              setInput(input + e.currentTarget.value);
              setDisplay(display + e.currentTarget.value);
            }
   }
   
   else if(isReseted && e.currentTarget.value !== '0')
   {
     setInput(input + e.currentTarget.value);
     setDisplay(e.currentTarget.value);
     setIsReseted(false);
   }
   
  }
   
 
  const handleEquals = () => {
    let expression = display.replace('x', '*');
    //MathJs Library evaluate() to avoid eval() security issues
    //https://dev.to/spukas/everything-wrong-with-javascript-eval-35on
    let totalResult = round(evaluate(expression),4);
    console.log("Result: "+totalResult.toString());
    setResult(totalResult);
    setInput('');
    setDisplay(totalResult);  
    setDecimalPressed(false);
  }
    
 
  const handleDecimal = () => {
     
     if(decimalPressed == false)
      {
        setDisplay(display.concat("."));
        setInput(display.concat("."));
        setDecimalPressed(true); 
        
      }
   
   }
    
   return (
      <div id="calc-box">
        <div  className="screen">
          <div id='display' className="display-screen">{display}</div>
          <div className="result">{input}</div>
        </div>
        <div className="btn-grid">
          <Button name='clear' simbol='AC' color='red' onClick={handleClear}></Button>
          <Button name='divide' simbol='/' color='green' onClick={handleOperation}></Button>
          <Button name='multiply' simbol='x' color='green' onClick={handleOperation}></Button>
          <Button name='seven' simbol='7' color='black' onClick={handleNumber}></Button>
          <Button name='eight' simbol='8' color='black' onClick={handleNumber}></Button>
          <Button name='nine' simbol='9' color='black' onClick={handleNumber}></Button>
          <Button name='subtract' simbol='-' color='green' onClick={handleOperation}></Button>
          <Button name='four' simbol='4' color='black' onClick={handleNumber}></Button>
          <Button name='five' simbol='5' color='black' onClick={handleNumber}></Button>
          <Button name='six' simbol='6' color='black' onClick={handleNumber}></Button>
          <Button name='add' simbol='+' color='green' onClick={handleOperation}></Button>
          <Button name='one' simbol='1' color='black' onClick={handleNumber}></Button>
          <Button name='two' simbol='2' color='black' onClick={handleNumber}></Button>
          <Button name='three' simbol='3' color='black' onClick={handleNumber}></Button>
          <Button name='equals' simbol='=' color='blue' onClick={handleEquals}></Button>
          <Button name='zero' simbol='0' color='black' onClick={handleNumber}></Button>
          <Button name='decimal' simbol='.' color='grey' onClick={handleDecimal}></Button>
        </div>
      </div>
    )
 };


function Button(props){
    return (
      <button id={props.name} className={"btn btn-color-"+props.color} value={props.simbol} onClick={props.onClick}>{props.simbol}</button>
    )
  };

ReactDOM.render(<App/>, document.getElementById('root'));