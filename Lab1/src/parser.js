const { join } = require('path')
const { writeFile } = require('fs')
const { promisify } = require('util')
const { Builder } = require('xml2js')
const cheerio = require('cheerio')

const builder = new Builder()

const Write = promisify(writeFile)

const { Request } = require('./utils')

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
  static async getDocumentLinksObjects (url) {
    const pageBody = await Request.getPageByURL(url)
    const document = Parser.parsePageToDocument(pageBody)
    return Parser.getDocumentLinks(document)
  }
  static async saveDataToXMLFile (data, filename = 'result.xml') {
    const normalizedData = data.map(a => ({ fragment: a }))
    const xmlData = builder.buildObject(normalizedData)
    console.log('XML: ', xmlData)
    await Write(join(__dirname, '..', filename), xmlData)
  }
}

module.exports = { Parser }
