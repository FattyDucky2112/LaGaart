const News = require('../../libs/gallery/News')
const sharp = require('sharp')
const config = require('../../config')


module.exports = async (req, res, next) => {

  try {

    switch (req.query.action) {

      case 'insert':


        if (req.body.name === '' || req.body.description === '') {
          throw new Error('Input Fehler')
        }


        let haspicture = req.files && req.files.file && req.files.file.data ? true : false

        let newPicNameFFFFFF = ''
        if (haspicture) {
          newPicNameFFFFFF = News.genPictureName()
        }

        let newID = await News.insert(req.body.name, req.body.description, newPicNameFFFFFF)
        if (!newID) {
          throw new Error("Id Fehler")
        }

        if (haspicture) {
          await sharp(req.files.file.data)
            .resize(300, null)
            .toFile(`${config.aktuellesFolder}/${newPicNameFFFFFF}.webp`, (err, info) => {
              console.log(err, info)
            })

        }

        return res.json({
          newID, picturename: newPicNameFFFFFF
        })




      case 'delete':

        if (!req.query.id) {
          throw new Error('Keine Id zum löschen vorhanden')
        }

        let deleteSuccess = await News.delete(req.query.id)

        if (!deleteSuccess) {
          throw new Error("Konnte nicht gelöscht werden")
        }

        return res.json({
          deleteSuccess
        })


      case 'edit':

        if (!req.query.id || req.body.name === '' || req.body.description === '') {
          throw new Error('Input Fehler')
        }

        let newPictureUploaded = req.files && req.files.file && req.files.file.data ? true : false

        let newPicName = ''
        if (newPictureUploaded) {
          newPicName = News.genPictureName()
        }

        let editSuccess = await News.edit(req.query.id, req.body.name, req.body.description, newPicName)
        if (!editSuccess) {
          throw new Error("Id Fehler")
        }

        if (newPictureUploaded) {
          await sharp(req.files.file.data)
            .resize(300, null)
            .toFile(`${config.aktuellesFolder}/${newPicName}.webp`, (err, info) => {
              console.log(err, info)
            })
        }

        return res.json({
          haspicture: newPictureUploaded
        })

    }

  } catch (e) {
    return res.status(500).send(e.message).end()
  }

}