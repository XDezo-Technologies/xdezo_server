const Offer = require("../../models/offers_model/offer_model.js");
const messageController=require('../../sockets/socket_controllers/socket_notification_controller');
const socketManager=require('../../sockets/socket_management/socket_manager');

// Create and Save a new Offer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    if (!req.file) {
      console.log("No file upload");
  }
  const title= req.body.offer_name;
    const subtitle= req.body.offer_description;
    const image= req.file.filename;
    const type= "offers";
    // Create a Offer
    const Offers = new Offer({
        offer_image: image,
        offer_name: title,
        offer_description: subtitle,
      
    });
  
    // Save Offer in the database
    Offer.create(Offers, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Offer."
        });
      else {
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
      
    Offer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Offer."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Offer.findById(req.params.offer_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found offers with id ${req.params.offer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving offers with id " + req.params.offer_id
          });
        }
      } else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    Offer.remove(req.params.offer_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer with id ${req.params.offer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Offer with id " + req.params.offer_id
          });
        }
      } else res.send({ message: `Offer was deleted successfully!` });
    });
  };

  

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
   
  const updateOffers = new Offer({
    offer_image: req.file.filename,
    offer_name: req.body.offer_name,
    offer_description: req.body.offer_description,
  
});
    console.log(updateOffers);
  Offer.updateById(req.params.offer_id, updateOffers,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.offer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.offer_id
          });
        }
      } else {
          res.send(data);}
    }
  );
};




