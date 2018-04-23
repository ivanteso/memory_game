/*
 * Create a list that holds all of your cards.
 * With the spread operator is possible for the shuffle function to easily
 * access the single card elements.
 */
let deck = document.querySelector('.deck')
let card = deck.querySelectorAll('li.card');
let beginCards = [...card];

let checkArray = [];
let matchArray = [];

let moves = 0;
let counter = document.querySelector('.moves');

let firstStar = document.getElementById('first');
let secondStar = document.getElementById('second');
let thirdStar = document.getElementById('third');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {

  let shuffledCards = shuffle(beginCards);
  let fragment = document.createDocumentFragment();

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
      console.log('bravo');
      match();
      checkArray = [];
    } else {
      console.log('riprova');
      setTimeout(unmatch, 500); // slow the class removement to see animation
    }
    movesCounter();
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
}

/*
**
*/

function rating() {
  if (moves === 9) {
    thirdStar.classList.remove('fa-star');
    thirdStar.classList.add('fa-star-o');
  } else if (moves === 14) {
    secondStar.classList.remove('fa-star');
    secondStar.classList.add('fa-star-o');
  } else if (moves === 19) {
    firstStar.classList.remove('fa-star');
    firstStar.classList.add('fa-star-o');
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

startGame()
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
