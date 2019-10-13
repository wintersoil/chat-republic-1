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
          otherSignOn = parseInt($("#which-user").attr("data-attr"),10) != parseInt(userId,10)
          if data.arrayez[i].hasOwnProperty('controller')
            controller = data.arrayez[i].controller
            console.log controller
          if eventType == 'appear' && controller == "chatroom"
            if data.arrayez[i].hasOwnProperty('chatroom_mod_message')
              if document.querySelector('#online2 #user_' + userId) != null
                $("#online2 #user_" + userId).remove()
              $('#online2').append data.arrayez[i].chatroom_mod_message
            $("#card-inner-buttons-" + userId).css("display", "inline-block")
          else if eventType == 'appear'
            if document.querySelector('#online2 #user_' + userId) != null
              $("#online2 #user_" + userId).remove()
            $("#card-inner-buttons-" + userId).css("display", "inline-block")
            if data.arrayez[i].hasOwnProperty('modded_message')
              if document.querySelector('.online-table #user_' + userId) != null
                $('.online-table #user_' + userId).remove()
              $('.online-table table').append data.arrayez[i].modded_message
            if otherSignOn == true
              $('.online-notification-bar-wrapper').css('display', 'flex')
              $('.online-notification-bar').css('display', 'flex')
              first_name = data.arrayez[i].first_name
              last_name = data.arrayez[i].last_name
              stringyHTML = "<img src='https://vectr.com/wintersoil/a1gzED9FjB.svg?width=640&height=640&select=a1gzED9FjBpage0' height='70px' width='70px'/><div class='inner-text'>#{first_name} #{last_name} is online now</div>"
              document.getElementsByClassName('online-notification-bar').item(0).innerHTML = stringyHTML
              $('.online-notification-bar').animate({width:$('.inner-text').width()+70}, 1000, () ->
                $('.online-notification-bar').animate({width:'60px'}, 1000, () ->
                  $('.online-notification-bar').css('display', 'none')
                  $('.online-notification-bar-wrapper').css('display', 'none')
                  ))
          else if eventType == 'disappear'
            if document.querySelector('.online-table #user_' + userId) != null
              $('.online-table #user_' + userId).remove()
            if document.querySelector('#online2 #user_' + userId) != null
              $("#online2 #user_" + userId).remove()
            $("#card-inner-buttons-" + userId).css("display", "none")
          i=i+1
      else
        userId = data.user_id
        eventType = data.event
        if eventType == 'disappear'
          if document.querySelector('.online-table #user_' + userId) != null
            $('.online-table #user_' + userId).remove()
          if document.querySelector('#online2 #user_' + userId) != null
            $("#online2 #user_" + userId).remove()
          $("#card-inner-buttons-" + userId).css("display", "none")
