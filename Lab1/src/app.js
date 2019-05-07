const cli = require('./cli')

const task = require('../task.json')

const { Parser } = require('./parser')
const { Request } = require('./utils')

void (async function () {
  while (true) {
    const selected = await cli.main.prompt()
    try {
      switch (selected) {
        case cli.main.options.TASK_1: {
          const pageBody = await Request.getPageByURL(task.base_url)
          const document = Parser.parsePageToDocument(pageBody)
          const links = Parser.getDocumentLinks(document)
          console.log('LINKS: ', links)
          break
        }
        case cli.main.options.TASK_2: {

          break
        }
        case cli.main.options.EXIT: {
          console.warn('[EXIT]')
          return process.exit(0)
        }
      }
    } catch (error) {
      console.error('[ERROR]: ', error)
    }
    await cli.utils.ask()
  }
})()
