const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    isAdmin:Boolean
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('jsonPrivateKey'));
    return token;
}

const User = mongoose.model('user',userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(5).max(255)
    }

    return Joi.validate(user,schema);
}


module.exports.User = User;
module.exports.validate = validateUser;