const global = document.body
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const numOfAnswer = document.getElementById('numOfAnswer')

submitBtn.onclick = cheakAnswer;

let questionIndex = -1;   	


clearPage();
showQuestions();

function clearPage() {						
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}



function showQuestions( ) {

	if( questionIndex == -1  ) {
		console.log(questionIndex)
		console.log(headerContainer)
		headerContainer.innerHTML = `<h2 class="title_before "> Доброго времени суток ! </h2>
				<h3 class="title_info "> Сейчас вы попробуете узнать какой политической идеологии вы придерживаетесь </h3>`
	}


	//Вопрос:
	if ( questionIndex >= 0) {
	const headerTemplate = `<h2 class="title">  ${questions[questionIndex]['question']}  </h2>`
	headerContainer.innerHTML = headerTemplate ;

	//Варианты ответов:
		for (answerNumber in  questions[questionIndex]['answers'] ) {
	
		const isAnswer = questions[questionIndex]['answers'][answerNumber]
		const questionTeplate = 
			`<li>
				<label>
					<input value= "${answerNumber}" type="radio"  class="answer" name="answer" />
					<span>   ${isAnswer}   </span>
				</label>
			</li>`;					
		listContainer.innerHTML = listContainer.innerHTML + questionTeplate ;
		}
	}
}



// Событие нажатия:
function cheakAnswer () {
	if(  questionIndex == -1  ) {
		console.log('Tcnm')
		questionIndex = questionIndex + 1;
		console.log(questionIndex)
		submitBtn.innerText = 'Ответить'
		showQuestions();
	}

	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (checkedRadio) {
		let valueOfAnswer = (checkedRadio.value)
		allOptions.push(valueOfAnswer);
	}	
	else {
		submitBtn.blur();
		return
	}	
	
	// Последний-ли вопрос:
	if ( questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestions();
	}

	//Если последний:
	else  {
		clearPage();
		showResult();
	}
}


let allOptions = []
let all = {}

function showResult(){
	let maxFreqStr = 'Who are you';
	let maxFreq = 0;


	console.log(allOptions, all)


	for ( let i = 0; i < allOptions.length; i++) {
		const current = allOptions[i]                  
			if(all[current]) {          
		   	   all[current]++
			}

			else            {
		   	   all[current] = 1
			}

		if(all[current] > maxFreq) {
			maxFreq = all[current]
			maxFreqStr = current
		}
	}

	const reaultTemplate = `<p class="result"> Вы - ${maxFreqStr}</p>`;

	headerContainer.innerHTML = reaultTemplate;	
	submitBtn.innerText = 'Начать заново'
	global.classList.add('general', maxFreqStr)
	submitBtn.onclick = () =>( Restart(maxFreqStr) )

	//Как aльтернатива - submitBtn.onclick = "() =>( history.go () )"
}


function Restart(maxFreqStr) {
	global.classList.remove(maxFreqStr)
	submitBtn.innerText = 'Ответить'
	questionIndex = 0
		allOptions = []
		all = {}
	submitBtn.onclick = cheakAnswer;
	showQuestions()
}







