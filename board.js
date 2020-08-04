var Board = function(){
	this.currentStripType = STRIP_TYPE.UNREGISTERED;
	this.currentStripNo = null;
	this.tilemap = new Array(TILE_COUNT);
	this.maskSprite = new sprite('resources/images/mask.png',false);
	
	var tile_number = 1;
	for(var i=0; i<TILE_COUNT; i++){
		tile_number = i + 1;
		this.tilemap[i] = new Array(TILE_COUNT);
		for(var j=0; j<TILE_COUNT; j++){
			this.tilemap[i][j] = new tile(tile_number,i,j);
			tile_number = tile_number + TILE_COUNT;
		}
		
	}
		
	this.drawBoard = function(){
		for(var i=0; i<TILE_COUNT; i++){
			for(var j=0; j<TILE_COUNT; j++){
				this.tilemap[i][j].drawTile();
			}
		}
	};
	
	this.randomize = function(){
		var type = 0;
		var index = 0;
		var value = 1;
		for(var i=0; i<RANDOM_COUNT; i++){
			type = Math.floor(Math.random() * 2);
			if(type == 0){//ROW
				index = Math.floor(Math.random() * TILE_COUNT);
				value = Math.floor(Math.random() * TILE_COUNT);
				this.moveBoardRowValues(index,value);
			}else{//COL
				index = Math.floor(Math.random() * TILE_COUNT);
				value = Math.floor(Math.random() * TILE_COUNT);
				this.moveBoardColValues(index,value);
			}
		}
		for(var i=0; i<TILE_COUNT; i++){
			for(var j=0; j<TILE_COUNT; j++){
				this.tilemap[i][j].tile_x_in = i;
				this.tilemap[i][j].tile_y_in = j;
				this.tilemap[i][j].tile_x = BOARD_LEFT_OFFSET + (i * TILE_SIZE);
				this.tilemap[i][j].tile_y = BOARD_TOP_OFFSET + (j * TILE_SIZE);
			}
		}
	};
	
	this.moveBoardRowValues = function(index, value){
		if(index < TILE_COUNT && value < TILE_COUNT){
			var temp = new Array(TILE_COUNT);
			for(var i=0;i<TILE_COUNT;i++){
				var newIndex = (i + value);
				if(newIndex >= TILE_COUNT){
					newIndex = (newIndex - TILE_COUNT);
				}
				temp[newIndex] = this.tilemap[index][i];				
			}
			for(var i=0;i<TILE_COUNT;i++){
				this.tilemap[index][i] = temp[i];				
			}
		}
	};
	
	this.moveBoardColValues = function(index, value){
		if(index < TILE_COUNT  && value < TILE_COUNT){
			var temp = new Array(TILE_COUNT);
			for(var i=0;i<TILE_COUNT;i++){
				var newIndex = (i + value);
				if(newIndex >= TILE_COUNT){
					newIndex = (newIndex - TILE_COUNT);
				}
				temp[newIndex] = this.tilemap[i][index];				
			}
			for(var i=0;i<TILE_COUNT;i++){
				this.tilemap[i][index] = temp[i];				
			}
		}
	};
	
	this.checkBoard = function(){
		for(var i=0; i<TILE_COUNT; i++){
			for(var j=0; j<TILE_COUNT; j++){
				if( ((i * TILE_COUNT) + j + 1) != this.tilemap[j][i].tile_number){return false;}
			}
		}
		return true;
	};
	
	this.moveStrips = function(delx,dely){
		if(this.currentStripNo != null && this.currentStripNo != undefined && this.currentStripType != STRIP_TYPE.UNREGISTERED){
			if(this.currentStripType == STRIP_TYPE.ROW){
				this.drawRow(this.currentStripNo,delx);
				this.drawBoardMask(this.currentStripType,this.currentStripNo);
			}
			if(this.currentStripType == STRIP_TYPE.COL){
				this.drawCol(this.currentStripNo,dely);
				this.drawBoardMask(this.currentStripType,this.currentStripNo);
			}
		}
	};
	
	this.registerStrip = function(x,y,stripType){
		this.currentStripType = stripType; 
		this.currentStripNo = this.resolveClickToStrip(x,y);
	};
	
	this.resolveClickToStrip = function(x,y){
		if(this.currentStripType == STRIP_TYPE.COL){
			var resolved_x_in = Math.floor((x - BOARD_LEFT_OFFSET) / TILE_SIZE);
			if(resolved_x_in >=0 && resolved_x_in < TILE_COUNT){
					return resolved_x_in;
				}
			}else if(this.currentStripType == STRIP_TYPE.ROW){
			var resolved_y_in = Math.floor((y - BOARD_TOP_OFFSET) / TILE_SIZE);
			if(resolved_y_in >=0 && resolved_y_in < TILE_COUNT){
					return resolved_y_in;
				}
			}else{}
		return null;
	};
	
	this.unregisterStrip = function(delx,dely){
		var slotted_index = 0;
		var duplicateArray = new Array(TILE_COUNT);
		var i = 0;
		var new_index = 0;
		if(this.currentStripType != STRIP_TYPE.UNREGISTERED && this.currentStripNo != null){
			
			if(this.currentStripType == STRIP_TYPE.ROW){
				delta = (delx % (TILE_COUNT * TILE_SIZE));
				slotted_index = Math.round(delta / TILE_SIZE);
				shifting_index = slotted_index % TILE_COUNT;
				if(shifting_index < 0){shifting_index = shifting_index + TILE_COUNT;}
				if(shifting_index != 0){
					for(i = 0; i<TILE_COUNT; i++){
						new_index = (i + shifting_index);
						if(new_index >= TILE_COUNT){new_index = (new_index - TILE_COUNT);}
						duplicateArray[new_index] = this.tilemap[i][this.currentStripNo];
					}
					for(i = 0; i<TILE_COUNT; i++){
						this.tilemap[i][this.currentStripNo] = duplicateArray[i];
						this.tilemap[i][this.currentStripNo].tile_x = (BOARD_LEFT_OFFSET + (TILE_SIZE * i));
						this.tilemap[i][this.currentStripNo].tile_x_in = i;
					}
				}
				for(i = 0; i<TILE_COUNT; i++){this.tilemap[i][this.currentStripNo].drawTile();}
				
				duplicateArray = new Array(TILE_COUNT);
			}
			if(this.currentStripType == STRIP_TYPE.COL){
				delta = (dely % (TILE_COUNT * TILE_SIZE));
				slotted_index = Math.round(delta / TILE_SIZE);
				shifting_index = slotted_index % TILE_COUNT;
				if(shifting_index < 0){shifting_index = (shifting_index + TILE_COUNT);}
				
				if(shifting_index != 0){
					for(i = 0; i<TILE_COUNT; i++){
						new_index = (i + shifting_index);
						if(new_index >= TILE_COUNT){new_index = (new_index - TILE_COUNT);}
						duplicateArray[new_index] = this.tilemap[this.currentStripNo][i];
					}
					for(i = 0; i<TILE_COUNT; i++){
						this.tilemap[this.currentStripNo][i] = duplicateArray[i];
						this.tilemap[this.currentStripNo][i].tile_y = (BOARD_TOP_OFFSET + (TILE_SIZE * i));
						this.tilemap[this.currentStripNo][i].tile_y_in = i;
					}
				}
				for(i = 0; i<TILE_COUNT; i++){this.tilemap[this.currentStripNo][i].drawTile();}

				duplicateArray = new Array(TILE_COUNT);
			}
			
			this.currentStripType = STRIP_TYPE.UNREGISTERED;
			this.currentStripNo = null;
		}
	};
	
	this.drawRow = function(stripIndex,delx){
		var c_tile = undefined;
		var shifted_x = undefined;
		var i = 0;
		var j = 0;
		for(i=0; i<TILE_COUNT; i++){
			c_tile = this.tilemap[i][stripIndex];
			for(j = -DUPLICATION_COUNT; j<DUPLICATION_COUNT; j++){
				shifted_x = (c_tile.tile_x + delx - (TILE_COUNT * TILE_SIZE * j));
				if(shifted_x > (BOARD_LEFT_OFFSET - TILE_SIZE) && shifted_x < BOARD_RIGHT_MARGIN){
					c_tile.drawTile(shifted_x, c_tile.tile_y);
				}
			}
		}
	};
	
	this.drawCol = function(stripIndex,dely){
		var c_tile = undefined;
		var shifted_y = undefined;
		var i = 0;
		var j = 0;
		for(i=0; i<TILE_COUNT; i++){
			c_tile = this.tilemap[stripIndex][i];
			for(j = -DUPLICATION_COUNT; j<DUPLICATION_COUNT; j++){
				shifted_y = (c_tile.tile_y + dely - (TILE_COUNT * TILE_SIZE * j));
				if(shifted_y > (BOARD_TOP_OFFSET - TILE_SIZE) && shifted_y < BOARD_BOTTOM_MARGIN){
					c_tile.drawTile(c_tile.tile_x, shifted_y);
				}
			}
		}
		
	};
	
	this.drawBoardMask = function(dir,stripNo){
		if(dir == STRIP_TYPE.ROW && stripNo != null && stripNo != undefined){
			this.maskSprite.draw((BOARD_LEFT_OFFSET - TILE_SIZE),(BOARD_TOP_OFFSET + (stripNo * TILE_SIZE)));
			this.maskSprite.draw(BOARD_RIGHT_MARGIN,(BOARD_TOP_OFFSET + (stripNo * TILE_SIZE)));
		}
		if(dir == STRIP_TYPE.COL && stripNo != null && stripNo != undefined){
			this.maskSprite.draw((BOARD_LEFT_OFFSET + (stripNo * TILE_SIZE)),(BOARD_TOP_OFFSET - TILE_SIZE));
			this.maskSprite.draw((BOARD_LEFT_OFFSET + (stripNo * TILE_SIZE)),BOARD_BOTTOM_MARGIN);
		}
	};
};

