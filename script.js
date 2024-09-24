const wordList = ['apple', 'grape', 'mango', 'lemon', 'peach']; // List of possible words
let secretWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
let currentGuess = '';
let currentRow = 0;
const maxGuesses = 6;

// Generate the game board
function createBoard() {
    const board = document.getElementById('game-board');
    for (let i = 0; i < maxGuesses * 5; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', `tile-${i}`);
        board.appendChild(tile);
    }
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (currentGuess.length === 5) {
            checkGuess();
        }
    } else if (event.key === 'Backspace') {
        removeLetter();
    } else if (event.key.match(/^[a-z]$/i)) {
        addLetter(event.key);
    }
});

// Add letter to current guess
function addLetter(letter) {
    if (currentGuess.length < 5) {
        currentGuess += letter.toLowerCase();
        const tileIndex = currentRow * 5 + currentGuess.length - 1;
        const tile = document.getElementById(`tile-${tileIndex}`);
        tile.textContent = letter.toUpperCase();
    }
}

// Remove last letter
function removeLetter() {
    if (currentGuess.length > 0) {
        const tileIndex = currentRow * 5 + currentGuess.length - 1;
        const tile = document.getElementById(`tile-${tileIndex}`);
        tile.textContent = '';
        currentGuess = currentGuess.slice(0, -1);
    }
}

// Check the current guess
function checkGuess() {
    if (currentGuess === secretWord) {
        alert('Congratulations, you guessed the word!');
    } else {
        const guessArray = currentGuess.split('');
        for (let i = 0; i < 5; i++) {
            const tileIndex = currentRow * 5 + i;
            const tile = document.getElementById(`tile-${tileIndex}`);
            if (guessArray[i] === secretWord[i]) {
                tile.classList.add('correct');
            } else if (secretWord.includes(guessArray[i])) {
                tile.classList.add('present');
            } else {
                tile.classList.add('absent');
            }
        }
        currentRow++;
        if (currentRow === maxGuesses) {
            alert(`Game over! The word was ${secretWord}`);
        }
    }
    currentGuess = '';
}

// Restart the game
document.getElementById('restart').addEventListener('click', () => {
    location.reload();
});

createBoard();
