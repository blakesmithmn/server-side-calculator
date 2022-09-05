$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    fetchResults(history);
    clickHandlers();

}

function clickHandlers() {
    $('.submitButton').on('click', submitCalculation);
    // $('#addButton').on('click', chooseType);
    $('.decimalButton').on('click', compileNumber);
    $('.number').on('click', compileNumber);
    $('.mathButton').on('click', chooseType);
    // $('#subtractButton').on('click', chooseType);
    // $('#multiplyButton').on('click', chooseType);
    // $('#divideButton').on('click', chooseType);
    $('#clearButton').on('click', clearInputs);
    $('#onOffButton').on('click', onOff);
}

// GLOBAL VARIABLES
//////////////////////////////////
let valueOne = ''; // should get a value from number function
let valueTwo = ''; // should get a value from number function
let mathUsed = false; // toggle true false in number function
let decimalUsed = false; // toggle true false in number function
let operator = '';
let status = 'off';
let calculatorInfo = {}; // fill this with informaiton to send to server
/////////////////////////////////

// function that takes numbers input 
// stop collecting data after an operator is pushed
// store the given value in the object we are sending to the server

function compileNumber() {
    if (operator === '') {
        valueOne = valueOne + $(this).attr('id');
        console.log(valueOne);
        
        $('.calculatorDisplay').empty();
        $('.calculatorDisplay').append(valueOne);
    } else {
        valueTwo += $(this).attr('id')
        console.log(valueTwo);
        $('.calculatorDisplay').append(valueTwo);

    }
}



function chooseType() {
    if (operator === '') {
        // valueOne.slice(0,-1);
        operator = $(this).attr('id');
        console.log(operator)
        $('.calculatorDisplay').append(operator);

        // valueOne = $('.calculatorDisplay').text();
        console.log(valueOne);
        mathUsed = true;
    }
    // operation = $(this).text();
    // console.log(operation);
    return operator;
}


// function to send the object over to server side for calculations
// should compile the existing object and use a POST request
// not allow submit if something is missing?
function submitCalculation() {
    // if(){
    //     alert('please enter a full equation');
    //     return;
    // }
    calculatorInfo = {
        numberOne: valueOne,
        type: operator,
        numberTwo: valueTwo,
        result: 'empty',
    }

    console.log(calculatorInfo);
    $.ajax({
        method: 'POST',
        url: '/submit',
        data: calculatorInfo,
    }).then(function (results) {
        console.log(results);
    })
    fetchResults();

    // empty things for next equation 
    valueOne = '';
    valueTwo = '';
    mathUsed = false;
    decimalUsed = false;
    operator = '';
    
}

// function to GET the results from the server side and append
// values should be pulled out to update display and history sections


function fetchResults() {
    $.ajax({
        method: 'GET',
        url: '/submit',
    }).then(function (history) {
        // making sure we get back an object that makes sense
        console.log(history);
        renderResults(history);
    })
}

function renderResults(history) {
    $('#history').empty();
    let last = history[history.length - 1];
    for (let i = history.length - 1; i >= 0; i--) {
        $('#history').append(`
            <li> ${history[i].numberOne} ${history[i].type} ${history[i].numberTwo} = ${history[i].result}  </li>
        `);
        console.log('appended');
        $('.calculatorDisplay').text(`${last.result}`);
    }

}

function clearInputs() {
    // $('#valueOne').val('');
    // $('#valueTwo').val('');
    $('.calculatorDisplay').text('0');
    
    // operation = '';
    valueOne = ''; // should get a value from number function
    valueTwo = ''; // should get a value from number function
    mathUsed = false; // toggle true false in number function
    decimalUsed = false; // toggle true false in number function
    operator = '';
    calculatorInfo = {
        numberOne: '',
        type: '',
        numberTwo: '',
        result: '',
    }
}

function onOff(){
    if (status === 'on'){
        $('.calculatorDisplay').css('background-color', '#0B0B0B');
        $('.calculatorDisplay').css('color', '#FFFFFF');


        status = 'off';

    } else {
        $('.calculatorDisplay').css('background-color', '#77CC00');
        $('.calculatorDisplay').css('color', '#0B0B0B');

        status = 'on';
    }
}
