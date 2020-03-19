const Category = require('../../libs/gallery/Category')
const Images = require('../../libs/gallery/Images')

module.exports = async (req, res, next) => {

  try {

    let categoriesPromise = Category.getAll()

    let imagesPromise = Images.getAll()

    let [categories, images] = await Promise.all([categoriesPromise, imagesPromise])

    return res.json({
      categories,
      images
    })

  } catch (e) {
    return res.status(500).send(e.message).end()
  }

}