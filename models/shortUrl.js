const mongoose = require('mongoose')
const shortId = require('shortid')
const shortUrlSchema = new mongoose.Schema({
        full: {
            type: String,
            required: true
        },
        short: {
            type: String,
            required: true,
            //inbuilt library that generates short id for us
            default: shortId.generate
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        }
    })
    //first argument is name of our model
module.exports = mongoose.model('ShortUrl', shortUrlSchema)