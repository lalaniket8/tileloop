var Mouse = {
	X : 0,
	Y : 0,
	oldX : 0,
	oldY : 0,
	delX : 0,
	delY : 0
};

var mouseDownCallback = undefined;

var setMouseDownCallback = function(f){
	mouseDownCallback = f;
};

$('#canvas').mousedown(function(e){
	Mouse.X = e.offsetX;
	Mouse.Y = e.offsetY;
	if(mouseDownCallback != undefined)
		mouseDownCallback(e);
});

var mouseUpCallback = undefined;

var setMouseUpCallback = function(f){
	mouseUpCallback = f;
};

$('#canvas').mouseup(function(e){
	if(mouseUpCallback != undefined)
		mouseUpCallback(e);
});

var mouseMoveCallback = undefined;

var setMouseMoveCallback = function(f){
	mouseMoveCallback = f;
};

$('#canvas').mousemove(function(e){
	Mouse.X = e.offsetX;
	Mouse.Y = e.offsetY;
	
	if(mouseMoveCallback != undefined)
		mouseMoveCallback(e);
});

var mouseLeaveCallback = undefined;

var setMouseLeaveCallback = function(f){
	mouseLeaveCallback = f;
};

$('#canvas').mouseleave(function(e){
	if(mouseLeaveCallback != undefined)
		mouseLeaveCallback(e);
});
