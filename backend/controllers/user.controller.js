const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken');

//create tokens
const createtoken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
}
//login user

const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.login(email,password);

        //create a token;
        const token = createtoken(user._id);

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//signup user
const signup = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.signup(email,password);
        //creating token for user.
        const token = createtoken(user._id);
        res.status(200).json({email,token})

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}


module.exports = {signup,login}