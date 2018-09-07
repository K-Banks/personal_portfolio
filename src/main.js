import $ from 'jquery';
import './css/styles.css';


$(document).ready(function(){
  $('#greeting').fadeIn(1500, function () {
    setTimeout(function() {
      $('#tagline').fadeIn(1500)
    }, 500);
  });

  $("#projectsLink").click(function(){
    $('html,body').animate({
      scrollTop: $(".projectContainer").offset().top},
    1500);
  });

  $("#aboutLink").click(function(){
    $('html,body').animate({
      scrollTop: $(".about").offset().top},
    2000);
  });

  $("#contactLink").click(function(){
    $('html,body').animate({
      scrollTop: $(".reachout").offset().top},
    2500);
  });

  $(".projectButton").click(function(){
    $('html,body').animate({
      scrollTop: $("#projectInfo").offset().top},
    1500);
  });
});
