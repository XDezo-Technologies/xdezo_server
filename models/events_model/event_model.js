const conn = require("../../database/database_connection");

const Event = function(event) {
  this.event_id = event.event_id;
  this.event_name = event.event_name;
  this.event_description = event.event_description;
  this.event_on = event.event_on;
  this.event_image = event.event_image;
};

Event.create = (event, result) => {
  conn.query("INSERT INTO events SET ?", event, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    conn.query('SELECT event_id FROM events ORDER BY event_id DESC LIMIT 1;', (err, selectRes) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
    
      const last_inserted_id = selectRes[0].event_id; 
      console.log("created Event: ", { last_inserted_id, ...event });
      result(null, { last_inserted_id, ...event });
  });
    
  });
};

Event.getAll = (result) => {
    let query = "SELECT * FROM events";

    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("events: ", res);
      result(null, res);
    });
  };

  Event.findById = (event_id, result) => {
    conn.query(`SELECT * FROM events WHERE event_id = ${event_id}`, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
        
            if (res.length) {
              console.log("found event: ", res[0]);
              result(null, res[0]);
              return;
            }
        
            result({ kind: "not_found" }, null);
          });
      };
    
      Event.updateById = (event_id, event, result) => {
        conn.query(
          "UPDATE events SET event_image = ?, event_name = ?, event_description = ?, event_on = ? WHERE event_id =?",
          [event.event_image, event.event_name, event.event_description, event.event_on, event_id],
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
      
            console.log("updated Event: ", { id:event_id , ...event });
            result(null, { id: event_id, ...event });
          }
        );
      };
    
      Event.remove = (event_id, result) => {
        conn.query("DELETE FROM events WHERE event_id = ?", event_id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            // not found events with the id
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted events with id: ", event_id);
          result(null, res);
        });
      };

module.exports = Event;
