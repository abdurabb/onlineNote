const express = require('express')
const user_route = express.Router();
const UserControllerLogin = require('../../controller/UserController/UserLogin')
const UserControllerNote = require('../../controller/UserController/Note')
const userControllerTokenCheck = require('../../controller/UserController/TokenCheck')

const userAuth=require('../../middleware/UserAuth')

user_route.post('/register',UserControllerLogin.register)
user_route.post('/login',UserControllerLogin.login)
user_route.post('/addNewNote',UserControllerNote.addNewNote)
user_route.get('/noteData',UserControllerNote.getNoteData)
user_route.delete('/deleteNoteData',UserControllerNote.deleteNote)
user_route.patch('/updateNote',UserControllerNote.editeNote)
user_route.get('/token_check',userAuth,userControllerTokenCheck.tokenCheck)
module.exports = user_route;