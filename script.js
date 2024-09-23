// Initialize data storage (list) here
// A list that holds multiple dictionaries (key-value pairs)
const database = [
    {
        question : "38923819371298371298371987 x 749",
        options  : ["8.3713719837898763e+23", "7.38127312987312983e+12", "2.915394070910248e+18", "6.31283618638637163781263e+21"],
        answer   : "2.915394070910248e+18"
    },

    {
        question : "3798123812371287 x 98371",
        options  : ["3.734201388609078e+20", "5.7317391739173113e+32", "3.193198731739187131e+21", "8.3173981273891317381e+14"],
        answer   : "3.734201388609078e+20"
    },
 
    {
        question : "21761278361278 x 372937171981",
        options  : ["3.8731837193871317e+31", "5.138173681711133e+32", "6.19319371631131e+21", "8.115589610746347e+24"],
        answer   : "8.115589610746347e+24"
    },
    
    {
        question : "978173912873 x 173187381231",
        options  : ["83137183917371837e+12", "1.694073783589552e+23", "3.81131317319873891e+60", "3.193198319131313e+24"],
        answer   : "1.694073783589552e+23"
    },

    {
        question : "316317836127836 x 97318937189371",
        options  : ["3.078371562600262e+28", "1.63183683111352e+23", "3.78139817391739891e+60", "8.712836127131313e+24"],
        answer   : "3.078371562600262e+28"
    },
];
 
// Identify all HTML components that we want to control
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerText = document.getElementById('countdownText');
const progressBarFill = document.getElementById('progress-bar-fill');
const optionsContainer = document.getElementById('option-container');
const resultLabel = document.getElementById('result');
const feedbackLabel = document.getElementById('feedback');
const progressBarContainer = document.getElementById('progress-bar-container');
const timerElement = document.getElementById('timer');

progressBarFill.style.width = '0%';
feedbackLabel.textContent = "";

let currentQuestionNo = 0;
let timer = 0;
let score = 0;

startButton.addEventListener('click', startQuiz)

function startQuiz()
{
    startButton.style.display = 'none'; // to hide the start button
    loadNextQuestion();
}

function loadNextQuestion()
{
    // Reset timer
    clearInterval(timer);

    if(currentQuestionNo < database.length)
    {
        // Update progress bar
        progressBarFill.style.width = `${((currentQuestionNo + 1) / database.length) * 100}%`;

        // Set initial countdown value
        timerText.textContent = 15;

        const currentQuestionSet = database[currentQuestionNo];
        questionElement.textContent = currentQuestionSet.question;

        //clone 4 options buttons for a question
        optionsContainer.innerHTML = '';

        //clone 4 option buttons for a question
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement("button");
            button.classList.add('option-btn');
            button.textContent = option;
            optionsContainer.appendChild(button);

            button.addEventListener('click', () => {
                disableOptionButtons()
                checkAnswer(option);
            });
        });

        // re-enable options buttons
        enableOptionButtons();

        // Start the countdown timer
        //define in {} what to do when timer fires
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                //reset timer
                clearInterval(timer);

                currentQuestionNo = currentQuestionNo + 1;

                loadNextQuestion();
            }

        }, 1000);
    } else
    {
        EndQuiz();
    }
}

function checkAnswer(option)
{
    // Retrieve answer key of a question set
    const answer = database[currentQuestionNo].answer;

    if (option === answer)
    {
        score = score + 1;
    }

    resultLabel.textContent = `You scored ${score} point(s)`;

    showFeedback(option);
}

function showFeedback(option)
{
    const answer = database[currentQuestionNo].answer

    let feedbackText = "";

    if(option === answer)
    {
        feedbackText = "That's correct!";
    } else if (option === null)
    {
        feedbackText = "Hey! Time's up! Next question...";
    } else
    {
        feedbackText = "Wrong answer, better luck next time!";
    }

    feedbackLabel.textContent = feedbackText;

    // feedback holds for 3 seconds before it loads the next question
    setTimeout(() => {
        // define what we do 3 seconds later
        currentQuestionNo = currentQuestionNo + 1;
        loadNextQuestion();
        feedbackLabel.textContent = ""; 
    }, 3000);
}


function disableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Disable all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = true;
    });
}

function enableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Able all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = false;
    });
}

function EndQuiz()
{
    clearInterval(timer);
    progressBarContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    timerElement.style.display = 'none';  
    feedbackLabel.textContent= "";
    questionElement.textContent = "Quiz had ended!!!! HOORAY!!! LET'S DO ROBLOX!";
}



