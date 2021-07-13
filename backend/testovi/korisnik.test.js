const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./testPomocni')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

beforeEach(async () => {
  await Korisnik.deleteMany({})

  const passHash = await bcrypt.hash('marko', 10)
  const korisnik = new Korisnik({username: 'marko', passHash})

  await korisnik.save()
})

describe('Kada imamo samo jednog korisnika u bazi', () =>{
  test('stvara se novi korisnik sa ispravnim username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'marko',
      ime: 'Marko Marić',
      pass: 'marko'
    }

    await api
    .post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  }) 

  test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'Ive',
      ime: 'Marko Marić',
      pass: 'oarwa'
    }

    await api
    .post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  }) 

})
afterAll(async () => {
  await mongoose.connection.close()
})