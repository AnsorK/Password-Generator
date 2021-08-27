const chalk = require("chalk");
const inquirer = require("inquirer")
const upCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowCase = "abcdefghijklmnopqrstuvwxyz"
const num = "0123456789"
const special = "!?$%&"

console.log(chalk.blue.bold("Password Generator V1"))

const getLength = () => {
    inquirer
        .prompt([
            {
                name: "length",
                message: "How many characters do you want your password to be?",
                type: "number"
            }
        ])
        .then((answer) => {
            if (answer.length < 6 || !answer.length) {
                console.log("Please input a number that is greater than 5")
                getLength()
            } else 
                getBool(answer.length);
        });
}

const getBool = (length) => {
    inquirer
        .prompt([
            {
                name: "upCase",
                message: "Do you want an uppercase letter?",
                type: "confirm"
            },
            {
                name: "special",
                message: "Do you want a special character?",
                type: "confirm"
            }
        ])
        .then((answer) => {
            console.log(`Your new password is: ${chalk.cyan.bold(generatePassword(answer.upCase, answer.special, length))}`)
        });
}

getLength();

function generatePassword(haveUpCase, haveSpecial, charLength) {
    let password = ""
    const regular = lowCase + num
    for (let i = 0; i < charLength; i++)
        password += regular.charAt(Math.floor(Math.random() * regular.length))
    if (haveUpCase) {
        let randomUpCase = upCase.charAt(Math.floor(Math.random() * upCase.length))
        password = randomUpCase + password.substring(1)
    } if (haveSpecial) {
        let ranSpecialChar = special.charAt(Math.floor(Math.random() * special.length))
        password = password.slice(0, -1) + ranSpecialChar
    } 
    return password
} 
 


