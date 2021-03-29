const User = require("../models/user.model")
const { UNAUTH_ACTION_ERR, INCORRECT_PASSWORD_ERR, USER_NOT_FOUND_ERR, USERNAME_ALREADY_EXISTS_ERR } = require("../errors")
const { comparePassword, hashPassword } = require("../utils/password.util")

exports.fetchAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            type: "success", message: "get all users", data: {
                users
            }
        })

    } catch (err) {
        next(err)
    }
}


exports.fetchUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)

        if (!user) {
            next({ status: 404, message: USER_NOT_FOUND_ERR })
            return
        }
        res.status(200).json({
            type: "success", message: `get user ${user.name} info`, data: {
                user
            }
        })

    } catch (err) {
        next(err)
    }
}


exports.fetchCurrentUser = async (req, res, next) => {
    try {
        const currentUser = res.locals.user
        res.status(200).json({
            type: "success", message: `get current user ${currentUser.name} info`, data: {
                user: currentUser
            }
        })

    } catch (err) {
        next(err)
    }
}





exports.updateUser = async (req, res, next) => {
    try {
        const currentUser = res.locals.user

        if (currentUser._id != req.params.userId) {
            next({ status: 401, message: UNAUTH_ACTION_ERR })
            return
        }

        const user = await User.findById(currentUser._id)
        user.set(req.body)
        const updatedUser = await user.save()

        res.status(201).json({
            type: "success", message: `current user data updated`, data: {
                user: updatedUser
            }
        })

    } catch (err) {
        next(err)
    }
}


exports.changeUsername = async (req, res, next) => {
    try {
        const { username } = req.body

        const currentUser = res.locals.user

        if (currentUser._id != req.params.userId) {
            next({ status: 401, message: UNAUTH_ACTION_ERR })
            return
        }

        const checkUsername = await User.findByUsername(username)

        if (checkUsername) {
            next({ status: 400, message: USERNAME_ALREADY_EXISTS_ERR })
            return
        }

        const user = await User.findOne({ _id: currentUser._id })

        user.set({ username })

        const updatedUser = await user.save()

        res.status(201).json({
            type: "success", message: "username updated successfully", data: {
                user: updatedUser
            }
        })

        // TODO delete all likes ,comments and post from this user

    } catch (err) {
        next(err)
    }
}






exports.changePassword = async (req, res, next) => {
    try {
        let { currentPassword, newPassword } = req.body
        const currentUser = res.locals.user

        if (currentUser._id != req.params.userId) {
            next({ status: 401, message: UNAUTH_ACTION_ERR })
            return
        }

        let matchCurrentPassword = await comparePassword(currentPassword, currentUser.password, next)

        if (!matchCurrentPassword) {
            next({ status: 400, message: INCORRECT_PASSWORD_ERR })
            return
        }

        newPassword = await hashPassword(newPassword, next)

        const user = await User.findById(currentUser._id)

        user.set({
            password: newPassword
        })

        const updatedUser = await user.save()


        res.status(201).json({
            type: "success", message: `password updated successfully`, data: {
                user: updatedUser
            }
        })
    } catch (err) {
        next(err)
    }
}




exports.deleteUser = async (req, res, next) => {
    try {
        const currentUser = res.locals.user

        if (currentUser._id != req.params.userId) {
            next({ status: 401, message: UNAUTH_ACTION_ERR })
            return
        }

        const user = await User.findById(currentUser._id)

        await user.remove()

        res.status(200).json({ type: "success", message: "User account deleted successfully", data: null })

        // TODO delete all likes ,comments and post from this user

    } catch (err) {
        next(err)
    }
}


/**
exports.fetchUsers = async (req,res,next) => {
    try{

    }catch(err){
        next(err)
    }
}
**/