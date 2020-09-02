const { Router } = require('express');
const router= Router();

const jwt= require('jsonwebtoken');

const User= require('../models/user');

const config = require('../config');

const verifyToken= require('../controllers/verifyToken')
//registrarse
router.post('/registro', async (req,res,next)=>{
    //res.json('kha?');
    const {username,email,password}=req.body;
    const user= new User({
        username,
        email,
        password
    });
    user.password= await user.encryptPassword(user.password);
    await user.save();
     
    /*JSON web Token*/
    const token= jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 24//un dia en segundos
    })

    console.log(user)
    res.json({auth: true,token});
});

//Loguearse
router.post('/login', async (req,res,next)=>{
    const {email,password} = (req.body);
    const user = await User.findOne({email: email});

    if (!user) {
        return res.status(404).send("no existe el usuario");
    }
     
    //Valdiar usuario
    const passwordValido=await user.validatePassword(password);
    if (!passwordValido) {
        return res.status(401).json({auth: false,token: null});
        
    }
    console.log(passwordValido)
    
    //asignarle un token de acceso
    const token = jwt.sign({id: user._id},config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true,token});
});

//Navegar por la aplicacion
router.get('/perfil', verifyToken,async  (req,res,next)=>{
    
    //para no devolder un dato solo se pone {dato:0 }
    const user= await User.findById(req.userId, {password:0 });

    if (!user) {
       return res.status(404).send("No existe el usuario")        
    }

    res.json(user)
});

module.exports= router;