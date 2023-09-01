const Notification=require('../../models/notification_model/notification_model');
const messageController=require('../../sockets/socket_controllers/socket_notification_controller');
const socketManager=require('../../sockets/socket_management/socket_manager');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Can't left empty!"
        });
    }
    if (!req.file) {
        console.log("No image uploaded");
    }
    const userId= req.body.userId;
    const title= req.body.title;
    const subtitle= req.body.subtitle;
    const image= req.file.filename;
    const type= req.body.type;
    const id= req.body.id;
    const notification = new Notification({
        userId:userId,
        title:title,
        subtitle:subtitle,
        image: image,
        type:type,
        id:id
    });
  

    Notification.create(notification, (err, data) => {
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


     exports.findOne = (req, res) => {
         Notification.findById((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Notification with user id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Notification with user id " + req.params.userId
          });
        }
      } else  res.send(data);
    });
};

