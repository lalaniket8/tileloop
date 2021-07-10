var board = undefined;
var solvedCalloutDisplayed = undefined;
var stopwatchDisplayToggle = true;
var stopwatch = new stopwatch("stopwatchvalue");
var validclick = false;

init();

function minusClick(){
	if(TILE_COUNT > 2){
		TILE_COUNT--;
		init();
	}
};

function plusClick(){
	if(TILE_COUNT < 10){
		TILE_COUNT++;
		init();
	}
};

function toggleStopWatch(){
	if(stopwatchDisplayToggle){
		stopwatchDisplayToggle = false;
		document.getElementById("stopwatch").style.display = 'none';
	}else{
		stopwatchDisplayToggle = true;
		document.getElementById("stopwatch").style.display = 'block';
	}
	document.getElementById('canvas').focus();
};

function toggleSound(){
	if(SOUND_TOGGLE){
		SOUND_TOGGLE = false;
		document.getElementById("sound").style.display = 'none';
	}else{
		SOUND_TOGGLE = true;
		document.getElementById("sound").style.display = 'block';
	}
	document.getElementById('canvas').focus();
};


function openNav() {
	document.getElementById("mySidenav").style.width = "260px";
};

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
};

function solvedBtnClick(){
	document.getElementById('SolvedMsg').style.display='none';
	solvedCalloutDisplayed = false;
	board.randomize();
	board.drawBoard();	
};

function init(){
	document.getElementById("boardsize-field").value = TILE_COUNT;
	stopwatch.reset();
	if(stopwatchDisplayToggle){
		document.getElementById("stopwatch").style.display = 'block';
	}else{
		document.getElementById("stopwatch").style.display = 'none';
	}
	CANVAS_WIDTH = (TILE_SIZE * TILE_COUNT);
	CANVAS_HEIGHT = (TILE_SIZE * TILE_COUNT);
	BOARD_LEFT_OFFSET = (CANVAS_WIDTH / 2) - (TILE_SIZE * (TILE_COUNT / 2));
    BOARD_TOP_OFFSET = (CANVAS_HEIGHT / 2) - (TILE_SIZE * (TILE_COUNT / 2));
    BOARD_RIGHT_MARGIN = (BOARD_LEFT_OFFSET + (TILE_SIZE * TILE_COUNT));
    BOARD_BOTTOM_MARGIN = (BOARD_TOP_OFFSET + (TILE_SIZE * TILE_COUNT));
	RANDOM_STEPS = TILE_COUNT * 200;
	Context.create('canvas');
	Context.context.beginPath();
	Context.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	Context.context.fillStyle = DEFAULT_CANVAS_COLOR;
	Context.context.fill();
	board = new Board();
	board.randomize();
	board.drawBoard();
};


$(document).ready(function(){	
	var controlUp = function(delx,dely){
		Mouse.oldX = 0;
		Mouse.oldY = 0;
		Touch.oldX = 0;
		Touch.oldY = 0;
		board.unregisterStrip(delx,dely);
		if(validclick){
			if(board.checkBoard()){
				board.playSound(WIN_SOUND);
				console.log("WIN_SOUND");
				document.getElementById('SolvedMsg').style.display='block';
				document.getElementById('calloutbtn1').focus();
				solvedCalloutDisplayed = true;
				if(stopwatch.running){
					stopwatch.stop();
					//console.log(stopwatch.getValue());
					var time = stopwatch.getValue();
					var mins = Math.floor(time / 60);
					var secs = Math.round(((time % 60) + Number.EPSILON) * 10) / 10;
					if(mins > 0){
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + mins + ' min ' + secs + ' secs!';
					}else{
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + secs + ' secs!';
					}
					stopwatch.reset();
				}else{
					document.getElementById('callout-text1').innerHTML = 'Solved!';
				}
			}else{
				document.getElementById('SolvedMsg').style.display='none';
				solvedCalloutDisplayed = false;
			}
			validclick = false;
		}
	};
	
	setMouseUpCallback(function(e){
		controlUp(Mouse.delX,Mouse.delY);
	});
	
	setOntouchendCallback(function(e){
		controlUp(Touch.delX,Touch.delY);
	});
	
	var controlDown = function(x,y,target_id){
		Mouse.oldX = x;
		Mouse.oldY = y;
		Touch.oldX = x;
		Touch.oldY = y;	
		if(target_id == 'canvas'){
			if(!stopwatch.running && stopwatchDisplayToggle){
				stopwatch.start();
			}
			validclick = true;
		}
	};
	
	setMouseDownCallback(function(e){
		controlDown(Mouse.X,Mouse.Y,e.target.id);
	});
	
	setOntouchstartCallback(function(e){
		controlDown(Touch.X,Touch.Y,e.target.id);
	});
	
	
	setMouseMoveCallback(function(e){
		if(e.buttons == 1){
			var mouse_x = Mouse.X;
			var mouse_y = Mouse.Y;
			Mouse.delX = mouse_x - Mouse.oldX;
			Mouse.delY = mouse_y - Mouse.oldY;
			if(board.currentStripType == STRIP_TYPE.UNREGISTERED 
			&& mouse_x > BOARD_LEFT_OFFSET && mouse_x < BOARD_RIGHT_MARGIN 
			&& mouse_y > BOARD_TOP_OFFSET && mouse_y < BOARD_BOTTOM_MARGIN){
				if(Math.abs(Mouse.delX) < Math.abs(Mouse.delY) && Math.abs(Mouse.delY) > MOUSE_CLICK_DELTA_THRESHOLD){
					board.registerStrip(mouse_x,mouse_y,STRIP_TYPE.COL);//UP-DOWN
				}else if(Math.abs(Mouse.delX) > Math.abs(Mouse.delY) && Math.abs(Mouse.delX) > MOUSE_CLICK_DELTA_THRESHOLD){
					board.registerStrip(mouse_x,mouse_y,STRIP_TYPE.ROW);//LEFT-RIGHT
				}else{
					board.currentStripType = STRIP_TYPE.UNREGISTERED;
				}
			}else{
				board.moveStrips(Mouse.delX,Mouse.delY);
			}
		}
	});
	
	setOntouchmoveCallback(function(e){
		if(Touch.touch){
			var touch_x = Touch.X;
			var touch_y = Touch.Y;
			Touch.delX = touch_x - Touch.oldX;
			Touch.delY = touch_y - Touch.oldY;
			if(board.currentStripType == STRIP_TYPE.UNREGISTERED 
			&& touch_x > BOARD_LEFT_OFFSET && touch_x < BOARD_RIGHT_MARGIN 
			&& touch_y > BOARD_TOP_OFFSET && touch_y < BOARD_BOTTOM_MARGIN){
				if(Math.abs(Touch.delX) < Math.abs(Touch.delY) && Math.abs(Touch.delY) > MOUSE_CLICK_DELTA_THRESHOLD){
					board.registerStrip(touch_x,touch_y,STRIP_TYPE.COL);//UP-DOWN
				}else if(Math.abs(Touch.delX) > Math.abs(Touch.delY) && Math.abs(Touch.delX) > MOUSE_CLICK_DELTA_THRESHOLD){
					board.registerStrip(touch_x,touch_y,STRIP_TYPE.ROW);//LEFT-RIGHT
				}else{
					board.currentStripType = STRIP_TYPE.UNREGISTERED;
				}
			}else{
				board.moveStrips(Touch.delX,Touch.delY);
			}
		}
	});
	
	/*setMouseLeaveCallback(function(e){
		Mouse.oldX = 0;
		Mouse.oldY = 0;
		board.unregisterStrip(Mouse.delX,Mouse.delY);
		if(validclick){
			if(board.checkBoard()){
				document.getElementById('SolvedMsg').style.display='block';
				document.getElementById('calloutbtn1').focus();
				solvedCalloutDisplayed = true;
				if(stopwatch.running){
					stopwatch.stop();
					console.log(stopwatch.getValue());
					var time = stopwatch.getValue();
					var mins = Math.floor(time / 60);
					var secs = Math.round(((time % 60) + Number.EPSILON) * 10) / 10;
					if(mins > 0){
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + mins + ' min ' + secs + ' secs!';
					}else{
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + secs + ' secs!';
					}
					stopwatch.reset();
				}else{
					document.getElementById('callout-text1').innerHTML = 'Solved!';
				}
			}else{
				document.getElementById('SolvedMsg').style.display='none';
				solvedCalloutDisplayed = false;
			}
			validclick = false;
		}
	});*/	
});

