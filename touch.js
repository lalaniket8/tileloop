var Touch = {
	touch : false,
	X : 0,
	Y : 0,
	oldX : 0,
	oldY : 0,
	delX : 0,
	delY : 0
};

var ontouchstartCallback = undefined;

var setOntouchstartCallback = function(f){
	ontouchstartCallback = f;
};

$('#canvas').on("touchstart",function(e){
	Touch.touch = true;
	Touch.X = Math.round(e.targetTouches[0].pageX) - e.target.getBoundingClientRect().left;
	Touch.Y = Math.round(e.targetTouches[0].pageY) - e.target.getBoundingClientRect().top;
	if(ontouchstartCallback != undefined)
		ontouchstartCallback(e);
});

var ontouchendCallback = undefined;

var setOntouchendCallback = function(f){
	ontouchendCallback = f;
};

$('#canvas').on("touchend",function(e){
	Touch.touch = false;
	if(ontouchendCallback != undefined)
		ontouchendCallback(e);
});

var ontouchmoveCallback = undefined;

var setOntouchmoveCallback = function(f){
	ontouchmoveCallback = f;
};

$('#canvas').on("touchmove",function(e){
	Touch.X = Math.round(e.targetTouches[0].pageX) - e.target.getBoundingClientRect().left;
	Touch.Y = Math.round(e.targetTouches[0].pageY) - e.target.getBoundingClientRect().top;
	if(ontouchmoveCallback != undefined)
		ontouchmoveCallback(e);
});

var ontouchcancelCallback = undefined;

var setOntouchcancelCallback = function(f){
	ontouchcancelCallback = f;
};

$('#canvas').on("touchcancel",function(e){
	Touch.touch = false;
	if(ontouchcancelCallback != undefined)
		ontouchcancelCallback(e);
});