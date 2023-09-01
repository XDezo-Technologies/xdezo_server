const express=require('express');
const router=express.Router();

const CourseCategory=require('../../../controllers/courses_controller/course_category_controller/course_category_controller')
const multer = require('multer');
const path = require('path');


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
 
  router.post("/course-category",upload.single('category_image'),CourseCategory.create);
router.get("/course-categoery/:categoery_id",CourseCategory.getById);
router.get("/course-categoery",CourseCategory.findAll);


module.exports=router;