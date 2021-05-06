let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    //take expression 'value'
    //if it's equal to 'C' then do this:
    case "Clear":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return; //skip the rest of the function and get out
      }
      flushOperation(parseInt(buffer)); // i have some sort of previous operator
      //now you have to commit the operation you have in memory
      ///here we turn buffer into a number and pass into flushOperation
      previousOperator = null;
      buffer = "" + runningTotal; //turn buffer into a string to keep it's type a string all the time
      runningTotal = 0;
      break;
    case "Backspace":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer); //turn buffer into a number from a string
  ///this is a representation of what is on the screen now
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "/") {
    runningTotal = runningTotal / intBuffer;
  } else if (previousOperator === "-") {
    runningTotal = runningTotal - intBuffer;
  } else if (previousOperator === "*") {
    runningTotal = runningTotal * intBuffer;
  } else if (previousOperator === "+") {
    runningTotal = runningTotal + intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
