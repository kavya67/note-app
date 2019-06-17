const express=require('express')
const Category=require('../models/category')
const Note = require('../models/note')
const router=express.Router()

router.get('/',(req,res)=>{
    Category.find()
    .then((categories)=>{
        res.json(categories)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/',(req,res)=>{
    const body = req.body
    const category = new Category(body)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.send(err)
    })
})
 
router.get('/:id',(req,res)=>{
    const id = req.params.id
    Promise.all([Category.findById(id), Note.find({ category: id})])
    .then((response)=>{
        res.json({
        category: response[0],
        notes: response[1]
        })
    })
  
})

router.put('/:id',(req,res)=>{
    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id, {$set:body}, {new:true})
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id
    Category.findByIdAndDelete(id)
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = router







