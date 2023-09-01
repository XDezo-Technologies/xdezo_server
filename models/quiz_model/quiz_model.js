const conn = require("../../database/database_connection");
const Quiz = function (quiz) {
    this.question = quiz.question;
    this.answer = quiz.answer;
    this.quiz_option = quiz.quiz_option;
}
// to create question for the quiz
Quiz.create = (quiz, result) => {
    const optionsString = JSON.stringify(quiz.quiz_option); // Convert options to a JSON string
    const sql = 'INSERT INTO quiz (question, answer, quiz_option) VALUES (?, ?, ?)';
    const values = [quiz.question, quiz.answer, optionsString];

    conn.query(sql, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created quiz: ", { id: res.insertId, ...quiz });
        result(null, { id: res.insertId, ...quiz });
    })
};

// Method to retrieve all quiz entries from the database
Quiz.getAll = (result) => {
    const query = 'SELECT * FROM quiz'; // Replace 'quiz_table' with your actual table name.
    conn.query(query, (err, res) => {
        if (err) {
            console.log('Error fetching quiz data:', err);
            return result(err, null);
        }
        return result(null, res);
    });
};

Quiz.updateById = (quiz_id, quiz, result) => {
    const optionsString = JSON.stringify(quiz.quiz_option); // Convert options to a JSON string
    const sql = "UPDATE quiz SET question=?, answer= ?, quiz_option=? where quiz_id = ? ";
    const values = [quiz.question, quiz.answer, optionsString, quiz_id];
    conn.query(sql, values, (err, res) => {


        if (err) {

            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { ...quiz });
    }
    );
};
Quiz.remove = (quiz_id, result) => {
    conn.query("DELETE FROM quiz WHERE quiz_id = ?", quiz_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted quiz with id: ", quiz_id);
        result(null, res);
    });
}
module.exports = Quiz;