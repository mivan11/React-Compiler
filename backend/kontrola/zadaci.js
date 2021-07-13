const jwt = require('jsonwebtoken')
const zadaciRouter = require('express').Router()
const Zadaci = require('../models/zadaci')
const Korisnik = require('../models/korisnik')

/*zadaciRouter.get('/', (req, res) => {
  const zadaci = Zadaci.findOne(req.params.zadatak)
  res.send(zadaci.toString())
  //console.log(zadaci)

})*/

const dohvatiToken = req => {
  const auth =req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}
	
zadaciRouter.get('/', async (req, res) => {
  const zadaci = await Zadaci.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(zadaci)
 
})

zadaciRouter.get('/:id', (req, res) => {
  const poruka = Zadaci.findById(req.params.id)
  if (poruka) {
    res.json(poruka)
  } else {
    res.status(404).end()
  }
})

zadaciRouter.delete('/', async (req, res) => {
    await Zadaci.find({}).deleteMany()//.remove({})
})

zadaciRouter.post('/',  (req, res, next) => {
    //let izlaz=""
    const podatak = req.body
   /* const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    }
    const korisnik = Korisnik.findById(dekToken.id)*/
   //const korisnik = Korisnik.findById(req.body.korisnikId)
    console.log(podatak.zadatak)
    const zadaci = new Zadaci({
        zadatak: podatak.zadatak,
        datum: new Date(),
        //korisnik: korisnik._id
    })
    zadaci.save().then(spremljenaPoruka => {
        console.log(zadaci)
        res.send(zadaci)
    })
    
    /*const spremljenaPoruka = zadac.save()
    korisnik.zadac = korisnik.zadac.concat(spremljenaPoruka._id)
    korisnik.save()
  
    res.json(spremljenaPoruka)*/
    /*const spremljenaPoruka =  zadaci.save()
    korisnik.zadaci = korisnik.zadaci.concat(spremljenaPoruka._id)
    korisnik.save()
    res.send(spremljenaPoruka)*/
  }) 

module.exports = zadaciRouter