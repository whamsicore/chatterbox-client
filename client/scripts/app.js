// YOUR CODE HERE:
window.friends = {};
var app = {};

app.username = '';

app.init = function() {
  var rooms = app.findRooms(window.data.results);
  app.printRooms(rooms);
};

app.send = function(postPackage) { // message = {username, text, roomname}
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(postPackage),
    contentType: 'application/json', //what does this mean?
    success: function(data) {
      // console.log('chatterbox: Message sent: ');
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message:' + JSON.stringify(data));
    }
  }); //ajax
};


app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function(data) {
      app.displayPosts(data);
      window.data = data;
      // console.log('Success');
    },
    dataType: 'json'
  });
};

app.login = function() {
  $("#logindiv").css("display", "block");
  $(document).on("click", "#login", function() {
    user = $("#name").val();
    if (user === "") {
      user = "Guest";
    }
    app.username = user;
    $("#logindiv").css("display", "none");
    $("#username").text(app.username);
  });
};

app.printRooms = function(rooms) {
  $('#chatrooms').html(''); //clear previous options
  var defaultOption = $('<option></option>').val('All Rooms').text('All Rooms');
  $('#chatrooms').append(defaultOption);
  for (var key in rooms) {
    var newOptions = $('<option></option>').val(key).text(key);
    $('#chatrooms').append(newOptions);
  }
  var fakeOption = $('<option></option>').val('').text('-------------');
  $('#chatrooms').prepend(fakeOption);
};

app.findRooms = function(messageArray) { //should accept results array from window.data

  var result = {};
  // debugger
  for (var i = 0; i < messageArray.length; i++) {
    var message = messageArray[i];
    var key = message.roomname;
    if (key !== undefined && key !== null && key !== '') {
      result[key] = key;
    } //if
  } //for
  // console.log('result:'+JSON.stringify(result));
  return result;
};

app.login();

setInterval(app.fetch, 1000); //display messages

app.fetch();

setTimeout(function() {
  app.init();

}, 1500);

app.displayPosts = function(data, roomname) {
  $('#messages').html('');
  var results = data.results;


  for (var i = 0; i < results.length; i++) {
    var chat = results[i];
    // console.log(results[i]);
    var newDiv = $('<div></div>');
    var nameSpan = $("<span class='chatName'></span>").text(chat['username']);
    var textSpan = $("<span class='chatText'></span>").text(": " + chat['text']);
    newDiv.append(nameSpan).append(textSpan);

    if (chat['username'] in window.friends) { // note: if chat['username'] is inside window.friends object, bold the newDiv element by adding 'friend' class
      console.log('adding class to user: ' + chat['username']);
      newDiv.addClass('friends');
    }

    if (chat['roomname'] === window.chatRoom) {
      $('#messages').append(newDiv);
    } else if (window.chatRoom === undefined || window.chatRoom === 'All Rooms') {
      $('#messages').append(newDiv);
    } //if
  } //for
};

//write message
$(document).on('click', '#submit', function() {
  var input = $('input').val();
  var message = {};
  message['username'] = app.username;
  message['text'] = input;
  message['roomname'] = window.chatRoom;

  if (message === '') {
    alert('Message is empty, please try again');
    return;
  } else {
    app.send(message);
    $('input').val('');
  }
});

$(document).on('click', '#chatrooms', function() {
  console.log('clicked');
  app.init();
});

// func: Befriend user
$(document).on('click', '#messages .chatName', function() {
  var name = $(this).text();
  console.log('chat clicked()' + name);
  if (name in window.friends) {
    delete window.friends[name];
  } else {
    window.friends[name] = true;
  } //if
  // app.init();
});

$(document).on('change', 'select', function() {
  console.log('clicked options');
  window.chatRoom = $("#chatrooms").val();
  // app.init();
});

/*

{
  username: "PLCT",
  text: "what's up",
  roomname: '8th floor'
}
test ObjectId:

    url: "https://api.parse.com/1/classes/chatterbox/QmqKIzbsT7

*/