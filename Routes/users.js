const express = require("express");
const ExpressError = require('../ExpressError')
const router = new express.Router();
const db = require('../db')


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


module.exports = router