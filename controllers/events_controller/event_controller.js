const Event = require("../../models/events_model/event_model.js");
const messageController=require('../../sockets/socket_controllers/socket_notification_controller');
const socketManager=require('../../sockets/socket_management/socket_manager');
// Create and Save a new Event
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
const title=req.body.event_name;
const subtitle=req.body.event_description;
const image=req.file.filename;
const type="events";
  // Create a new Event instance
  const newEvent = new Event({
    event_name: title,
    event_description: subtitle,
    event_on: req.body.event_on,
    event_image: image,
  });

  // Save newEvent in the database
  Event.create(newEvent, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
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
      
    Event.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Events."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Event.findById(req.params.event_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found offers with id ${req.params.event_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving offers with id " + req.params.event_id
          });
        }
      } else res.send(data);
    });
  };


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
     
    const newEvent = new Event({
        event_id:req.params.event_id,
        event_name: req.body.event_name,
        event_description: req.body.event_description,
        event_on: req.body.event_on,
        event_image: req.file.filename,
      });
      console.log(newEvent);
    Event.updateById(req.params.event_id, newEvent,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Event with id ${req.params.event_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Event with id " + req.params.event_id
            });
          }
        } else {
            res.send(data);}
      }
    );
  };


  exports.delete = (req, res) => {
    Event.remove(req.params.event_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Events with id ${req.params.event_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Events with id " + req.params.event_id
          });
        }
      } else res.send({ message: `Events was deleted successfully!` });
    });
  };
