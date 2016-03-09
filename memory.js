/*
 * CS 22 A - JavaScript for Programmers
 * Memory Matching Game - Template
 */
'use strict';
var sources = [
  {
    file: 'circle.gif',
    alt: 'red circle'
  },
  {
    file: 'square.gif',
    alt: 'green square'
  },
  {
    file: 'rectangle.gif',
    alt: 'pink rectangle'
  },
  {
    file: 'oval.gif',
    alt: 'purple oval'
  },
  {
    file: 'triangle.gif',
    alt: 'white triangle'
  },
  {
    file: 'arrow.gif',
    alt: 'teal arrow'
  },
  {
    file: 'diamond.gif',
    alt: 'yellow diamond'
  },
  {
    file: 'octagon.gif',
    alt: 'blue octagon'
  },
];
  
// The method below may be called on any array
// to shuffle it in place.
Array.prototype.shuffle = function () {
  var i = this.length;
  var j, temp;
  if (i === 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    // swap the two array elements
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}
var deck = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
function objCreator() {
  deck.shuffle();
  for(var i = 0; i<deck.length; i++){
    this["card_" + i] = deck[i];
  }
}
var shuffledDeckObj = new objCreator();
var flipped = null
var firstCard, secondCard;
var matchCounter = 0
var flip = function(event){ // event handler func
  for(var key in shuffledDeckObj){ //cycling through the randomized object
    
    //EVERY CLICK WILL REVEAL THE CARD
    if(event.target.id === key && event.target.alt=="back"){
      //only cards that have not been flipped will apply
      event.target.src = sources[shuffledDeckObj[key]].file;
      event.target.alt = sources[shuffledDeckObj[key]].alt;
      
      //SECOND CARD CLICK
      if(flipped){ // a card has already been flipped
        secondCard = event.target; //this click is a second card
        console.log("The second card is a " + secondCard.alt);
        flipped = null;
      }
      //FIRST CARD CLICK
      else if(!flipped){ // if the flipped var is null; this click is a first card
        firstCard = event.target;
        console.log("The First Card is a " + firstCard.alt);
        flipped = true;
      }

      //MATCH
      if(firstCard.src === secondCard.src){
        console.log("We have a match!");
        firstCard.className = "matched";
        secondCard.className = "matched";
        flipped = null;
        firstCard = null;
        secondCard = undefined;
        matchCounter++;

        //WINNING CONDITION
        if(matchCounter === sources.length){
          setTimeout(function(){
            document.getElementById('board').className = "win";
            document.getElementById('message').innerHTML = "All Matched";
          },1000);
        }
      }

      //NOT A MATCH
      else{ 
        console.log ("Not a match");
        document.getElementById('board').removeEventListener('click', flip, false);
        setTimeout(function(){
          firstCard.src = "back.gif";
          secondCard.src ="back.gif";
          firstCard.alt = "back";
          secondCard.alt = "back";
          flipped = null;
          firstCard = null;
          secondCard = null;
          document.getElementById('board').addEventListener('click', flip, false);
        },1000);
      }
    }   
  }
}
document.getElementById('board').addEventListener('click', flip, false);






















