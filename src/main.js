import $ from 'jquery';
import './css/styles.css';


$(document).ready(function(){
  $('#greeting').fadeIn(1500, function () {
    setTimeout(function() {
      $('#tagline').fadeTo(1500, 1)
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

  $("#topScroller").click(function(){
    $('html,body').animate({
      scrollTop: $(".wrapper").offset().top},
    2500);
  });

  $(".projectButton").click(function(event) {
    $(".projectButton").removeClass("active");
    $(event.target).addClass("active");
    $("#projectInfo").slideDown(1000);
    $('html,body').animate({
      scrollTop: $("#slideMark").offset().top},
    1500);
  });

  $("#hideProject").click(function(event) {
    $(".projectButton").removeClass("active");
    $("#projectInfo").slideUp(1000);
    $('html,body').animate({
      scrollTop: $(".projectContainer").offset().top},
    1500);
  })
});
