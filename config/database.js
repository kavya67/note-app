const mongoose = require('mongoose')

//connectexpress to mongo via mongoose 
//configure the promise library to be ES6 Promise
const path = `mongodb://localhost:27017/blog-feb-app`

 

mongoose.Promise = global.Promise


//connect to db
mongoose.connect(path, {useNewUrlParser:true})
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db')
})

module.exports= mongoose