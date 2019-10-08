App.private = App.cable.subscriptions.create "PrivateChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $ ->
      $('.experimental-messages').append(data.mod_message);
      if parseInt($('.experimental-messages .private-message-all').attr('data-attr')) != parseInt($('.experimental-messages').attr('data-attr'))
        $('.experimental-messages .private-message-all').addClass('private-message-others');
        $('.private-messages-container').append(document.getElementsByClassName('experimental-messages').item(0).innerHTML)
        document.getElementsByClassName('experimental-messages').item(0).innerHTML = '';
        scroll_bottom_private();
        document.getElementById('hollow-copy').play();
        document.getElementById('hollow-copy-1').play();
      else if data.hasOwnProperty('mod_message')
        $('.private-messages-container').append(data.mod_message);
        scroll_bottom_private();
        document.getElementById('hollow-copy').play();
        document.getElementById('hollow-copy-1').play();
        document.getElementsByClassName('experimental-messages').item(0).innerHTML = '';
