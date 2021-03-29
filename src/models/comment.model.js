const { Schema, model } = require("mongoose")

const commentSchema = new Schema({

    body: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }

}, { timestamps: true })


module.exports = model("Like", commentSchema)