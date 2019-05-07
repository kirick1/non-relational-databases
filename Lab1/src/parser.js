const xpath = require('xpath/xpath')

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
  static parseDocumentLinks (page) {
    return page('a').toArray().map(a => a.attribs.href)
  }
  static getDocumentLinks (page) {
    const articles = page('div[class="article article_section"]').text()
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
