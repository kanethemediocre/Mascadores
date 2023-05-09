class Mgrid{
	constructor(label,m,n){
		this.m = m;
		this.n = n;
		this.label = label;
		this.c = "white";
		this.g = [];//g is for grid, this will be filled later with m x n munchables.
		this.active = true;
		this.players = [];
		this.monsters = [];
		this.hf = 0;
		}
	draw(){
		var bordersize = 64
		var xstep = (canvas.width-bordersize*2) / this.m;
		var ystep = (canvas.height-bordersize*2) / this.n;
		//console.log(xstep+" "+ystep);
		//console.log("triedtodraw");
		context.strokeStyle = this.c;
		context.lineWidth = 2;
		context.beginPath();
		context.rect(bordersize,bordersize,canvas.width-bordersize*2,canvas.height-bordersize*2);
		context.stroke();
		context.fillStyle = this.c;
		context.font='16px Courier New';
		context.fillText(this.label,this.x+7,this.y+16);
		//context.beginPath();
		var i=0;
		while(i<this.m){//Vertical Lines For Grid
			//console.log("triedtodrawh");
			context.beginPath();
			context.moveTo(bordersize+xstep*i,bordersize);
			context.lineTo(bordersize+xstep*i,canvas.height-bordersize);
			context.stroke();
			i++;
			}
		//context.stroke();
		var i=0;//Horizontal Lines For Grid
		while(i<this.n){
			//context.beginPath();
			context.moveTo(bordersize,bordersize+ystep*i);
			context.lineTo(canvas.width-bordersize,bordersize+ystep*i);
			i++;
			}
		context.stroke();	
		var i=0;//Now I need to draw m x n grid equations
		while(i<this.m){
			var j=0;
			while(j<this.n){
				context.fillStyle = this.c;
				context.font='24px Courier New';
				context.fillText(this.grid[i][j].q,bordersize+xstep*i+xstep/4,bordersize+ystep*j+ystep/2);
				j++;
				}
			i++;
			}
		var i=0;//Now I need to draw the players
		while(i<this.players.length){
			//console.log("triedtodrawp");
			var px = bordersize + xstep*(this.players[i].x+0.125);
			var py = bordersize + ystep*(this.players[i].y+0.125);
			if (this.players[i].movestate>0){
				console.log("moving");
				if (this.players[i].movedir==0){
					py = py + this.players[i].movestate*ystep;
					}
				else if (this.players[i].movedir==1){
					px = px + this.players[i].movestate*xstep;
					}
				else if (this.players[i].movedir==2){
					py = py - this.players[i].movestate*ystep;
					}
				else if (this.players[i].movedir==3){
					px = px - this.players[i].movestate*xstep;
					}
				}
			var xsize = xstep*0.75
			var ysize = ystep*0.75;
			this.players[i].draw(px,py,xsize,ysize);
			i++;
			}
		var i=0;//Now I need to draw the players
		while(i<this.monsters.length){
			//console.log("triedtodrawp");
			var px = bordersize + xstep*(this.monsters[i].x+0.125);
			var py = bordersize + ystep*(this.monsters[i].y+0.125);
			if (this.monsters[i].movestate>0){
				console.log("moving");
				if (this.monsters[i].movedir==0){
					py = py + this.monsters[i].movestate*ystep;
					}
				else if (this.monsters[i].movedir==1){
					px = px + this.monsters[i].movestate*xstep;
					}
				else if (this.monsters[i].movedir==2){
					py = py - this.monsters[i].movestate*ystep;
					}
				else if (this.monsters[i].movedir==3){
					px = px - this.monsters[i].movestate*xstep;
					}
				}
			var xsize = xstep*0.75
			var ysize = ystep*0.75;
			this.monsters[i].draw(px,py,xsize,ysize);
			i++;
			}
		}
	update(){
		this.ai();
		var i=0;
		while(i<this.players.length){//Handle player movement
			if (this.players[i].movestate > 0){//If player is moving, move the player further
				this.players[i].movestate = this.players[i].movestate + this.players[i].movespeed;
				}
			if (this.players[i].movestate>1){//Player has arrived at new grid square
				this.players[i].movestate=0;//reset to nonmoving state
				if (this.players[i].movedir==0){
					this.players[i].y = this.players[i].y+1;
					}
				if (this.players[i].movedir==1){
					this.players[i].x = this.players[i].x+1;
					}				
				if (this.players[i].movedir==2){
					this.players[i].y = this.players[i].y-1;
					}
				if (this.players[i].movedir==3){
					this.players[i].x = this.players[i].x-1;
					}	
				if (this.players[i].x > this.m-1){this.players[i].x = this.m-1 }	
				if (this.players[i].x < 0 ){this.players[i].x = 0; }	
				if (this.players[i].y > this.n-1){this.players[i].y = this.n-1 }
				if (this.players[i].y < 0){this.players[i].y = 0; }	
				this.players[i].movedir = -1;//reset dir
				}
			i++;
			}
		var i=0;
		while(i<this.monsters.length){//Handle monster movement
			if (this.monsters[i].movestate > 0){//If monster is moving, move the monster further
				this.monsters[i].movestate = this.monsters[i].movestate + this.monsters[i].movespeed;
				}
			if (this.monsters[i].movestate>1){//Player has arrived at new grid square
				this.monsters[i].movestate=0;//reset to nonmoving state
				if (this.monsters[i].movedir==0){
					this.monsters[i].y = this.monsters[i].y+1;
					}
				if (this.monsters[i].movedir==1){
					this.monsters[i].x = this.monsters[i].x+1;
					}				
				if (this.monsters[i].movedir==2){
					this.monsters[i].y = this.monsters[i].y-1;
					}
				if (this.monsters[i].movedir==3){
					this.monsters[i].x = this.monsters[i].x-1;
					}	
				if (this.monsters[i].x > this.m-1){this.monsters[i].x = this.m-1 }	
				if (this.monsters[i].x < 0 ){this.monsters[i].x = 0; }	
				if (this.monsters[i].y > this.n-1){this.monsters[i].y = this.n-1 }
				if (this.monsters[i].y < 0){this.monsters[i].y = 0; }	
				this.monsters[i].movedir = -1;//reset dir
				}
			i++;
			}
		}
	ai(){
		var i=0;
		while(i<this.monsters.length){
			//decide to move or not
			if (this.monsters[i].movedir<0){
				if (this.monsters[i].moveai==0){
					if (Math.random()<this.monsters[i].movechance){
						console.log("Itriedtomovemonster");
						this.monsters[i].move(Math.floor(Math.random()*4));
						}
					}
				}
			i++;
			}
		}
	checktotal(){
		var total = 0;
		var i=0;
		
		while(i<this.grid.length){
			var j=0;
			while(j<this.grid[i].length){
				if (this.grid[i][j].s == this.hf){
					total++;
					}
				j++
				}
			i++;
			}
		return total;
		}
	generateadditiongrid(min1,max1,min2,max2){
		//var max1 = 10;
		//var min1 = 0;
		//var max2 = 10;
		//var min2 = 0;
		this.grid = [];
		var arow = [];
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var addend1 = Math.floor(Math.random()*(max1-min1)) + min1;
				var addend2 = Math.floor(Math.random()*(max2-min2)) + min2;
				var answer = addend1 + addend2;
				var question = addend1 + " + " + addend2 + " = ?";
				var ameq = new Meq(question,answer);
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	
	}