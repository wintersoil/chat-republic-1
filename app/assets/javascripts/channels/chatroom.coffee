App.chatroom = App.cable.subscriptions.create "ChatroomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $('.messages-display').append(data.mod_message)
    scroll_bottom();
    audio1 = new Audio();
    audio1.play();
    audio1.src = document.getElementById('hollow-copy').src;
    audio1.play();
    audio1.src = document.getElementById('hollow-copy-1').src;
    audio1.play();
