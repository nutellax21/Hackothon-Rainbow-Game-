var cupOne = "1";
var cupTwo = "2";
var cupThree = "3";

var cupWithBall = cupTwo;

var cups = [cupOne, cupTwo, cupThree];
var shuffled;

function shuffle(array) {
  var currentIndex = array.length, 
      temporaryValue, 
      randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
 
  return array;
}

function shuffleBoard(){
    shuffled  = shuffle(cups);
}

function guess(index) {
    if(shuffled[index] === cupWithBall) {
        return true;
    } else {
        return false;
    }
}

function win() {
    $(".raised").parent(".cupwrapper").addClass("selected");
    
    playSound("winsound");
    stopSound("losesound");
    $("body").addClass("win");
}

function lose() {
    $(".raised").parent(".cupwrapper").addClass("lose");
    playSound("losesound");
    stopSound("winsound");
    $("body").removeClass("win");
}

function playSound(sound) {
    document.getElementById(sound).play();
}
function stopSound(sound) {
    var soundEl = document.getElementById(sound);
    soundEl.pause();
    soundEl.currentTime = 0;
}

function resetGame(){
    
    stopSound("winsound");
    stopSound("losesound");
    $(".cupwrapper .cups").removeClass("raised");
    shuffleBoard();
    $(".cupwrapper").removeClass("selected").removeClass("lose");
    //remove it 
    $("body").removeClass("win");
}
//--^^ Pieces ^^--
//--vv How they fit together vv--

$('.cupsbox').on('click', '.cups', function() {
    var cupIndex = $(this).parent('.cupwrapper').index();
    
    $(".cupsbox .cups").removeClass("raised");
    $(this).addClass("raised");
    
    if (guess(cupIndex)) {
        win();
    } else {
        lose();
    }
});

$("#reset").click(function () {
    resetGame();
});


shuffleBoard();

