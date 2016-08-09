// parses the window search bar for username
window.user = window.location.search.slice(10).replace(/%20/g, ' ');
var rooms = [];

// creates a chat div with children components
var Message = function (message) {
  var result = '';
  // var slicedText = message.text.slice(0, 100);
  if ( message.text === undefined ) {
    return;
  } else if ( message.text.length > 100 ) {
    message.text = message.text.slice( 0, 100 );
  }
  result += '<div class="username">' + message.username + '</div>';
  result += '<div class="text">' + message.text + '</div>';
  result += '<div class="roomname">' + message.roomname + '</div>';
  var chat = '<div class="chat">' + result + '</div>';
  return chat;
};

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function () {
  app.room = 'Lobby';
  window.rooms.push(app.room);
};

// sends message via AJAX POST
app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

// pulls data from server using AJAX GET, called from setInterval each second
app.fetch = function () {
  var result = $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'json',
    success: function(data) {
      app.clearMessages();
      for ( var i = 99; i >= 0; i-- ) {
        app.addMessage( data.results[i] );

        var roomname = data.results[i].roomname;
        // if roomname isn't in rooms array
        if (window.rooms.indexOf(roomname) === -1) {
          // add roomname to rooms array
          window.rooms.push(roomname);
          app.addRoom(roomname);
        }
      }
    }
  });
  return result.responseText;
};

// clears messages from screen, called from app.fetch every second
app.clearMessages = function () {
  $('#chats').children().remove();
};

// adds new messages to screen
app.addMessage = function ( object ) {
  if ( app.room === 'All' ) {
    var message = Message( object );
    $('#chats').prepend(message);   
  } else if ( object.roomname === app.room ) {
    var message = Message( object );
    $('#chats').prepend(message);
  }
};

// needs work
app.addRoom = function (room) {
  var roomName = '<option value="' + room + '">' + room + '</option>';
  $('#roomSelect').append(roomName);
};


app.selectRoom = function () {
  app.room = $('#roomSelect :selected').text();
}; 

// needs work
app.addFriend = function ( string ) {

};

// calls app.send
app.handleSubmit = function (text) {
  app.send({username: window.user, text: text, roomname: app.room});
  //need to update roomname
};

// html-encodes inputs from users
var htmlEncode = function ( value ) {
  if ( value.length > 100 ) {
    value = value.slice( 0, 100 );
  }
  return $('<div/>').text( value ).html();
};

$(document).ready( function () {

  app.init();

  $('body').on('click', '.username', function () {
    app.addFriend( $(this).text());
  });

  $('body').on('click', '.submit', function () {
    if ( $('#message-box').val().length === 0 ) { return; }
    var text = htmlEncode( $('#message-box').val());
    $('#message-box').val('');
    app.handleSubmit(text);
    //need to update roomname
  });

  $('body').on('keypress', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var text = htmlEncode( $('#message-box').val());
      $('#message-box').val('');
      app.handleSubmit(text);
      //need to update roomname
    }
  });

  // calls app.fetch every second
  setInterval(function() {
    app.selectRoom();
    app.fetch();
  }, 1000);
 
});