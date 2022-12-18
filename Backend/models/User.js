const mongoose = require('mongoose');
const validator = require('validator');
// schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minLength:5,
        require:true
    
    },
    email:{
        type:String,
        unique:true,
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid");
            }
        }
    },
    password:{
        type:String,
        minLength:8,
        require:true
    },
});

// model
const User = new mongoose.model("User",userSchema);
module.exports = User;