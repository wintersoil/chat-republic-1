

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

  $('#new_message').bind("ajax:complete", function(event,xhr,status){
    $('#message_body').val('');
  });

  $(".flash-exit").click(function(){
    $(".flash-outer").css("display", "none")
  });


  try{
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
  }
  catch(err){
    navigator.mediaDevices.webkitGetUserMedia.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
  }
  try{
    navigator.mediaDevices.mozGetUserMedia.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
  }
  catch(err2){

  }
  let recording = false;
  $("#record").click(function(e){
    if(recording == false)
    {
      audioChunks = [];
      window.rec.start();
      recording = true;
      var hover = "https://vectr.com/wintersoil/a1t2KULU0I.svg?width=90&height=90&select=a1t2KULU0Ipage0"
      $("#record").attr( "src", hover );
    }
    else {
      window.rec.stop();
    }
  });

  function handlerFunction(stream) {
    window.rec = new MediaRecorder(stream);
    window.rec.ondataavailable = e => {
      audioChunks.push(e.data);
      let url1;
      if(rec.state == "inactive"){
        let blob = new Blob(audioChunks,{type:"audio/mpeg"});
        try{
         url1 = webkitURL.createObjectURL(blob);
      }
      catch(err)
      {
        url1 = URL.createObjectURL(blob);
      }
      $("#recordedAudio").attr("src", url1);
        $("#recordedAudio").attr("controls", "true");
        $("#recordedAudio").attr("autoplay", "true");
        var reader = new FileReader();
        reader.onload = function(event){
          var fd = {};
          fd["fname"] = "test.mp3";
          fd["data"] = event.target.result;
          $.ajax({
            type: "POST",
            url: "/uploadMP3",
            data: fd,
            dataType: "text"
          }).done(function(data){
            console.log(data);
          });
        };
        reader.readAsDataURL(blob);
      }
    }
  }

});
