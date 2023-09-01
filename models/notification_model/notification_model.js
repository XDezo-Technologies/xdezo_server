const con=require('../../database/database_connection');

const Notification = function(notification) {
    this.notificationId = notification.notificationId;
    this.userId=notification.userId,
    this.title=notification.title,
    this.subtitle=notification.subtitle,
    this.image=notification.image,
    this.type=notification.type,
    this.id=notification.id,
    this.readStatus=notification.readStatus,
    this.description=notification.description
    
  };

    Notification.create = (notification, result) => {
    conn.query("INSERT INTO notifications (`user_id`, `title`, `subtitle`, `image`,id, type) value(?,?,?,?,?,?)", 
    [notification.userId,notification.title,notification.subtitle,notification.image,notification.id,notification.type], (err, insertRes) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        conn.query('SELECT notification_id FROM notifications ORDER BY notification_id DESC LIMIT 1;', (err, selectRes) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
          
            const last_inserted_id = selectRes[0].notification_id; 
            console.log("created notification: ", {last_inserted_id, ...notification });
            result(null, { last_inserted_id, ...notification });
        });
    });
};

  Notification.findById = (result) => {
    conn.query(`SELECT * FROM notifications WHERE  read_status = 'unread'`, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
        
            if (res.length) {
              console.log("found notification: ", res);
              result(null, res);
              return;
            }
        
            result({ kind: "not_found" }, null);
          });
      };
  
    module.exports=Notification;
