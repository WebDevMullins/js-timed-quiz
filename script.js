const startCon = document.getElementById('start-container')
const startButton = document.getElementById('start-button')
const questionCon = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const choiceButton = document.querySelectorAll('.choice')
const timer = document.getElementById('timer')

// Init Variables
var currentQuestionIndex = 0
var score = 0
var timeRemaining = 60
var countDown

// Questions and Answers
const questions = [
	{
		question: 'Commonly used data types do NOT include:',
		choices: ['alerts', 'booleans', 'strings', 'numbers'],
		correctAnswer: 0,
	},
	{
		question: 'The condition in an if/else statement is enclosed with _____.',
		choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
		correctAnswer: 2,
	},
	{
		question: 'Arrays in JS can be used to store _____.',
		choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
		correctAnswer: 3,
	},
	{
		question: 'String values must be enclosed within _____ when being assigned to variables.',
		choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
		correctAnswer: 2,
	},
	{
		question:
			'A very useful tool used during developement and debugging for printing content to the debugger is:',
		choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
		correctAnswer: 3,
	},
]

// Event Listeners
startButton.addEventListener('click', startQuiz)

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

// Timer
function updateTimer() {
	timeRemaining--
	timer.textContent = timeRemaining
	if (timeRemaining <= 0) {
		clearInterval(countDown)
	}
	console.log(timeRemaining)
}
//
// Call functions for testing
//
// displayQuestion()
// startQuiz()
// updateTimer()
