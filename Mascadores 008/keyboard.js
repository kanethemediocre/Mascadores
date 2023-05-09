//A lot of player keyboard controls are handled in system.playerkeys().
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	var p0 = arcadegrids[level].players[0];
	if (event.key=="ArrowDown"){
		p0.move(0);
		console.log("Itriedtogodown");
		}	
	else if (event.key=="ArrowRight"){
		p0.move(1);
		}	  
	else if (event.key=="ArrowUp"){
		p0.move(2);
		}
	else if (event.key=="ArrowLeft"){
		p0.move(3);
		}		
	else if (event.key==" "){
		//compare grid answer to desired answer
		if (arcadegrids[level].hf == arcadegrids[level].grid[p0.x][p0.y].s){
			p0.score++;
			arcadegrids[level].grid[p0.x][p0.y].s = "none";
			arcadegrids[level].grid[p0.x][p0.y].q = "!!!";
			//Check if level is finished
			if (arcadegrids[level].checktotal()==0){
				level++;
				arcadegrids[level].players = [p0];
				}
			
			}
		else{
			p0.score--;
			arcadegrids[level].grid[p0.x][p0.y].s = "none";
			arcadegrids[level].grid[p0.x][p0.y].q = "...";			
			}
		}		
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

