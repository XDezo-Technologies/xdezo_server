const express=require('express');
const router=express.Router();

const event=require('../../controllers/events_controller/event_controller');
const multer = require('multer');
const path = require('path');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './assets/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

     
  router.post("/events",upload.single('event_image'),event.create);
  router.get("/events",event.findAll);
  router.get("/events/:event_id",event.findOne);
  router.patch('/events/:event_id',upload.single('event_image'),event.update);
  router.delete("/events/:event_id",event.delete);





  module.exports=router;
  