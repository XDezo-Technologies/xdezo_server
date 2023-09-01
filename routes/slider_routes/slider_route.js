const express = require('express');
const router = express.Router();


slider= require('../../controllers/slider_controller/slider_controller');
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

router.post("/slider",upload.single("slider_image"),slider.create);
router.get("/slider", slider.findAll);
router.patch("/slider/:banner_id", slider.update);
router.delete("/slider/:banner_id", slider.delete);
module.exports= router;