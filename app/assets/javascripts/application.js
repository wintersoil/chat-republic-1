

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
scroll_bottom_private = function() {
  if($('.private-messages-container').length > 0) {
    $('.private-messages-container').scrollTop($('.private-messages-container')[0].scrollHeight);
  }
}
$( document ).on('turbolinks:load', function() {
  scroll_bottom();
  scroll_bottom_private();

  $('#new_message').bind("ajax:complete", function(event,xhr,status){
    $('#message_body').val('');
  });

  $('#new_private_message').bind("ajax:complete", function(event,xhr,status){
    $('#private_message_body').val('');
  });

  $(".flash-exit").click(function(){
    $(".flash-outer").css("display", "none")
  });


  try{
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
  }
  catch(err){
    try{
      navigator.mediaDevices.webkitGetUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
    }
    catch(err){
      try{
      navigator.mediaDevices.mozGetUserMedia({audio:true}).then(stream => {handlerFunction(stream)});
      }
      catch(err){
        console.log("If all media requests fails,   Error:   " + err);
      }
    }
  }
  let recording = false;
  $("#record").click(function(e){
    if(recording == false)
    {
      audioChunks = [];
      window.rec.start();
      recording = true;
      var hover = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/microphone_off.svg";
      $("#record").attr( "src", hover );
      $("#record").attr( "height", "90px" );
      $("#record").attr( "width", "90px");
    }
    else {
      recording = false;
      var hover = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/microphone.svg";
      $("#record").attr( "src", hover );
      $("#record").attr( "height", "90px" );
      $("#record").attr( "width", "90px");
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
          });
        };
        reader.readAsDataURL(blob);
      }
    }
  }




  //video streaming
  try{
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream => {handlerFunctionVideo(stream)});
  }
  catch(err){
    try{
    navigator.mediaDevices.webkitGetUserMedia({video:true,audio:true}).then(stream => {handlerFunctionVideo(stream)});
    }
    catch(err){
      try{
      navigator.mediaDevices.mozGetUserMedia({video:true,audio:true}).then(stream => {handlerFunctionVideo(stream)});
      }
      catch(err)
      {
        console.log("If all media requests fails,    Error:   " + err);
      }
    }
  }
  let recordingVideo = false;
  $("#recordVideo").click(function(e){
    if(recordingVideo == false)
    {
      audioChunks = [];
      window.recVideo.start();
      recordingVideo = true;
      var hover = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/videoOff.svg";
      $("#recordVideo").attr( "src", hover );
      $("#recordVideo").attr( "height", "90px" );
      $("#recordVideo").attr( "width", "90px");
    }
    else {
      recordingVideo = false;
      var hover = "https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/video.svg";
      $("#recordVideo").attr( "src", hover );
      $("#recordVideo").attr( "height", "90px" );
      $("#recordVideo").attr( "width", "90px");
      window.recVideo.stop();
    }
  });

  function handlerFunctionVideo(stream) {
    window.recVideo = new MediaRecorder(stream);
    window.recVideo.ondataavailable = e => {
      audioChunks.push(e.data);
      let url1;
      if(recVideo.state == "inactive"){
        let blob = new Blob(audioChunks,{type:"video/mp4"});
        try{
         url1 = webkitURL.createObjectURL(blob);
      }
      catch(err)
      {
        url1 = URL.createObjectURL(blob);
      }
        var reader = new FileReader();
        reader.onload = function(event){
          var fd = {};
          fd["fname"] = "test.mp4";
          fd["data"] = event.target.result;
          $.ajax({
            type: "POST",
            url: "/uploadMP4",
            data: fd,
            dataType: "text"
          }).done(function(data){
          });
        };
        reader.readAsDataURL(blob);
      }
    }
  }

});
