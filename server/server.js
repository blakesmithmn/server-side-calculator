const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// one piece of data on the server - calculations array of objects having a history
let equation;


app.post('/submit', (req, res) => {
    equation = req.body;
    // double check what we are sent on the server
    console.log(equation);
    function calculator() {
        let firstNumber = Number(equation.numberOne);
        let secondNumber = Number(equation.numberTwo);
        let result = firstNumber + secondNumber;
        return result;
    }
    console.log(calculator(equation));
    res.sendStatus(200);
});

app.get('/submit', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})