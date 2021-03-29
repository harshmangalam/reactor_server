const {Schema,model} = require("mongoose")

const postSchema = new Schema({
body:{
    type:String,
    trim:true,
},

media:[{
    fileName:String,
    mimeType:String,
}],

user:{
    type:Schema.Types.ObjectId,
    ref:"User"
},

},{timestamps:true})


module.exports = model("Post",postSchema)