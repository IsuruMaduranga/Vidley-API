const express = reqire('express');
const Joi = require('joi');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send([]);
});

router.get('/:id',(req,res)=>{

});

router.post('/',(req,res)=>{

});

router.delete('/:id',(req,res)=>{

});


function validateGenere(genere){
    const schema = {
        name: Joi.string().replace();
    };

    return Joi.validate(genere,schema);
};

module.exports = router;