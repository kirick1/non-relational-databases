const axios = require('axios')

module.exports = async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('ERROR GETTING REQUEST: ', error)
  }
}
