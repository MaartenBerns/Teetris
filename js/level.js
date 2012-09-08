level = (function () {
	// private variables
	var WIDTH = 10;
	var HEIGHT = 20;
	var BLOCKDIMENSION = 10;
	var matrix = [];
	var fallenBlocks;
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
		},
		addToStage: function () {
			var i,j;
			for (i = 0; i < HEIGHT + 1; i += 1) {
				for (j = 0; j < WIDTH + 2; j += 1) {
					if (matrix[i][j] === 1) {						
						g.beginStroke(createjs.Graphics.getRGB(0,0,0));
						g.beginFill(createjs.Graphics.getRGB(255,255,0));
						g.drawRect(j * BLOCKDIMENSION, i * BLOCKDIMENSION, BLOCKDIMENSION, BLOCKDIMENSION);	
						stage.addChild(new createjs.Shape(g));	
					}
				}
			}
		},		
		addBlock: function(positions) {
			var i;
			for (i = 0; i < positions.length; i += 1) {
				matrix[positions[i].y][positions[i].x] = 1;				
				g.drawRect(positions[i].x * BLOCKDIMENSION, positions[i].y * BLOCKDIMENSION, BLOCKDIMENSION, BLOCKDIMENSION);	
				stage.addChild(new createjs.Shape(g));									
			}
		},
		getMatrix: function() {
			return matrix;
		},
		collision: function(blockPositions) {
			var i;
			for (i = 0; i < blockPositions.length; i += 1) {				
				if (matrix[blockPositions[i].y][blockPositions[i].x] === 1) {
					// check if collision is on top of the level					
					if (blockPositions[i].y === 1) {
						return 2;
					}
					else {
						return 1;
					}
				}
			}			
			return 0;
		}
	};	
}());