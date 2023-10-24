const express = require('express')
const{ObjectId} = require('mongodb');
const path = require('path');
const ejs = require("ejs");
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose");
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
const cors = require("cors");
const Train = require("./models/trainModel")
const Login = require("./models/login")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/todoapp?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/backend')));
app.use(methodOverride('_method'))

app.set('view engine', 'ejs'); 
app.use('/public', express.static('public')) 


app.listen(8080, function() {
    console.log('listening on 8080')
  }) 

app.get('/', function(요청, 응답) { 

  응답.sendFile(__dirname +'/index.html')
})

app.get('/login', function(요청,응답){
  console.log("login requested")
  응답.render('login.ejs') }
);

app.post('/login', async function(요청, 응답){ 
    var 입력한아이디 = 요청.body.id
    var 입력한비번 = 요청.body.pw
    console.log(입력한아이디, 입력한비번)
   
    const user = await Login.findOne({ id: 입력한아이디 }); 
    
    if (!user) { return {message: '존재하지않는 아이디요' }}

    입력한아이디 = user.id
    if (입력한비번 == user.pw) {
      console.log("result2")
      return (null, user)

    } else {
      console.log("result3")
      return { message: '비번틀렸어요' }
    }
  });


app.post('/register', async function(요청, 응답) {
  console.log(요청.body)
  try {
    const login = await Login.create(요청.body)
    응답.status(200).json(login);
  } catch (error) {
    console.log(error)
    응답.status(500).json({message: error.message})
  }
})


app.get('/train', async function(요청, 응답) { 
  const train = await Train.find()
    console.log(요청.body)
    응답.render('traintable.ejs', { 사용자: 요청.user, posts : train })
});


app.get('/trainbyuser/:user', async function(req, res) { 
  const user = req.params.user
  console.log(user)
  const results = await Train.find({user : user})
  if (!results) {
    res.json("err");
  } else {
    res.json(results);
  }
});

app.get('/uploadtrain', function(요청, 응답) { 
  
  응답.sendFile(__dirname +'/uploadData.html')
})

app.post('/train', async function(요청, 응답){
  
  console.log(요청.body)
 
  var my_date = new Date()
  console.log(my_date)
  date = JSON.stringify(my_date).split("T")[0]
 
  console.log(date)
 
  var 저장할거 = {
    user: 요청.body.user,
    pushup: 요청.body.pushup, 
    stomach: 요청.body.stomach,
    squat: 요청.body.squat,
    arm: 요청.body.arm,
    uplift: 요청.body.uplift,
    upheel: 요청.body.upheel,
    kick_on_chair: 요청.body.kick_on_chair,
    spreading_thigh: 요청.body.spreading_thigh,
    date: date
   } 
  console.log(저장할거)
  var train = await Train.create(저장할거)
  if(!train) {
    응답.status(500).json({message: "DB Error"})
  }
  응답.redirect('/train');
})

app.delete('/delete', async function(요청,응답){
  let _id = 요청.body
  console.log(요청.body)
  const train = await Train.findByIdAndDelete(_id)
  if(!train) {
    응답.status(500).json({message: "DB Error"})}

  else {
    console.log("data deleted")
  응답.redirect('/train')}
})

app.get("/getusers", async (req, res) => {
  const results = await Login.find();
    if (!results) {
      res.json("err");
    } else {
      res.json(results);
    }
  });

  app.post("/createuser", async (req, res) => {
    console.log(req.body)
    const user = req.body;
    const newUser = new Login(user);
    await newUser.save();
    res.json(user);
  });

  app.delete('/deleteuser/:id', async function(req,res){
    let id = req.params.id
   
    const results = await Login.deleteOne({_id:id})
     if (!results) {
       res.json("err");
     } else {
       console.log(results)
       res.json(results);
     }
   });