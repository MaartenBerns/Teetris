var Teetris = {};

var stage;
// global ... meh ... falling block
var block;
var g = new createjs.Graphics();
var DELAY = 1000;
var SPEED = 50;
var f = 0;

// current block object
//var Teetris.block;

Teetris.init = function () {
	// create a new stage and point it at the canvas
	stage = new createjs.Stage(document.getElementById("canvas"));
	
	// create level
	//var level = Teetris.level.create();
	//level.create();
	
	//stage.addChild(level);	
	
	createjs.Ticker.addListener(window);    
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
	
	Teetris.start();
}

Teetris.start = function() {
	// keyboard control handlers	
	document.onkeydown = Teetris.handleKeyDown;
	document.onkeyup = Teetris.handleKeyUp;
	
	// main game loop	
	// create random new block
	// TODO: random
	block = Teetris.block;
	block.create(10,10);
	block.addToStage();
	//stage.addChild(block);
	
	// let block fall
	//while (block.
	//}
}

Teetris.handleKeyDown = function(event) {
	switch(event.keyCode) {
		case 37: 
			block.moveLeft();
			break;			
		case 38:
			// block.rotateLeft();
			break;
		case 39:
			block.moveRight();
			break;
		case 40:
			// block.rotateRight();
			break;
		default:
			break;
	}
	console.log("key down");
}

Teetris.handleKeyUp = function(event) {
	console.log("key up");
}

function tick() {	
	f += 1;	
	
	if (f % SPEED === 0) {
		block.fall();
	}
	console.log("update");
	stage.update();
}

Teetris.tick = function() {
	// Update the logic of the block
	//block.tick();
	//level.tick();
	
	// update the stage
	stage.update();
}

Teetris.level = (function () {
	// private variables
	var WIDTH = 10;
	var HEIGHT = 20;
	var matrix;
	var rectangles;
	
	return { 
		create: function () {
			// initiate empty matrix		
			matrix = Array.matrix(WIDTH,HEIGHT,0);
		},
		// TODO: rename
		draw: function () {
			var i,j;
			for (i = 0; i < HEIGHT; i += 1) {
				for (j = 0; j < WIDTH; j += 1) {
					
				}
			}
			
		},
		addBlock: function (block) {
			// add a fallen block to the matrix
			
		}
	};	
}());

// TODO: inheritance (prototype pattern)
Teetris.block = (function () {
	var WIDTH = 10;
	var HEIGHT = 10;
	var x, y;
	var rectanglesSpecifications = {
		rectangle1 : { 
			x: 0,
			y: 0,			
		},
		//var rectangle2;
		//var rectangle3;
		//var rectangle4;
	}
	var rectangles = [];
	
	return {
		create: function(x, y) {
			for (key in rectanglesSpecifications) {	
				var r = rectanglesSpecifications[key];
				g.beginFill(createjs.Graphics.getRGB(255,0,0));
				g.drawRect(r.x + x, r.y + y, r.x + x + WIDTH, r.y + y + HEIGHT);
				console.log(g.toString());
				rectangles.push(new createjs.Shape(g));	
			}
		},
		rotate: function() {		
		},
		addToStage: function() {
			var i;
			for (i = 0; i < rectangles.length; i += 1) {
				stage.addChild(rectangles[i]);
			}
		},
		getRectangles: function() {		
			return rectangles;
		},		
		fall: function() {
			var i;
			for (i = 0; i < rectangles.length; i += 1) {
				rectangles[i].y += HEIGHT;
			}
		},
		moveLeft: function() {
			var i;
			for (i = 0; i < rectangles.length; i += 1) {
				rectangles[i].x -= WIDTH;
			}
		},
		moveRight: function() {
			var i;
			for (i = 0; i < rectangles.length; i += 1) {
				rectangles[i].x += WIDTH;
			}
		}
	}
}());

