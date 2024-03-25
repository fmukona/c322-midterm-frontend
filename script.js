/*
const host = "https://midterm-fmukona.onrender.com";


async function getAll() {
  let response = await fetch(host + "/questions");
  let result = await response.json();
  return result;
}

async function displayTheQuestions() {
  questions = await getAll();

  let list = document.getElementById("list");
  list.innerHTML = "";
  const selectedQuestionsList = document.getElementById("selectedQuestions");
  let selectedQuestionIds = Array.from(selectedQuestionsList.children).map(
    (child) => parseInt(child.querySelector("b").textContent)
  );

  for (let question of questions) {
    if (!selectedQuestionIds.includes(question.id)) {
      let div = document.createElement("div");
      div.setAttribute("onclick", `toggleQuestionOn(${question.id})`);
      div.className = "card";
      let innerHtml = `
        <img src="${host}/questions/${question.id}/image" alt="question" style="width:100%">
        <div class="container">
          <h4><b>${question.id}</b></h4>
          <p>${question.description}</p>
          <form>
            <input type="radio" id="q${question.id}ptionA" name="q2Answer" value="A">
            <label for="q${question.id}ptionA">${question.choices[0]}</label><br>
            <input type="radio" id="q${question.id}ptionB" name="q2Answer" value="B">
            <label for="q${question.id}ptionB">${question.choices[1]}</label><br>
            <input type="radio" id="q${question.id}ptionC" name="q2Answer" value="C">
            <label for="q${question.id}ptionC">${question.choices[2]}</label><br>
          </form>
        </div>
      `;
      div.innerHTML = innerHtml;
      list.appendChild(div);
    }
  }
}

async function toggleQuestionOn(questionId) {
  questions = await getAll();
  question = questions.filter((q) => q.id === questionId)[0];

  const selectedQuestionsList = document.getElementById("selectedQuestions");
  let div = document.createElement("div");
  div.className = "card";
  div.setAttribute("onclick", `toggleQuestionOff(${question.id})`);

  let innerHtml = `
    <img src="${host}/questions/${question.id}/image" alt="question" style="width:100%">
    <div class="container">
      <h4><b>${question.id}</b></h4>
      <p>${question.description}</p>
      <form>
        <input type="radio" id="q${question.id}ptionA" name="q2Answer" value="A">
        <label for="q${question.id}ptionA">${question.choices[0]}</label><br>
        <input type="radio" id="q${question.id}ptionB" name="q2Answer" value="B">
        <label for="q${question.id}ptionB">${question.choices[1]}</label><br>
        <input type="radio" id="q${question.id}ptionC" name="q2Answer" value="C">
        <label for="q${question.id}ptionC">${question.choices[2]}</label><br>
      </form>
    </div>
  `;
  div.innerHTML = innerHtml;
  selectedQuestionsList.appendChild(div);
  displayTheQuestions();
}

async function toggleQuestionOff(questionId) {
  questions = await getAll();
  question = questions.filter((q) => q.id === questionId)[0];

  const selectedQuestionsList = document.getElementById("selectedQuestions");
  const filteredQuestions = Array.from(
    selectedQuestionsList.children
  ).filter(
    (child) => parseInt(child.querySelector("b").textContent) !== questionId
  );

  selectedQuestionsList.innerHTML = "";

  filteredQuestions.forEach((question) =>
    selectedQuestionsList.appendChild(question)
  );

  displayTheQuestions();
}

async function add() {
  const quizTitle = document.getElementById("quizTitle").value;
  const selectedQuestionsList = document.getElementById("selectedQuestions");
  let selectedQuestionIds = Array.from(selectedQuestionsList.children).map(
    (child) => parseInt(child.querySelector("b").textContent)
  );
  const quiz = {
    title: quizTitle,
    questionIds: selectedQuestionIds,
  };

  let response = await fetch(host + "/quizzes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  if (response.status === 200) {
    alert("Quiz added successfully!");
    location.reload();
  } else {
    alert("Failed to add quiz!");
  }
}

async function addAndRefresh() {
  await add();
}

async function fetchQuizzes() {
  try {
    const response = await fetch(host + "/quizzes");
    const quizzes = await response.json();
    displayQuizzes(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
}


function displayQuizzes(quizzes) {
  const quizListElement = document.getElementById("quizList");
  quizListElement.innerHTML = "";

  quizzes.forEach((quiz) => {
    const quizCard = document.createElement("div");
    quizCard.className = "quiz-card";
    quizCard.innerHTML = `
      <h4>${quiz.id}</h4>
      <h4>${quiz.title}</h4>
      <div class="quiz-info">(${quiz.questions.length} questions)</div>
    `;

    quizCard.addEventListener("click", function () {
      startQuiz(quiz);
    });
    quizListElement.appendChild(quizCard);
  });
}

function startQuiz(quiz) {
  currentQuiz = quiz;

  document.getElementById("quizList").style.display = "none";
  document.getElementById("infoTitle").style.display = "none";
  document.getElementById("navbar").style.display = "none";
  document.getElementById("quizInterface").style.display = "block";

  displayQuestion(0);
  console.log("Starting quiz:", quiz.title);
}

function displayQuestion(questionIndex) {
  const question = currentQuiz.questions[questionIndex];

  document.getElementById("questionID").textContent = `${question.id}`;
  document.getElementById("questionText").textContent = `${question.description}`;

  const questionImage = document.getElementById("questionImage");
  questionImage.src = `${host}/questions/${question.id}/image`;

  const choicesContainer = document.getElementById("answerChoices");
  choicesContainer.innerHTML = "";
  question.choices.forEach((choice) => {
    const choiceElement = document.createElement("div");
    choiceElement.innerHTML = `
      <input type="radio" id="choice_${choice}" name="answer" value="${choice}">
      <label for="choice_${choice}">${choice}</label>
    `;
    choicesContainer.appendChild(choiceElement);
});

document.getElementById("questionCounter").textContent = `Question ${
  questionIndex + 1
} of ${currentQuiz.questions.length}`;

document
  .getElementById("previousButton")
  .classList.toggle("invisible", questionIndex === 0);

const nextButton = document.getElementById("nextButton");
if (questionIndex === currentQuiz.questions.length - 1) {
  nextButton.textContent = "Finish";
} else {
  nextButton.textContent = "Next";
}
}


document.getElementById("nextButton").addEventListener("click", function () {
const selectedChoice = document.querySelector('input[name="answer"]:checked');
if (selectedChoice) {
  const question = currentQuiz.questions[currentQuestionIndex];
  if (selectedChoice.value === question.answer) {
    currentScore++;
  }
}

if (currentQuestionIndex < currentQuiz.questions.length - 1) {
  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
} else {
  finishQuiz();
}
});

document.getElementById("previousButton").addEventListener("click", function () {
if (currentQuestionIndex > 0) {
  currentQuestionIndex--;
  displayQuestion(currentQuestionIndex);
}
});


function finishQuiz() {
console.log("Quiz finished");
document.getElementById("completedTitle").textContent = `You completed the quiz ${currentQuiz.title}`;
document.getElementById("completedScore").textContent = `You scored ${currentScore} out of ${currentQuiz.questions.length}`;

resetQuiz();
}

function resetQuiz() {
currentQuestionIndex = 0;
document.getElementById("quizList").style.display = "block";
document.getElementById("infoTitle").style.display = "block";
document.getElementById("navbar").style.display = "block";
document.getElementById("quizInterface").style.display = "none";
currentScore = 0;
}

fetchQuizzes();

*/
