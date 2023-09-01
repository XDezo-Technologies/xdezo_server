const express=require('express');
const router=express.Router();

const search=require('../../controllers/search_controller/search_controller');
router.get("/search/:searchItem",search.findAll);


module.exports=router;