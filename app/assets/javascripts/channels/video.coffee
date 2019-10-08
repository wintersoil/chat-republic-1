App.video = App.cable.subscriptions.create "VideoChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    if data.hasOwnProperty("audio")
      console.log "HEY I CAME !"
      $("#receiving-audio").append(data.audio_data);
    img = document.getElementById("returned-photo")
    if data.hasOwnProperty("image")
      img.src = data.image
