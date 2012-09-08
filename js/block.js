// TODO: inheritance (prototype pattern)
block = (function () {
	var SIZE = 10;
	var position = {
		x : 0,
		y : 0
	};
	// positions in object space
	var rectangles = {
		rectangle1 : { 
			x: 0,
			y: 0,			
		},
		rectangle2 : {
			x: 0,
			y: 1,
		},
		rectangle3 : {
			x: -1,
			y: 1,
		},
		rectangle4 : {
			x: 1,
			y: 1,
		}
	}
	var drawableRectangles = [];
	
	return {
		// x and y in matrix space
		create: function(x, y) {
			position.x = x;
			position.y = y;
			for (key in rectangles) {	
				var g = new createjs.Graphics();
				var r = rectangles[key];
				g.beginStroke(createjs.Graphics.getRGB(0,0,0));
				g.beginFill(createjs.Graphics.getRGB(255,0,0));
				g.drawRect((r.x + position.x) * SIZE, (r.y + position.y) * SIZE, SIZE, SIZE);		
				drawableRectangles.push(new createjs.Shape(g));	
			}
		},
		rotate: function() {		
		},
		addToStage: function() {
			var i;
			for (i = 0; i < drawableRectangles.length; i += 1) {
				stage.addChild(drawableRectangles[i]);
			}
		},
		removeFromStage: function() {
			var i;
			for (i = 0; i < drawableRectangles.length; i += 1) {
				stage.removeChild(drawableRectangles[i]);
			}
			drawableRectangles.length = 0;
		},		
		moveDown: function() {
			var i;
			for (i = 0; i < drawableRectangles.length; i += 1) {
				drawableRectangles[i].y += SIZE;
			};			
			position.y += 1;
		},
		moveLeft: function() {
			var i;
			for (i = 0; i < drawableRectangles.length; i += 1) {
				drawableRectangles[i].x -= SIZE;
			}
			position.x -= 1;
		},
		moveRight: function() {
			var i;
			for (i = 0; i < drawableRectangles.length; i += 1) {
				drawableRectangles[i].x += SIZE;
			}
			position.x += 1;
		},
		getBlockPositions: function(xLookAhead, yLookAhead) {
			// return positions in matrix space
			var positions = [];
			for (key in rectangles) {
				var p = {
					x: rectangles[key].x + position.x + xLookAhead, 
					y: rectangles[key].y + position.y + yLookAhead 
				};
				positions.push(p);	
			}		
			return positions;
		},
		clearObject: function() {
			
		}
	}
}());

