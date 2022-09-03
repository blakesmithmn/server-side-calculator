$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#submitButton').on('click', submitCalculation)
    $('#addButton').on('click', chooseType)
    $('#subtractButton').on('click', chooseType)
    $('#multiplyButton').on('click', chooseType)
    $('#divideButton').on('click', chooseType)

}

let operation = 0;
function chooseType() {
    operation = $(this).text();
    console.log(operation);
    return operation;
}

function submitCalculation() {
    let valueOne = $('#valueOne').val();
    let valueTwo = $('#valueTwo').val();
    let calculatorInfo = {
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
}

