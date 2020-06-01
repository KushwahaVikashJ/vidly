// const asyncMiddleware = require('../middleware/asyncMiddleware');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre,validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{

    // throw new Error('Something failed in server');
    
    const genre = await Genre.find().sort({name:1});
    res.send(genre);

});

router.get('/:id',async (req,res)=>{

  const genre = await Genre.findById(req.params.id); 

  if(!genre) return res.status(404).send('Not Found');

  res.send(genre);

});

// router.get('/api/courses/:id/:name',(req,res)=>{
//     res.send(req.query);
// });

router.post('/',[auth,admin],async (req,res)=>{
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    let genre = new Genre ({
        name: req.body.name
    });
    
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    const genre = await Genre.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name
        }
        },
        {
            new:true
    });

    if(!genre) return res.status(404).send('Not Found');

    res.send(genre);
})

router.delete('/:id', [auth,admin], async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('Not Found');

    res.send(genre);
})

module.exports = router;