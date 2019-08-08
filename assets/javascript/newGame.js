//Array
let wordBankArr = ["taylor","red","meredith","olivia","cats","music","dance","artist","genre","swift","groovy","pop","country","breakup","love"];
// The word to build to match the current word  
let guessingWordStr = "";    
// letters in guessing word    
let numLettersInt = 0;
// Stores letters guessed
let lettersGuessedArr = []; 
//maximum attempts 
let attemptsInt = 13;
// Number of attempts player has left  
let remainingAttemptsInt = 0; 
// Alert to tell if the game has started     
let gameStartedBoo = false;   
// Alert for 'press any key to try again'     
let hasFinishedBoo = false; 
let correctOrBlanksArr = [];
let wrongGuessArr = [];
// How many wins has the player has total           
let winsInt = 0;    
let lossCounter = 0;

// startGame()
// (Note: It's not being run here. It's just being made for future use.)
function startGame() {
    // Reset the guesses back to 0.
    attemptsInt = 13;

    guessingWordStr = wordBankArr[Math.floor(Math.random() * wordBankArr.length)];
    //split word into letters
    lettersInGuessedArr = guessingWordStr.split("");
    //number of letters per word
    numLettersInt = lettersInGuessedArr.length;
  
    // We print the solution in console (for testing).
    console.log(guessingWordStr);

 //*reset* the guess, success array each round.
    correctOrBlanksArr = [];
//*reset* the wrong guesses from the previous round.
    wrongGuessArr = [];
//  // Fill up the blanksAndSuccesses list with appropriate number of blanks.
//  // This is based on number of letters in solution.
  for (var i = 0; i < numLettersInt; i++) {
    correctOrBlanksArr.push("_");
  }
console.log(correctOrBlanksArr);

// Reprints the guessesLeft to 9
document.getElementById("remainingAttempts").innerHTML = remainingAttemptsInt;

//  // Prints the blanks at the beginning of each round in the HTML
document.getElementById("guessingWord").innerHTML = correctOrBlanksArr.join(" ");

//  // Clears the wrong guesses from the previous round
document.getElementById("lettersGuessed").innerHTML = wrongGuessArr.join(" ");
}


function checkLetters(letter) {

//     // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
     let letterInWordBoo = false;
    
     for(let i=0; i<numLettersInt; i++) {
         if (guessingWordStr[i] === letter) {
             letterInWordBoo = true;
        }
    }
    if (letterInWordBoo) {
        for(let j = 0; j < numLettersInt; j++) {
            if (guessingWordStr[j] === letter) {
                correctOrBlanksArr[j] = letter;
                            }
            }
    console.log(correctOrBlanksArr);
    }
    else {
        wrongGuessArr.push(letter)
        remainingAttemptsInt--;
    }
    console.log(wrongGuessArr);
}

function nextRound(){
    document.getElementById("guessingWord").innerHTML = correctOrBlanksArr.join(" ");
    // print wrong guesses
    document.getElementById("lettersGuessed").innerHTML = wrongGuessArr.join(" ");
   
    if(lettersGuessedArr.toString()=== correctOrBlanksArr.toString()) {
        winsInt++;
        alert("You win!");
    }

    else if (numLettersInt === 0) {
        lossCounter++;
        alert("You lose");

        document.getElementById("loss-counter").innerHTML = lossCounter;
        startGame();
    }
}
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters.
    var letterGuessed = event.key.toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed);
    // Runs the code after each round is done.
    nextRound();
  }
};
