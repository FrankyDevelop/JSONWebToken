const mongoose= require('mongoose');

  mongoose.connect('mongodb://localhost/prueba',{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
    .then(db=> console.log('Base de datos conectada'));