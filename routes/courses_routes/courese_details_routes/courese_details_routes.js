const express=require('express');
const router=express.Router();

const courseDetails=require('../../../controllers/courses_controller/course_details_controller/course_details_controller');
const multer = require('multer');
const path = require('path');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'assets/images/') ;   // './public/images/' directory name where save the file
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

     
  router.post("/course-details",upload.single('course_image'),courseDetails.create);
  router.get("/course-details",courseDetails.findAll);
  router.get("/course-chapter/:course_id",courseDetails.findChapter);
  router.get("/course-content/:chapter_id",courseDetails.findChapterContent);







  module.exports=router;