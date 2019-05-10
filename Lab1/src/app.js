const cli = require('./cli')

const task = require('../task.json')

const { Parser } = require('./parser')

void (async function () {
  while (true) {
    const selected = await cli.main.prompt()
    try {
      switch (selected) {
        case cli.main.options.TASK_1: {
          const requests = []
          for (let i = 1; i <= 10; i++) requests.push(Parser.getDocumentLinksObjects(`${task.base_url}?page=${i}`))
          const result = (await Promise.all(requests)).flat()
          console.log('RESULT: ', result)
          await Parser.saveDataToXMLFile(result)
          break
        }
        case cli.main.options.TASK_2: {
          const items = await Parser.getShopItemsObjects(task.online_store)
          console.log('ITEMS: ', items)
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
