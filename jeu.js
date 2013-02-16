
/************** Game parameters for the tic tac toe *************/
var Game = {
	
    plateau : new Array(),
    player1 :"Player 1",
    player2:"Artificial Intelligence",
    
    /*--- Deepth is the difficulty---*/
    depth : 3,	
	
	/*--- Initialize the game ( javascript parameters and html clean ---*/
	init : function minit(){
		var liste=[];
		for(var j=0;j<3;j++)
		{	
			Game.plateau[j] = [];
			var name  = 'colonne'+ (j+1);
			list = $('.'+name);	
			
			for(var i=0;i<3;i++) {
				
				while (list[i].firstChild) {
  						list[i].removeChild(list[i].firstChild);
  				}		
  					
				Game.plateau[j][i] = 0;	
			}	
		}	
	},
	
	/*--- Action after a user's click ---*/
	onClick : function monClick (e) {
		var cases = e.id.split('-');
		var i= cases[0];
		var j= cases[1];
		
		if(Game.plateau[i][j] == 0) 
		{
			Game.plateau[i][j] =2;
			drawCross(e);
			var res = IAManager.gagnant(Game.plateau);
			
			if(res==2) {
				 alert("Joueur test gagne");
				 Game.init();
			}
			else {
				IAManager.play(Game.plateau,3);
			}
		}	
	},
}


document.addEventListener('DOMContentLoaded',Game.init);
