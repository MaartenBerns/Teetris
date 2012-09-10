// TODO:
// * other block shapes
// * line clearing -> moving lines down
// * points
// * music
// * touch control
// * full screen als op phone...

// * refactoring -> clean/beautiful code
// * bug fixing

var Teetris = {
	//lvl: {},
	//currentBlock : {},
	SPEED : 5,
	frameNumber : 0,
	GAMEOVER : false
};

var stage;
var lvl = {}; 
var currentBlock = {};

init = function () {
	// create a new stage and point it at the canvas
	stage = new createjs.Stage(document.getElementById("canvas"));
	
	// create level
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

	currentBlock = block;
	currentBlock.create(5,0);
	currentBlock.addToStage();	
	
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
			currentBlock.moveDown();
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
	
	if (Teetris.GAMEOVER === false) {
		Teetris.frameNumber += 1;		
		
		if (Teetris.frameNumber % Teetris.SPEED === 0) {
			// set a delay in the falling of the block
			// check for collision		
			var posLookAhead = currentBlock.getBlockPositions(0,1);
			var positions = currentBlock.getBlockPositions(0,0);

			var collision = lvl.collision(posLookAhead);
			
			if (collision === 0) {
				currentBlock.moveDown();
			}		
			if (collision === 1) {
				// create new block into currentBlock			
				currentBlock.removeFromStage();		
				currentBlock = {};
				currentBlock = block;
				currentBlock.create(5,0);
				currentBlock.addToStage();
			
				// add block to matrix		
				lvl.addBlock(positions);
				lvl.checkLines();
				//lvl.printMatrix();
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