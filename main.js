const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteButton = document.querySelector("[data-delete]");
const reset = document.querySelector("[data-reset]");
const equal = document.querySelector("[data-equal]");
const dot = document.querySelector("[data-dot]");

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

numbers.forEach(button => {
    button.addEventListener("click" , () => {
        if(currentOperandText.textContent.length >= 14){
            document.querySelector(".display").classList.add("lower")
            document.querySelector(".edit_me").classList.add("lower")
        }
        if(currentOperand == "" && button.textContent == 0){
            currentOperandText.textContent += button.textContent;
            currentOperand += button.textContent;
            dot.disabled = false;
            
        }else if(currentOperand == "0" && button.textContent == 0){
            return ;
        }else if(currentOperand == "0" && button.textContent !== 0 && currentOperand.charAt(currentOperand.length - 1) !== "."){
            return;
        }else if(currentOperand.charAt(currentOperand.length - 1) == "."){
            currentOperandText.textContent += button.innerText;
            currentOperand += button.innerText;
            dot.disabled = false;
            
        }else{
            currentOperandText.textContent += button.innerText;
            currentOperand += button.innerText;
            dot.disabled = false;
            console.log(currentOperandText.textContent.length)
            
        }
    })
})

operations.forEach(button => {
    button.addEventListener("click", () => {
        if(currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "+" || 
            currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "*" || 
            currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "-" || 
            currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "/")
        { 
            currentOperandText.textContent = currentOperandText.textContent.slice(0, currentOperandText.textContent.length - 1);
            currentOperandText.textContent += button.textContent;
            operation = button.textContent;
            operations.disabled = true;
            numbers.disabled = false;
            console.log(previousOperand)
        }else if(currentOperand == "" && button == undefined){
            operations.disabled = true;
            numbers.disabled = false;
            console.log(previousOperand)

        }else if(currentOperand == ""){
            operations.disabled = false;
            operationSelect(operation);
            currentOperandText.textContent += button.innerText;
            operation = button.innerText;
            numbers.disabled = false;
            console.log(previousOperand)

        }else{
            operationSelect(operation);
            currentOperandText.textContent += button.innerText;
            operation = button.innerText;
            numbers.disabled = false;
            console.log(previousOperand)

        }
        
    })
})

let operationSelect = function(operation){
    if(previousOperand !== ""){
        operate(operation);
    }else{
        previousOperand += currentOperand;
        console.log("hey" + previousOperand)
        currentOperand="";
        separateNumber();
    }
}

let operate = function(operation){
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    let result;
    if(isNaN(prev) || isNaN(current)) return;

    switch(operation){
        case "+":
            result = prev + current
            break;
        case "-":
            result = prev - current
            break;
        case "*":
            result = prev * current
            break;
        case "/":
            if(current == ""){
                alert("You can not divide this number to zero!")
                currentOperandText.textContent = "";
                currentOperand = "" ;
                previousOperand = "";
                operation="";
            }else{
                result = prev / current
            }
            break;
        default: 
            return;
    }
    let resulEdit = result.toString();
    let stringto = resulEdit.split("").slice(0,6)
    let resulEditLength = stringto.length;
    if( result % 1 ===0){
        previousOperand = result.toString();
    }else if(result % 1 !== 0 && resulEditLength <= 3){
        previousOperand = result.toFixed(1).toString();
        currentOperand = "";
        console.log("yop" + currentOperand)
    }else if(result % 1 !== 0 && resulEditLength <= 4){
        previousOperand = result.toFixed(2).toString();
        currentOperand = "";
    }else if(result % 1 !== 0 && resulEditLength <= 5){
        previousOperand = result.toFixed(3).toString();
        currentOperand = "";
    }
    else if(resulEditLength <= 6){
        previousOperand = result.toFixed(4).toString();
        currentOperand = "";
    }

    currentOperandText.textContent = previousOperand;
    currentOperand = "";
    operations.disabled = false;
}

equal.addEventListener("click", () => {
    if(currentOperand !== "" && previousOperand == ""){
        alert("you need to calculate a valid operation")
    }else if(currentOperand == ""){
        alert("you need to calculate a valid operation")
    }else if(previousOperand == ""){
        alert("you need to calculate a valid operation")
    }
    operate(operation);
    console.log(currentOperand)
    console.log(previousOperand)
    operation = "";
    
})

deleteButton.addEventListener("click", () => {
    deleteElement();
})

let deleteElement = function(){
    currentOperandText.textContent = currentOperandText.textContent.slice(0, currentOperandText.textContent.length - 1);
   
    if(currentOperand !== ""){
        console.log(previousOperand)

        currentOperand = currentOperand.slice(0, currentOperand.length - 1);
        console.log(currentOperand)
    }else if(operation !== "" && currentOperand == ""){
        operation = operation.slice(0, operation.length - 1)
        operation = "";
        console.log("avv" + operation)
        console.log("va" + previousOperand)
        operations.disabled = false;
    }else if(previousOperand !== ""){
        console.log("yuppmm")
        console.log(typeof(previousOperand))
        previousOperand = previousOperand.slice(0, previousOperand.length - 1);
        console.log(previousOperand)

    }else if(currentOperandText.textContent == ""){
        currentOperand = "";
        previousOperand = "";
        console.log(previousOperand)

    }
}

reset.addEventListener("click", () => {
    clearAll();
})


let clearAll = function(){
    currentOperandText.textContent = "";
    currentOperand = "";
    previousOperand = "";
    operation = "";
    dot.disabled = false;
}

dot.addEventListener("click", () => {
    inportDot();
})

let inportDot = function(){
    if(currentOperand == ""){
        dot.disabled = true;
        numbers.disabled = false;
    }else if(currentOperand !== "" && !currentOperand.includes(".")){
        currentOperandText.textContent += ".";
        currentOperand += "."
        dot.disabled = false;
    }
}

let separateNumber = function(){
    let decimalNumber = currentOperandText.textContent;
    let splitDec = decimalNumber.split(".")[0];
    let splitDecSecond = decimalNumber.split(".")[1];
    let actualNumber = `${splitDec}.${splitDecSecond}`
    if(previousOperand.includes("."))
    previousOperand = actualNumber;
}

document.addEventListener('keydown', function (event) {
    let numbero = /[0-9]/g;
    let operators = /[+\-*\/]/g;
    if (event.key.match(numbero)) {
      event.preventDefault();
      addNumber(event.key);
    }
    if (event.key === '.') {
      event.preventDefault();
      inportDotKeyboard(event.key);
    }
    if (event.key.match(operators)) {
      event.preventDefault();
      operationSelectKey(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      equalKey();
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      deleteElement();
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      clearAll();
    }
  });

  let addNumber = function(keyboardNumbers){
    if(currentOperandText.textContent.length >= 14){
        document.querySelector(".display").classList.add("lower")
        document.querySelector(".edit_me").classList.add("lower")
    }
        let keyboardNumbersExc = keyboardNumbers.split("")
        if(currentOperand == "" && keyboardNumbers == 0 && keyboardNumbersExc[0] != "F"){
            currentOperandText.textContent += keyboardNumbers;
            currentOperand += keyboardNumbers;
            dot.disabled = false;
        }else if(currentOperand == "0" && keyboardNumbers == 0 && keyboardNumbersExc[0] != "F"){
            return;
        }else if(currentOperand == "0" && keyboardNumbers !== 0 && currentOperand.charAt(currentOperand.length - 1) !== "." && keyboardNumbersExc[0] != "F"){
            return;
        }else if(currentOperand.charAt(currentOperand.length - 1) == "." && keyboardNumbersExc[0] != "F"){
            currentOperandText.textContent += keyboardNumbers;
            currentOperand += keyboardNumbers;
            dot.disabled = false;
        }else if(keyboardNumbersExc[0] != "F"){
            currentOperandText.textContent += keyboardNumbers;
            currentOperand += keyboardNumbers;
            dot.disabled = false;
        }
    }


    let inportDotKeyboard = function(dotEvent){
        if(currentOperand == ""){
            dot.disabled = true;
            numbers.disabled = false;
        }else if(currentOperand !== "" && !currentOperand.includes(dotEvent)){
            currentOperandText.textContent += dotEvent;
            currentOperand += dotEvent
            dot.disabled = false;
        }
    }

    let operationSelectKey = function(operationKey){
            if(currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "+" || 
                currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "*" || 
                currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "-" || 
                currentOperandText.textContent.charAt(currentOperandText.textContent.length - 1) == "/")
            { 
                currentOperandText.textContent = currentOperandText.textContent.slice(0, currentOperandText.textContent.length - 1);
                currentOperandText.textContent += operationKey;
                operation = operationKey;
                operations.disabled = true;
                numbers.disabled = false;
            }else if(currentOperand == "" && operationKey == undefined){
                operations.disabled = true;
                numbers.disabled = false;
            }else if(currentOperand == ""){
                operations.disabled = false;
                operationSelect(operation);
                currentOperandText.textContent += operationKey;
                operation = operationKey;
                numbers.disabled = false;
            }else{
                operationSelect(operation);
                currentOperandText.textContent += operationKey;
                operation = operationKey;
                numbers.disabled = false;
            }
            
        }

        let equalKey = function(){
            if(currentOperand !== "" && previousOperand == ""){
                alert("you need to calculate a valid operation")
            }else if(currentOperand == ""){
                alert("you need to calculate a valid operation")
            }else if(previousOperand == ""){
                alert("you need to calculate a valid operation")
            }
            operate(operation);
            operation = "";
        }