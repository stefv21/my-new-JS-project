
function add(number1, number2) {
  return number1 + number2;
}
let result = add(1, 2);
console.log(result);



function subtract(number2, number1) {
  return number2 - number1;
}
let result = subtract(10, 5);
console.log(result);



function multiply(number1, number2) {
  return number1 * number2;
}
let result = multiply(2, 5);
console.log(result);


function divide(number1, number2) {
  if (number2 === 0) {
    return "Not Allowed!"
  } else {
    let result = number1 / number2;
    return result;
  }


