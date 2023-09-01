

const express = require('express');
const router=express.Router();

const quiz=require('../../controllers/quiz_controller/quiz_controller');


router.post("/quiz", quiz.create);
router.get("/quiz", quiz.findAll);
router.patch("/quiz/:quiz_id", quiz.update);
router.delete("/quiz/:quiz_id", quiz.delete);
module.exports=router;