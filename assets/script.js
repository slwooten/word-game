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
  letter1.setAttribute('maxlength', '1');
  letter1.setAttribute('required', 'true');
  letter1.classList.add('letter-1', 'input-box');

  const letter2 = document.createElement('input');
  letter2.setAttribute('type', 'text');
  letter2.setAttribute('maxlength', '1');
  letter2.setAttribute('required', 'true');
  letter2.classList.add('letter-2', 'input-box');

  const letter3 = document.createElement('input');
  letter3.setAttribute('type', 'text');
  letter3.setAttribute('maxlength', '1');
  letter3.setAttribute('required', 'true');
  letter3.classList.add('letter-3', 'input-box');

  const letter4 = document.createElement('input');
  letter4.setAttribute('type', 'text');
  letter4.setAttribute('maxlength', '1');
  letter4.setAttribute('required', 'true');
  letter4.classList.add('letter-4', 'input-box');

  const letter5 = document.createElement('input');
  letter5.setAttribute('type', 'text');
  letter5.setAttribute('maxlength', '1');
  letter5.setAttribute('required', 'true');
  letter5.classList.add('letter-5', 'input-box');

  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('value', 'Submit');
  submitBtn.setAttribute('style', 'display: none');
  // submitBtn.setAttribute('disabled', 'false');
  submitBtn.classList.add('submit-btn');

  form.appendChild(letter1);
  form.appendChild(letter2);
  form.appendChild(letter3);
  form.appendChild(letter4);
  form.appendChild(letter5);
  form.appendChild(submitBtn);

  document.querySelector('.form-container').append(form);

  ///////////////////////////////////////////////////
  // for moving to next input when max length on current input is reached //
  form.onkeyup = function (e) {
    var target = e.srcElement;
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while (next = next.nextElementSibling) {
        if (next == null)
          break;
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
  }
  ///////////////////////////////////////////////////

  submitBtn.addEventListener('click', handleGuess);
}

const handleGuess = (e) => {
  e.preventDefault();

  const userInput = [];
  let correctLetters = 0;

  const formEl = document.querySelector('.user-input');
  const submitEl = document.querySelector('.submit-btn');

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
      formEl.elements[index].setAttribute('readonly', 'readonly');
      correctLetters = correctLetters + 1;
    } else if (currentInput !== currentLetter && randomWord.includes(currentInput)) {
      console.log('almost WooHoo');
      formEl.elements[index].classList.add('orange');
      formEl.elements[index].setAttribute('readonly', 'readonly');
    } else {
      console.log('No go');
      formEl.elements[index].classList.add('red');
      formEl.elements[index].setAttribute('readonly', 'readonly');
    };
  });

  nextGuess(correctLetters, formEl, submitEl);
  console.log(correctLetters);

}

const nextGuess = (goodLetters, currentForm, submit) => {
  if (goodLetters !== 5 && !currentForm.classList.contains('5')) {
    currentForm.classList.remove('user-input');
    newGuess();
  } else if (goodLetters === 5) {
    const winner = document.createElement('h1');
    const winnerText = document.createTextNode("You've successfully guessed the word!");
    winner.appendChild(winnerText);
    document.querySelector('.outcome').append(winner);
    submit.remove();
  } else {
    const loss = document.createElement('h1');
    const lossText = document.createTextNode('Out of attempts, refresh to try another word!');
    loss.appendChild(lossText);
    document.querySelector('.outcome').append(loss);
    submit.remove();
  }
};

newGuess();
