const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/Error');
const cookieParser = require('cookie-parser')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/Config.env")});


app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads')))


const products = require('./routes/Products');
const auth = require('./routes/Auth');
const order = require('./routes/Order');
const payment = require('./routes/Payment');


app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,'../frontend/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}

app.use(errorMiddleware)


module.exports = app;