require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logRoutes = require('./routes/logs');

const port=process.env.PORT||4000;
//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(port, ()=> {
        console.log("Connected to DB and Listening on port " + port);
    });
})
.catch(() => {

})

//Routes

app.use('/logs', logRoutes);


