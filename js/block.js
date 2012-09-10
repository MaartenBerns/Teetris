// TODO: inheritance (prototype pattern)

var TBlock = [
		{ 
			x: 0,
			y: -1,			
		},
		{
			x: 0,
			y: 0,
		},
		{
			x: -1,
			y: 0,
		},
		{
			x: 1,
			y: 0,
		}
]

block = (function () {
	var SIZE = 10;
	var position = {
		x : 0,
		y : 0
	};
	
	var blockContainer = new createjs.Container();
	
	return {
		// x and y in matrix space
		create: function(x, y) {	
			blockDefinitions = [];
			for (key in TBlock) {
				var p = {
					x: TBlock[key].x,
					y: TBlock[key].y
				}
				blockDefinitions.push(p);
			}
			
			position.x = x;
			position.y = y;
			blockContainer.x = x * SIZE + 0.5 * SIZE;
			blockContainer.y = y * SIZE + 0.5 * SIZE;	
			blockContainer.rotation = 0;
			for (key in blockDefinitions) {	
				var g = new createjs.Graphics();
				var r = blockDefinitions[key];
				g.beginStroke(createjs.Graphics.getRGB(0,0,0));
				g.beginFill(createjs.Graphics.getRGB(255,0,0));				
				g.drawRect(r.x * SIZE - 0.5 * SIZE, r.y * SIZE - 0.5 * SIZE, SIZE, SIZE);		
				blockContainer.addChild(new createjs.Shape(g));	
			}
		},
		rotateLeft: function () {
			this.rotate(90);
			
			for (key in blockDefinitions) {
				var x_tmp = blockDefinitions[key].x;
				blockDefinitions[key].x = blockDefinitions[key].x * 0 + blockDefinitions[key].y * -1;	
				blockDefinitions[key].y = x_tmp * 1 + blockDefinitions[key].y * 0;				
			};	
		},
		rotateRight: function () {
			this.rotate(270);
			
			for (key in blockDefinitions) {
				var x_tmp = blockDefinitions[key].x;
				blockDefinitions[key].x = blockDefinitions[key].x * 0 + blockDefinitions[key].y * 1;	
				blockDefinitions[key].y = x_tmp * -1 + blockDefinitions[key].y * 0;			
			};			
		},
		rotate: function(angle) {						
			blockContainer.rotation += angle;		
		},
		addToStage: function() {
			stage.addChild(blockContainer);			
		},
		removeFromStage: function() {
			blockContainer.removeAllChildren();
			stage.removeChild(blockContainer);	
		},		
		moveDown: function() {
			position.y += 1;
			blockContainer.y += SIZE;			
		},
		moveLeft: function() {
			position.x -= 1;
			blockContainer.x -= SIZE;			
		},
		moveRight: function() {
			position.x += 1;
			blockContainer.x += SIZE;			
		},
		getBlockPositions: function(xLookAhead, yLookAhead) {
			// return positions in matrix space
			var positions = [];
			for (key in blockDefinitions) {
				var p = {
					x: blockDefinitions[key].x + position.x + xLookAhead, 
					y: blockDefinitions[key].y + position.y + yLookAhead 
				};
				positions.push(p);	
			}		
			return positions;
		}
	}
}());


