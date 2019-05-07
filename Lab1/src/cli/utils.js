const inquirer = require('inquirer')
const chalk = require('chalk')

const ask = async () => await inquirer.prompt([
  {
    type: 'input',
    message: 'Type something to continue',
    name: '_'
  }
])

const print = value => console.log(chalk.blue(JSON.stringify(value)))

const printArray = array => array && Array.isArray(array) && array.length > 0 ? array.forEach(print) : console.log(chalk.yellow('No items!'))

module.exports = { ask, print, printArray }
