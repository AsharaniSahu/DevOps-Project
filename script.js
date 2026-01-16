const questions = [
    {
        question: "HTML stands for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "CSS is used for?",
        answers: [
            { text: "Logic", correct: false },
            { text: "Styling", correct: true },
            { text: "Database", correct: false },
            { text: "Hosting", correct: false }
        ]
    },
    {
        question: "JavaScript runs on?",
        answers: [
            { text: "Server only", correct: false },
            { text: "Browser", correct: true },
            { text: "Compiler", correct: false },
            { text: "Database", correct: false }
        ]
    }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const quizCard = document.querySelector(".quiz-card");
const resultCard = document.querySelector(".result-card");
const scoreEl = document.getElementById("score");

let index = 0;
let score = 0;

function showQuestion() {
    reset();
    const q = questions[index];
    questionEl.textContent = q.question;

    progressBar.style.width = `${(index / questions.length) * 100}%`;

    q.answers.forEach(a => {
        const btn = document.createElement("button");
        btn.textContent = a.text;
        btn.dataset.correct = a.correct;
        btn.onclick = selectAnswer;
        answersEl.appendChild(btn);
    });
}

function reset() {
    nextBtn.classList.add("hidden");
    answersEl.innerHTML = "";
}

function selectAnswer(e) {
    const btn = e.target;
    const correct = btn.dataset.correct === "true";

    if (correct) score++;

    Array.from(answersEl.children).forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === "true") b.classList.add("correct");
        if (b === btn && !correct) b.classList.add("wrong");
    });

    nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} / ${questions.length}`;
    progressBar.style.width = "100%";
}

function restartQuiz() {
    index = 0;
    score = 0;
    resultCard.classList.add("hidden");
    quizCard.classList.remove("hidden");
    showQuestion();
}

showQuestion();
