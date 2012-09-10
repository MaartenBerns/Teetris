level = (function () {
	// private variables
	var WIDTH = 10;
	var HEIGHT = 20;
	var BLOCKDIMENSION = 10;
	var matrix = [];
	var fallenBlocks = {};
	var g = new createjs.Graphics();	
	
	return { 
		create: function () {
			// create a matrix with at the left, right and bottom 
			// outermost cells the value 1, otherwise 0
			var a, i, j;
			for (i = 0; i < HEIGHT + 1; i += 1) {
				a = [];
				// create row
				for (j = 0; j < WIDTH + 2; j += 1) {
					if (j === 0 || j === WIDTH + 1 || i === HEIGHT) {
						a[j] = 1;
					}
					else {
						a[j] = 0;
					}							
				}				
				matrix[i] = a;	
			}
			fallenBlocks = new createjs.Container();			
			stage.addChild(fallenBlocks); 
		},
		addToStage: function () {
			var i,j;
			for (i = 0; i < HEIGHT + 1; i += 1) {
				for (j = 0; j < WIDTH + 2; j += 1) {
					if (matrix[i][j] === 1) {						
						g.beginStroke(createjs.Graphics.getRGB(0,0,0));
						g.beginFill(createjs.Graphics.getRGB(255,255,0));
						g.drawRect(j * BLOCKDIMENSION, i * BLOCKDIMENSION, BLOCKDIMENSION, BLOCKDIMENSION);							
						fallenBlocks.addChild(new createjs.Shape(g));	
					}
				}
			}
			fallenBlocks.cache(0,0, 120, 210);
		},		
		redraw: function () {			
			fallenBlocks.removeAllChildren();
			stage.removeChild(fallenBlocks);
			
			g = {};
			g = new createjs.Graphics();
			fallenBlocks = {};
			fallenBlocks = new createjs.Container();
			this.addToStage();
			
			stage.addChild(fallenBlocks);
		},
		addBlock: function(positions) {
			var i;
			for (i = 0; i < positions.length; i += 1) {
				matrix[positions[i].y][positions[i].x] = 1;				
				g.drawRect(positions[i].x * BLOCKDIMENSION, positions[i].y * BLOCKDIMENSION, BLOCKDIMENSION, BLOCKDIMENSION);	
				fallenBlocks.addChild(new createjs.Shape(g));									
			}
			fallenBlocks.cache(0,0, 120, 210);
		},
		getMatrix: function() {
			return matrix;
		},
		printMatrix: function() {
			var i,j;
			for (i = 0; i < HEIGHT; i += 1) {
				console.log(matrix[i]);				
			}
		},
		collision: function(blockPositions) {
			var i;
			for (i = 0; i < blockPositions.length; i += 1) {	
				// TODO: bug, sometimes out of bounds
				if (matrix[blockPositions[i].y][blockPositions[i].x] === 1) {
					// TODO: bug ... check if collision is on top of the level	
					if (blockPositions[i].y === 0) {
						return 2;
					}
					else {
						return 1;
					}
				}
			}			
			return 0;
		},
		checkLines: function() {
			// check if a line is full, if so clear that line 
			// and move the lines above it one row down
			var i,j;
			for (i = 0; i < HEIGHT; i += 1) {
				var sum = 0;
				for (j = 1; j < WIDTH + 1; j += 1) {					
					sum += matrix[i][j];
				}				
				if (sum === WIDTH) {
					this.clearLine(i);
					this.redraw();
				}
			}			
		},
		clearLine: function(lineNr) {
			// clear one line
			console.log("clearline");
			var i;
			for (i = 1; i < WIDTH + 1; i += 1) {
				matrix[lineNr][i] = 0;
			}
		},
		moveLineDown: function(lineNr) {
			// move line down (line below it has been cleared)
		}
	};	
}());