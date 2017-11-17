//variables

var words = ["lion",
   "monkey",
   "whale",
   "hippo",
   "fish",
   "zebra",
   "gazzle",
   "baboon",];
var currentWord = "";
var lettersInCurrentWord = [];
var numberOfBlanks = 0;
var gameArea = [];
var incorrectGuesses = [];
var wins = 0;
var remaining = 9;


//starts game


window.onload = function() {
    function startGame() {
        remaining = 9;
        currentWord = words[Math.floor(Math.random() * words.length)];
        lettersInCurrentWord = currentWord.split("");
        numberOfBlanks = lettersInCurrentWord.length;
        gameArea = [];
        incorrectGuesses = [];
        for (var i = 0; i < numberOfBlanks; i++) {
            if (lettersInCurrentWord[i] !== ' ') {
                gameArea.push("_");
            } else { 
                gameArea.push("&nbsp;");
            }

            document.getElementById("remaining").innerHTML = remaining;
            document.getElementById("gameArea").innerHTML = gameArea.join("&nbsp;");
            document.getElementById('incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
        }
    }
    
    //for loop for variables 
    function checkLetters(letter) {
        var letterInWord = false;
        for (var i = 0; i < numberOfBlanks; i++) {
            if (currentWord[i] == letter) {
                letterInWord = true;  
            }
        }
        if (letterInWord) {
            for (var i = 0; i < numberOfBlanks; i++) {
                //An if statement that will check to see that if the letter exists within the word, where exactly does it exist so that it can populate the corresponding blank with that particular letter.
                if (currentWord[i] == letter) {
                    gameArea[i] = letter;
                }
            }
        }
        else {
            incorrectGuesses.push(letter);
            remaining--;
        }
    }

    function roundComplete() {
        document.getElementById("remaining").innerHTML = remaining;
        document.getElementById("gameArea").innerHTML = gameArea.join(" ");
        document.getElementById("incorrectGuesses").innerHTML = incorrectGuesses.join(" ");
        if (lettersInCurrentWord.toString() == gameArea.toString()) {
            wins++;
            alert("You win!");
            document.getElementById("wins").innerHTML = wins;
            startGame();
        }
        else if (remaining == 0) {
            alert("Sorry! You have lost. The word you needed to guess was " + currentWord);
            startGame();
        }
    }

//key logs 

    startGame();

    document.onkeyup = function(event) {
        letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        checkLetters(letterGuessed);
        roundComplete();
    }
}