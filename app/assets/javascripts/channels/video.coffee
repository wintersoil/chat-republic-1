App.video = App.cable.subscriptions.create "VideoChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    img = document.getElementById("returned-photo")
    console.log data.data.image
    img.src = data.data.image
