const e = require("express");
const Quiz = require("../../models/quiz_model/quiz_model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Can't be left empty!"
    });
  }
  if (!req.file) {
    console.log("No question upload");
  }
  const quiz = new Quiz({
    question: req.body.question,
    answer: req.body.answer,
    quiz_option: req.body.quiz_option
  });

  Quiz.create(quiz, (err, data) => {
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
  // Retrieve all quiz data from the database
  Quiz.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Error occurred while fetching quiz data.',
      });
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty"
    });
  }

  const updateQuiz = new Quiz({
    question: req.body.question,
    answer: req.body.answer,
    quiz_option: req.body.quiz_option
  });
  console.log(updateQuiz);
  Quiz.updateById(req.params.quiz_id, updateQuiz,
    (err, data) => {
      if (err) {
        if (err.kind === "not found") {
          res.status(404).send({
            message: `Not found Quiz with id ${req.params.quiz_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Quiz with id" + req.params.quiz_id
          });
        }
      } else {
        res.send(data);
      }
    }
  );
}
exports.delete = (req, res) => {
  Quiz.remove(req.params.quiz_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quiz with id ${req.params.quiz_id}`
        });
      } else {
        res.status(500).send({
          message: "Could not delete quiz with id " + req.params.quiz_id
        });
      }
    } else res.send({ message: `Quiz was deleted successfully!` });
  });
};