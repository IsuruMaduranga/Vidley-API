const express = reqire('express');
const morgan = reqire('morgan');

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