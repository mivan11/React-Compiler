
const mongoose = require('mongoose')

const kodoviSchema = new mongoose.Schema({
    kod: {
        type: String,
        required: true,
        minlength: 3
    },
    inputi: {
        type: String,
    },
    lang: {
        type:String,
    },
    inputRadio: {
        type:String,
    },
    rezultati: {
        type: String,
    },
    ime: {
        type: String,
    },
    datum: {
        type: Date,
    }
})

kodoviSchema.set('toJSON', {
    transform:(doc, ret)=>{
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

module.exports = mongoose.model('Kodovi', kodoviSchema, 'kodovi')


