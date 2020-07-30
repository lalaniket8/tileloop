var tile = function(number,tile_x_in,tile_y_in){
	this.tile_number = number;
	this.tile_x_in = tile_x_in;
	this.tile_y_in = tile_y_in;
	this.tile_x = BOARD_LEFT_OFFSET + (this.tile_x_in * TILE_SIZE);
	this.tile_y = BOARD_TOP_OFFSET + (this.tile_y_in * TILE_SIZE);
	
	this.tileSprite = new sprite('resources/images/block.png',false);
		
	this.drawTile = function(x,y){
		if(x != undefined && y != undefined && x != null && y != null){
			this.tileSprite.draw(x,y,TILE_SIZE ,TILE_SIZE);
			Context.context.fillStyle = 'black';
			Context.context.font = TILE_FONT;
			Context.context.fillText(this.tile_number, x + (TILE_SIZE/2) - (TILE_SIZE/16), y + (TILE_SIZE/2) + (TILE_SIZE/18));
		}else{
			this.tileSprite.draw(this.tile_x,this.tile_y,TILE_SIZE ,TILE_SIZE);
			Context.context.fillStyle = 'black';
			Context.context.font = TILE_FONT;
			Context.context.fillText(this.tile_number, this.tile_x + (TILE_SIZE/2) - (TILE_SIZE/16), this.tile_y + (TILE_SIZE/2) + (TILE_SIZE/18));
		}
	};
};