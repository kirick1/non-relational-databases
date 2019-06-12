const { join } = require('path')
const { writeFile } = require('fs')
const { promisify } = require('util')
const { Builder } = require('xml2js')

const { load } = require('cheerio')

const builder = new Builder()

const Write = promisify(writeFile)

const { Request } = require('./request')

class Parser {
  static parsePageToDocument (body) {
    return load(body, {
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
    for (let i = 0, num = articlesDataArray.length; i < num; i += 3) {
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
  static getShopItems (page) {
    const pageItems = page('div[class="cataloglist-item-container"]')
    const itemsData = pageItems.text()
    const itemsDataArray = itemsData.split('\n').map(a => a.trim()).filter(a => a !== '')
    console.log(itemsDataArray)
    const items  = []
    for (let i = 0, num = itemsDataArray.length; i < num; i += 13) {
      const [,, code, availability, title, price,,, rating,, description,,] = itemsDataArray.slice(i, i += 13)
      items.push({ code, availability, title, price, rating, description })
    }
    return items
  }
  static async getShopItemsObjects (url) {
    const pageBody = await Request.getPageByURL(url)
    const document = Parser.parsePageToDocument(pageBody)
    return Parser.getShopItems(document)
  }
  static async saveDataToXMLFile (data, filename = 'result.xml') {
    const normalizedData = data.map(a => ({ fragment: a }))
    const xmlData = builder.buildObject(normalizedData)
    await Write(join(__dirname, '..', filename), xmlData)
  }
}

module.exports = { Parser }
