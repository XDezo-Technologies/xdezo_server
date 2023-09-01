const express=require('express');
const router=express.Router();

const notification=require('../../controllers/notification_controller/notification_controller');
const multer = require('multer');
const path = require('path');
const socketManager = require('../../sockets/socket_management/socket_manager');


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


  router.post("/notification",upload.single('notification_image'),notification.create);
router.get("/notification",notification.findOne);

module.exports=router;

