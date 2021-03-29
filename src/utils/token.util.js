const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")


exports.createToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" })
    return token
}


exports.decodeToken = (token) => {

    const payload = jwt.verify(token, JWT_SECRET)
    return payload

}


