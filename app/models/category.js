const mongoose=require('mongoose')
const Schema=mongoose.Schema

const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    notes:{
        note:{
            type:Schema.Types.ObjectId,
            ref:"Note"
        }
    }
})

const Category=mongoose.model('Category',categorySchema)

module.exports=Category
 