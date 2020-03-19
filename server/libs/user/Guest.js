const pool = require('../../db')
const bcryptjs = require('bcryptjs')
const User = require('./User')
const config = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = class Guest {
  
  static async login(name, password) {
  
    let [ rows ] = await pool.query(
      `SELECT id, passhash FROM users WHERE name = ? LIMIT 1`, [name])
      
    if (!rows.length || !rows[0].passhash) {   
        throw new Error('Unbekannter Name oder Passwort')
    }

    let passOk = await bcryptjs.compare(password, rows[0].passhash)

    if (!passOk) {
        throw new Error('Unbekannter Name oder Passwort')
    }

    let user = new User()

    if (!(await user.get(rows[0].id))) {
        throw new Error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut')
    }
    
    let accessToken = jwt.sign({ id: user.id, name: user.name }, config.jwtSecret)

    return accessToken
    
  }

}