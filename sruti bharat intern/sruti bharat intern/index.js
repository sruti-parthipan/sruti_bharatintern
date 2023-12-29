const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


const connectDB = require('/Bharat intern RF/db');

const app = express();
dotenv.config();

const port =process.env.PORT || 3000;



connectDB();

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});


const Registration = mongoose.model("Registration",registrationSchema)
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/register" , async(req,res)=>{
    try {
         const{uname,email,password} = req.body;
         const exsistingData = await Registration.findOne({password : password});
         if (!exsistingData) {
            const registrationData = new Registration({
                uname,
                email,
                password,
            });
             registrationData.save();
            await res.redirect("/green");  
         }
         else{
            console.log("Done");
            res.redirect("green");
         }
           
        }
    catch (error) {
        res.redirect("/error");
        console.log(error);
    }
})

app.get("/green",(req,res)=>{
    res.sendFile(__dirname + "/views/green.html");
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/views/error.html");
})

app.listen(port , ()=>{
    console.log(`Server is Running ${port}`)
})