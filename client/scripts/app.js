// YOUR CODE HERE:

var app = {}
app.init = function() {};
app.send = function(postPackage) { // message = {username, text, roomname}
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(postPackage),
    contentType: 'application/json', //what does this mean?
    success: function (data) {
      console.log('chatterbox: Message sent: '+JSON.stringify(data));
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
      // console.log('Success');
    },
    dataType: 'json'
  });
};

setInterval(app.fetch, 1000); //display messages

var displayPosts = function(data){
  $('#messages').html('');
  var results = data.results;

  for(var i = 0; i<results.length;i++){
    var chat = results[i];
    // console.log(results[i]);
    var newDiv = $('<div></div>').text(chat['username']+': '+chat["text"]);
    $('#messages').append(newDiv);
  }
}; 

//write message
$(document).on('click','#submit', function(){
  var input = $('input').val();
  console.log(input);
  var message = {};
  message['username'] = 'Traitor on floor 6';
  message['text'] = input;
  message['roomname'] = 'HR floor 8';

  if(message === '') {
    alert('Message is empty, please try again');
    return;
  } else {
    console.log(message);
    app.send(message);
    $('input').val('');
  }
});

var trollText = [
"88888888888  88           ,ad8888ba,      ,ad8888ba,    88888888ba   ",
"88           88          d8aa    aa8b    aaa    aa8b   88      a8b  ",
"88           88         d8'        `8b  d8'        `8b  88      ,8P   ",
"88aaaaa      88         88          88  88          88  88aaaaaa8P'  ",
"88*****      88         88          88  88          88  88aaaa88'    ",
"88           88         Y8,        ,8P  Y8,        ,8P  88    `8b    ",
"88           88          Y8a.    .a8P    Y8a.    .a8P   88     `8b   ",
"88           88888888888  `sY8888Yla      aaY8888Yaa    88      `8b  ",
" ",
" ",
" ",
" ad88888ba                                                           ",
"d8     a8b                                                          ",
"Y8a     a8P                                                          ",
" aY8aaa8Pa                                                           ",
" ,d8aaa8b,                                                           ",
"d8a     a8b                                                          ",
"Y8a     a8P                                                          ",
" aY88888Pa                                                           ",
" ",
" ",
" ",
"88888888ba   88        88  88           88888888888  ad88888ba       ",
"88      a8b  88        88  88           88          d81     28b      ",
"88      a8P  88        88  88           88          Y8,              ",
"88aaaaaa8P'  88        88  88           88aaaaa     `Y8aaaaa,       " ,
"88aaaa88'    88        88  88           88aaaa       `aaaa8b,      ",
"88    `8b    88        88  88           88                  `8b     ", 
"88     `8b   Y8a.    .a8P  88           88          Y8a     a8P    "  ,
"88      `8b   `aY8888Yaa   88888888888  88888888888  aY88888Pa    "
];

for(var i = 0; i<trollText.length;i++){
  var message = {};
  console.log(trollText[i]);
  message['username'] = 'Traitor on floor 6';
  message['text'] = trollText[i];
  message['roomname'] = 'HR floor 8';
  app.send(message);
}
//send test: 
/*

{
  username: "PLCT",
  text: "what's up",
  roomname: '8th floor'
}
test ObjectId:

    url: "https://api.parse.com/1/classes/chatterbox/QmqKIzbsT7

*/



