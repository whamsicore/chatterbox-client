// YOUR CODE HERE:

var app = {}
app.init = function() {
  var rooms = findRooms(window.data.results);
  printRooms(rooms);
};

app.send = function(postPackage) { // message = {username, text, roomname}
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(postPackage),
    contentType: 'application/json', //what does this mean?
    success: function (data) {
      // console.log('chatterbox: Message sent: ');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message:'+JSON.stringify(data));
    }
  }); //ajax
};


app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function(data){
      displayPosts(data);
      window.data = data; 
      // console.log('Success');
    },
    dataType: 'json'
  });
};

var printRooms = function(rooms) {
  $('#chatrooms').html('');
  // $('#chatrooms').append("<option value='All Rooms'>All Rooms</option>")
  var defaultOption = $('<option></option>').val('All Rooms').text('All Rooms'); 
  $('#chatrooms').append(defaultOption);
  for (var key in rooms) {
    var newOptions = $('<option></option>').val(key).text(key);
    $('#chatrooms').append(newOptions);
  }
};

var findRooms = function(messageArray) { //should accept results array from window.data
  var result = {};
  // debugger
  for(var i = 0; i < messageArray.length; i++) {
    var message = messageArray[i];
    var key = message.roomname;
    result[key] = key;
  }
  // console.log('result:'+JSON.stringify(result));
  return result;
};

setInterval(app.fetch, 1000); //display messages

app.fetch();
setTimeout(function(){
  app.init();

}, 1000);

var displayPosts = function(data, roomname){
  $('#messages').html('');
  var results = data.results;


  for(var i = 0; i<results.length;i++){
    var chat = results[i];
    // console.log(results[i]);
    if(chat['roomname'] === window.chatRoom) {
      var newDiv = $('<div></div>').text(chat['username']+': '+chat["text"]);
      $('#messages').append(newDiv);
    }else if(window.chatRoom === 'All Rooms'){
      var newDiv = $('<div></div>').text(chat['username']+': '+chat["text"]);
      $('#messages').append(newDiv);

     //if
    }
    
  }
}; 

//write message
$(document).on('click','#submit', function(){
  var input = $('input').val();
  var message = {};
  message['username'] = 'P&C';
  message['text'] = input;
  message['roomname'] = 'Payton And Chris Say Hi!';

  if(message === '') {
    alert('Message is empty, please try again');
    return;
  } else {
    app.send(message);
    $('input').val('');
  }
});

$(document).on('click', '#chatrooms', function(){
  console.log('clicked');
  app.init();
});

// $(document).on('click', '#chatrooms option', function(){
//   console.log('clicked options');
//   // app.init();
// });

$(document).on('click', '#chatrooms option', function(){
  console.log('clicked options');
  window.chatRoom =  $("#chatrooms").val();
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



