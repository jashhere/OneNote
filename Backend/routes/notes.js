        const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');     
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Routes 1 : Get all the notes using : GET "api/auth/register". Login required  
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id});
    res.json(notes)
} catch (error){
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
}    
})

// Routes 2 : Adding a new note using : POST "api/auth/addnote ". Login required  
router.post('/addnote',fetchuser, [
    body('title','Enter a valid Title').isLength({min: 3}),
    body('description','decription must be of 5 characters').isLength({min: 6}),], async (req,res)=>
    {
        try {
            
       
        const{ title,description , tag} = req.body;
    // if there are errors , then return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const note = new Note ({
        title,description,tag, user: req.user.id


    })
   const savedNote = await note.save()
 res.json(savedNote)
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    } 
 })
// Routes 3 : Updating an existing note using : PUT "api/auth/updatenote ". Login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
         const {title,description,tag} = req.body;
         try {
            
        
         // create a newNote object
         const newNote = {};
         if(title){newNote.title = title};
         if(description){newNote.description = description};
         if(tag){newNote.tag = tag};
      
         // find the note to be updated and update it
         let note = await Note.findById(req.params.id); 
        if(!note){return res.status(404).send("Not found")}
        
        
    if(note.user.toString() !== req.user.id){
       return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error){
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
} 
    })
    // Routes 4 : Deleting an existing note using : DELETE "api/auth/deletenote ". Login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
         // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id); 
   if(!note){return res.status(404).send("Not found")}
   
   //Allow deletion only if user owns the note
if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");
}

note = await Note.findByIdAndDelete(req.params.id)
res.json({"Sucess" : "The note has been deleted", note : note});
 } catch (error){
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
} 
})

module.exports = router