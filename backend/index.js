const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { error } = require("console");
const cloudinary = require('cloudinary');

// Handling Uncaught Exception :
process.on("uncaughtException", err=> {
    console.log("Error : ${err.message}");
    console.log("Shutting Down due to uncaught Exception ");
    process.exit(1);
})


//config 
dotenv.config({path:"./config/config.env"});

//connect to Database :
connectDatabase();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
});
  

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection :
process.on("unhandledRejection", err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down the Server due to unhandle promise rejection");

    server.close(() => {
        process.exit(1);
    })
})