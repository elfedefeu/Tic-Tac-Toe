
function playwithIA(){
	
	$("#menu").hide();
	Game.init();
	$("#play").show();
	$("#playername").text( Game.player1 + " VS "+Game.player2); 
	$("#playername").show(); 
	
}

function playwithTwo(){
	
	$("#menu").hide();
	$("#formulaire").show();	
	
}

function validate(){
	
	Game.init();
	Game.player1 =$('#prenom1').val();
	Game.player2= $('#prenom2').val();
	if( Game.player1!="" && Game.player2!="") {
		
		$("#playername").text( Game.player1 + " VS "+Game.player2); 
		$("#playername").show(); 
		$("#formulaire").hide();
		$("#play").show();
	}
	else {
		$("#error").show(15);
	}
		
}

function backMenu(){
	
	$("#playername").hide(); 
	$("#formulaire").hide();
	$("#play").hide();
	$("#menu").show();
	
}