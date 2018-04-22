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
  clicked.classList.toggle('open');
  clicked.classList.toggle('show');
  clicked.removeEventListener('click', flip);
  storeCard(clicked);
  checkCards();
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

  if (checkArray.length > 1) {
    let firstClass = checkArray[0].firstElementChild.classList.value;
    let secondClass = checkArray[1].firstElementChild.classList.value;
    if(firstClass === secondClass) {
      console.log('bravo');
      match();
      checkArray = [];
    } else {
      console.log('riprova');
      unmatch();
      checkArray = [];
    }
  }
}

/*
** Remove classes and add again event listener to the 2 cards clicked
** stored in the checkArray if their class don't match
*/

function unmatch() {
  checkArray[0].classList.remove('open');
  checkArray[0].classList.remove('show');
  checkArray[1].classList.remove('open');
  checkArray[1].classList.remove('show');
  checkArray[0].addEventListener('click', flip);
  checkArray[1].addEventListener('click', flip);
}

/*
**
*/

function match() {
  checkArray[0].classList.remove('show');
  checkArray[1].classList.remove('show');
  checkArray[0].classList.add('match');
  checkArray[1].classList.add('match');
  matchArray.push(checkArray[0], checkArray[1]);
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
