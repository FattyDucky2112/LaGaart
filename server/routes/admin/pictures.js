const Images = require('../../libs/gallery/Images')
const sharp = require('sharp')
const config = require('../../config')
const Category = require('../../libs/gallery/Category')


module.exports = async (req, res, next) => {

  try {

    switch (req.query.action) {

      case 'getAll':
        let categoriesPromise = Category.getAll()

        let imagesPromise = Images.getAll(/* showAll = */true)

        let [categories, images] = await Promise.all([categoriesPromise, imagesPromise])

        return res.json({
          categories,
          images
        })

      case 'edit':

        if (!req.query.editID || !req.body.category) {
          throw new Error('Interner Fehler... Bitte an Marco wenden')
        }

        let name = req.body.name || ''
        let description = req.body.description || ''

        let editSuccess = await Images.edit(req.query.editID, req.body.category, name, description)

        if (!editSuccess) {
          throw new Error("Das Bild konnte nicht geupdated werden")
        }

        return res.json({
          editSuccess
        })

      case 'delete':
        if (!req.query.id) {
          throw new Error('Bild konnte nicht gelöscht werden')
        }

        let deleteSuccess = await Images.delete(req.query.id)
        if (!deleteSuccess) {
          throw new Error('Bild konnte nicht gelöscht werden 2')
        }
        return res.json({
          success: true
        })

      default:
        if (!req.files.file || !req.body.category) {
          throw new Error("Ein Fehler ist aufgetreten")
        }

        let newID = await Images.insert(req.body.name || '', req.body.description || '', req.body.category)

        if (!newID) {
          throw new Error("Ein Fehler ist aufgetreten (2)")
        }

        await sharp(req.files.file.data)
          .resize(300, null)
          .toFile(`${config.pictureFolder}/${newID}.webp`, (err, info) => {
            console.log(err, info)
          })


        sharp(req.files.file.data)
          .resize(1500, null)
          .toFile(`${config.pictureFolder}/big_${newID}.webp`, (err, info) => {
            console.log(err, info)
          });

        return res.json({
          newID
        })


    }

  } catch (e) {
    return res.status(500).send(e.message).end()
  }

}