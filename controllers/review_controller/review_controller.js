const Review=require('../../models/review_model/review_model');

exports.create= async(req,res)=>{

if(!req.body){
    res.status(400).send({
        message: "File upload is missing!",
      });
    return;
}

const newReview=new Review({
    course_id:req.body.course_id,
    user_id:req.body.user_id,
    rating:req.body.rating,
    review_description:req.body.review_description

});

await Review.create(newReview,(err,data)=>{
    if (err) {
        res.status(400).send({
          message:"Something went wrong "
        });
        res.status(404).send({
          message:"Something went wrong too "
        });
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Course Details.",
        });
      } else {
        // Print the filenames of the uploaded images
        res.send({ review: data });
      }
});

}


exports.getById=(req,res)=>{
    const course_id = req.params.course_id;
    
    Review.finalById(course_id,(err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews.",
          });
        } else {
          res.send(data);
        }
      });

}