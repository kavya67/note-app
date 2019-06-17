const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 5
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{ //mongoose
            validator: function(value){
                return validator.isEmail(value) //package
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },

    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})


userSchema.pre('save',function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
                .then(function(encryptedpassword){
                    user.password = encryptedpassword
                    next()
                })
        })
    }else{
        next()
    }

})

userSchema.statics.findByCredentials = function(email, password){ //return Promise object
    const User = this // refers to User model
    return User.findOne({email}) //es6 {email :email}
        .then(function(user){
            if(!user){
                return Promise.reject('Invalid email / password')
            }

            return bcryptjs.compare(password, user.password) //returns boolean value
                    .then((result)=>{
                       if(result){
                            return Promise.resolve(user)
                       }else{
                           return Promise.reject('Invalid email / password')
                       }
                    })

        })
        .catch((err)=>{
            return Promise.reject(err) 
                // //return new Promise(function(resolve, rehject){
                //     reject(err)
                // })
        })
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData //1. validatio of token
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch(err){
        return Promise.reject(err)

    }

    //2.whther the token belongs to the user
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })

     
}



//own instance method // token generation
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date()) //stroing it as millisecond

    }

    const token = jwt.sign(tokenData, 'jwt@123') //token genration
    user.tokens.push({
        token
    })

    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

const User = mongoose.model('User',userSchema)

module.exports = {
    User
}
