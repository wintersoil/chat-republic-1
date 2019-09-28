App.chatroom = App.cable.subscriptions.create "ChatroomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $ ->
      $('.experimental-messages').append(data.mod_message);
      if parseInt($('.experimental-messages .message-outer').attr('data-attr')) != parseInt($('.experimental-messages').attr('data-attr'))
        $('.experimental-messages .message-outer').addClass('messages-of-others');
        $('.messages-display').append(document.getElementsByClassName('experimental-messages').innerHTML)
        $('.experimental-messages').empty;
        scroll_bottom();
        document.getElementById('hollow-copy').play();
        document.getElementById('hollow-copy-1').play();
      else if data.hasOwnProperty('mod_message')
        $('.messages-display').append(data.mod_message);
        scroll_bottom();
        document.getElementById('hollow-copy').play();
        document.getElementById('hollow-copy-1').play();
        $('.experimental-messages').empty;
