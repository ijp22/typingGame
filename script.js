const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List Of Words For Game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'dragqueen',
  'loving'
];

// Init Word
let randomWord;

// Init Score
let score = 0;

// Init Time
let time = 10;

// Set Difficulty and Local Storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set Difficulty Select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus On Text On Start
text.focus();

// Start Countdown
const timeInterval = setInterval(updateTime, 1000);

// Generate Random Word
getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
}

// Add Word to DOM
addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update Score
updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    //End Game
    gameOver();
  }
};

//Game Over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out!</h1>
    <p>Your Final Score is: ${score}</p>
    <button onClick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event Listeners
//Typing
text.addEventListener('input', e => {
  const insertedtext = e.target.value;

  if(insertedtext === randomWord){
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if(difficulty === 'hard'){
      time += 2;
    } else if(difficulty === 'medium') {
      time += 3;
    } else {
      time +=5;
    }

    updateTime();
  }
})

//Settings Button Click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Setting Select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})