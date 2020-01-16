const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async store(req, res) {
    const { github, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({ github })

    if (dev) {
      return res.status(400).json({ message: 'User already exist' })
    }

    const response = await axios.get(`https://api.github.com/users/${github}`)
    const { name = login, avatar_url, bio } = response.data

    const location = { type: 'Point', coordinates: [longitude, latitude] }

    dev = await Dev.create({
      name,
      avatar_url,
      bio,
      github,
      location,
      techs: techs.split(',').map(tech => tech.trim())
    })

    return res.json(dev)
  },

  async index(req, res) {
    res.json(await Dev.find())
  }
}
