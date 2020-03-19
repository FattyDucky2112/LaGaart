const pool = require('../../db')

module.exports = class User {

  constructor(){
    this.id = null
    this.name = ''
  }

  async get(userID) {

    let [ rows ] = await pool.query(
      `SELECT id, name FROM users WHERE id = ? LIMIT 1`, [userID])

    if (!rows.length || !rows[0].id) {
      return false
    }

    this.id = rows[0].id
    this.name = rows[0].name

    return true

  }

}