
function playwithIA(){
	
	$("#menu").hide();
	Game.player1 ="Player 1";
	Game.player2 ="IA";
	Game.ia = true;
	Game.currentplayer ="player1";
	Game.init();
	$("#play").show();
	$("#playername").prepend( Game.player1 + " VS "+Game.player2);
	$("#playername").show(); 
	$("#firstplayer").show(); 

	
	
}

function playwithTwo() {
	
	$("#menu").hide();
	$("#error").hide();
	$("#formulaire").show();	
	
}

function validate() {
	if( $('#firstname1').val()!="" && $('#firstname2').val()!="") {
		Game.player1 =$('#firstname1').val();
	    Game.player2= $('#firstname2').val();
	    Game.ia = false;
   		Game.init();
		$("#playername").prepend("<h2>"+ Game.player1 + " VS "+Game.player2 + "</h2>"); 
		$("#formulaire").hide();
		$("#playername").show(); 
		$("#firstplayer").show(); 
		$("#play").show();
		
	}
	else {
		$("#error").show(15);
	}
		
}

function backMenu() {
	Game.ia = true;
	$("#playername").hide(); 
	$("#playername").empty();
	$("#firstplayer").hide(); 
	$("#firstplayer").empty(); 
	$("#formulaire").hide();
	$("#play").hide();
	$('#firstname1').val("");
	$('#firstname2').val("");
	$("#menu").show();
	
}

