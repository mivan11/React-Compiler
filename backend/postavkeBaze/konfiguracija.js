require('dotenv').config()

const PORT = process.env.PORT
const pass = process.env.ATLAS_PASS

const dbname = 'NovaBaza'
const DB_URI=`mongodb+srv://heroku:${pass}@cluster0.x8bcp.mongodb.net/${dbname}?retryWrites=true&w=majority`

console.log("Spajam se na bazu");

module.exports = {PORT, DB_URI}