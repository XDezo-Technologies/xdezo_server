const express=require('express');
const router=express.Router();

const offer=require('../../controllers/offer_controller/offer_controller');
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
 
router.post("/offers",upload.single('offer_image'),offer.create);
router.get("/offers/:offer_id",offer.findOne);
router.get("/offers",offer.findAll);
router.patch("/offers/:offer_id",upload.single('offer_image'),offer.update);
router.delete("/offers/:offer_id",offer.delete);



  module.exports=router;