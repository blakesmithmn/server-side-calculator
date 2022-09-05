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
    // changing req.body name for easier reference
    equation = req.body;
    // running the math logic on the received item and storing it for reference later
    calculator(equation);
    // response letting front end know everything worked nicely
    res.sendStatus(202);
});

app.get('/submit', (req, res) => {
    res.send(history);
})



function calculator(object) {
    // takes in the object being sent from front end
    // establishes two variables for readability
    let firstNumber = Number(object.numberOne);
    let secondNumber = Number(object.numberTwo);
    // logic to handle the different math equations ... 
    // maybe find a more clean way later?
    if (object.type === '-') {
        object.result = firstNumber - secondNumber;
        toString(object.result);
    }
    if (object.type === '+') {
        object.result = firstNumber + secondNumber;
        toString(object.result);
    }
    if (object.type === 'x') {
        object.result = firstNumber * secondNumber;
        toString(object.result);

    }
    if (object.type === '/') {
        object.result = firstNumber / secondNumber;
        toString(object.result);

    }
    // adding the result into an array for quick reference later
    history.push(object);
    console.log(history);
    return object;
}



app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})