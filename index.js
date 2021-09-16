// user clicked pattern array
var userClickedPattern = [];

// game pattern, getting another color every time the function is called
var gamePattern = [];

// the original colors array
var buttonColors = ["red", "blue", "green", "yellow"];

// the title that changes every level of the game. starting from level 0.
var level = 1;


// a function that creates a random number between 0-3,
// than changing the title to the next level number.
// adding a class that make the start button disappear.
// than assign that number to a color from the colors array,
// and than that chosen color is pushed to the gamePattern array.
// at last its creating a Flash animation and calling the Sound function.
// then clearing the array of user's click to start a new level.
function nextSequence() {
  $("h1").text("Level " + level++);
  $("#startButton").addClass("transparent");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(120).fadeIn(100);
  makeSound(randomChosenColor);
  userClickedPattern.length = 0;
}

// event listener detecting a keydown, if its the first "a" keydown,
// the title changes to level 0 and the nextSequence() function is called.
$(document).keydown(function(event) {
  var buttonPress = event.key;
  var started = gamePattern.length;
  if (started === 0) {
    if (buttonPress === "a") {
      $("h1").text("Level " + 0);
      nextSequence();
    }
  }
});

// event listener the wait for a click on the start button.
// if the gamePattern[] is empty then it will start.
$("#startButton").click(function(){
  var started = gamePattern.length;
  if (started === 0){
    $("h1").text("Level " + 0);
    nextSequence();
  }
});
// adding a listener event "click" and assigning "this.id" to a var.
// calling the Sound and Animation functions
//calling the checkAnswer function to check if the last use click is equal to gamePattern.
$("button").on("click", function() {
  var userChosenColor = $(this).attr("id");
  buttonBlink(userChosenColor);
  makeSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// create a function that "flashes" Animation
// adding a class to the selected button "whenPressed" changing it style.
function buttonBlink(color) {
  $("#" + color).fadeOut(120).fadeIn(100);
  $("#" + color).addClass("whenPressed");
  setTimeout(function() {
    $("#" + color).removeClass("whenPressed");
  }, 1000);
}

// a function that play the sound of each colored square.
function makeSound(color) {
  var soundPlay = new Audio(`sounds/${color}.mp3`);
  soundPlay.play();
}

// play the sound of failure to match the gamePattern[].
// adding a class to the body to change background color to red.
// after 200 ms timeout the class is removed and background returns to normal.
// the h1 changes to failure title.
// the start button reappear.
// caling the restartGame() function.
function failActions(){
  var wrong = new Audio(`sounds/wrong.mp3`);
  wrong.play();
  $("body").addClass("gameOver");
  setTimeout(function() {
      $("body").removeClass("gameOver");
  },200);
  $("h1").html("Game Over. Press <span>A</span> to Restart");
  $("#startButton").removeClass("transparent");
  restartGame();
}

// reseting the level back to level 1,
// clearing the gamePattern[], that enables the pressing of "a" button.
function restartGame() {
    level = 1;
    gamePattern.length = 0;
}

// a functionthe gets the user's last click index from the array,
// check if the index is the same of the gamePattern[],
// than check if the user finished clicking by comparing the length of both arrays.
// than calling nextSequence() after a delay of 1000 ms.
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    failActions();
    console.log("wrong");
  }
}
