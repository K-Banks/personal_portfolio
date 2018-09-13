import $ from 'jquery';
import './css/styles.css';

$(document).ready(function(){

  const projectInformation = [
    {
      id: "onTheSpotify",
      title: "On-The-Spotify",
      component: "./projectSubpages/spotifyComponent.html",
      ghlink: "https://github.com/K-Banks/On-The-Spotify",
      liveLink: ""
    },
    {
      id: "dndSpellApi",
      title: "DnD Spell API",
      component: "./projectSubpages/dndComponent.html",
      ghlink: "https://github.com/K-Banks/dnd-organizer-api",
      liveLink: ""
    },
    {
      id: "personalPortfolio",
      title: "My Portfolio Site",
      component: "./projectSubpages/portfolioComponent.html",
      ghlink: "https://github.com/K-Banks/personal_portfolio",
      liveLink: ""
    },
    {
      id: "tbd",
      title: "Gamasutra Clone using Angular",
      component: "./projectSubpages/tbdComponent.html",
      ghlink: "https://github.com/K-Banks/gamasutra-clone",
      liveLink: "https://k-banks.github.io/gamasutra-clone/"
    }
  ];

  function insertProjectInfo(projectId) {
    let currentProject = null;
    let i = 0;
    while (currentProject == null || i < projectInformation.length) {
      if (projectInformation[i].id == projectId) {
        currentProject = projectInformation[i];
      }
      i += 1;
    }
    $("#projectTitle h2").text(currentProject.title);
    $.get(currentProject.component, function(data) {
      $("#projectDescription").html(data);
      $("#dndForm").submit(function(event) {
        event.preventDefault();
        getRandomDnDSpell();
      });
    });
  }

  function getRandomDnDSpell() {
    let rng = Math.floor((Math.random() * 10) + 4);
    fetch("https://dnd-spell-organizer.herokuapp.com/spells/" + rng)
      .then(function(response) {
        return response.json();
      }).then(function(myJson) {
        changeDndSpellInfo(myJson)
      });
  }

  function changeDndSpellInfo(dndSpell) {
    let shortDescription = dndSpell.description.substring(0, 200);
    shortDescription = shortDescription + '...';
    $("#spellName").text(dndSpell.name);
    $("#spellLevel").text(dndSpell.level);
    $("#spellCastingTime").text(dndSpell.castTime);
    $("#spellRange").text(dndSpell.range);
    $("#spellDuration").text(dndSpell.duration);
    $("#spellDescription").text(shortDescription);
    $("#spellSchool").text(dndSpell.school);
    $("#dndSpellInfo").slideDown(300);
  }

  $('#greeting').fadeIn(1500, function () {
    setTimeout(function() {
      $('#tagline').fadeTo(1000, 1)
    }, 500);
  });

  $("#projectsLink").click(function(){
    $('html,body').animate({
      scrollTop: ($(".projectContainer").offset().top - 70)},
    1500);
  });

  $("#aboutLink").click(function(){
    $('html,body').animate({
      scrollTop: ($(".about").offset().top - 65)},
    2000);
  });

  $("#contactLink").click(function(){
    $('html,body').animate({
      scrollTop: ($(".reachout").offset().top - 60)},
    2500);
  });

  $(".logo").click(function(){
    $('html,body').animate({
      scrollTop: ($(".wrapper").offset().top - 70)},
    2500);
  });

  $(".projectButton").click(function(event) {
    let projectId = $(event.target).attr('id');
    insertProjectInfo(projectId);
    $(".projectButton").removeClass("active");
    $(".imgLocator").removeClass("noFilter");
    $(event.target).addClass("active");
    $(event.target).parent().children(".imgLocator").addClass("noFilter");
    $("#projectInfo").slideDown(1000);
    $('html,body').animate({
      scrollTop: ($("#slideMark").offset().top - 70)},
    1500);
  });

  $("#hideProject").click(function(event) {
    $(".projectButton").removeClass("active");
    $(".imgLocator").removeClass("noFilter");
    $("#projectInfo").slideUp(1000);
    $('html,body').animate({
      scrollTop: ($(".projectContainer").offset().top - 70)},
    1500);
  });

  $(window).on('scroll', function() {
    var projectsEndPosition = ($(".about").offset().top - 65);
    var navbarPosition = $(".logo").offset().top;
    var contactPosition = ($(".reachout").offset().top - 60);
    if (navbarPosition < projectsEndPosition || navbarPosition > contactPosition) {
      $("#navbar").removeClass("gray");
      $("#navbar").addClass("black");
      $(".logo").removeClass("logoblack");
    } else {
      $("#navbar").removeClass("black");
      $("#navbar").addClass("gray");
      $(".logo").addClass("logoblack");
    }
  });
});
