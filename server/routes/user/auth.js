module.exports = async function(req, res) {

  console.log('GET USER DATA', req.user);
  res.json({ user: req.user })

}