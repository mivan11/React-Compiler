const Zadatak = require('../models/zadaci')	
const Korisnik = require('../models/korisnik')
const pocetnePoruke = [
  {
    id: 1,
    sadrzaj: 'Hello world!',
    datum: '2019-05-30T17:30:31.098Z',
  },
  {
    id: 2,
    sadrzaj: 'Hello world!',
    datum: '2019-05-30T18:39:34.091Z',
  },
  {
    id: 3,
    sadrzaj: 'dodatni zadatak',
    datum: '2019-05-30T18:39:34.091Z',
  }
]

const porukeIzBaze = async () => {
  const poruke = await Zadatak.find({})
  return poruke.map(p => p.toJSON())
}

const nepostojeciId = async () => {
  const poruka = new Zadatak({ zadatak: "", date: new Date() })
  await poruka.save()
  await poruka.remove()

  return poruka._id.toString()
}

const korisniciUBazi = async () => {
  const korisnici = await Korisnik.find({})
  return korisnici.map(k => k.toJSON())
}

module.exports = {
  pocetnePoruke, porukeIzBaze, nepostojeciId, korisniciUBazi
}