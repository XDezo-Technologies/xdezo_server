const notification = [];

function addNotification(notifications) {
  notification.push(notifications);
}

function getAllNotification() {
  return notification;
}

module.exports = { addNotification, getAllNotification };
