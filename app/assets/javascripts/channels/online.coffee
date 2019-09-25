App.online = App.cable.subscriptions.create "OnlineChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    if data.hasOwnProperty('arrayez')
      i = 0
      while i < data.arrayez.length
        userId = data.arrayez[i].user_id
        eventType = data.arrayez[i].event
        if eventType == 'appear'
          $('#user_' + userId).addClass 'background-green-online'
          $('#user_' + userId).removeClass 'hidden-user'
          $('#user_' + userId + ' .online-logo').css('display', 'flex')
          $('#user_' + userId + ' .online-span').css('display', 'flex')
        else
          $('#user_' + userId).removeClass 'background-green-online'
          $('#user_' + userId).addClass 'hidden-user'
          $('#user_' + userId + ' .online-logo').css('display', 'none')
          $('#user_' + userId + ' .online-span').css('display', 'none')
        i=i+1
    else
      userId = data.user_id
      eventType = data.event
      if eventType == 'disappear'
        $('#user_' + userId).removeClass 'background-green-online'
        $('#user_' + userId).addClass 'hidden-user'
        $('#user_' + userId + ' .online-logo').css('display', 'none')
        $('#user_' + userId + ' .online-span').css('display', 'none')
