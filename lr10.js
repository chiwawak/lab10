let userName = "User";
let currentAttempt = 0;
const maxAttempts = 3;
let isGameOver = false;

const fruitsList = [
    { name: "Мітя", img: "mitya.jpg" },
    { name: "Валерій", img: "valeriy.jpg" },
    { name: "Альоша", img: "alyosha.jpg" },
    { name: "Діона", img: "diona.jpg" },
    { name: "Каталізатор", img: "book.png" },
    { name: "Паймон", img: "paimon.jpeg" },
];

function getUniqueColumnFruits() {
    const tempFruits = fruitsList.slice();
    const selectedFruits = [];

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * tempFruits.length);
        const pickedFruit = tempFruits.splice(randomIndex, 1)[0];
        selectedFruits.push(pickedFruit);
    }

    return selectedFruits;
}

function showResultBanner(text, statusClass) {
    const resultMessageEl = document.getElementById("result-message");
    resultMessageEl.textContent = text;
    resultMessageEl.classList.add("visible", statusClass);
}

function disableGenerateButton() {
    const generateBtn = document.getElementById("generate-btn");
    generateBtn.disabled = true;
    generateBtn.classList.add("disabled");
}

function checkWinCondition(col1, col2, col3) {
    for (let row = 0; row < 3; row++) {
        if (col1[row].name === col2[row].name && col2[row].name === col3[row].name) {
            return true;
        }
    }
    return false;
}

function handleGenerateClick() {
    if (isGameOver || currentAttempt >= maxAttempts) {
        return;
    }

    const attemptCounterEl = document.getElementById("attempt-counter");

    currentAttempt++;
    attemptCounterEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;

    const col1Fruits = getUniqueColumnFruits();
    const col2Fruits = getUniqueColumnFruits();
    const col3Fruits = getUniqueColumnFruits();

    for (let row = 0; row < 3; row++) {
        const slot1 = document.getElementById(`slot-1-${row + 1}`);
        const slot2 = document.getElementById(`slot-2-${row + 1}`);
        const slot3 = document.getElementById(`slot-3-${row + 1}`);

        slot1.src = col1Fruits[row].img;
        slot1.alt = col1Fruits[row].name;

        slot2.src = col2Fruits[row].img;
        slot2.alt = col2Fruits[row].name;

        slot3.src = col3Fruits[row].img;
        slot3.alt = col3Fruits[row].name;
    }

    const hasWon = checkWinCondition(col1Fruits, col2Fruits, col3Fruits);

    if (hasWon) {
        isGameOver = true;
        disableGenerateButton();
        showResultBanner(`Вітаємо, ${userName}! Ви виграли з ${currentAttempt}-ї спроби!`, "win");
    } else if (currentAttempt === maxAttempts) {
        isGameOver = true;
        disableGenerateButton();
        showResultBanner(`На жаль, ${userName}, ви програли. Спробуйте ще раз!`, "lose");
    }
}

function initGame() {
    const userNameEl = document.getElementById("user-name");
    const generateBtn = document.getElementById("generate-btn");

    const inputName = prompt("Введіть ваше ім'я:", "User");
    userName = inputName && inputName.trim() ? inputName.trim() : "User";
    userNameEl.textContent = userName;

    generateBtn.addEventListener("click", handleGenerateClick);
}

document.addEventListener("DOMContentLoaded", initGame);