import $ from 'jquery';
import './css/styles.css';


$(document).ready(function(){
  $('#greeting').fadeIn(1500, function () {
    setTimeout(function() {
      $('#tagline').fadeIn(1500)
    }, 500);
  });
});
