class Player{
	constructor(pname){
		this.x = 0; //location on m x n grid
		this.y = 0;
		this.xx = 0;//Onscreen location
		this.yy = 0;
		this.name = pname;
		this.c = "red";
		this.hp = 5;
		this.score = 0;
		this.movedir = -1; //0 = up, 1 = left, 2 = down, 3 = right, -1 = not moving
		this.movestate = 0; //0-1 fraction of move completed
		this.movespeed = 0.1;
		}
	draw(xx,yy, xs, ys){//actual screen coordinates and size
		//console.log("triedtodraw");
		context.strokeStyle = this.c;
		context.lineWidth = 2;
		context.beginPath();
		context.rect(xx,yy,xs,ys);
		context.stroke();
		}
	move(dir){//Initiates movement sequence
		if (this.movedir<0){//Only move if player is not already in motion
			this.movestate = 0+this.movespeed;
			this.movedir = dir;
			}
		}

	}
