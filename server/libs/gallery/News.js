const pool = require('./../../db')
const fs = require('fs')
const config = require('../../config')

module.exports = class News {

  static genPictureName() {
    return [...Array(30)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
  }


  static async getAll() {

    let [results] = await pool.query(
      `SELECT 
        id,
        name,
        description,
        picturename
      FROM
        news
      ORDER BY
        id DESC`)

    return results
  }

  static async insert(name, description, picturename) {

    let [results] = await pool.query(
      `INSERT INTO 
        news
      (name, description, picturename)
      VALUES (?,?,?)`, [name, description, picturename])

    return results.insertId
  }


  static async delete(id) {

    let [selRes] = await pool.query(
      `SELECT 
        picturename
      FROM
        news
      WHERE
      id = ? LIMIT 1`, [id])

    if (!selRes || !selRes.length) {
      return false
    }

    let [results] = await pool.query(
      `DELETE FROM 
        news
      WHERE
      id = ? LIMIT 1`, [id])

    if (selRes[0].picturename) {
      fs.unlink(`${config.aktuellesFolder}/${selRes[0].picturename}.webp`, () => { })
    }

    return results.affectedRows >= 1
  }

  static async edit(id, name, description, newPicName) {


    if (newPicName != '') {

      let [selRes] = await pool.query(
        `SELECT 
        picturename
      FROM
        news
      WHERE
      id = ? LIMIT 1`, [id])

      if (!selRes || !selRes.length) {
        return false
      }

      if (selRes[0].picturename) {
        fs.unlink(`${config.aktuellesFolder}/${selRes[0].picturename}.webp`, () => { })
      }
    }


    let [results] = await pool.query(
      `UPDATE
        news
      SET 
        name = ?, 
        description = ?,
        picturename = IF(? != '', ?, picturename)
      WHERE 
        id = ? 
      LIMIT 1`, [name, description, newPicName, newPicName, id])

    return results.affectedRows >= 1
  }
}