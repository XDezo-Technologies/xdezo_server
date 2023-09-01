const conn = require("../../database/database_connection");
const Slider = function (slider) {
    this.image_name = slider.image_name;
}

Slider.create = (slider, result) => {
    conn.query("INSERT INTO app_banner(banner_image) value(?)", slider.image_name, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created slider: ", { id: res.insertId, ...slider });
        result(null, { id: res.insertId, ...slider });
    });
};

Slider.getAll = (result) => {
    const query = 'SELECT * FROM app_banner';
    conn.query(query, (err, res) => {
        if (err) {
            console.log('Error fetching slider data: ', err);
            return result(err, null);
        }
        return result(null, res);
    });
};

Slider.updateById = ( banner_id, slider, result) => {

    const query = "UPDATE app_banner SET banner_image= ? where banner_id= ?";

    conn.query(query,[slider,banner_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { ...slider });
    }
    );
};

Slider.remove = (image_id, result) => {
    conn.query("DELETE FROM slider WHERE image_id = ?", image_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted image with id: ", image_id);
        result(null, res);
    });
}

module.exports = Slider;