// Declaring Variables
var containerEl = document.querySelector(".container");
var timerEL = document.querySelector(".timer");
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
  timerEL.style.display = "block";
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

//Function to triggers when the quiz is complete or when the timer hits zero
function complete() {
  questionsEl.innerHTML = "";
  timerEL.innerHTML = "";
  //Message that triggers when the timer is at zero
  if (secondsLeft >= 0) {
    var pEl = document.createElement("p");
    clearInterval(quizTimer);
    pEl.textContent = "Your final score is: " + score;

    questionsEl.appendChild(pEl);
  }

  //Creating the form for scores
  var 
}
