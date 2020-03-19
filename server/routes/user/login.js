const Guest = require('../../libs/user/Guest')

module.exports = async (req, res, next) => {

  try {

    let { username, password } = req.body

    if (!username || !password) {
      throw new Error('An error occurred. Please try again later')
    }

    let accessToken = await Guest.login(username, password)

    return res.json({ token: accessToken })


  } catch(e) {
    return res.status(500).send(e.message).end()
  }

}