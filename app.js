$(document).ready(function(){
	Context.create('canvas');
	Context.context.beginPath();
	Context.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	Context.context.fillStyle = DEFAULT_CANVAS_COLOR;
	Context.context.fill();
	
	var board = new Board();
	board.drawBoard();	

	var controlUp = function(delx,dely){
		Mouse.oldX = 0;
		Mouse.oldY = 0;
		Touch.oldX = 0;
		Touch.oldY = 0;
		board.unregisterStrip(delx,dely);
		if(board.checkBoard()){
			$('p').html('SOLVED!');
		}else{
			$('p').html('');
		}
	};
	
	setMouseUpCallback(function(e){
		controlUp(Mouse.delX,Mouse.delY);
	});
	
	setOntouchendCallback(function(e){
		controlUp(Touch.delX,Touch.delY);
	});
	
	var controlDown = function(x,y){
		Mouse.oldX = x;
		Mouse.oldY = y;
		Touch.oldX = x;
		Touch.oldY = y;	
	};
	setMouseDownCallback(function(e){
		controlDown(Mouse.X,Mouse.Y);
	});
	setOntouchstartCallback(function(e){
		controlDown(Touch.X,Touch.Y);
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
	
	setMouseLeaveCallback(function(e){
		Mouse.oldX = 0;
		Mouse.oldY = 0;
		board.unregisterStrip(Mouse.delX,Mouse.delY);
		if(board.checkBoard()){
			$('p').html('SOLVED!');
		}else{
			$('p').html('');
		}
	});
	
	
});