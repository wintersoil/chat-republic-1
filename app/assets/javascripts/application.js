

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

scroll_bottom = function() {
  if($('.messages-display').length > 0) {
    $('.messages-display').scrollTop($('.messages-display')[0].scrollHeight);
  }
}
$( document ).on('turbolinks:load', function() {
  scroll_bottom();
  $("#troubly-link").click();
  $('#new_message').bind("ajax:complete", function(event,xhr,status){
    $('#message_body').val('');
  });

  $(".flash-exit").click(function(){
    $(".flash-outer").css("display", "none")
  });

  navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});

  $("#record").click(function(e){
    console.log('I was clicked');
    document.getElementById("record").disabled = true;
    $("#record").css("background-color", "blue");
    document.getElementById("stopRecord").disabled = false;
    audioChunks = [];
    window.rec.start();
  });
  $("#stopRecord").click(function(e){
    console.log("I was clicked");
    document.getElementById("record").disabled = false;
    document.getElementById("stopRecord").disabled = true;
    $("#record").css("background-color", "red");
    window.rec.stop();
  });

  function handlerFunction(stream) {
    window.rec = new MediaRecorder(stream);
    window.rec.ondataavailable = e => {
      audioChunks.push(e.data);
      if(rec.state == "inactive"){
        let blob = new Blob(audioChunks,{type:"audio/mpeg-3"});
        $("#recordedAudio").src = URL.createObjectURL(blob);
        $("#recordedAudio").controls=true;
        $("#recordedAudio").autoplay=true;
      }
    }
  }

});
