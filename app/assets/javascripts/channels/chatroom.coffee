App.chatroom = App.cable.subscriptions.create "ChatroomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    function getCookie(name) {
      var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
      var result = regexp.exec(document.cookie);
      return (result === null) ? null : result[1];
    }
    if data.owner_id != getCookie('user_id')
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
