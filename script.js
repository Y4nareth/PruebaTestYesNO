const questions = [
    {
        question: "Elije la verdadera",
        answers: [
            { text: "Soy la tercera", correct:false},
            { text: "Soy la segunda", correct:true},
            { text: "Soy la primera", correct:false},
            { text: "Soy la tercera", correct:false}
        ]
    },
    {
        question: "¿Cuales dos son lenguajes de programación?",
        answers: [
            { text: "Python", correct:true},
            { text: "Frances", correct:false},
            { text: "Php", correct:true},
            { text: "Salmón", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const control = document.getElementById("control");
const nextButton = document.getElementById("next-btn");
const valButton = document.getElementById("validate-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = [];

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    //valButton.innerHTML = "Confirmar";
    //nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function getCorrectAnswers(currentQuestion) {
    const correctAnswers = [];
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (currentQuestion.answers[i].correct) {
            correctAnswers.push(1);
        } else {
            correctAnswers.push(2);
        }
    }
    return correctAnswers;
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    correctAnswer = getCorrectAnswers(currentQuestion);
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    var table = createYesNoOptions(currentQuestion.answers);
    control.appendChild(table);

    valButton.addEventListener("click", validateAnswer);
}

/**
 * input.setAttribute("required", "");
    input.classList.add("radio-dot");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "group"); //`group${value}`
    input.setAttribute("value", value);
 */

function createYesNoOptions(answers) {
    var table = document.createElement('table');

    var headerRow = table.insertRow();
    headerRow.classList.add('btn');
    var headerCell = headerRow.insertCell(0);
    var headerSentence = document.createElement('span');
    headerCell.appendChild(headerSentence);
    headerSentence.classList.add('radio-label-text');
    headerSentence.textContent = 'Sentece';
    
    var optionYesCell = headerRow.insertCell(1);
    var headerYes = document.createElement('span');
    optionYesCell.appendChild(headerYes);
    headerYes.classList.add('options-label-text');
    headerYes.textContent = 'Yes';

    var optionNoCell = headerRow.insertCell(2);
    var headerNo = document.createElement('span');
    optionNoCell.appendChild(headerNo);
    headerNo.classList.add('options-label-text');
    headerNo.textContent = 'No';

    let answerIdx = 1;
    answers.forEach(answer => {
        var row = table.insertRow();
        row.dataset.correct = answer.correct;
        row.classList.add('btn');

        var sentenceCell = row.insertCell(0);
        var sentence = document.createElement('span');
        sentenceCell.appendChild(sentence);
        sentence.classList.add('radio-label-text');
        sentence.textContent = answer.text;

        var yesCell = row.insertCell(1);
        var yesButton = document.createElement('input');
        yesCell.appendChild(yesButton);
        yesButton.setAttribute("required", "");
        yesButton.classList.add("radio-dot-yesno");
        yesButton.setAttribute("type", "radio");
        yesButton.setAttribute("name", `group${answerIdx}`);
        yesButton.setAttribute("value", 1);

        var noCell = row.insertCell(2);
        var noButton = document.createElement('input');
        noCell.appendChild(noButton);
        noButton.setAttribute("required", "");
        noButton.classList.add("radio-dot-yesno");
        noButton.setAttribute("type", "radio");
        noButton.setAttribute("name", `group${answerIdx}`);
        noButton.setAttribute("value", 2);

        answerIdx++;
    });
    
    return table;
}

function resetState(){
    while(control.firstChild){
        control.removeChild(control.firstChild);
        nextButton.style.display = "none";
    }
}


function validateAnswer(){

    nextButton.style.display = "inline";

    // Get the value of the selected radio button
    var selectedOption = document.querySelectorAll('input:checked'); //input[name="group"]:checked

    var answers = control.children[0].children[0].children;
        
    // Check if an option is selected
    if (selectedOption) {

        for(var i=0;i<=selectedOption.length;i++){
            var selected = selectedOption[i];
            if(correctAnswer[i]==selected.value){
                answers[i+1].classList.add("correct");
            }else{
                answers[i+1].classList.add("incorrect");
            }
        }

        /*
        selectedOption.forEach(selected => {
            if(correctAnswer.includes(parseInt(selected.value,10))){
                answers[parseInt(selected.value,10)].classList.add("correct");
                score++;
            }else{
                answers[parseInt(selected.value,10)].classList.add("incorrect");
            }
        });*/
    } else {
        alert("Por favor seleccione una opción"); // No option selected
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(control.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuación es ${score} de ${questions.length}`;
    nextButton.innerHTML = "Repetir Test";
    nextButton.style.display = "block";
}

function handleNextQuetion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuetion();
    }else{
        startQuiz();
    }
});

startQuiz();