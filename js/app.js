// Cards and deck variables
const  deck = document.querySelector('.deck')
const card = deck.querySelectorAll('li.card');
let beginCards = [...card];

// Arrays for check and store matched elements
let checkArray = [];
let matchArray = [];

// Counter variables
let moves;
const counter = document.querySelector('.moves_number');
const counterText = document.querySelector('.moves_text');

// Reset button element end event listener
const reset = document.querySelector('.restart');
reset.addEventListener('click', startGame);

// Getting rating stars elements
const firstStar = document.getElementById('first');
const secondStar = document.getElementById('second');
const thirdStar = document.getElementById('third');

// Getting elements for timer and define firstclick
const seconds = document.getElementById('sec');
const minutes = document.getElementById('min');
let time;
let firstClick;

/*
** Get modal elements and sets events listener on modal's elements
*/
// Get the modal
const  modal = document.getElementById('winModal');
// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];
// Getting elements for setting modal contents
const minutesNumber = document.getElementById('final_minutes_number');
const minutesText = document.getElementById('final_minutes_text');
const secondsNumber = document.getElementById('final_seconds_number');
const secondsText = document.getElementById('final_seconds_text');
const movesNumber = document.getElementById('final_moves_number');
const modalButton = document.getElementById('restartModal');
// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// When user click on button, hide modal and start a new game
modalButton.addEventListener('click', modalRestart);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {

  let shuffledCards = shuffle(beginCards);
  let fragment = document.createDocumentFragment();

  firstStar.classList.remove('fa-star-o');
  secondStar.classList.remove('fa-star-o');
  thirdStar.classList.remove('fa-star-o');

  moves = 0;
  counter.innerText = 0;
  counterText.innerText = " moves";

  seconds.innerText = 0;
  minutes.innerText = 0;
  firstClick = true;
  clearInterval(time);

  for(let card of shuffledCards) {
    deck.removeChild(deck.firstElementChild);
    let li = document.createElement('li');
    li.className = "card";
    let i = document.createElement('i');
    i.className = card.firstElementChild.classList.value;
    li.appendChild(i);
    fragment.appendChild(li);
    li.addEventListener('click', flip);
  }

  deck.appendChild(fragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Flip function to flip the cards when clicked

function flip() {
  let clicked = this;
  storeCard(clicked);
  checkCards();
  if (firstClick === true) {
    timer();
    firstClick = false;
  }
  clicked.classList.toggle('open');
  clicked.classList.toggle('show');
  clicked.removeEventListener('click', flip);

}

// Store the clicked card into checkArray

function storeCard(a) {
  checkArray.push(a);
}

/*
** Check class values of the first two elements into the checkArray
** and do some stuff depending of the comparison result
*/

function checkCards() {

  if (checkArray.length > 1 && checkArray.length <= 2) {
    let firstClass = checkArray[0].firstElementChild.classList.value;
    let secondClass = checkArray[1].firstElementChild.classList.value;
    if(firstClass === secondClass) {
      movesCounter();
      match();
      checkArray = [];
    } else {
      movesCounter();
      setTimeout(unmatch, 500); // slow the class removement to see animation
    }
    rating();
  } else if (checkArray.length >= 3) {
    // doesn't show any card class after the 2nd clicked
    clearArray();
  }
}

/*
** Take track of the clicks and increment their number, than set the new value
** on the HTML counter via textContent
*/

function movesCounter() {
  moves++;
  counter.textContent = moves;
  if (moves === 1) {
    counterText.innerText = " move";
  } else {
    counterText.innerText = " moves";
  }
}

/*
** Remove classes and add again event listener to the 2 cards clicked
** stored in the checkArray if their class don't match
*/

function unmatch() {
  checkArray[0].classList.remove('open');
  checkArray[1].classList.remove('open');
  checkArray[0].classList.remove('show');
  checkArray[1].classList.remove('show');
  checkArray[0].addEventListener('click', flip);
  checkArray[1].addEventListener('click', flip);
  checkArray = [];
}

/*
** Remove 'show' class and add 'match' class when two cards match each other
** then push the two cards into a new array called matchArray
*/

function match() {
  checkArray[0].classList.remove('show');
  checkArray[1].classList.remove('show');
  checkArray[0].classList.add('match');
  checkArray[1].classList.add('match');
  matchArray.push(checkArray[0], checkArray[1]);
  if (matchArray.length === 16) {
    clearInterval(time);
    endGame();
  }
}

/*
** If the clicks are too fast, avoid to open a third card and also fix an
** undefined returned value because of the animation delay of the unmatch
** function called on checkCards()
*/

function clearArray() {
  checkArray[2].classList.remove('open');
  checkArray[2].classList.remove('show');
  checkArray[3].classList.remove('open');
  checkArray[3].classList.remove('show');
}

/*
** Based on the moves number remove the plai star class and add the
** empty star class. 3 plain stars is the perfect game, and so on
*/

function rating() {
  if (moves === 9) {
    //thirdStar.classList.remove('fa-star');
    thirdStar.classList.toggle('fa-star-o');
  } else if (moves === 14) {
    //secondStar.classList.remove('fa-star');
    secondStar.classList.toggle('fa-star-o');
  } else if (moves === 19) {
    //firstStar.classList.remove('fa-star');
    firstStar.classList.toggle('fa-star-o');
  }
}


/*
** Timer function that sets text for 'sec' and 'min' ids in the html
** sheet. This function is called by flip function only at the first
** click
*/

function timer() {
  time = setInterval(function() {
    seconds.innerText++;
    if (seconds.innerText == 60) {
      minutes.innerText++;
      seconds.innerText = 0;
    }
  }, 1000);
}

/*
** Hide again the modal and then launch startGame when the modal button
** is clicked by the user
*/

function modalRestart() {
  modal.style.display = "none";
  startGame();
}

/*
** When all the cards are matched, the modal pops up and fill the HTML
** spans in the modal_message div with the currents values for minutes,
** seconds and number of moves used
*/

function endGame() {
  modal.style.display = 'block';
  minutesNumber.innerText = minutes.textContent;
  if (minutes.textContent === '1') {
    minutesText.innerText = ' minute';
  } else {
    minutesText.innerText = ' minutes';
  }
  secondsNumber.innerText = seconds.textContent;
  if (seconds.textContent === '1') {
    secondsText.innerText = ' second';
  } else {
    secondsText.innerText = ' seconds';
  }
  movesNumber.innerText = moves;
}


startGame()
