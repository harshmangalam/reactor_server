const {Schema,model} = require("mongoose")

const likeSchema = new Schema({
type:{
    type:String,
    enum:["post"],
    required:true,
},


user:{
    type:Schema.Types.ObjectId,
    ref:"User"
},

post:{
    type:Schema.Types.ObjectId,
    ref:"Post"
}

},{timestamps:true})


module.exports = model("Like",likeSchema)