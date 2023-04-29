const mongoose =require("mongoose") 
const { Bool } = require("mongoose/lib/schema/index")
const userschema =mongoose.Schema({
tele_id:{
type: String,
required: true,
trim: true,
},    
name: {
type: String,
required: true,
trim: true,}
,
contact: {
type: String,
required: true,
trim: true,
}
})
const userModel = mongoose.model("Namma_user",userschema)
module. exports= userModel 






