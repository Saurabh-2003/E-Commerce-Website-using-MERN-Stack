const cookieParser = require("cookie-parser");
const express  = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');

const errorMiddlleWare = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


dotenv.config({path:"./config/config.env"});
  
// ROute Imports :
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute')


app.use("/api/v1",product);
app.use("/api/v1", user);
app.use("/api/v1",order);
app.use("/api/v1", payment);

// Middleware for error 
app.use(errorMiddlleWare);

module.exports = app
