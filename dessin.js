

/************** Draw circle and cross for the tic tac toe *************/

function drawCross(e) {
	var canvas = document.createElement("canvas");
	canvas.className ="canvas";
	contextNow = canvas.getContext('2d');
	
	var largeur = parseInt($("#morpion").width())/3;
	
	canvas.width=largeur;
	canvas.height=largeur;

	
	contextNow.strokeStyle ='#2C75FF'; //Bleu électrique
    contextNow.lineWidth=4;
	contextNow.beginPath();
	contextNow.moveTo(0,0);
    contextNow.lineTo(largeur*2,largeur*2);
    contextNow.moveTo(0,largeur);
    contextNow.lineTo(largeur,0);
	contextNow.stroke();

	e.appendChild(canvas);
	

}

function drawCircle(e){
	
	var canvas = document.createElement("canvas");
	canvas.className ="canvas";
	contextNow = canvas.getContext('2d');
	
	var largeur = parseInt($("#morpion").width())/3;
	canvas.width=largeur;
	canvas.height=largeur;

	//(x,y) x abscisse, y ordonnée
	contextNow.strokeStyle ='red';
    contextNow.lineWidth=4;
	contextNow.beginPath();
	contextNow.arc(largeur/2,largeur/2, (largeur/2) - 5,0,Math.PI*2,false);
	contextNow.stroke();
	
	e.appendChild(canvas);

   	
}