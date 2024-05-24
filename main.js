// Data
import alphabet from "./assets/data/alphabet.mjs";
import { getRandomWord } from "./assets/data/word-bank.mjs";

// Global Variables
const gameInfo = {
  started: false,
  solved: false,
  wordToSolve: undefined,
  triesLeft: 10,
  correctCount: 0,
};

// Global Selectors
// const letterBankElement = document.getElementsByClassName("letter-bank")[0]
const letterBankContainerElement = document.getElementsByClassName(
  "letter-bank-container"
)[0];
const letterBankElementList = [];
const revealWordElement = document.getElementById("reveal-word");
const categoryElement = document.getElementById("category");
const wordFillElement = document.getElementById("word-fill");
const characterElementList = [];
const luckCounterElement = document.getElementById("luck-counter");
const startButtonElement = document.getElementById("start-button");

const chooseLetter = (letter) => {
  if (!gameInfo.started || gameInfo.wordToSolve === undefined) return;

  // Find letter element in DOM and delete it
  for (let i = 0; i < letterBankElementList.length; i++) {
    if (letterBankElementList[i].innerText.toUpperCase() === letter) {
      const upper = gameInfo.wordToSolve.toUpperCase();
      // Alert player for correctness
      if (upper.includes(letter)) {
        // Fill indexes
        for (let j = 0; j < upper.length; j++) {
          if (upper[j] === letter) {
            characterElementList[j].innerText = letter;
            gameInfo.correctCount++;
          }
        }
        if (gameInfo.correctCount === gameInfo.wordToSolve.length) {
          // Game Over -> YOU WIN!
          revealWordElement.innerText = gameInfo.wordToSolve;
          const checkIcon = document.createElement("img");
          checkIcon.src = "./assets/icons/check.png";
          checkIcon.classList.add("icon");
          revealWordElement.append(checkIcon);
          gameInfo.started = false;
        }
      } else {
        gameInfo.triesLeft--;
        luckCounterElement.innerText = `Luck: ${gameInfo.triesLeft}`;
        // Penalty for wrong choice
        if (gameInfo.triesLeft <= 0) {
          /* Display sad game over modal with
          the word revealed
          */
          gameInfo.started = false;
        }
      }
      letterBankElementList[i].remove();
      return;
    }
  }
};

const init = () => {
  // Populate letters
  for (let i = 0; i < alphabet.length; i++) {
    const char = alphabet[i];
    const letterElement = document.createElement("div");
    letterElement.classList.add("letter");
    letterElement.innerText = char;
    letterElement.addEventListener("click", () => chooseLetter(char));
    letterBankElementList.push(letterElement);
    letterBankContainerElement.append(letterElement);
  }
};

const chooseFromWordBank = () => {
  if (gameInfo.started) return;

  // Remove initial element from word fill
  wordFillElement.querySelector(".character").remove();

  // Set random word
  const randomWord = getRandomWord();
  gameInfo.wordToSolve = randomWord.word;
  revealWordElement.innerText = "?";
  categoryElement.innerText = `Category: ${randomWord.category}`;

  // Populate word fill
  for (const char of randomWord.word) {
    const characterElement = document.createElement("h4");
    characterElement.classList.add("character");
    characterElementList.push(characterElement);
    wordFillElement.append(characterElement);
  }
};

const start = () => {
  chooseFromWordBank();
  document.querySelector(".start-game").style.display = "none";
  luckCounterElement.innerHTML = "Luck: " + gameInfo.triesLeft;
  gameInfo.started = true;
};

startButtonElement.onclick = start;

init();
