
const kodoviRouter = require('express').Router()
const Kodovi = require('../models/kodovi')

const express = require('express')
const cors = require('cors')
const app = express();

var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser())
var compiler = require('../compilex')
var option = {stats : true};
compiler.init(option);

app.use(cors());

   
kodoviRouter.get('/', async (req, res) => {
  const poruke = await Kodovi.find({})
      res.json(poruke)
})

/*kodoviRouter.get('/', (req, res) => {
    //res.send(res.data)
  
  })*/

kodoviRouter.delete('/', async (req, res) => {
    await Kodovi.find({}).deleteMany()//.remove({})
})
  
/*kodoviRouter.delete('/api/Kodovi/:id', (req, res, next) => {
    Poruka.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
  })*/

let izlaz=""
kodoviRouter.post('/',  (req, res, next) => {
    const podatak=req.body
    console.log(podatak.lang)
    console.log(podatak.kod)

    if(podatak.lang === "Python")
    {
        if(podatak.inputRadio === "true")
        {
            var envData = { OS : "windows", cmd: "python"};
            compiler.compilePythonWithInput(envData, podatak.kod, podatak.inputi, function(data){
                if(data.error)
                {
                    izlaz=data.error 	
                    res.send(izlaz)
                    //console.log(izlaz)	
                }
                else
                {
                    izlaz=data.output
                    console.log(izlaz)
                    res.send(izlaz)

                    
                }
                
                //izlaz=data.output
                //console.log(izlaz)
            })           
        }
        else
        {
            var envData = { OS : "windows", cmd: "python"};
            compiler.compilePython(envData , podatak.kod, function(data){
                if(data.error)
                {
                    izlaz=data.error 	
                    res.send(izlaz)
                    //console.log(izlaz)	
                }
                else
                {
                    izlaz=data.output
                    console.log(izlaz)
                    res.send(izlaz)

                    
                }
            }); 
        }

    }
    if (podatak.lang === "C")
    {        
        if(podatak.inputRadio === "true")
        {    
            var envData = { OS : "linux", cmd: "gcc"};
            compiler.compileCPPWithInput(envData, podatak.kod, podatak.inputi, function(data){
                if(data.error)
                {
                    izlaz=data.error 	
                    res.send(izlaz)
                    //console.log(izlaz)	
                }
                else
                {
                    izlaz=data.output
                    console.log(izlaz)
                    res.send(izlaz)
                }
            })    
	   }
	   else
	   { 	
	   	    var envData = { OS : "linux" , cmd : "gcc"};	   
        	compiler.compileCPP(envData , podatak.kod, function (data) {
                if(data.error)
                {
                    izlaz=data.error 	
                    res.send(izlaz)
                    //console.log(izlaz)
                }    	
                else
                {
                    izlaz=data.output
                    console.log(izlaz)
                    res.send(izlaz)
                }
            });
	   }
    }
  
    const poruka = new Kodovi({
        kod: podatak.kod,
        inputi: podatak.inputi,
        lang:podatak.lang,
        inputRadio:podatak.inputRadio,
        rezultati:izlaz,
        ime:podatak.ime,
        //rezultati: "string",
        datum: new Date()
    })
    //console.log(izlaz)
  
    if(podatak.id===-1)
    {
      console.log("minus jedan")
    }
    else{
        poruka.save().then(spremljenaPoruka => {
            //res.send(izlaz)
        })
    }
  }) 

module.exports = kodoviRouter