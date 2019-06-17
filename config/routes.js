const express = require('express')
const router = express.Router() //1st approach
const notesController = require('../app/controllers/notesController')
const {authenticateUser} = require('../app/middlewares/authentication')

// NOTES ROUTE ->1st approach
router.get('/notes', authenticateUser, notesController.list)
router.post('/notes',authenticateUser, notesController.create)
router.get('/notes/:id',authenticateUser, notesController.show)
router.put('/notes/:id',authenticateUser, notesController.update)
router.delete('/notes/:id',authenticateUser, notesController.destroy)
router.delete('/notes/removeTag', authenticateUser, notesController.removeTag)


module.exports = router
