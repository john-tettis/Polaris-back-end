const express = require('express');
const userRouter = require('./Routes/users')
const authRouter = require('./Routes/auth')
const ExpressError = require("./expressError")
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/users", userRouter);
app.use("/auth",authRouter);

app.get('/', (req, res) => {
    res.send('Successful response.');
  });


  // 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
//generic error handler 
app.use((error,req,res,next)=>{
  console.log(error)
    return res.status(error.status||500).json({error})

  })

  module.exports = app