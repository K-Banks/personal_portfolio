import $ from 'jquery';
import './css/styles.css';

$(document).ready(function(){

  const projectInformation = [
    {
      id: "onTheSpotify",
      title: "On-The-Spotify",
      about: ["Paragraph 1", "paragraph 2", "paragraph 3"],
      link: "https://github.com/K-Banks/On-The-Spotify"
    },
    {
      id: "dndSpellApi",
      title: "DnD Spell API",
      about: ["Dnd paragraph 1", "Dnd paragraph 2"],
      link: "https://github.com/K-Banks/dnd-organizer-api"
    },
    {
      id: "personalPortfolio",
      title: "My Portfolio Site",
      about: ["portfolio paragraph 1", "portfolio paragraph 2"],
      link: "https://github.com/K-Banks/personal_portfolio"
    },
    {
      id: "tbd",
      title: "Undecided Angular Project",
      about: ["Angular paragraph 1", "Angular paragraph 2", "Angular paragraph 3"],
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
    $(".temp").remove();
    $.get("./projectSubpages/testComponent.html", function(data) {
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
      }
      );
  }

  function changeDndSpellInfo(dndSpell) {
    $("#spellName").text(dndSpell.name);
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

  $("#topScroller").click(function(){
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
  })
});
