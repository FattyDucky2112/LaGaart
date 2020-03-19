const pool = require('./../../db')


module.exports = class Category {
    
  static async getAll() {

    let [results] =  await pool.query(
      `SELECT 
        id,
        path,
        name
      FROM
        galleryfilters
      ORDER BY
        id ASC`)

      return results

  }
  
  static async insert(name, path) {

    let [results] =  await pool.query(
      `INSERT INTO
      galleryfilters
      (name, path) VALUES (?,?)`, [name,path])

    return results.insertId

  }

  static async delete(id) {

    let [results] =  await pool.query(
      `DELETE FROM
      galleryfilters
      WHERE 
      id = ? LIMIT 1`, [id])

    return results.affectedRows >= 1
      
  }

  static async edit(id , name, path) {
    
    let [results] =  await pool.query(
      `UPDATE
      galleryfilters
      SET path = ?, name = ?
      WHERE 
      id = ? LIMIT 1`, [path,name,id])

    return results.affectedRows >= 1
  }

}