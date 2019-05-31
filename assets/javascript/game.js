//Logic 
//Array
let wordBank = ["Taylor","Red","Meredith","Olivia","Cats","Music","Dance","Artist","Genre","Swift","Groovy","morewordstocome","pop","country","breakup","love"];
const maxAttempts = 8 ;
// Stores letters guessed
let lettersGuessed = []; 
// Index of current word in the array      
var guessingWordIndex;    
// The word to build to match the current word       
let guessingWord = [];       
// Number of attempts player has left   
let remainingGuesses = 0; 
// Alert to tell if the game has started     
let gameStarted = false;   
// Alert for 'press any key to try again'     
let hasFinished = false; 
// How many wins has the player has total           
let wins = 0;                   
//  Updates the display on the HTML Page (creating function curly)

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxAttempts;
    gameStarted = false;
    
    guessingWordIndex = Math.floor(Math.random() * (wordBank.length)); // Use Math.floor to round the random number down 
    console.log(guessingWordIndex);
// Clear out arrays
    lettersGuessed = [];
    guessingWord = [];

// Build the guessing word and clear it out
for (let i=0; i < guessingWord.length;i++) {
    guessingWord.push("_");
}
    // Hide images/text (Try again Key, losing img, winning img) you can add these after.
    document.getElementById("win-Image").style.cssText= "win-image";
    document.getElementById("loss-Image").style.cssText= "loss-image";
    document.getElementById("pressKeyTryAgain").style.cssText= "pressKeyTryAgian";

    updateDisplay();
};

//function updateDisplay() 
function updateDisplay() {
    document.getElementById("ttlWins").innerText = wins;
    document.getElementById("guessingWord").innerText = "_";
console.log(guessingWordIndex); //whhyyyy
for (let i = 0; i < wordBank[guessingWordIndex].length; i++) {
    document.getElementById("guessingWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = guessedLetters;

if(remainingGuesses <= 0) {
    document.getElementById("loss-image").style.cssText = "display:block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    hasFinished = true;
    }
};

//mmkay, now event . if else 
document.onkeydown = function(event) {
    if(hasFinished) { //if finished dump one keystroke and reset
        resetGame();
        hasFinished = false;
    }
    else { // a-z was pressed ??? 
        if(event.keyCode >= 65 && event.keyCode <=90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

//creating a make guess function looks like 
function makeGuess(letter){
    if(remainingGuesses > 0) {

        if(!gameStarted) { //note ! 
            
            gameStarted = true;
        }
//make sure didn't use letter yet 
    if (lettersGuessed.indexOf(letter)=== -1) {
        lettersGuessed.push(letter);
        evaluateGuess(letter);
        }
    }
    updateDisplay(); //out of scope??? 
    checkWin();
};
//needing a functions that takes a letter to find all instances of occurance within the string then replaces in the guessing word 
function evaluateGuess(letter) {
    //I need to make an array to store positions of the letters in a string
let positions = [];
    //cute loop >> finding all instances of guessed letter, store the indicies in an array..like this
for(let i = 0; i < wordBank[guessingWordIndex].length;i++) {
    if(wordBank[guessingWordIndex][i] === letter) {
            positions.push(i);
    }
}
if (positions.length <= 0) {
        remainingGuesses--;
        updateDisplay();
} 
else {// Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
//what if there arent any? I will need to remove a guess updating the line of results 
//probably add to replace the (xiao ren) "_" with a letter
//did I effing win ?  check. 
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("win-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};//should do the trick with a bit of sugar and spice inside {}
//you need to check for underscores in the guessingword array
// Updates the image depending on how many guesses (you can create this function if you are feeling creative or whatever)
//
