//GLOBAL VARIABLES

//Arrays and Variables for holding data

var wordOptions = ["jeremiah", "neena", "darion", "adam", "jerome", "lou", "greg"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blankAndSuccesses = []; //j________
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//FUNCTIONS (Resusable blocks of code)
function startGame(){
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

     //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate blanks and successes with right numbe of blanks.
    for (i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    //Change html to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

     //Testing/Debuggiing
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses); 
}

function checkLetters(letter){
    //Check if letter exists in the word 
    var isLetterInWord = false;
    for(i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter){
        isLetterInWord = true;
        }
    }

//Check where in word letter exists, then populate out blanksAndSuccesses array
if (isLetterInWord){
    for (i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter){
            blanksAndSuccesses[i] = letter;
        }
    }
}
//letter wasn't found
else{
    wrongLetters.push(letter);
    guessesLeft-=1;
}
//Testing and Debugging
console.log(blanksAndSuccesses);
}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);
    
    //Update HTML to reflect the most recent count states
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    
    //Check if user won
    if(lettersinWord.toString()==blanksAndSuccesses.toString()){
        winCount++;
        alert("You Won!");

        //Update winCounter in html
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    //Check if user lost
    else if (guessesLeft==0){
        lossCount++;
        alert("You lost!");

        //Update HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }

}







//MAIN PROCESS
//Initiates the code the first time
startGame();

//Register keyclicks

document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    //Testing
    console.log(letterGuessed); 
}

