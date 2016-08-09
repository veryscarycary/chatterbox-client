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

window.user = window.location.search.slice(10).replace(/%20/g, ' ');

var Message = function (message) {
  var result = '';
  result += '<div class="username">' + message.username + '</div>';
  result += '<div class="text">' + message.text + '</div>';
  result += '<div class="roomname">' + message.roomname + '</div>';
  // result += '<div class="createdAt">' + message.createdAt + '</div>';
  var chat = '<div class="chat">' + result + '</div>';
  return chat;
};

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function () {

};

app.send = function (message) {
  console.log(message);
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
    type: 'GET',
    data: 'json',
    success: function(data) {
      console.log('success', data);
    }
  });
  //needs to add message
  console.log(result);
  return result.responseText;
};

// window.getMessages = function(object) {
//   var messages = object.responseJSON.results;

//   for (var i = 0; i < messages.length; i++) {
//     $('body').append(messages[i]);
//   }
// };

setInterval(function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'json',
    success: function ( data ) {
      app.clearMessages();
      for ( var i = 10; i >= 0; i-- ) {
        app.addMessage( data.results[i] );
      }
    }
  });
}, 1000);

app.clearMessages = function () {
  $('#chats').children().remove();
};

app.addMessage = function ( object ) {
  // debugger;
  // var message = '<div class='message'> message.text';
  var message = Message( object );
  $('#chats').prepend(message);
};

app.addRoom = function (room) {
  var roomName = '<div>' + room + '</div>';
  $('#roomSelect').append(roomName);
};

app.addFriend = function ( string ) {

};

app.handleSubmit = function (text) {
  app.send({username: window.user, text: text, roomname: 'lobby'});
  //need to update roomname
};

$(document).ready( function () {
  $('body').on('click', '.username', function () {
    app.addFriend( $(this).text());
    console.log($('#message-box').val());
  });

  $('body').on('click', '.submit', function () {
    if ( $('#message-box').val().length === 0 ) { return; }
    var text = $('#message-box').val();
    $('#message-box').val('');
    console.log('hit');
    app.handleSubmit(text);
    //need to update roomname
  });

  $('body').on('keypress', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var text = $('#message-box').val();
      $('#message-box').val('');
      console.log('hit');
      app.handleSubmit(text);
      //need to update roomname
    }
  });
});




