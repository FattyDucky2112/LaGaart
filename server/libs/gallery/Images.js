const pool = require('./../../db')
const fs = require('fs')
const config = require('../../config')

module.exports = class Images {

  static async getAll(showAll = false) {

    let query = `SELECT 
      id,
      categoryid,
      name,
      description
    FROM
      galleryimages `

    if (!showAll) {
      query += `WHERE
      categoryid IN
      (SELECT id FROM galleryfilters)`
    }

    query += `ORDER BY
      id DESC`

    let [results] = await pool.query(query)

    return results

  }

  static async insert(name, description, category) {

    let [results] = await pool.query(
      `INSERT INTO
      galleryimages
      (name, categoryid, description) VALUES (?,?,?)`, [name, category, description])

    return results.insertId

  }

  static async edit(editID, category, name, description) {

    let [results] = await pool.query(
      `UPDATE
        galleryimages
      SET 
        categoryid = ?, 
        name = ?,
        description = ?
      WHERE 
        id = ? 
      LIMIT 1`, [category, name, description, editID])

    return results.affectedRows >= 1
  }

  static async delete(ID) {

    let [results] = await pool.query(
      `DELETE FROM
        galleryimages
      WHERE 
        id = ? 
      LIMIT 1`, [ID])


    fs.unlink(`${config.pictureFolder}/big_${ID}.webp`, () => { })
    fs.unlink(`${config.pictureFolder}/${ID}.webp`, () => { })

    return results.affectedRows >= 1
  }

}
