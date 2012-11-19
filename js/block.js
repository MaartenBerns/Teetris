var getRandomBlock = function() {
	var rnd = Math.floor((Math.random()*7));	
	switch (rnd) {
		case 0: 
			return TBlock();
			break;
		case 1:
			return LongBlock();
			break;
		case 2:
			return SquareBlock();
			break;
		case 3:
			return SBlock();
			break;
		case 4:
			return ZBlock();
			break;
		case 5:
			return LBlock();
			break;
		case 6:
			return RLBlock();
			break;
		default:
			break;
	}
}

var LBlock = function() {
	var spec = { color: 1, coordinates:[
		{ x: 0, y: 0 },
		{ x: 0,	y: -1 },
		{ x: 0,	y: 1 },
		{ x: 1, y: 1 }
	]};
	
	var that = Block(spec);
	return that;
}

var RLBlock = function() {
	var spec = { color: 2, coordinates:[
		{ x: 0, y: 0 },
		{ x: 0,	y: -1 },
		{ x: 0,	y: 1 },
		{ x: -1, y: 1 }
	]};
	
	var that = Block(spec);
	return that;
}

var SBlock = function() {
	var spec = { color: 3, coordinates:[
		{ x: 0, y: 0 },
		{ x: 1,	y: 0 },
		{ x: 0,	y: 1 },
		{ x: -1, y: 1 }
	]};
	
	var that = Block(spec);
	return that;
}

var ZBlock = function() {
	var spec = { color: 4, coordinates:[
		{ x: 0, y: 0 },
		{ x: -1, y: 0 },
		{ x: 0,	y: 1 },
		{ x: 1,	y: 1 }
	]};
	
	var that = Block(spec);
	return that;
}

var SquareBlock = function() {
	var spec = { color: 5, coordinates:[
		{ x: 0, y: 0 },
		{ x: 0,	y: 1 },
		{ x: 1,	y: 0 },
		{ x: 1,	y: 1 }
	]};
	
	var that = Block(spec);
	
	that.rotateLeft = function() {};
	that.rotateRight = function() {};
	
	return that;
}

var LongBlock = function() {
	var spec = { color: 6, coordinates:[
		{ x: 0,	y: -1 },		
		{ x: 0,	y: 0 },
		{ x: 0,	y: 1 },
		{ x: 0,	y: 2 }
	]};
	
	var that = Block(spec);
	return that;
}

var TBlock = function() {	
	var spec = { color: 7, coordinates: [
		{ x: 0,	y: -1 },			
		{ x: 0,	y: 0 },
		{ x: -1, y: 0 },
		{ x: 1,	y: 0 }
	]};
	
	var that = Block(spec);	
	return that;
};

var Block =  function (spec) {
	var that = {};	
	var SIZE = 10;
	var position = {
		x : 0,
		y : 0
	};
	var blockDefinitions = [];
	var blockContainer = {};
	
	// x and y in matrix space
	that.create = function(x, y) {			
		blockContainer = new createjs.Container();
		for (key in spec.coordinates) {
			var p = {
				x: spec.coordinates[key].x,
				y: spec.coordinates[key].y
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
			var color = colors[spec.color].color;
			g.beginFill(createjs.Graphics.getRGB(color[0], color[1], color[2]));				
			g.drawRect(r.x * SIZE - 0.5 * SIZE, r.y * SIZE - 0.5 * SIZE, SIZE, SIZE);		
			blockContainer.addChild(new createjs.Shape(g));	
		}
	};
	
	that.rotateLeft =  function () {
		this.rotate(90);
		
		for (key in blockDefinitions) {
			var x_tmp = blockDefinitions[key].x;
			blockDefinitions[key].x = blockDefinitions[key].x * 0 + blockDefinitions[key].y * -1;	
			blockDefinitions[key].y = x_tmp * 1 + blockDefinitions[key].y * 0;				
		};	
	};
	
	that.rotateRight =  function () {
		this.rotate(270);
		
		for (key in blockDefinitions) {
			var x_tmp = blockDefinitions[key].x;
			blockDefinitions[key].x = blockDefinitions[key].x * 0 + blockDefinitions[key].y * 1;	
			blockDefinitions[key].y = x_tmp * -1 + blockDefinitions[key].y * 0;			
		};			
	};
	
	that.rotate = function(angle) {						
		blockContainer.rotation += angle;		
	};
	
	that.addToStage = function() {
		stage.addChild(blockContainer);			
	};
	
	that.removeFromStage = function() {
		blockContainer.removeAllChildren();
		stage.removeChild(blockContainer);	
	};
	
	that.moveDown = function() {
		position.y += 1;
		blockContainer.y += SIZE;			
	};
	
	that.moveLeft = function() {
		position.x -= 1;
		blockContainer.x -= SIZE;			
	};
	
	that.moveRight = function() {
		position.x += 1;
		blockContainer.x += SIZE;			
	};
	
	that.getBlockPositions = function(xLookAhead, yLookAhead) {
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
	};
	
	that.getColorNr = function() {
		return spec.color;
	};
	
	return that;
}


