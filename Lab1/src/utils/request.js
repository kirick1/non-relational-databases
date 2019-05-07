const axios = require('axios/index')

class Request {
  static async getPageByURL (url) {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('ERROR GETTING REQUEST: ', error)
      throw Error(error)
    }
  }
}

module.exports = { Request }
