const mongoose = require('mongoose')

const zadaciSchema = new mongoose.Schema({
    zadatak: {
        type: String,
        //required: true,
    },
    datum: {
      type: Date,
    },
    /*korisnik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Korisnik'
    }*/
  })
  
    zadaciSchema.set('toJSON', {
        transform:(doc, ret)=>{
          ret.id = doc._id.toString()
          delete ret._id
          delete ret.__v
          return ret
        }
    })
  
  module.exports = mongoose.model('Zadaci', zadaciSchema, 'zadaci')