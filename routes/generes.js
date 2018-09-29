const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const mongodb =  require('mongodb');

const router = express.Router();

const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    }
});

const Genere = mongoose.model('Genere',genereSchema);

router.get('/',async (req,res)=>{
    const generes=await Genere.find().sort('name');
    res.send(generes);
});

router.get('/:id',async (req,res)=>{
    const id = req.params.id;

    if(!mongodb.ObjectID.isValid(id)) return res.status(400).send('Invalid ID');

    const genere = await Genere.findById(req.params.id);
    if(!genere) return res.status(404).send('Not found')
    res.send(genere);
});

router.post('/',async (req,res)=>{
    const {error} = validateGenere(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let genere =  new Genere({
        name: req.body.name
    });

    genere = await genere.save();

    res.send(genere);
});

router.put('/:id',async (req,res)=>{
    const id = req.params.id;
    if(!mongodb.ObjectID.isValid(id)){
        return res.status(400).send('Invalid ID');
    }

    const {error} = validateGenere(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genere =  await Genere.findByIdAndUpdate(id,{
        name: req.body.name
    },{new:true})

    if(!genere){
        return res.status(404).send('Not found');
    }

    res.send(genere);
});



router.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    if(!mongodb.ObjectID.isValid(id)){
        return res.status(400).send('Invalid ID');
    }

    const genere =  await Genere.findByIdAndRemove(id)

    if(!genere){
        return res.status(400).send('Not found');
    }

    res.send(genere);
});


function validateGenere(genere){
    const schema = {
        name: Joi.string()
    };

    return Joi.validate(genere,schema);
};

module.exports = router;