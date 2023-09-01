const CourseCategory=require('../../../models/courses_model/course_category_model/course_category_model');


exports.create= async(req,res)=>{

if(!req.body){
    res.status(400).send({
        message: "File upload is missing!",
      });
    return;
}
if (!req.file) {
    console.log("No file upload");
}

const newCourseCategory=new CourseCategory({
    id:req.body.categoery_id,
    Category_name:req.body.Category_name,
    course_category_img:req.file.filename
    

});

await CourseCategory.create(newCourseCategory,(err,data)=>{
    if (err) {
        res.status(400).send({
          message:"Something went wrong "
        });
        res.status(404).send({
          message:"Something went wrong too "
        });
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Course Category.",
        });
      } else {
        // Print the filenames of the uploaded images
        res.send({ CourseCategory: data });
      }
});

}


exports.getById=(req,res)=>{
    const categoery_id = req.params.categoery_id;
    
    CourseCategory.finalById(categoery_id,(err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving CourseCategorys.",
          });
        } else {
          res.send(data);
        }
      });

}

exports.findAll = (req, res) => {
      
  CourseCategory.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Course category."
      });
    else res.send(data);
  });
};