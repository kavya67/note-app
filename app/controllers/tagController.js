const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')

router.get('/', (req,res)=>{
    Tag.find()
    .then((tags)=>{
        res.json(tags)
    })
})

router.get('/:id',(req,res)=>{
    const id = req.params.id
    Tag.findById(id).populate('notes.note',['title','body'])
    .then(tag=> res.json(tag))
})

router.post('/',(req,res)=>{
    const body = req.body
    const tag = new Tag(body)
    tag.save()
    .then(tag=> res.json(tag))

})
module.exports = router