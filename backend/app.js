//EXPRESS APP --> A big channel of middleware, a funnel where REQUEST come through and can be
//                manipulated,read or RESPONSES like send a response


const express = require('express');             //Import Express
const postsRoutes = require("./routes/posts")   //Import the posts routes
const bodyParser = require("body-parser");      //Request Body import for Post Request
const mongoose = require('mongoose')            //Import mongoose package


const app = express();                                    //Create an express App
app.use(bodyParser.json());                               //Initialize bodyparser
app.use(bodyParser.urlencoded({extended: false}));


//mongoDB connection
mongoose.connect("mongodb+srv://Juri:EOISZYVFghfxa7DD@cluster0.3mkbu.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to a database')
  })
  .catch(() => {
    console.log('Connection Failed');
  });


//CORS  Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-Auth-Token");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});

//Using Routes with link
app.use("/api/posts", postsRoutes)

module.exports = app


//EXAMPLE
//  SENDS A REQUEST
// app.use((req, res, next) =>{
//   console.log('First Middleware');
//   next();
// })
// SENDS A RESPONSE BACK
// app.use((req, res, next) =>{
//   res.send('Hello From Express')
// })


// (req --> Request ,res --> Response,next --> next() when executed the request will continue its journey)
//(app.use --> middleware for ex.)


