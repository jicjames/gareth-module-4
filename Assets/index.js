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
  {
    question: "How amazing is my instructor, Ali? ",
    choices: ["Amazing", "10/10", "Please let me pass...", "All of the above!"],
    answer: "All of the above!",
  },
];
var questionBankIndex = 0;
var score = 0;
var questionIndex = 0;
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

      if (secondsLeft === 0) {
        clearInterval(quizTimer);
        //placeholder for
        timerEL.textContent = "Time's up!";
      }
    }, 1000);
  }
  //   document.getElementsByClassName("timer").style.visibility = visible;
  printQuiz();
});

// Function to begin the quiz
function printQuiz(questionBankIndex) {
  //Clear text for questions and choices
  questionsEl.innerHTML = "";
  ulEl.innerHTML = "";

  // For Loop to add questions
  for (var i = 0; i < questionBank.length; i++) {
    var userQuestion = questionBank[questionBankIndex].question;
    var userChoices = questionBank[i].choices;
    questionsEl.textContent = userQuestion;
  }

  for (var i = 0; i < choices.length; i++) {
    var listEL = document.createElement("li");
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listEL.textContent = userChoices;
  }
}
