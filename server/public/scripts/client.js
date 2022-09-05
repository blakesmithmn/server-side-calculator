$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    fetchResults(history);
    $('#submitButton').on('click', submitCalculation);
    $('#addButton').on('click', chooseType);
    $('.number').on('click', compileNumber);
    $('.mathButton').on('click', chooseType);
    $('#subtractButton').on('click', chooseType);
    $('#multiplyButton').on('click', chooseType);
    $('#divideButton').on('click', chooseType);
    $('#clearButton').on('click', clearInputs);
}

let numberOne = null;
let numberTwo = null;
let mathUsed = false;
let decimalUsed = false;
function compileNumber() {
    valueOne=0;
    if (mathUsed === false) {
        valueOne += Number($(this).attr('id'));
        mathUsed = true;
        console.log(valueOne);
        $('.calculatorDisplay').append(valueOne);

    }
}
let operation = 0;
// let history = [];
let calculatorInfo = {};
function chooseType() {
    if (mathUsed === false){
        valueOne = $('.calculatorDisplay').text();
        console.log(valueOne);
    }
    operation = $(this).text();
    console.log(operation);
    return operation;
}

function submitCalculation() {
    let valueOne = $('#valueOne').val();
    let valueTwo = $('#calculatorScreen').text();
    calculatorInfo = {
        numberOne: valueOne,
        type: operation,
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
    // $('#valueOne').val('');
    // $('#valueTwo').val('');
    fetchResults();
}


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
        $('#result').text(`${last.result}`);
    }

}

function clearInputs() {
    // $('#valueOne').val('');
    // $('#valueTwo').val('');
    $('.calculatorDisplay').text('0');

    operation = '';
    calculatorInfo = {
        numberOne: '',
        type: '',
        numberTwo: '',
        result: '',
    }
}
