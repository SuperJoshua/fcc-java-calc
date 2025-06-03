"use strict"

let total = ''
let equation = ''
let current_input = ''
let starts_with_zero = true
let has_point = false
let calc_equation = document.querySelector('#equation')
let calc_display = document.querySelector('#display')

function display_total() {
   if (total) {
      calc_equation.textContent = equation
      calc_display.textContent = total
   } else if (equation) {
      calc_equation.textContent = equation
      calc_display.textContent = current_input
   } else if (current_input) {
      calc_equation.innerHTML = '&nbsp;'
      calc_display.textContent = current_input
   } else {
      calc_equation.innerHTML = '&nbsp;'
      calc_display.textContent = '0'
   }
}

function check_for_operator() {
   if (current_input === '/' ||
       current_input === '*' ||
       current_input === '+' ||
       current_input === '-') {
      return true
   }
   return false
}

function calc_total() {
   let values = equation.match(/\d+\.*\d*/g)
   let operators = equation.match(/[/+\*-]/g)
   total = Number.parseFloat(values[0])
   for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
         case '+': total += Number.parseFloat(values[i+1]); break;
         case '-': total -= Number.parseFloat(values[i+1]); break;
         case '*': total *= Number.parseFloat(values[i+1]); break;
         case '/': total /= Number.parseFloat(values[i+1]); break;
         default: break;
      }
   }
   total = total.toString(10)
   display_total()
   equation = ''
   current_input = ''
   has_point = false
}

function handle_digit(digit) {
   if (total) {
      total = ''
   }
   if (check_for_operator()) {
      equation = equation.concat(current_input)
      current_input = digit
   } else if (current_input === '' || current_input === digit) {
      current_input = digit
   } else {
      current_input = current_input.concat(digit)
   }
   display_total()
}

function handle_operator(operator){
   if (total) {
      equation = total
      total = ''
      current_input = operator
      display_total()
   } else if (current_input) {
      if (!check_for_operator()) {
         if (current_input[current_input.length - 1] !== '.') {
            equation = equation.concat(current_input)
            current_input = operator
            has_point = false
         }
      } else {
         current_input = operator
         has_point = false
      }
      display_total()
   }
}

document.querySelector('#one').addEventListener('click', () => {
   handle_digit('1')
})
document.querySelector('#two').addEventListener('click', () => {
   handle_digit('2')
})
document.querySelector('#three').addEventListener('click', () => {
   handle_digit('3')
})
document.querySelector('#four').addEventListener('click', () => {
   handle_digit('4')
})
document.querySelector('#five').addEventListener('click', () => {
   handle_digit('5')
})
document.querySelector('#six').addEventListener('click', () => {
   handle_digit('6')
})
document.querySelector('#seven').addEventListener('click', () => {
   handle_digit('7')
})
document.querySelector('#eight').addEventListener('click', () => {
   handle_digit('8')
})
document.querySelector('#nine').addEventListener('click', () => {
   handle_digit('9')
})
document.querySelector('#zero').addEventListener('click', () => {
   handle_digit('0')
})
document.querySelector('#decimal').addEventListener('click', () => {
   if (total) {total = ''}
   if (check_for_operator()) {
      equation = equation.concat(current_input)
      current_input = '0.'
      has_point = true
   } else if (current_input === '') {
      current_input = '0.'
      has_point = true
   } else if (!has_point) {
      current_input = current_input.concat('.')
      has_point = true
   }
   display_total()
})
document.querySelector('#divide').addEventListener('click', () => {
   handle_operator('/')
})
document.querySelector('#multiply').addEventListener('click', () => {
   handle_operator('*')
})
document.querySelector('#subtract').addEventListener('click', () => {
   handle_operator('-')
})
document.querySelector('#add').addEventListener('click', () => {
   handle_operator('+')
})
document.querySelector('#equals').addEventListener('click', () => {
   if (!total &&
       equation &&
       !check_for_operator() &&
       current_input[current_input.length - 1] !== '.') {
      equation = equation.concat(current_input)
      calc_total()
   }
})
document.querySelector('#clear').addEventListener('click', () => {
   total = ''
   equation = ''
   current_input = ''
   has_point = false
   display_total()
})
