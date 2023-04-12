const mongoose =require("mongoose") 
const { Bool } = require("mongoose/lib/schema/index")

const rideschema =mongoose.Schema({

    tele_id:{
        type: String,
        required: true,
        trim: true,
        },   
        ride_id: {
            type: String,
            required: true,
            trim: true,
            }, 
        ridefrom: {
        type: String,
        required: true,
        trim: true,
        },
        rideto:{
        type: String,
        required: true,
        trim: true,

        },
        src:{
            type: Array,
            required: true,
            trim: true,
        },
        dest:{
            type: Array,
            required: true,
            trim: true,
        },
        fare:{
            type: Number,
            required: true,
            trim: true,
        },
        status:{ 
            type: "string",
            required: true,
            trim: true,

        },
        issaved:{
            type: Bool,
            required: true,
            trim: true,

        },date: {
            type: String,
            default: () => new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata', // Replace with your timezone
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })
          }



})

const rideModel = mongoose.model("Namma_rides",rideschema)
module. exports= rideModel