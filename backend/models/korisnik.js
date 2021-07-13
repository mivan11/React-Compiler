const mongoose = require('mongoose')
 
const korisnikSchema = new mongoose.Schema({
    username: String,
    ime: String,
    passHash: String,
    /*zadaci : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Zadaci'
        }
    ],*/
})
	
korisnikSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        // Lozinka se ne bi trebala prikazati
        delete ret.passHash
        return ret
    }
})
 
const Korisnik = mongoose.model('Korisnik', korisnikSchema, 'korisnici')
module.exports = Korisnik