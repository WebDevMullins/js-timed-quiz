const header = document.getElementById('header')
const highScoresButton = document.getElementById('high-scores-button')
const timer = document.getElementById('timer')
const startCon = document.getElementById('start-container')
const startButton = document.getElementById('start-button')
const questionCon = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const choiceButton = document.querySelectorAll('.choice')
const answer = document.getElementById('result')
const scoreEl = document.getElementById('score-container')
const scoreFinal = document.getElementById('score')
const initials = document.getElementById('initials')
const saveScoreButton = document.getElementById('save')
const highScoresEl = document.getElementById('high-scores-container')
const highScore = document.getElementById('high-score')
const restartButton = document.getElementById('restart')

// Init Variables
var currentQuestionIndex = 0
var score = 0
var timeRemaining = 60
var finalScore
var countDown

// Questions and Answers
const questions = [
	{
		question: 'Commonly used data types do NOT include:',
		choices: ['alerts', 'booleans', 'strings', 'numbers'],
		correctAnswer: 'alerts',
	},
	{
		question: 'The condition in an if/else statement is enclosed with _____.',
		choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
		correctAnswer: 'parenthesis',
	},
	{
		question: 'Arrays in JS can be used to store _____.',
		choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
		correctAnswer: 'all of the above',
	},
	{
		question: 'String values must be enclosed within _____ when being assigned to variables.',
		choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
		correctAnswer: 'quotes',
	},
	{
		question:
			'A very useful tool used during developement and debugging for printing content to the debugger is:',
		choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
		correctAnswer: 'console.log',
	},
]

// Event Listeners
startButton.addEventListener('click', startQuiz)
choiceButton.forEach((button) => button.addEventListener('click', selectAnswer))
saveScoreButton.addEventListener('click', saveScore)

// Start Quiz
function startQuiz() {
	countDown = setInterval(updateTimer, 1000)
	startCon.style.display = 'none'
	questionCon.style.display = 'flex'
	displayQuestion()
}

// Display Questions and Choices
function displayQuestion() {
	const question = questions[currentQuestionIndex]

	questionEl.textContent = question.question
	choiceButton.forEach((button, i) => {
		button.textContent = question.choices[i]
	})
}

// Select Choices
function selectAnswer(e) {
	const question = questions[currentQuestionIndex]

	const selectedChoice = e.target
	if (selectedChoice.textContent === question.correctAnswer) {
		answer.textContent = 'Correct!'
		answer.style.color = 'green'
		score += 5
	} else {
		answer.textContent = 'Wrong!'
		answer.style.color = 'red'
		timeRemaining -= 10
	}
	currentQuestionIndex++
	if (currentQuestionIndex < questions.length) {
		displayQuestion()
	} else {
		stopQuiz()
		currentQuestionIndex = 0
	}
}

// Timer
function updateTimer() {
	timeRemaining--
	timer.textContent = timeRemaining
	if (timeRemaining <= 0) {
		clearInterval(countDown)
		stopQuiz()
	}
}

// Stop Quiz
function stopQuiz() {
	finalScore = score + timeRemaining
	header.style.display = 'none'
	questionCon.style.display = 'none'
	scoreEl.style.display = 'flex'
	scoreFinal.textContent = finalScore
	clearInterval(countDown)
	console.log(finalScore)
}

// Save Score to localhost and go to High Scores
function saveScore(e) {
	e.preventDefault()
	const playerInitials = initials.value
	const playerScore = finalScore
	const player = {
		playerInitials: playerInitials,
		score: playerScore,
	}

	localStorage.setItem('player', JSON.stringify(player))

	showHighScores()
}

// Show High Scores
function showHighScores() {
	const storedPlayerJSON = localStorage.getItem('player')
	const storedPlayer = JSON.parse(storedPlayerJSON)
	highScore.textContent = `${storedPlayer.playerInitials} --- ${storedPlayer.score}`
	scoreEl.style.display = 'none'
	highScoresEl.style.display = 'flex'
}
