const assyncHandler = require('express-async-handler');
const User= require('../Models/User');
const generateToken = require('../config/generateToken')


const registerUser= assyncHandler(async (req, res)=>{
    const { name, email,password, picture} = req.body 

    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please enter those fields")
    }

    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400);
        throw new Error("User Exists")
    }
    const newUser = await User.create({
        name,
        email,
        password,
        picture
    });

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email:newUser.email,
            picture:newUser.picture,
            token:generateToken(newUser._id)
        });
    }else{
        res.status(400);
        throw new Error("Failed create User")
    }
});

const authUser= assyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const findUser = await User.findOne({email});

    if(findUser && (await findUser.matchPassword(password))){/*this matchPassword is not taken directly from the User model but from the returned query */
        res.json({
            _id: findUser._id,
            name: findUser.name,
            email:findUser.email,
            picture:findUser.picture,
            token:generateToken(findUser._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed create User")
    }
});

module.exports={registerUser, authUser}