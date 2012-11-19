// TODO:
// * points
// * music
// * touch control
// * full screen als op phone...
// * rotation -> collision detection
// * after x lines -> speedup
// * Naar phonegap
// * testing -> bugs
// * als game over -> teken het hele level vol
// * line clear bug...
// * game over te fixen
// * refactoring

// Registreer keydown/keyup events in een array en kijk daar elk frame naar
// Werkt beter dan luisteren naar keypress omdat je dan geen last hebt van keyboard repeat
//(Dan moet je wel meer frames dan 1 per seconde...)

var Teetris = {
	SPEED : 16,
	frameNumber : 0,
	GAMEOVER : false,
	lineCount : 0
};

var stage;
var lvl = {}; 
var currentBlock = {};

init = function () {
	// create a new stage and point it at the canvas
	stage = new createjs.Stage(document.getElementById("canvas"));
	
	// create new level
	lvl = level;
	lvl.create();
	lvl.addToStage();
	
	createjs.Ticker.addListener(window);    
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
	
	startGame();
}

startGame = function() {
	// keyboard control handlers	
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	
	// touch control
	createjs.Touch.enable(stage, false, true);
	
	// create first initial random block (TODO: remove this?)
	currentBlock = getRandomBlock();
	currentBlock.create(5,1);
	currentBlock.addToStage();	
	
	// show framerate
	fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
	stage.addChild(fpsLabel);
	fpsLabel.x = 10;
	fpsLabel.y = 20;
}

handleKeyDown = function(event) {
	switch(event.keyCode) {
		case 37: 
			var posLookAhead = currentBlock.getBlockPositions(-1,0);
			var collision = lvl.collision(posLookAhead);
			
			if (collision === 0) {
				currentBlock.moveLeft();
			}
			break;			
		case 38:
			// TODO: collision detection
			currentBlock.rotateLeft();
			break;
		case 39:
			var posLookAhead = currentBlock.getBlockPositions(1,0);
			var collision = lvl.collision(posLookAhead);
			
			if (collision === 0) {
				currentBlock.moveRight();
			}
			break;
		case 40:
			var posLookAhead = currentBlock.getBlockPositions(0,1);
			var collision = lvl.collision(posLookAhead);
			
			if (collision === 0) {
				currentBlock.moveDown();
			}
			// currentBlock.rotateRight();
			break;
		default:
			break;
	}
}

handleKeyUp = function(event) {
}

function tick() {	
	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
	//Teetris.SPEED = 16 / (2 * Math.floor(Teetris.lineCount / 10)+1);
	
	if (Teetris.GAMEOVER === false) {
		Teetris.frameNumber += 1;		
		
		if (Teetris.frameNumber % Teetris.SPEED === 0) {
			// set a delay in the falling of the block
			// check for collision		
			var posLookAhead = currentBlock.getBlockPositions(0,1);
			//var positions = currentBlock.getBlockPositions(0,0);

			var collision = lvl.collision(posLookAhead);
			
			if (collision === 0) {
				currentBlock.moveDown();
			}		
			if (collision === 1) {		
				// add block to matrix		
				lvl.addBlock(currentBlock);
				Teetris.lineCount += lvl.checkLines();
				//lvl.printMatrix();
				
				// create new block into currentBlock			
				currentBlock.removeFromStage();		
				currentBlock = {};
				currentBlock = getRandomBlock();
				currentBlock.create(5,1);
				currentBlock.addToStage();
			}
			if (collision === 2) {
				// collision on top of level => game over
				alert("GAME OVER MAN!");
				Teetris.GAMEOVER = true;
			}
		}	
		
		stage.update();
	}
}