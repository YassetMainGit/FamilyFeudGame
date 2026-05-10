const questions = [
    {
      question: "Name something people eat with ketchup",
      answers: [
        { text: "Fries", points: 45 },
        { text: "Burger", points: 25 },
        { text: "Hot Dog", points: 15 },
        { text: "Chicken Nuggets", points: 10 },
        { text: "Pizza", points: 5 },
        { text: "Sandwich", points: 4 },
        { text: "Rice", points: 3 },
        { text: "Pasta", points: 2 }
      ]
    },

    {
      question: "Name a popular pet",
      answers: [
        { text: "Dog", points: 50 },
        { text: "Cat", points: 30 },
        { text: "Fish", points: 10 },
        { text: "Parrot", points: 5 },
        { text: "Hamster", points: 3 },
        { text: "Rabbit", points: 2 },
        { text: "Turtle", points: 1 },
        { text: "Snake", points: 1 }
      ]
    }
  ];


// =========================
// TEAM SCORES
// =========================

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

createSidebar();
loadQuestion(0);
setActiveTeam("A");