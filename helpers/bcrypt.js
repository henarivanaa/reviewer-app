const bcrypt = require('bcrypt');
const hasher = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds)
}

const comparer = (password, hash) => {
    return bcrypt.compare(password, hash)
}


module.exports = { bcrypt, hasher, comparer }