const Category = require('../../libs/gallery/Category')

module.exports = async (req, res, next) => {

  try {

    switch (req.query.action) {

      case 'insert':
        
        if (!req.body.name || !req.body.path) {
          throw new Error("Interner Fehler... Bitte an Marco wenden")
        }

        let newID = await Category.insert(req.body.name, req.body.path)
        
        if (newID < 0) {
          throw new Error("Die Kategorie existiert bereits")
        }

        return res.json({
          newID
        })
      //--------

      case 'delete':
        if (!req.query.deleteID){
          throw new Error('Interner Fehler... Bitte an Marco wenden')
        }

        let success = await Category.delete(req.query.deleteID)
        
        if (!success) {
          throw new Error("Kategorie konnte nicht gelöscht werden")
        }

        return res.json({
          success
        })

      
      case 'edit':
        
        if (!req.query.editID || !req.body.name || !req.body.path ){
          throw new Error('Interner Fehler... Bitte an Marco wenden')
        }

        let editSuccess = await Category.edit(req.query.editID, req.body.name, req.body.path)

        if(!editSuccess) {
          throw new Error("Kategorie konnte nicht geupdated werden")
        }

        return res.json({
          editSuccess
        })

      default: 
        let categories = await Category.getAll()
        return res.json(categories)
      

    }



  } catch(e) {
    return res.status(500).send(e.message).end()
  }

}