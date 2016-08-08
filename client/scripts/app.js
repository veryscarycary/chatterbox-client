// https://api.parse.com/1/classes/messages


// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

var Message = function (message) {
  var result = '';
  result += '<div class="username">' + message.userName + '</div>';
  result += '<div class="text">' + message.text + '</div>';
  result += '<div class="roomName">' + message.roomName + '</div>';
  result += '<div class="createdAt">' + message.createdAt + '</div>';
  var chat = '<div class="chat">' + result + '</div>';
  return chat;
};

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function () {};

app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  var result = $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET'
  });

  console.dir(message);
};

app.clearMessages = function () {
  $('#chats').children().remove();
};

app.addMessage = function ( object ) {
  // var message = '<div class='message'> message.text';
  var message = Message( object );
  $('#chats').append(message);
};

app.addRoom = function (roomName) {
  var roomName = '<div>' + roomName + '</div>';
  $('#roomSelect').append(roomName);
};


app.addFriend = function ( object ) {

};
