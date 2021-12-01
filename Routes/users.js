const express = require("express");
const ExpressError = require('../ExpressError')
const router = new express.Router();
const db = require('../db')
const createQuery = require('../Helpers/createQuery')

//retrieve id, username, first name, last name, 
//email and default location on specified user
router.get('/:id', async (req,res,next)=>{
    try{
    let {rowCount,rows} = await db.query('SELECT id,username,first_name,last_name, email,def_location FROM users WHERE id = $1',[req.params.id])
        if(rowCount===0) throw new ExpressError('Invalid userId', 404)
        res.json(rows[0])
    }
    catch(e){
        return next(e)
    }
})
//edit user in database by id
router.patch('/:id', async(req,res,next)=>{
    try {
        let id = req.params.id;
        let data = req.body
        let {query,values} = createQuery(data,id);
        const result = await db.query(`UPDATE users SET ${query}`,values)
        return res.status(200).json({message:'updated user'})
    } catch (error) {
        return next(error)
    }
  
})


module.exports = router