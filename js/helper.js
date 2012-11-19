Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};

Array.method('reduce', function(f, value) {
	var i;
	for (i = 0; i < this.length; i += 1) {
		value = f(this[i], value);
	}
	return value;
});

add = function(a,b) {
	return a + b;
};

colors = [
	{nr: 0, color: [0,0,0] }, 		// black
	{nr: 1, color: [255,255,255] }, // white 
	{nr: 2, color: [255,0,0] }, 	// red
	{nr: 3, color: [0,255,0] }, 	// green
	{nr: 4, color: [0,0,255] }, 	// blue
	{nr: 5, color: [0,255,255] }, 	// light blue
	{nr: 6, color: [255,255,0] }, 	// yellow 
	{nr: 7, color: [255,0,255] },  	// purple 
];
