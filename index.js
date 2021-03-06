const express =  require('express')
const mongoose = require('./config/database')
const Note = require('./app/models/note')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3005
const path = require("path");


//1st approach
const router = require('./config/routes')

//2nd approach
const categoriesRouter = require('./app/controllers/categoriesController')
const tagsRouter = require('./app/controllers/tagController')
const  usersRouter  = require('./app/controllers/userController')

app.use(express.json())
app.use(cors())

app.use('/',router)//-->1st approach //localhost.3005/
// app.use('/notes',notesRouter)

app.use('/categories',categoriesRouter) //-->2nd approach//localhost:3005/categories
app.use('/tags', tagsRouter)
app.use('/users',usersRouter)
app.use(express.static(path.join(__dirname,"client/build")))
app.get("*",(req,res)=>{
	res.sendFile(path.join(__dirname + "/client/build/index.html"))
})



app.listen(port,()=>{
    console.log('listening to port', port)
})