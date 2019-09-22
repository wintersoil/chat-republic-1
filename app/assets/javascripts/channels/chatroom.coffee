App.chatroom = App.cable.subscriptions.create "ChatroomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    if data.hasOwnProperty('mod_message')
      $('.messages-display').append(data.mod_message)
      scroll_bottom();
      document.getElementById('hollow-copy').play();
      document.getElementById('hollow-copy-1').play();
