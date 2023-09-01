const messages = [];

function addMessage(message) {
  messages.push(message);
}

function getAllMessages() {
  return messages;
}

module.exports = { addMessage, getAllMessages };
