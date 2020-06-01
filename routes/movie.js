const {Movie,validate} = require('../models/movies');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    const movie = await Movie.find().sort({title:1});
    res.send(movie);
});

router.get('/:id',async (req,res)=>{
  const movie = await Movie.findById(req.params.id); 

  if(!movie) return res.status(404).send('Not Found');

  res.send(movie);
});


router.get('/genere/:genereName',async(req,res)=>{

    const movie = await Movie.find({'genre.name': req.params.genereName});

    // const query = {
    //     genre: {
    //         name: req.params.genereName
    //     }
    // }
    //const movie = await Movie.find(query);
    
    res.send(movie);
});


// router.get('/api/courses/:id/:name',(req,res)=>{
//     res.send(req.query);
// });

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send(error.details[0].message);

    
    let movie = new Movie ({
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    
    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    const genre = Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            genre: {
                _id:genre._id,
                name:genre.name
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        }},
        {
            new:true
    });

    if(!movie) return res.status(404).send('Not Found');

    res.send(movie);
})

router.delete('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('Not Found');

    res.send(movie);
})

module.exports = router;