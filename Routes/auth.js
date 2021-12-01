const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require('../Helpers/JWT')
const ExpressError = require('../ExpressError')
const router = new express.Router();
const db = require('../db')
const BCRYPT_WORK_FACTOR=12


/** Register user.
 *   {username, email, password, first_name,last_name} => token
 **/

 router.post("/register", async function (req, res, next) {
    try {
      const { username, password,first_name,last_name } = req.body;
      //hash password
      const hashedPassword = await bcrypt.hash(
        password, BCRYPT_WORK_FACTOR);
        //insert into databse
      const {rows}= await db.query(
        `INSERT INTO users (username, email, password, first_name,last_name
               VALUES ($1, $2)
               RETURNING username`,
        [username, hashedPassword,first_name,last_name]);
        //return token
        const token = JWT.getToken({email:rows[0].email})
      return res.json(token);
    } catch (err) {
      return next(err);
    }
  });



router.post('/login', async (req,res,next)=>{
    try {
        const {password, email} = req.body;
        const result= await db.query(
          `SELECT password FROM users WHERE email = $1`,[email]);
        //return if invalid email
        if(result.rowCount===0) throw new ExpressError('Invalid email or password',400)
        //verify token and user existence
        const hashWord= rows[0].password
        const match = await bcrypt.compare(password,hashWord)
        if(!match) throw new ExpressError('Invalid email or password',400)
        //if passwords match, return signed token object
        const token = await JWT.getToken({email})
        return res.send({token});
      } catch (err) {
        return next(err)
      }

})

module.exports = router