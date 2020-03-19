const News = require('../../libs/gallery/News')

module.exports = async (req, res, next) => {

  try {

    let news = await News.getAll()



    return res.json({
      news
    })

  } catch (e) {
    return res.status(500).send(e.message).end()
  }

}