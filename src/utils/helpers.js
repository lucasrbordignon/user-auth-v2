const bcrypt = require('bcrypt')

async function encryptPassword (password) { 
  return await bcrypt.hash(password, 10)
}

async function checkPassword (password, user){
  try {            
    const hash = await bcrypt.hash(password, 10)
  
    return await bcrypt.compare(hash, user)

  } catch (error) {
    throw error
  }
}


module.exports = {encryptPassword, checkPassword}