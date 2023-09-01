
const CourseDetails = require("../../../models/courses_model/course_details_model/course_details_model");
const messageController=require('../../../sockets/socket_controllers/socket_notification_controller');
const socketManager=require('../../../sockets/socket_management/socket_manager');
// Create and Save multiple Course Details
exports.create = (req, res) => {
  // Validate request
  if (!req.body || req.body.length === 0) {
    res.status(400).send({
      message: "File upload is missing!",
    });
    return;
  }
  if (!req.file) {
    res.status(400).send({
      message: "File upload is missing!",
    });
    return;
  }

  const title=req.body.course_name;
const subtitle=req.body.course_chapter_name;
const image=req.file.filename;
const type="courses";
const description=req.body.course_description;

  const newCourse=new CourseDetails({
    course_name: title,
    course_description: description,
    course_categories_id: req.body.course_categories_id,
    course_img: image,
    course_chapter_name: subtitle,
    content_title: req.body.content_title,
    content_details: req.body.content_details
  });

  // Save multiple CourseDetails in the database
  CourseDetails.create(newCourse, (err, count) => {
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
      const id=count.last_inserted_id;
      console.log(id);
      messageController.sendMessage(socketManager.getIO(), {
        id,
        title,
        subtitle,
        image,
        type,
      });
      res.send(count);
     
    }
  });
};

exports.findAll = (req, res) => {
  CourseDetails.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Course Details.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findChapter = (req, res) => {
 const course_id= req.params.course_id;
  CourseDetails.getChapter(course_id,(err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Course Details.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findChapterContent = (req, res) => {
  const chapter_id= req.params.chapter_id;
   CourseDetails.getChapterContent(chapter_id,(err, data) => {
     if (err) {
       res.status(500).send({
         message: err.message || "Some error occurred while retrieving Course Details.",
       });
     } else {
       res.send(data);
     }
   });
 };



