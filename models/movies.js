const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');
const movieSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },

    genre:{
        type:genreSchema,
        required:true
    },

    numberInStock : {
        type:Number,
        required:true,
        min:0,
        max:255
    },

    dailyRentalRate : {
        type:Number,
        required:true,
        min:0,
        max:255
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().required().min(2).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    }

    return Joi.validate(movie,schema);
}


module.exports.validate = validateMovie;
module.exports.Movie = Movie;
