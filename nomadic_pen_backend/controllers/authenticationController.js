/* By Jasmeet singh */
const authSecret='8b45ce998ecccba7ebcd59af83085bfac85400f1cea8b9b8c7f73a27a15c9a34bbc65039815bbd7326ca934ba31ffe7127061432c7a8170ef477ae629d35f0ff0a7518e0c2452a2d5e8c9c288143dedc11f5bd21c953c200ddc0de09fe5e2008519517492257d5ccd70131b52b1871bb5e08982cde777da536781c638419ff8b';

const jwt = require('jsonwebtoken');


  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, authSecret, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  module.exports = authenticateToken;


  