const mongoose = require('mongoose')
const Tag = require('./tag')


// Schema - Object Constructor Function
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    // field : { configuration}
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    category: { //used in populate
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags:[{
        tag:{
            type: Schema.Types.ObjectId,
            ref:'Tag'   
            }
    }],
    isPinned: {
        type: Boolean,
        default:false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

//mongoose middleware

NoteSchema.post('save',function(){
    const note=this
    note.tags.forEach(function(tagItem){
        Tag.findById(tagItem.tag)
        .then(tag=>{
            tag.notes.push({note:note._id})
            tag.save() 
        })
        .then(function(){
            next()
        })
    })
    
})


// model based on the schema 
const Note = mongoose.model('Note', NoteSchema) // OCF

module.exports = Note