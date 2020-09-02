const { Router } = require('express');
const router= Router();

const User= require('../models/user');

router.post('/registro', (req,res,next)=>{
    //res.json('kha?');
    const {username,email,password}=req.body;
    const user= new User({
        username: username,
        email:email,
        password:password
    });
    user.password= user.encryptPassword(user.password);
    console.log(user)
    res.json({message:'Received'});
});

router.post('/login', (req,res,next)=>{
    res.json('login');
});

router.get('/perfil', (req,res,next)=>{
    res.json('perfil');
});

module.exports= router;