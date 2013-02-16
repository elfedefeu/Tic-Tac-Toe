
/************** Game parameters for the tic tac toe *************/
var Game = {
	
    plateau : new Array(),
    player1 :"",
    player2:"",
    currentplayer:"player1",
    ia: true,
    
	/*--- Initialize the game ( javascript parameters and html clean ---*/
	init : function minit(){
		var liste=[];
		for(var j=0;j<3;j++)
		{	
			Game.plateau[j] = [];
			var name  = 'column'+ (j+1);
			list = $('.'+name);	
			
			for(var i=0;i<3;i++) {
				
				while (list[i].firstChild) {
  						list[i].removeChild(list[i].firstChild);
  				}		
  					
				Game.plateau[j][i] = 0;	
			}	
		}
		Game.displayFirstPlayer();	
	},
	
	/*--- Action after a user's click ---*/
	onClick : function monClick (e) {
		var cases = e.id.split('-');
		var i= cases[0];
		var j= cases[1];
		
		
		//If IA
		if(Game.ia) {
			if(Game.plateau[i][j] == 0) {
				Game.plateau[i][j] =1;
				drawCross(e);
				if(!Game.checkWinner()) {
					IAManager.play(Game.plateau,1);
				}
			}	
		}
		//If 2 humans players
		else {
			if(Game.plateau[i][j] == 0) {
				if(Game.currentplayer=='player1') {
					Game.plateau[i][j] =1;
					drawCross(e);
					Game.currentplayer='player2';
					Game.checkWinner();
				}
				else {
					Game.plateau[i][j] =2;
					drawCircle(e);
					Game.currentplayer='player1';
					Game.checkWinner();

				}
			}
		}
	},
	
	/*--- Check if the game is finished ---*/
	checkWinner: function mcheckWinner() {
		var res = IAManager.gagnant(Game.plateau);
		if(res==1) {
			alert(Game.player1 + " wins");
			Game.currentplayer ="player1";
			Game.init();
			return true;
		}
		else if(res==2) {
			alert(Game.player2 + " wins");
			if(Game.player2!="IA") {
				Game.currentplayer ="player2";
			}
			Game.init();
			return true;
		}
		else if(res==3) {
			alert("Egality");
			Game.init();
			return true;
		}
		return false;
		
	},
	
	displayFirstPlayer : function mdisplayFirstPlayer() {
		$("#firstplayer").empty(); 
		if(Game.currentplayer=="player1") {
			$("#firstplayer").append("<h5>"+Game.player1 + " begins" + "</h5>"); 
		}
		else {
			$("#firstplayer").append("<h5>"+Game.player2 + " begins"+ "</h5>"); 
		}
	}
}


document.addEventListener('DOMContentLoaded',Game.init);
