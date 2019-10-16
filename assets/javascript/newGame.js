var giantObject = {

    wordBankArr:["taylor","red","meredith","olivia","cats","music","dance","artist","genre"],
    guessingWordStr: null, //undefined 
    lettersOfWord: [], // Stores letters guessed 
    correctOrBlanksArr: [],
    lettersGuessedArr: [], 
    remainingAttemptsInt: 0,
    attemptsInt: 0, //maximum attempts //
    letterGuessed: null,      //undefined 
    wins: 0,    
// numLettersInt: 0,   // letters in guessing word

startGame: function() {
    wordBankArr=["taylor","red","meredith","olivia","cats","music","dance","artist","genre"]
    objKeys = Object.keys(this.wordBankArr);
    this.guessingWordStr = [Math.floor(Math.random() * objKeys.length)];
    //split word into letter
    //this.lettersOfWord = this.guessingWordStr.split("");
    //this.lettersOfWord = this.guessingWordStr;
 //*reset* the guess, success array each round.
    this.refreshWord();
    this.processUpdateTotalGuesses();
    //console.log(objKeys);
    //console.log(this.wordBankArr);
    console.log(this.guessingWordStr);
    console.log(this.lettersOfWord); //works
    console.log(this.lettersGuessedArr); //works 
    console.log(this.correctOrBlanksArr);
    console.log(this.remainingAttemptsInt);
    console.log(this.attemptsInt);
    console.log(this.lettersGuessed);
    console.log(this.wins);
},

updatePage: function(letter) {
    // If the user has no guesses left, restart the game.
    if (this.remainingAttemptsInt === 0) {
      this.newGame();
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);

      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      this.refreshWord();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
          this.newGame();
      }
  }
},

// ==================================

updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.lettersGuessedArr.indexOf(letter) === -1) && (this.lettersOfWord.indexOf(letter) === -1)) {

    // Add the letter to the guessedLetters array.
     this.lettersGuessedArr.push(letter);

     this.remainingAttemptsInt--; //decreasing the total guesses by one

     document.querySelector("#lettersGuessed").innerHTML = 
     this.lettersGuessedArr.join(", ");
    }
},

// ==================================

processUpdateTotalGuesses: function() {
// The user will get more guesses the longer the word is.
this.attemptsInt = this.lettersOfWord.length + 5;
this.remainingAttemptsInt = this.attemptsInt;

console.log(this.remainingAttemptsInt);
},

// ==================================

updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
  for (var i = 0; i < this.lettersOfWord.length; i++) {
        // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfWord[i]) && (this.correctOrBlanksArr.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
      this.correctOrBlanksArr.push(letter);
   //   document.querySelector("#guessingWord").innerHTML = this.correctOrBlanksArr;
     }
   }
 },

 // ==================================

 refreshWord: function() {
    // We start with an empty string.
    let newWord = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.guessingWordStr.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.correctOrBlanksArr.indexOf(this.lettersOfWord[i]) !== -1) {
        newWord += this.guessingWordStr[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        newWord += "&nbsp;_&nbsp;";
      }
    }
    // Update the page with the new string we built.
    document.querySelector("#guessingWord").innerHTML = newWord;
    console.log(newWord);
  },

// ==================================

  newGame: function() {
    document.querySelector("#lettersGuessed").innerHTML = "";
    this.guessingWordStr = null;
    this.lettersOfWord = [];
    this.correctOrBlanksArr = [];
    this.lettersGuessedArr = [];
    this.remainingAttemptsInt = 0;
    this.attemptsInt = 0;
    this.lettersGuessed = null;
    this.startGame();
    this.refreshWord();
  },

// ==================================

  updateWins: function() {
    var win;
    if (this.correctOrBlanksArr.length === 0) {
      win = false;
    }
    else {
      win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfWord.length; i++) {
      if (this.correctOrBlanksArr.indexOf(this.lettersOfWord[i]) === -1) {
        win = false;
      }
    }
    if (win) {

        this.wins = this.wins + 1;

        document.querySelector("#ttlwins").innerHTML = this.wins;
  
      return true;
    }
      return false;
    }
};

// ==================================

giantObject.startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters.
    giantObject.letterGuessed = event.key.toLowerCase();
    // Runs the code to check for correctness.
    giantObject.updatePage(giantObject.letterGuessed);
    // Runs the code after each round is done.
  }
};