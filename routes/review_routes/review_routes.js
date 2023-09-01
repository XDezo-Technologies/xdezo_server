const express=require('express');
const router=express.Router();

const review=require('../../controllers/review_controller/review_controller');

router.post('/review',review.create);
router.get("/review/:course_id",review.getById);

module.exports=router;
