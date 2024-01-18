const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const secretKey = 'ProtectToken'
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na autenticação do token.' })
    }

    req.user = user
    next()
  });
}

module.exports = authenticateToken