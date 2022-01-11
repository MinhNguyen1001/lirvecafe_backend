const bcrypt = require('bcrypt');

module.exports.hash = function hash(password) {
    return bcrypt.hashSync(password, 10)
}

module.exports.validate = function validate(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
}
