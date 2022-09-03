const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// one piece of data on the server - calculations array of objects having a history
let equation;
let result;
let history = [];


app.post('/submit', (req, res) => {
    equation = req.body;
    // double check what we are sent on the server
    calculator(equation);
    console.log(calculator(equation));
    res.sendStatus(202);
});

app.get('/submit', (req, res) => {

})



console.log(equation);
function calculator(object) {
    let firstNumber = Number(object.numberOne);
    let secondNumber = Number(object.numberTwo);
    if (object.type === ' - ') {
        object.result = firstNumber - secondNumber;
    }
    if (object.type === ' + ') {
        object.result = firstNumber + secondNumber;
    }
    if (object.type === ' x ') {
        object.result = firstNumber * secondNumber;
    }
    if (object.type === ' / ') {
        object.result = firstNumber / secondNumber;

    }
    history.push(object);
    console.log(history);
    return object;
}


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})