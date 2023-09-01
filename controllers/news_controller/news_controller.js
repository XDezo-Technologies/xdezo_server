const News = require("../../models/news_model/news_model");
const messageController=require('../../sockets/socket_controllers/socket_notification_controller');
const socketManager=require('../../sockets/socket_management/socket_manager');
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    if (!req.file) {
      console.log("No file upload");
    }

    const title= req.body.news_title;
    const subtitle= req.body.news_description;
    const image= req.file.filename;
    const type= "news";
  
    // Create a new News instance
    const newNews = new News({
        news_img:image,
        news_title :title,
        news_description : subtitle,
        news_writer:req.body.news_writer
        
    
    });
  
    // Save newNews in the database
    News.create(newNews, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the News.",
        });
      } else {
        const id=data.last_inserted_id;
        console.log(id);
        messageController.sendMessage(socketManager.getIO(), {
          id,
          title,
          subtitle,
          image,
          type,
        });
        res.send(data);
      }
    });
  };
  
  exports.findAll = (req, res) => {
        
      News.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Newss."
          });
        else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        News.remove(req.params.news_id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found News with id ${req.params.news_id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete News with id " + req.params.news_id
              });
            }
          } else res.send({ message: `News was deleted successfully!` });
        });
      };
    
      exports.update = (req, res) => {
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
         
        const newNews = new News({
            news_img:req.file.filename,
        news_title :req.body.news_title,
        news_description : req.body.news_description,
        news_writer:req.body.news_writer
          });
      
        News.updateById(req.params.news_id, newNews,
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Event with id ${req.params.news_id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Event with id " + req.params.news_id
                });
              }
            } else {
                res.send(data);}
          }
        );
      };
    
    