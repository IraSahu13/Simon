var userClickedPattern= [];
var gamePattern= [];
var buttonColors= ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("LEVEL" + level);

    nextSequence();
    started= true;
  }
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id") ;
  userClickedPattern.push(userChosenColor);
  soundPlay(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

     } else {

      console.log("wrong");

      soundPlay("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}


function nextSequence() {
  level++;
  $("#level-title").text( "LEVEL" + level);

  userClickedPattern= [];
  var randomNumber= Math.random();
  randomNumber= Math.floor(4*randomNumber);

  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  soundPlay(randomChosenColor);


}

function soundPlay(name) {
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100)
}


function startOver() {
  level=0;
  started= false;
  gamePattern= [];
}
