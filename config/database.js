const mongoose = require('mongoose')

//connectexpress to mongo via mongoose 
//configure the promise library to be ES6 Promise

const connection_uri = `mongodb+srv://techmakers:Kavz@256@cluster0-n7fpr.mongodb.net/test?retryWrites=true&w=majority`

mongoose.Promise = global.Promise


//connect to db
mongoose.connect(connection_uri, {useNewUrlParser:true})
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db')
})

module.exports= mongoose