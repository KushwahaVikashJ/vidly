const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{

 const {error} = validate(req.body);
 if(error) return res.status(400).send('Invalid email or password');

 const user = await User.findOne({ email : req.body.email});
 if(!user) return res.status(400).send('User Not Exists');

 const validPass = await bcrypt.compare(req.body.password, user.password); 
 if(!validPass) return res.status(400).send('Invalid password');

 const token = user.generateAuthToken();
 res.header('x-auth-token',token).send('Logged In');
})

function validate(req){

    const schema = {

        email : Joi.string().min(5).max(50).required().email(),
        password : Joi.string().min(5).max(255).required()

    }
    return Joi.validate(req,schema);   

}


module.exports = router;