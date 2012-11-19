level = (function () {
	// private variables
	var WIDTH = 10;
	var HEIGHT = 20;
	var BLOCKDIMENSION = 10;
	var matrix = [];
	var fallenBlocks = {};	
	
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
		// add the level to the scene manager
		addToStage: function () {
			var i,j;
			var g = new createjs.Graphics();	
			for (i = 0; i < HEIGHT + 1; i += 1) {
				for (j = 0; j < WIDTH + 2; j += 1) {
					if (matrix[i][j] >= 1) {				
						var color = colors[matrix[i][j]].color;
						g.beginStroke(createjs.Graphics.getRGB(0,0,0));
						g.beginFill(createjs.Graphics.getRGB(color[0],color[1],color[2]));
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
		// add a fallen block to the fallen stack
		// TODO: move this to block class? or some functionality
		addBlock: function(block) {
			var i;
			var g = new createjs.Graphics();	
			var positions = block.getBlockPositions(0,0);
			var colorNr = colors[block.getColorNr()].nr;
			var color = colors[block.getColorNr()].color;			
			for (i = 0; i < positions.length; i += 1) {					
				matrix[positions[i].y][positions[i].x] = colorNr;				
				g.beginStroke(createjs.Graphics.getRGB(0,0,0));
				g.beginFill(createjs.Graphics.getRGB(color[0],color[1],color[2]));
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
				if (matrix[blockPositions[i].y][blockPositions[i].x] >= 1) {
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
			var lines = 0;
			var firstClearedLine = 19; // iffy
			for (i = 0; i < HEIGHT; i += 1) {
				var lineHasToBeCleared = true;				
				for (j = 1; j < WIDTH + 1; j += 1) {										
					if (matrix[i][j] === 0) {
						lineHasToBeCleared = false;
					}					
				}								
				if (lineHasToBeCleared === true) {
					this.clearLine(i);			
					lines += 1;
					firstClearedLine = Math.min(firstClearedLine, i);
				}
			}			
			if (lines > 0) {
				this.moveLinesDown(lines, firstClearedLine);			
				this.redraw();
			}
			return lines;
		},
		clearLine: function(lineNr) {
			// clear one line			
			var i;
			for (i = 1; i < WIDTH + 1; i += 1) {
				matrix[lineNr][i] = 0;
			}
		},
		moveLinesDown: function(nrOfLines, lineNr) {			
			// move line down (line below it has been cleared)
			var i,j;
			var lines = [];
			// for each line above removed line 
			// if line.sum > 0 move line one down
			for (i = lineNr - 1; i >= 0; i -= 1) {				
				var sum = matrix[i].reduce(add, 0);				
				if (sum > 2) {					
					for (j = 1; j < WIDTH + 1; j += 1) {
						matrix[i+nrOfLines][j] = matrix[i][j];
					}
					this.clearLine(i);
				}
			}											
			//this.printMatrix();			
		}
	};	
}());