const express = require("express")
const mongoose = require("mongoose")


const app = express()

const { PORT, MONGODB_URI, NODE_ENV } = require("./config")
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors")
const endpoints = require("./endpoints")


// routers

const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")


if (NODE_ENV === "development") {
    const morgan = require("morgan")
    app.use(morgan("dev"))
}

app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).json({
        type: "success",
        message: "server is up and running",
        data: null,
    })
})

app.get("/api/", (req, res) => {
    res.status(200).json({
        type: "success",
        message: "api endpoint",
        data: endpoints
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/users",userRoutes)

app.use("*", (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR
    }
    next(error)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || SERVER_ERR
    res.status(status).json({
        type: "error",
        message,
        data: {
            status,
        }
    })
})

async function main() {
    try {

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,

        })

        console.log("database connected")

        app.listen(PORT, () => {
            console.log(`app started on port ${PORT}`)
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
        sys
    }
}

main()