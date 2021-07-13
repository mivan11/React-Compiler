const express = require('express')
const cors = require('cors')
const app = express();

//var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser())
//var compiler = require('compilex');
//var option = {stats : true};
//compiler.init(option);

app.use(cors());

//const osnovniUrl='/api/poruke'
const config = require('./postavkeBaze/konfiguracija');
const kodoviRouter = require('./kontrola/kodovi');
const zadaciRouter = require('./kontrola/zadaci');
const korisniciRouter = require('./kontrola/korisnici')
const loginRouter = require('./kontrola/login')

const mongoose = require('mongoose')

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(result => {
  console.log("Spojeni smo na bazu");
}).catch(error => {
  console.log("Greška pri spajanju", error.message);
})

app.use('/api/Kodovi', kodoviRouter);
app.use('/api/Zadaci', zadaciRouter);
app.use('/api/korisnici', korisniciRouter)
app.use('/api/login', loginRouter)

const error = (req, res) => {
  res.status(404).send({ error: "Nevažeća ruta" });
}

app.use(error);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  //console.log(`Server sluša na portu ${PORT}`);
})

module.exports=app