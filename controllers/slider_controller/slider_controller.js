// const e = require("express");
const Slider = require("../../models/slide_model/slider_model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Can't left empty!"
        });
    }
    if (!req.file) {
        console.log("No image uploaded");
    }
    const slider = new Slider({
        image_name: req.file.filename
    });

    Slider.create(slider, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Error occurred"
            });
            res.status(400).send({
                message:
                    err.message || "Error occurred"
            });
            res.status(404).send({
                message:
                    err.message || "Error occurred"
            });
        }
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Slider.getAll((err, data) => {
        if (err){
            return res.status(500).send({
                message: err.message || 'Error occured while fetching slider data'
            });
        }
        res.send(data);
    });
}


exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty"
    });
  }

  const updateSlider = new Slider({
    image_name : req.body.image_name
  });
  Slider.updateById(req.params.banner_id, updateSlider.image_name,
    (err, data) => {
      if (err) {
        if (err.kind === "not found") {
          res.status(404).send({
            message: `Not found Slider with id ${req.params.banner_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Slider with id" + req.params.banner_id
          });
        }
      } else {
        res.send(data);
      }
    }
  );
}


exports.delete = (req, res) => {
    Slider.remove(req.params.image_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found image with id ${req.params.image_id}`
          });
        } else {
          res.status(500).send({
            message: "Could not delete image with id " + req.params.image_id
          });
        }
      } else res.send({ message: `Image was deleted successfully!` });
    });
  };