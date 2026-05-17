const questions = [

  {
    "question": "Адамдар кетчуппен бірге не жейді?",
    "answers": [
      { "text": "Фри картобы", "points": 100 },
      { "text": "Бургер", "points": 70 },
      { "text": "Хот-дог", "points": 60 },
      { "text": "Тауық наггетсі", "points": 50 },
      { "text": "Пицца", "points": 40 },
      { "text": "Сэндвич", "points": 30 },
      { "text": "Күріш", "points": 20 },
      { "text": "Макарон", "points": 10 }
    ]
  },
  {
    "question": "Танымал үй жануарларын атаңыз",
    "answers": [
      { "text": "Ит", "points": 100 },
      { "text": "Мысық", "points": 70 },
      { "text": "Балық", "points": 60 },
      { "text": "Тоты құс", "points": 50 },
      { "text": "Хомяк", "points": 40 },
      { "text": "Қоян", "points": 30 },
      { "text": "Тасбақа", "points": 20 },
      { "text": "Жылан", "points": 10 }
    ]
  },
  {
    "question": "Қазақстан тәуелсіздігін алғаш таныған елдерді атаңыз",
    "answers": [
      { "text": "Түркия", "points": 100 },
      { "text": "Ресей", "points": 70 },
      { "text": "АҚШ", "points": 60 },
      { "text": "Қытай", "points": 50 },
      { "text": "Ұлыбритания", "points": 40 },
      { "text": "Германия", "points": 30 },
      { "text": "Франция", "points": 20 },
      { "text": "Үндістан", "points": 10 }
    ]
  },
  {
    "question": "2026 жылғы Қазақстан халқы көп аймақтарын атаңыз",
    "answers": [
      { "text": "Алматы қаласы", "points": 100 },
      { "text": "Түркістан облысы", "points": 70 },
      { "text": "Астана қаласы", "points": 60 },
      { "text": "Алматы облысы", "points": 50 },
      { "text": "Шымкент қаласы", "points": 40 },
      { "text": "Жамбыл облысы", "points": 30 },
      { "text": "Қарағанды облысы", "points": 20 },
      { "text": "Абай облысы", "points": 10 }
    ]
  },
  {
    "question": "Қазақтың негізгі жүздері мен рулық бірлестіктерін атаңыз",
    "answers": [
      { "text": "Арғын", "points": 100 },
      { "text": "Дулат", "points": 70 },
      { "text": "Байұлы", "points": 60 },
      { "text": "Найман", "points": 50 },
      { "text": "Қоңырат", "points": 40 },
      { "text": "Әлімұлы", "points": 30 },
      { "text": "Қыпшақ", "points": 20 },
      { "text": "Жетіру", "points": 10 }
    ]
  }
  
];


// =========================
// TEAM SCORES
// =========================

document.getElementById("revealAllBtn")
  .addEventListener("click", revealAllAnswers);

const teamABox = document.getElementById("teamABox");
const teamBBox = document.getElementById("teamBBox");

let teamAScore = 0;
let teamBScore = 0;

const teamAScoreElement = document.getElementById("teamAScore");
const teamBScoreElement = document.getElementById("teamBScore");

// ACTIVE TEAM

let currentTeam = "A";

// =========================
// ELEMENTS
// =========================

const sidebar = document.getElementById("sidebar");
const questionBox = document.getElementById("questionBox");
const answersGrid = document.getElementById("answersGrid");

let currentQuestion = 0;

// =========================
// ADD POINTS
// =========================

function setActiveTeam(team) {

  currentTeam = team;

  teamABox.classList.remove("active-team");
  teamBBox.classList.remove("active-team");

  if(team === "A") {
    teamABox.classList.add("active-team");
  } else {
    teamBBox.classList.add("active-team");
  }

}

teamABox.addEventListener("click", () => {
  setActiveTeam("A");
});

teamBBox.addEventListener("click", () => {
  setActiveTeam("B");
});

function addPoints(points) {

  if(currentTeam === "A") {
    teamAScore += points;
    teamAScoreElement.innerText = teamAScore;

  } else {
    teamBScore += points;
    teamBScoreElement.innerText = teamBScore;
  }

  saveScores(); // 👈 сохраняем
}

function saveScores() {

  localStorage.setItem("teamAScore", teamAScore);
  localStorage.setItem("teamBScore", teamBScore);

}

function loadScores() {

  teamAScore = Number(localStorage.getItem("teamAScore")) || 0;
  teamBScore = Number(localStorage.getItem("teamBScore")) || 0;

  teamAScoreElement.innerText = teamAScore;
  teamBScoreElement.innerText = teamBScore;

}

// =========================
// SWITCH TEAM
// =========================

function switchTeam() {

  if(currentTeam === "A") {
    currentTeam = "B";
  } else {
    currentTeam = "A";
  }

  console.log("Current Team:", currentTeam);

}

// =========================
// LOAD QUESTION
// =========================

function loadQuestion(index) {

  currentQuestion = index;

  const q = questions[index];

  questionBox.innerText = q.question;

  answersGrid.innerHTML = "";

  q.answers.forEach((answer, i) => {

    const card = document.createElement("div");

    card.classList.add("answer-card");

    card.innerHTML = `#${i + 1}`;

    card.dataset.revealed = "false";

    card.addEventListener("click", () => {

      // already opened

      if(card.dataset.revealed === "true") return;

      // reveal answer

      card.dataset.revealed = "true";

      card.classList.add("revealed");

      card.innerHTML = `
        ${answer.text}

        <span style="
          position:absolute;
          right:20px;
          font-size:22px;
        ">
          ${answer.points}
        </span>
      `;

      // add score to current team

      addPoints(answer.points);

    });

    answersGrid.appendChild(card);

  });

  updateSidebar();

}

function revealAllAnswers() {

  const cards = document.querySelectorAll(".answer-card");

  const q = questions[currentQuestion];

  cards.forEach((card, index) => {

    if(card.dataset.revealed === "true") return;

    const answer = q.answers[index];

    card.dataset.revealed = "true";
    card.classList.add("revealed");

    card.innerHTML = `
      ${answer.text}
      <span style="
        position:absolute;
        right:20px;
        font-size:22px;
      ">
        ${answer.points}
      </span>
    `;

  });

}

// =========================
// SIDEBAR
// =========================

function createSidebar() {

  sidebar.innerHTML = "";

  questions.forEach((q, index) => {

    const btn = document.createElement("div");

    btn.classList.add("question-btn");

    if(index === currentQuestion) {
      btn.classList.add("active");
    }

    btn.innerText = `Q${index + 1}`;

    btn.addEventListener("click", () => {
      loadQuestion(index);
    });

    sidebar.appendChild(btn);

  });

}

// =========================
// UPDATE SIDEBAR
// =========================

function updateSidebar() {

  const buttons = document.querySelectorAll(".question-btn");

  buttons.forEach((btn, index) => {

    btn.classList.remove("active");

    if(index === currentQuestion) {
      btn.classList.add("active");
    }

  });

}

// =========================
// INIT
// =========================

loadScores();
createSidebar();
loadQuestion(0);
setActiveTeam("A");
