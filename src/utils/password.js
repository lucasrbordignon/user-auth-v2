const bcrypt = require('bcrypt')

async function encryptPassword (password) { 
  return await bcrypt.hash(password, 10)
}

async function checkPassword (password, user){
  try {              
    return await bcrypt.compare(password, user)

  } catch (error) {
    throw error
  }
}

async function validatePassword (password) {  

  const isValid = password.length < 8 
    ? 
      false 
    :
      () => {
        let requirements = 0

        if (/a-z/.test(password)) requirements ++
        if (/A-Z/.test(password)) requirements ++
        if (/\d/.test(password)) requirements ++
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) requirements ++
        
        return requirements >= 3
      }

  return isValid
}


module.exports = {encryptPassword, checkPassword, validatePassword}