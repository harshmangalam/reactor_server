const bcrypt = require("bcrypt")

exports.hashPassword = async (password, next) => {
    try {
        const hash = await bcrypt.hash(password, 6)
        return hash

    } catch (err) {
        next(err)
    }
}


exports.comparePassword = async (password, hashedPassword, next) => {
    try {
        const hasMatch = await bcrypt.compare(password, hashedPassword)
        return hasMatch

    } catch (err) {
        next(err)
    }
}