const express = require("express")
const checkAuth = require("../middlewares/checkAuth")
const router = express.Router()

const { handleRegister, handleLogin } = require("../controllers/auth.controllers")


router.post("/login", handleLogin)

router.post("/register", handleRegister)

module.exports = router