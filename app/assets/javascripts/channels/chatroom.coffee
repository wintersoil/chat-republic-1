App.chatroom = App.cable.subscriptions.create "ChatroomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    App.Functions.readCookie = (name) ->
      nameEQ = name + "="
      ca = document.cookie.split(";")
      i = 0
      while i < ca.length
        c = ca[i]
        c = c.substring(1, c.length)  while c.charAt(0) is " "
        return c.substring(nameEQ.length, c.length).replace(/"/g, '')  if c.indexOf(nameEQ) is 0
        i++
      ca
    if data.owner_id != App.Functions.readCookie('user_id')
      $('.experimental-messages').append(data.mod_message);
      $('.experimental-messages .message-outer').addClass('messages-of-others');
      $('.messages-display').append($('.experimental-messages').html())
      $('.experimental-messages').empty();
      scroll_bottom();
      document.getElementById('hollow-copy').play();
      document.getElementById('hollow-copy-1').play();
    else if data.hasOwnProperty('mod_message')
      $('.messages-display').append(data.mod_message);
      scroll_bottom();
      document.getElementById('hollow-copy').play();
      document.getElementById('hollow-copy-1').play();
