
function playwithIA(){
	
	$("#menu").hide();
	Game.player1 ="Player 1";
	Game.player2 ="IA";
	Game.ia = true;
	Game.currentplayer ="player1";
	Game.init();
	$("#play").show();
	$("#playername").empty();
	//$("#firstplayer").empty(); 
	$("#playername").prepend( Game.player1 + " VS "+Game.player2);
	$("#playername").css("visibility", "visible");
	$("#firstplayer").css("visibility", "visible");

	
	
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
   		$("#playername").empty();
	    //$("#firstplayer").empty(); 
		$("#playername").prepend("<h2>"+ Game.player1 + " VS "+Game.player2 + "</h2>"); 
		$("#formulaire").hide();
		$("#playername").css("visibility", "visible");
	    $("#firstplayer").css("visibility", "visible");
		$("#play").show();
		
	}
	else {
		$("#error").show(15);
	}
		
}

function backMenu() {
	Game.ia = true;
	$("#playername").css("visibility", "hidden");
	$("#firstplayer").css("visibility", "hidden");
	//$("#playername").hide(); 
	//$("#playername").empty();
	//$("#firstplayer").hide(); 
	//$("#firstplayer").empty(); 
	$("#formulaire").hide();
	$("#play").hide();
	$('#firstname1').val("");
	$('#firstname2').val("");
	$("#menu").show();
	
}

