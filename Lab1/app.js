const task = require('./task.json')

const Parser = require('./parser')
const { Request } = require('./utils')

void (async function () {
  try {
    const page = await Request(task.base_url)
    //console.log('PAGE: ', page)
    const doc = Parser(page)
    for (const d of doc) {
      console.log('!!!!!!!!!!!!!', d.firstChild)
    }
    //console.log('DOCUMENT: ', doc)
  } catch (error) {
    console.error('ERROR: ', error)
  }
})()
