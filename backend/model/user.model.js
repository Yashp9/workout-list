const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})
//static signup method.
userSchema.statics.signup = async function(email,password){
    if(!email || !password){
        throw Error ('all field must be filled ');
    }

    if(!validator.isEmail(email)){
        throw Error ('please enter valid emial ');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('please enter the strong password');
    }

    //it will check if the email is present in db,this refers to the whole model.
    const exists = await this.findOne({email});
    if(exists){
        throw new Error('Email already is use')
    }
    
    const salt = await bcrypt.genSalt(10)
    //creating hashed password.
    const hash = await bcrypt.hash(password,salt);

    //.create() is a convenient Mongoose method to add new documents to the database quickly. Instead of creating a new object and then calling .save()
    const user = await  this.create({email,password:hash})
    return user;
}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw new Error('all fields must be filled')
    }
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }
    //comparing password typed by user1 with user1 actual hashed password.
    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw Error('incorrect password');
    }
    return user;
}

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;