App.online = App.cable.subscriptions.create "OnlineChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $ ->
      if data.hasOwnProperty('arrayez')
        i = 0
        while i < data.arrayez.length
          userId = data.arrayez[i].user_id
          eventType = data.arrayez[i].event
          if eventType == 'appear'
            $('#user_' + userId).addClass 'background-green-online'
            $('#user_' + userId + ' .online-logo').css('display', 'flex')
            $('#user_' + userId + ' .online-span').css('display', 'inline-block')
            $('.online-notification-bar-wrapper').css('display', 'flex')
            $('.online-notification-bar').css('display', 'flex')
            stringy3 = "user_#{userId}_online-users-home-page"
            console.log stringy3
            stringy2 = document.getElementById(stringy3).innerHTML
            console.log stringy2
            stringyHTML = "<img src='https://vectr.com/wintersoil/a1gzED9FjB.svg?width=640&height=640&select=a1gzED9FjBpage0' height='70px' width='70px'/><div class='inner-text'>#{stringy2} is online now</div>"
            document.getElementsByClassName('online-notification-bar').item(0).innerHTML = stringyHTML
            $('.online-notification-bar').animate({width:'300px'}, 1000, () ->
              $('.online-notification-bar').animate({width:'60px'}, 1000, () ->
                $('.online-notification-bar').css('display', 'none')
                $('.online-notification-bar-wrapper').css('display', 'none')
                ))
          else
            $('#user_' + userId).removeClass 'background-green-online'
            $('#user_' + userId + ' .online-logo').css('display', 'none')
            $('#user_' + userId + ' .online-span').css('display', 'none')
          i=i+1
      else
        userId = data.user_id
        eventType = data.event
        if eventType == 'disappear'
          $('#user_' + userId).removeClass 'background-green-online'
          $('#user_' + userId + ' .online-logo').css('display', 'none')
          $('#user_' + userId + ' .online-span').css('display', 'none')
