App.appearance = App.cable.subscriptions.create "AppearanceChannel",

  connected: ->
  #  @appear()

  disconnected: ->
#    @uninstall()

  #rejected: ->
  #  @uninstall()

  #appear: ->
  #  @perform("appear", appearing_on: $("main").data("appearing-on"))

#  away: ->
#    @perform("away")

#  buttonSelector = "[data-behavior~=appear_away]"

#  install: ->
#    $(document).on "turbolinks:load.appearance", =>
#      @appear()

#    $(document).on "click.appearance", buttonSelector, =>
#      @away()
#      false

#    $(buttonSelector).show()

#  uninstall: ->
#    $(document).off(".appearance")
#    $(buttonSelector).hide()

    received: (data) ->
      userId = data.user_id
      eventType = data.event
      if eventType == 'appear'
        $('#user_' + userId).addClass 'background-green-online'
      else
        $('#user_' + userId).removeClass 'background-green-online'
