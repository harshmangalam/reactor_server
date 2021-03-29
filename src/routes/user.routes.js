const express = require("express")
const checkAuth = require("../middlewares/checkAuth")

const { fetchAllUsers, fetchCurrentUser, fetchUserById, updateUser, changePassword, deleteUser, changeUsername } = require("../controllers/user.controllers")
const router = express.Router()


router.get("/", fetchAllUsers)

router.get("/me", checkAuth, fetchCurrentUser)

router.get("/:userId", fetchUserById)


router.patch("/:userId", checkAuth, updateUser)

router.patch("/changeUsername/:userId", checkAuth, changeUsername)

router.patch("/changePassword/:userId", checkAuth, changePassword)

router.delete("/:userId", checkAuth, deleteUser)



module.exports = router