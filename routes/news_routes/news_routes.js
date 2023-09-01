const express=require('express');
const router=express.Router();

const news=require('../../controllers/news_controller/news_controller');
const multer = require('multer');
const path = require('path');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'assets/images/')     // './public/images/' directory name where save the file
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

     
  router.post("/news",upload.single('news_img'),news.create);
  router.get("/news",news.findAll);
//   router.get("/news/:news_id",news.findOne);
  router.patch('/news/:news_id',upload.single('news_img'),news.update);
  router.delete("/news/:news_id",news.delete);





  module.exports=router;
  