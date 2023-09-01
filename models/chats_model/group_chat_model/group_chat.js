const conn = require('../../../database/database_connection');

const Message = function(message){
    this.messageId = message.messageId;
    this.groupName = message.groupName;
    this.content = message.content;
    this.senderId = message.senderId;
    this.timestamp = message.timestamp;
    this.readStatus = message.readStatus;
};

Message.create = (message, result) => {
    conn.query(
        "INSERT INTO group_chat (`group_name`, `message`, `sender_id`) VALUES (?, ?, ?)",
        [message.groupName, message.content, message.senderId],
        (err, insertRes) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            const last_inserted_id = insertRes.insertId;
            console.log("created message: ", { messageId: last_inserted_id, ...message });
            result(null, { messageId: last_inserted_id, ...message });
        }
    );
};

Message.getAll = (result) => {
    conn.query(
        "SELECT * FROM group_chat",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null,res);
        }
    );
};

module.exports = Message;
