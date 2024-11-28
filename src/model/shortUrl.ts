import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default: ()=>{
            return `https://shorturl.com/${nanoid().substring(0,3)}`
        }
        

    },
    clicks:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const UrlModel = mongoose.model("ShortUrl",shortUrlSchema);