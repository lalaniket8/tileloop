var tile = function(number,tile_x_in,tile_y_in){
	this.tile_number = number;
	this.tile_x_in = tile_x_in;
	this.tile_y_in = tile_y_in;
	this.tile_x = BOARD_LEFT_OFFSET + (this.tile_x_in * TILE_SIZE);
	this.tile_y = BOARD_TOP_OFFSET + (this.tile_y_in * TILE_SIZE);
	
	this.tileSprite = new sprite('resources/images/block.png',false);
		
	this.drawTile = function(x,y){
		var tile_number_string = this.tile_number;
		if(this.tile_number < 10){
			tile_number_string = '0'+tile_number_string;
		}
		if(x != undefined && y != undefined && x != null && y != null){
			this.tileSprite.draw(x,y,TILE_SIZE ,TILE_SIZE);
			Context.context.fillStyle = 'black';
			Context.context.font = TILE_FONT;
			Context.context.fillText(tile_number_string, (x + 24) , (y + 36));
		}else{
			this.tileSprite.draw(this.tile_x,this.tile_y,TILE_SIZE ,TILE_SIZE);
			Context.context.fillStyle = 'black';
			Context.context.font = TILE_FONT;
			Context.context.fillText(tile_number_string, (this.tile_x + 24), (this.tile_y + 36));
		}
	};
};