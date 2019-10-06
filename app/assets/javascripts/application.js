

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

  $('.private-message-send').mouseover(function(){
    $('.private-message-send').attr('src','https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/private_message_send_hover.svg');
  }).mouseout(function(){
    $('.private-message-send').attr('src','https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/private_message_send.svg');
  });
  $('.private-message-empty').mouseover(function(){
    $('.private-message-empty').attr('src','https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/private_message_empty_hover.svg');
  }).mouseout(function(){
    $('.private-message-empty').attr('src','https://aliphotoappimages.s3.ca-central-1.amazonaws.com/svg/private_message_empty.svg')
  });

  $('#new_message').bind("ajax:complete", function(event,xhr,status){
    $('#message_body').val('');
  });

  $('#new_private_message').bind("ajax:complete", function(event,xhr,status){
    $('#private_message_body').val('');
  });

  $(".flash-exit").click(function(){
    $(".flash-outer").css("display", "none")
  });

});
