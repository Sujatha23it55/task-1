const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz");
const restartBtn = document.getElementById("restart");

const questions = [
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is used to style HTML?",
    options: ["CSS", "Node.js", "Java", "Python"],
    answer: "CSS"
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which of these is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Flask"],
    answer: "React"
  },
  {
    question: "Which symbol is used for single-line comments in JS?",
    options: ["<!-- -->", "//", "#", "/* */"],
    answer: "//"
  }
];

document.getElementById("total-questions").textContent = questions.length;

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next");

startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => handleAnswer(btn, option, current.answer);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(button, selected, correct) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
    allButtons.forEach(btn => {
      if (btn.textContent === correct) btn.classList.add("correct");
    });
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score}/${questions.length}`;
    nextBtn.disabled = true;
    restartBtn.style.display = "inline-block";
  }
};

restartBtn.onclick = () => {
  location.reload();
};
