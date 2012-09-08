var Teetris {};

Teetris.init = function () {
	// create a new stage and point it at the canvas
	var Teetris.stage = new Stage(document.getElementById("canvas"));
	
	// current block object
	var Teetris.block;

	// create level
	var level = Teetris.level().create();
	//level.create();
	
	stage.addChild(level);
	
	Ticker.addListener(window);    
    Ticker.useRAF = true;
    Ticker.setFPS(60);
}

Teetris.start = function() {
	// keyboard control handlers	
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	
	// main game loop
	while (!GAMEOVER) {
		// create random new block
		// TODO: random
		Teetris.block = Teetris.block();
		stage.addChild(block);
		
		// let block fall
		while (block.
		}
	}
}

Teetris.tick = function() {
	// Update the logic of the block
	block.tick();
	level.tick();
	
	// update the stage
	stage.update();
}
