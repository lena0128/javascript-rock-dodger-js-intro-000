/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;


    if ((rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerLeftEdge) ||
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge) ||
        (rockRighttEdge >= dodgerRightEdge && rockLeftEdge <= dodgerRightEdge)) {
console.log("Game Over!");
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = IntegerToPosition(x);

  var top = 0, myRq;
  rock,style.top = "0px";

GAME.appendChild(rock);

  function moveRock() {
     if (checkCollision(rock)) {
       window.cancelAnimationFrame(myRq);
       endGame();
     } 
     
     else if(positionToInteger(rock.style.top) < GAME_HEIGHT + 20) {
       let top = positionToInteger(rock.style.top);
       top += ROCK_SPEED;
       rock.style.top = IntegerToPosition(top);
       myRq = window.requestAnimationFrame(moveRock);
     } 
       else {
         window.cancelAnimationFrame(myRq);
       if (rock.parentNode && rock.parentNode.id === 'game'){
         GAME.removeChild(rock);
       }
     }
   }
  
  myRq = window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
   window.clearInterval(gameInterval);
   console.log(`num rocks: ${ROCKS.length}`);
   for(var i = 0; i < ROCKS.length; i ++){
     ROCKS[i].remove();
   }
   window.removeEventListener('keydown', moveDodger);
   alert("YOU LOSE!");
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   var act = {37: moveDodgerLeft, 38: moveDodgerRight};
   if (e.which == 37 || e.which == 39) {
     e.preventDefault();
     e.stopPropagation();
     e.which == 37 ? moveDodgerLeft() : false;
     e.which == 39 ? moveDodgerRight() : false;
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var move = 5;
   function stepLeft(){
     if (positionToInteger(DODGER.style.left) > 0) {
       DODGER.style.left = `{positionToInteger(DODGER.style.left) - 1}px`;
     } else {
       return
     }
   }
   move -- > 0 ? window.requestAnimationFrame(stepLeft) : false;
}

window.requestAnimationFrame(stepLeft);
}


function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var move = 5;
   function stepRight(){
     if (positionToInteger(DODGER.style.left) < GAME_WIDTH - 40) {
       DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`;
     } else {
       return
     }
     move -- > 0 ? window.requestAnimationFrame(stepRight) : false;
   }
   window.requestAnimationFrame(stepRight);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
