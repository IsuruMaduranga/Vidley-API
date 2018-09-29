const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidley')
    .then(()=>console.log('Connected to the databse'))
    .catch(err=>consle.log('Error connescting the Database'))

//importing routes
const generes =  require('./routes/generes');

const app = express();

//express middlwear
app.use(express.json());

//3rd party middlewear
app.use(morgan('tiny'));

//routes
app.use('/api/generes',generes);


//running server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});