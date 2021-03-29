const User = require("../models/user.model")
const { INVALID_CREDENTIAL_ERR, USERNAME_ALREADY_EXISTS_ERR } = require("../errors")
const { hashPassword, comparePassword } = require("../utils/password.util")
const { createToken } = require("../utils/token.util")


exports.handleLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body

        // check username 
        const user = await User.findByUsername(username)


        if (!user) {
            next({ status: 400, message: INVALID_CREDENTIAL_ERR })
            return
        }

        // match password

        const matchPassword = await comparePassword(password, user.password, next)

        if (!matchPassword) {
            next({ message: INVALID_CREDENTIAL_ERR, status: 400 })
        }

        // generate token

        const token = createToken({ userId: user._id })

        res.status(200).json({
            type: "success", message: `${user.name} account loggedin successfully`, data: {
                token
            }
        })

    } catch (err) {
        next(err)
    }
}

exports.handleRegister = async (req, res, next) => {
    try {
        let { username, name, password, gender } = req.body

        // check username duplication
        const findUsername = await User.findByUsername(username)

        if (findUsername) {
            next({ message: USERNAME_ALREADY_EXISTS_ERR })
        }

        // hash and salt  password
        password = await hashPassword(password, next)

        // create new account
        const newUser = new User({ username, password, name, gender })
        const saveUser = await newUser.save()

        res.status(200).json({ type: "success", message: `New account created for user ${saveUser.name}`, data: null })

    } catch (err) {
        next(err)
    }
}