import $ from 'jquery';
import './css/styles.css';

$(document).ready(function(){

  const projectInformation = [
    {
      id: "onTheSpotify",
      title: "On-The-Spotify",
      component: "./projectSubpages/spotifyComponent.html",
      link: "https://github.com/K-Banks/On-The-Spotify"
    },
    {
      id: "dndSpellApi",
      title: "DnD Spell API",
      component: "./projectSubpages/dndComponent.html",
      link: "https://github.com/K-Banks/dnd-organizer-api"
    },
    {
      id: "personalPortfolio",
      title: "My Portfolio Site",
      component: "./projectSubpages/portfolioComponent.html",
      link: "https://github.com/K-Banks/personal_portfolio"
    },
    {
      id: "tbd",
      title: "Undecided Angular Project",
      component: "./projectSubpages/tbdComponent.html",
      link: "https://github.com/K-Banks/gamasutra-clone"
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
    console.log('requesting spell');
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

  $(".logo").click(function(){
    $('html,body').animate({
      scrollTop: $(".wrapper").offset().top},
    2500);
  });

  $(".projectButton").click(function(event) {
    let projectId = $(event.target).attr('id');
    insertProjectInfo(projectId);
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
  });

  $(window).on('scroll', function() {
    var projectsStartPosition = $(".projectContainer").offset().top;
    var projectsEndPosition = $(".about").offset().top;
    var projectsLinkPosition = $("#projectsLink").offset().top;
    var aboutLinkPosition = $("#aboutLink").offset().top;
    var reachoutLinkPosition = $("#contactLink").offset().top;
    var logoPosition = $(".logo").offset().top + 40;
    let linkArray = ["#projectsLink", "#aboutLink", "#contactLink"]
    let positionArray = [projectsLinkPosition, aboutLinkPosition, reachoutLinkPosition];
    for (var i = 0; i < positionArray.length; i++) {
      if (positionArray[i] > projectsStartPosition && positionArray[i] < projectsEndPosition) {
        $(linkArray[i]).addClass("black");
      } else {
        $(linkArray[i]).removeClass("black");
      }
    }
    if (logoPosition > projectsStartPosition && logoPosition < projectsEndPosition) {
      $(".logo").addClass("logoblack");
    } else {
      $(".logo").removeClass("logoblack");
    }
  });
});
