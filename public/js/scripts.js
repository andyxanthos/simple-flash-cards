const app = document.getElementById('app');
const addQuestionBtn = document.getElementById('add-question-btn');
const questionForm = document.getElementById('question-form');

addQuestionBtn.addEventListener('click', function() {
    // Count the number of question-group elements
    // Add one for use in the current element
    let count = Array.from(document.querySelectorAll('.question-group')).length + 1;

    let questionGroup = document.createElement('div');
    questionGroup.classList.add('question-group');

    let questionLabel = document.createElement('label');
    let questionLabelText = document.createTextNode(`Question ${count}`);
    questionLabel.htmlFor = `question${count}`;
    questionLabel.appendChild(questionLabelText);
    questionGroup.appendChild(questionLabel);

    let questionInput = document.createElement('input');
    questionInput.type = "text";
    questionInput.name = `question${count}`;
    questionInput.id = `question${count}`;
    questionGroup.appendChild(questionInput);

    let answerLabel = document.createElement('label');
    let answerLabelText = document.createTextNode(`Answer ${count}`);
    answerLabel.htmlFor = `answer${count}`;
    answerLabel.appendChild(answerLabelText);
    questionGroup.appendChild(answerLabel);

    let answerInput = document.createElement('input');
    answerInput.type = "text";
    answerInput.name = `answer${count}`;
    answerInput.id = `answer${count}`;
    questionGroup.appendChild(answerInput);

    questionForm.insertBefore(questionGroup, questionForm.children[questionForm.children.length - 2]);
});

questionForm.addEventListener('submit', function() {
    let questions = [];
    let questionGroups = document.querySelectorAll('.question-group');
    questionGroups.forEach(questionGroup => {
        if (questionGroup.children[1].value != '') {
            questions.push({
                text: questionGroup.children[1].value,
                answer: questionGroup.children[3].value
            });
        }
    });
    if (questions.length == 0) {
        return alert('You must add at least one question!');
    }
    localStorage.setItem('questions', JSON.stringify(questions));
    renderCards();
});

function renderCards() {
    let questions = JSON.parse(localStorage.getItem('questions'));

    app.innerHTML = '';

    renderAddOrEditBtn();

    questions.forEach(question => {
        let flashCard = document.createElement('div');
        let flashCardFront = document.createElement('div');
        let flashCardBack = document.createElement('div');

        flashCard.classList.add('flash-card');
        flashCardFront.classList.add('flash-card-front');
        flashCardBack.classList.add('flash-card-back');
        flashCard.appendChild(flashCardFront);
        flashCard.appendChild(flashCardBack);

        let q = document.createElement('p');
        let qText = document.createTextNode(question.text);
        q.appendChild(qText);
        flashCardFront.appendChild(q);

        let a = document.createElement('p');
        let aText = document.createTextNode(question.answer);
        a.appendChild(aText);
        flashCardBack.appendChild(a);
        flashCardBack.style.display = 'none';

        app.appendChild(flashCard);
    });

    document.querySelectorAll('.flash-card').forEach(flashCard => {
        flashCard.answerShown = false;
        
        flashCard.addEventListener('click', function() {
            if (!this.answerShown) {
                this.children[0].style.display = 'none';
                this.children[1].style.display = 'block';
            } else if (this.answerShown) {
                this.children[0].style.display = 'block';
                this.children[1].style.display = 'none';
            }
            this.answerShown = !this.answerShown;
        });
    })
}

function renderAddOrEditBtn() {
    let button = document.createElement('button');
    let buttonText = document.createTextNode('Add or Edit Flash Cards');
    button.classList.add('add-or-edit-btn');
    button.appendChild(buttonText);
    app.appendChild(button);

    button.addEventListener('click', renderForm);
}

function renderForm() {
    app.innerHTML = '';

    let qForm = document.createElement('form');
    qForm.method = "POST";
    qForm.action = "javascript:void(0)";
    qForm.id = "question-form";

    let questions = JSON.parse(localStorage.getItem('questions'));
    questions.forEach((question, index) => {
        let questionGroup = document.createElement('div');
        questionGroup.classList.add('question-group');

        let questionLabel = document.createElement('label');
        let questionLabelText = document.createTextNode(`Question ${index + 1}`);
        questionLabel.appendChild(questionLabelText);
        questionLabel.htmlFor = `question${index + 1}`;
        questionGroup.appendChild(questionLabel);
        
        let questionInput = document.createElement('input');
        questionInput.type = "text";
        questionInput.id = `question${index + 1}`;
        questionInput.name = `question${index + 1}`;
        questionInput.value = question.text;
        questionGroup.appendChild(questionInput);

        let answerLabel = document.createElement('label');
        let answerLabelText = document.createTextNode(`Answer ${index + 1}`);
        answerLabel.appendChild(answerLabelText);
        answerLabel.htmlFor = `answer${index + 1}`;
        questionGroup.appendChild(answerLabel);

        let answerInput = document.createElement('input');
        answerInput.type = "text";
        answerInput.id = `answer${index + 1}`;
        answerInput.name = `answer${index + 1}`;
        answerInput.value = question.answer;
        questionGroup.appendChild(answerInput);

        qForm.appendChild(questionGroup);
    });
    app.appendChild(qForm);

    let addQBtn = document.createElement('input');
    addQBtn.type = "button";
    addQBtn.id = "add-question-btn";
    addQBtn.value = "Add Question";
    addQBtn.addEventListener('click', function() {
        let questionForm = document.getElementById('question-form');
        let count = Array.from(document.querySelectorAll('.question-group')).length + 1;

        let questionGroup = document.createElement('div');
        questionGroup.classList.add('question-group');

        let questionLabel = document.createElement('label');
        let questionLabelText = document.createTextNode(`Question ${count}`);
        questionLabel.htmlFor = `question${count}`;
        questionLabel.appendChild(questionLabelText);
        questionGroup.appendChild(questionLabel);

        let questionInput = document.createElement('input');
        questionInput.type = "text";
        questionInput.name = `question${count}`;
        questionInput.id = `question${count}`;
        questionGroup.appendChild(questionInput);

        let answerLabel = document.createElement('label');
        let answerLabelText = document.createTextNode(`Answer ${count}`);
        answerLabel.htmlFor = `answer${count}`;
        answerLabel.appendChild(answerLabelText);
        questionGroup.appendChild(answerLabel);

        let answerInput = document.createElement('input');
        answerInput.type = "text";
        answerInput.name = `answer${count}`;
        answerInput.id = `answer${count}`;
        questionGroup.appendChild(answerInput);

        questionForm.insertBefore(questionGroup, questionForm.children[questionForm.children.length - 2]);
    });
    qForm.appendChild(addQBtn);

    let submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Create Flash Cards';
    qForm.appendChild(submitBtn);

    qForm.addEventListener('submit', function() {
        let questions = [];
        let questionGroups = document.querySelectorAll('.question-group');
        questionGroups.forEach(questionGroup => {
            if (questionGroup.children[1].value != '') {
                questions.push({
                    text: questionGroup.children[1].value,
                    answer: questionGroup.children[3].value
                });
            }
        });
        if (questions.length == 0) {
            return alert('You must add at least one question!');
        }
        localStorage.setItem('questions', JSON.stringify(questions));
        renderCards();
    });
}