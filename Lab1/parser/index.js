const xpath = require('xpath')
const DOMParser = require('xmldom').DOMParser

module.exports = page => {
  try {
    const doc = new DOMParser().parseFromString(page, 'text/html')
    return xpath.select("//descendant::div[@class = 'article article_section']//div[@class = 'article_title']", doc)
  } catch (error) {
    console.error('ERROR PARSING PAGE: ', error)
    throw Error(error)
  }
}
