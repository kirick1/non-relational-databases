const inquirer = require('inquirer')

const options = {
  TASK_1: 'Task 1',
  TASK_2: 'Task 2',
  EXIT: 'Exit'
}

const prompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      choices: Object.values(options),
      message: 'Select main options'
    }
  ])
  return answers.selected
}

module.exports = { options, prompt }
