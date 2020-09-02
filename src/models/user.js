const {Schema,model} = require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema=new Schema({
    username: String,
    email: String,
    password: String
});

//encriptacion de password
userSchema.method.encryptPassword = async (password)=>{
 const salt= await bcrypt.genSalt(10);
 return bcrypt.hash(password,salt);
};

module.exports=model('User',userSchema); 