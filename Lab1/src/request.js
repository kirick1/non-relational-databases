const axios = require('axios')

class Request {
  static async getPageByURL (url) {
    const response = await axios.get(url)
    return response.data
  }
}

module.exports = { Request }
