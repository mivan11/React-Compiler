const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const pomocni=require('./testPomocni')
const Zadaci = require('../models/zadaci')

const api = supertest(app)

beforeEach(async () => {
  await Zadaci.deleteMany({})

  for (let poruka of pomocni.pocetnePoruke) {
    let porukaObjekt = new Zadaci(poruka)
    await porukaObjekt.save()
  }
})

test('poruke se vraćaju kao JSON', async () => {
   await api
    .get('/api/zadaci')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
 
test('dohvaća sve zadatke', async () => {
  const odgovor = await api.get('/api/zadaci')
  expect(odgovor.body).toHaveLength(pomocni.pocetnePoruke.length)
})

/*Ovaj test radi kad izbrišem sve poruke
test('ako nema nijedan zadatak', async () => {
  const odgovor = await api.get('/api/zadaci')
  expect(odgovor.body).toHaveLength(0)
})*/
  
test('dodavanje zadatka', async () => {
  const novaPoruka = {
    zadatak: 'dodatni zadatak',
  }
  await api
    .post('/api/zadaci')
    .send(novaPoruka)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})