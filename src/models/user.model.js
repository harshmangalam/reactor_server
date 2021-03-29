const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        trim: true,
        required: true
    },

    bio: {
        type: String,
        trim: true,
    },

    profilePic: {
        type: String,
        trim: true,
        default: "default.png",
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male"
    },


}, { timestamps: true })


// static method

// get user by username

userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username })
}


module.exports = model("User", userSchema)