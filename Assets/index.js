// Declaring Variables
var containerEl = document.querySelector(".container");
var timerEL = document.querySelector(".timer");
const scoreInputWrapper = document.querySelector(".score-input-wrapper");
const scoreInput = document.querySelector(".score-input");
const scoreSubmitEl = document.querySelector(".submit-score");

// initialize empty score data
let scoresData = [];

var questionsEl = document.querySelector(".questions");
var startEL = document.querySelector(".startQuiz");
var questionBank = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed within ______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store ______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];
var questionBankIndex = 0;
var score = 0;
var secondsLeft = 76;
var quizTimer = 0;
var penalty = 10;
var ulEl = document.createElement("ul");

// Event Listener for the begin button to begin the quiz
startEL.addEventListener("click", function () {
  if (quizTimer === 0) {
    quizTimer = setInterval(function () {
      secondsLeft--;
      timerEL.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(quizTimer);
        complete();
        timerEL.textContent = "Time's up!";
      }
    }, 1000);
  }
  timerEL.classList.remove("hidden");
  // can also use classList.toggle("hidden");
  renderQuiz(questionBankIndex);
});

// Function to begin the quiz and renders the questions and answers
function renderQuiz(questionBankIndex) {
  //Clear text for questions and choices
  questionsEl.innerHTML = "";
  ulEl.innerHTML = "";

  for (var i = 0; i < questionBank.length; i++) {
    var renderQuestion = questionBank[questionBankIndex].question;
    var renderChoices = questionBank[questionBankIndex].choices;
    questionsEl.textContent = renderQuestion;
  }

  renderChoices.forEach(function (newChoice) {
    var liEL = document.createElement("li");
    liEL.textContent = newChoice;
    questionsEl.appendChild(ulEl);
    ulEl.appendChild(liEL);
    liEL.addEventListener("click", validateAnswer);
  });
}

//Function to validate the answers
function validateAnswer(event) {
  var element = event.target;

  //Returns message to validate the answers chosen to the user
  if (element.matches("li")) {
    var resultEl = document.createElement("div");
    resultEl.setAttribute("class", "answerResult");

    if (element.textContent == questionBank[questionBankIndex].answer) {
      score++;
      resultEl.textContent = "Correct!";
    } else {
      secondsLeft = secondsLeft - penalty;
      resultEl.textContent = "Wrong! The correct answer is:  " + questionBank[questionBankIndex].answer;
    }
  }
  questionBankIndex++;

  if (questionBankIndex >= questionBank.length) {
    complete();
    resultEl.textContent =
      "End of quiz!" + " " + "You got  " + score + "/" + questionBank.length + " Correct!";
  } else {
    renderQuiz(questionBankIndex);
  }
  questionsEl.appendChild(resultEl);
}

scoreSubmitEl.addEventListener("click", function(e){
  console.log(e);

  const name = scoreInput.value;
  const newScore = score;

  // create an object with initials and score,
  // add it to our scoresData array,
  // stringify, then save it to localstorage.
  updateHighScores(name, newScore);

  // render the high scores list
  renderHighScores();
});

// WHEN THE "CLEAR HIGH SCORES" BUTTON IS CLICKED
function clearHighScores() {
  const newScores = JSON.stringify([]);
  // update the Data
  localStorage.setItem('highScores', newScores);

  // update the UI
  renderHighScores();
}


function getHighScores(){
  // when the app loads, get data from high scores property (if it exists)

  // using the initialized variable scoresData
  const data =  localStorage.getItem('highScores'); // will either be null or a string.
  if(data !== null) { // check if any data exists in local storage first. 
    scoresData = JSON.parse(data);
  }
}

// this function is called when the submit score button is clicked. 
function updateHighScores(initials, score) {
  // initials is a string
  // score is a number

  const newScoresObject = {
    initials: initials, 
    score: score,
  };

  // update local scores variable (in javascript)
  scoresData.push(newScoresObject);

  // update LOCAL STORAGE scores data 
  // so that it will be saved for next time. 
  const stringScoresData = JSON.stringify(scoresData);
  localStorage.setItem("highScores", stringScoresData);

}

// render the high scores list when the submit button is clicked. 
// (and after the updateHighScores function is called) 
function renderHighScores(){
  // scoresData should be an array of objects 
  // shaped like:
  // {
  //   initials: "JC",
  //   score: 3,
  // }


  // you will also need to handle how to show/hide the whole high score list here. 

  scoresData.forEach(function(score){
    // render the score UI 
    // create LI elements and append them to the UL in the scores list. 
  });
}

//Function to triggers when the quiz is complete or when the timer hits zero
function complete() {
  questionsEl.innerHTML = "";
  timerEL.innerHTML = "";
  timerEL.classList.add("hidden");
  scoreInputWrapper.classList.add('visible');
  //Message that triggers when the timer is at zero
  if (secondsLeft >= 0) {
    var pEl = document.createElement("p");
    clearInterval(quizTimer);
    pEl.textContent = "Your final score is: " + score;

    questionsEl.appendChild(pEl);
  }

}

function resetQuiz() {
  // show and/or hide all elements which have had their visibility changed. 
  // e.g. timer, highscores, startbutton, etc. 

  // re-initialize any variables to their original state or value. 
  // e.g. questionBankIndex

}
