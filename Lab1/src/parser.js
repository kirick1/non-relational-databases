const cheerio = require('cheerio')

class Parser {
  static parsePageToDocument (body) {
    return cheerio.load(body, {
      withDomLvl1: true,
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: true
    })
  }
  static getDocumentLinks (page) {
    const articleSections = page('div[class="article article_section"]')
    const articles = articleSections.text()
    const articlesDataArray = articles.split('\n').map(a => a.trim()).filter(a => a !== '')
    const links = []
    for (let i = 0; i < articlesDataArray.length; i += 3) {
      const [time, title, subtitle] = articlesDataArray.slice(i, i + 3)
      links.push({ time, title, subtitle })
    }
    return links
  }
}

module.exports = { Parser }
