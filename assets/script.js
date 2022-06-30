const wordList = [
  'about',
  'actor',
  'again',
  'admit',
  'stuff',
];

const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
let totalGuesses = 0;

console.log(randomWord);

const newGuess = () => {
  totalGuesses = totalGuesses + 1;

  const form = document.createElement('form');
  form.classList.add('user-input');
  form.classList.add(`${totalGuesses}`);

  const letter1 = document.createElement('input');
  letter1.setAttribute('type', 'text');
  letter1.classList.add('letter-1');

  const letter2 = document.createElement('input');
  letter2.setAttribute('type', 'text');
  letter2.classList.add('letter-2');

  const letter3 = document.createElement('input');
  letter3.setAttribute('type', 'text');
  letter3.classList.add('letter-3');

  const letter4 = document.createElement('input');
  letter4.setAttribute('type', 'text');
  letter4.classList.add('letter-4');

  const letter5 = document.createElement('input');
  letter5.setAttribute('type', 'text');
  letter5.classList.add('letter-5');

  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('value', 'Submit');

  form.appendChild(letter1);
  form.appendChild(letter2);
  form.appendChild(letter3);
  form.appendChild(letter4);
  form.appendChild(letter5);
  form.appendChild(submitBtn);

  document.getElementsByTagName('main')[0].appendChild(form);

  submitBtn.addEventListener('click', handleGuess);
}

const handleGuess = (e) => {
  e.preventDefault();

  const userInput = [];
  let correctLetters = 0;

  const formEl = document.querySelector('.user-input');
 
  const input1Val = formEl.elements[0].value;
  const input2Val = formEl.elements[1].value;
  const input3Val = formEl.elements[2].value;
  const input4Val = formEl.elements[3].value;
  const input5Val = formEl.elements[4].value;
  userInput.push(input1Val, input2Val, input3Val, input4Val, input5Val);

  console.log(userInput);

  userInput.forEach((currentInput, index) => {
    const currentLetter = randomWord[index];
    console.log(currentInput, currentLetter);

    if (currentInput === currentLetter) {
      console.log('WooHoo');
      formEl.elements[index].classList.add('green');
      correctLetters = correctLetters + 1;
    } else if (currentInput !== currentLetter && randomWord.includes(currentInput)) {
      console.log('almost WooHoo');
      formEl.elements[index].classList.add('orange');
    } else {
      console.log('No go');
      formEl.elements[index].classList.add('red');
    };
  });
  
  nextGuess(correctLetters, formEl);
  console.log(correctLetters);

}

const nextGuess = (goodLetters, currentForm) => {
  if (goodLetters !== 5 && !currentForm.classList.contains('5')) {
    currentForm.classList.remove('user-input');
    newGuess();
  };
};

newGuess();
