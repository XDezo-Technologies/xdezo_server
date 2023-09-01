const express=require('express');
const { getFile } = require('../../controllers/image_controller/image_controller');
const router=express.Router();


 
router.get('/images/:path',getFile);


  module.exports=router;