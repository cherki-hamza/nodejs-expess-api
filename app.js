const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//middlewares
app.use(cors());
app.use(bodyParser.json());


// import Routes
const postsRoute = require('./routes/posts');

app.use('/posts' , postsRoute);


// Routes
app.get('/', (req, res) => {
  res.send('hello to home page');	
});




//connect to mongose database
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true,useUnifiedTopology: true},() =>{
    console.log('connected to db with success');   
 }
);


// start to listening to the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});