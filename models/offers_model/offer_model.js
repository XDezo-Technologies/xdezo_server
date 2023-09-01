const conn = require("../../database/database_connection");
const Offer=function(offer){
    this.offer_image=offer.offer_image;
    this.offer_name=offer.offer_name;
    this.offer_description=offer.offer_description;

}
Offer.create = (offer, result) => {
    conn.query("INSERT INTO offers SET ?", offer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      conn.query('SELECT offer_id FROM offers ORDER BY offer_id DESC LIMIT 1;', (err, selectRes) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
      
        const last_inserted_id = selectRes[0].offer_id; 
        console.log("created offer: ", { last_inserted_id, ...offer });
        result(null, { last_inserted_id, ...offer });
    });
  
     
    });
  };
  Offer.getAll = (result) => {
    let query = "SELECT offer_image, offer_name, offer_description FROM Offers";

    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  };
  Offer.remove = (offer_id, result) => {
    conn.query("DELETE FROM offers WHERE offer_id = ?", offer_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted tutorial with id: ", offer_id);
      result(null, res);
    });
  };
Offer.findById = (offer_id, result) => {
conn.query(`SELECT * FROM offers WHERE offer_id = ${offer_id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found offers: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        result({ kind: "not_found" }, null);
      });
  };


 
  Offer.updateById = (offer_id, offer, result) => {
    conn.query(
      "UPDATE offers SET offer_image = ?, offer_name = ?, offer_description = ? WHERE offer_id = ?",
      [offer.offer_image,offer.offer_name,offer.offer_description, offer_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Event with the id
          result({ kind: "not_found" }, null);
          return; 
        }
  
        console.log("updated Event: ", { id:offer_id , ...offer });
        result(null, { id: offer_id, ...offer });
      }
    );
  };
  module.exports = Offer;