// questions array with choices and correct answers
const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts",
    },
    {
        questionText: "The condition in an if/else statement is enclosed with _____.",
        options: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        answer: "3. Parenthesis",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        answer: "4. All of the Above",
    },
    {
        questionText: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"],
        answer: "3. Quotes",
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. console.log"],
        answer: "4. console.log",
    },
];

const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#questions");
const scoreCard = document.querySelector("#final-score");
const leaderboardCard = document.querySelector("#leaderboard-card");

// hide all cards
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#results");
const resultText = document.querySelector("#result-text");

function hideResultText() {
    resultDiv.style.display = "none";
}

var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

// remove hidden attribute from questions card and start quiz
function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
  
    currentQuestion = 0;
    displayQuestion();
  
    time = questions.length * 10;
  
    intervalID = setInterval(countdown, 1000);
  
    displayTime();
}

function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
}

// show the timer for the quiz
const timeDisplay = document.querySelector("#time");
function displayTime() {
  timeDisplay.textContent = time;
}

function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
  
    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
}

document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
      resultText.textContent = "That is Correct!";
      setTimeout(hideResultText, 1000);
    } else {
      resultText.textContent = "That is Incorrect!";
      setTimeout(hideResultText, 1000);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        time = 0;
        displayTime();
        endQuiz();
      }
    }
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
}

const score = document.querySelector("#score");

function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}
  
const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");

submitButton.addEventListener("click", storeScore);

function storeScore(event) {
  event.preventDefault();  


let leaderboardName = {
  initials: inputElement.value,
  score: time,
};

updateStoredLeaderboard(leaderboardName);

hideCards();
  leaderboardCard.removeAttribute("hidden");

  renderLeaderboard();
}

function updateStoredLeaderboard(leaderboardName) {
  let leaderboardScores = getLeaderboard();
  leaderboardScores.push(leaderboardName);
  localStorage.setItem("leaderboardScores", JSON.stringify(leaderboardScores));
}

function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("leaderboardScores");
  if (storedLeaderboard !== null) {
    let leaderboardArray = JSON.parse(storedLeaderboard);
    return leaderboardArray;
  } else {
    leaderboardArray = [];
  }
  return leaderboardArray;
}

function renderLeaderboard() {
  let sortedLeaderboardArray = sortLeaderboard();
  const leaderboardList = document.querySelector("#leaderboard-list");
  leaderboardList.innerHTML = "";
  for (let i = 0; i < sortedLeaderboardArray.length; i++) {
    let leaderboardEntry = sortedLeaderboardArray[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      leaderboardEntry.initials + " - " + leaderboardEntry.score;
    leaderboardList.append(newListItem);
  }
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
  localStorage.clear();
  renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

function returnToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}

const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  clearInterval(intervalID);

  time = undefined;
  displayTime();

  renderLeaderboard();
} 
