"use strict";
/************** Game parameters for the tic tac toe *************/
var Game = {
	
    plateau : [[],[],[]],
    player1 : "",
    player2 : "",
    currentplayer :"player1",
    beginplayer:"",
    ia: true,
    
	/*--- Initialize the game ( javascript parameters and html clean ---*/
	reset : function (){
		var line=document.getElementsByClassName('column');
		this.plateau = [[],[],[]];
		var child;
		for (var i = 0; i < line.length; i++) 
   		{
	        child =line[i].firstChild;
	        child.classList.remove('circle');
	        child.classList.remove('cross');

        }
        	    document.getElementById('firstplayer').innerHTML = Game.beginplayer + " begins !";
	},
	
	myListenerEvent : function (element,callback) {
		var el=document.getElementById(element);
		if(callback) {
			el.addEventListener('click',callback,false);
		}
		else return;
	},
	
	initEvent : function () {
		var col = document.getElementsByClassName('column');
		var i;
		for (i = 0; i < col.length; i++) {
			
			col[i].addEventListener('click',Game.userClick,false);
		}
		Game.myListenerEvent('playTwo',Game.playwithTwo);
		Game.myListenerEvent('playIA',Game.playwithIA);
		Game.myListenerEvent('back',Game.backMenu);
		Game.myListenerEvent('headerback',Game.backMenu);
		Game.myListenerEvent('validate',Game.validate);
		Game.myListenerEvent('ok',function() {
			Game.propertyCSS('winnerbox','visibility','hidden');

		});
	},
	
	propertyCSS : function (element,property,valeur) {
		switch (property) {
            case 'display':
      		    document.getElementById(element).style.display = valeur;
		        break;
		    case 'visibility':
		        document.getElementById(element).style.visibility = valeur;
				break;
		   }
	},
	
	backMenu:function() {
		Game.propertyCSS('playername','visibility', 'hidden');
		Game.propertyCSS('firstplayer','visibility','hidden');
		Game.propertyCSS('formulaire','display','none');
		Game.propertyCSS('tictactoe','display','none');
	    Game.propertyCSS('buttonother','display','none');
	    Game.propertyCSS('buttonvalidate','display','none');


		document.getElementById('firstname1').value="";
		document.getElementById('firstname2').value ="";
		Game.propertyCSS('menu','display','block');
	    Game.propertyCSS('buttonmenu','display','block');

	},
	
    playwithIA : function () {
        Game.player1 ="Player 1";
	    Game.player2 ="IA";
	    Game.ia = true;
	    Game.currentplayer ="player1";
	    Game.beginplayer ="Player 1"
	    Game.reset();
	    
	    document.getElementById('playername').innerHTML = Game.player1 + " VS "+Game.player2;
	    document.getElementById('firstplayer').innerHTML = Game.beginplayer + " begins !";
	    
	    Game.propertyCSS('buttonmenu','display','none');
	    Game.propertyCSS('menu','display','none');

	    Game.propertyCSS('tictactoe','display','block');
   	    Game.propertyCSS('buttonother','display','block');
    	Game.propertyCSS('playername','visibility','visible');
    	Game.propertyCSS('firstplayer','visibility','visible');    
    },
    
    playwithTwo: function () {
    	Game.propertyCSS('menu','display','none');
	    Game.propertyCSS('buttonmenu','display','none');
	    Game.propertyCSS('buttonvalidate','display','block');
		Game.propertyCSS('formulaire','display','inline-block');
	},

	validate : function () {
		console.log('ot');
		var firstname_un = document.getElementById('firstname1').value;
		var firstname_deux = document.getElementById('firstname2').value;
		
		if( firstname_un!="" && firstname_deux!="") {
			Game.player1 = firstname_un;
		    Game.player2 = firstname_deux;
		    Game.currentplayer ="player1";
		    Game.beginplayer= firstname_un;

		    Game.ia = false;
	   		Game.reset();
	   		
	   		document.getElementById('playername').innerHTML = Game.player1 + " VS "+Game.player2 ;
	        document.getElementById('firstplayer').innerHTML = Game.beginplayer + " begins !";

	        Game.propertyCSS('formulaire','display','none');
	        Game.propertyCSS('buttonvalidate','display','none');
	        Game.propertyCSS('buttonother','display','block');
	        Game.propertyCSS('tictactoe','display','block');
   	    	Game.propertyCSS('buttonother','display','block');
    		Game.propertyCSS('playername','visibility','visible');
    		Game.propertyCSS('firstplayer','visibility','visible');    
            			
		}
	},

	
	
	drawCircle : function (element) {
		element.firstChild.classList.add('circle');
		
	},
	
	drawCross : function (element) {
		element.firstChild.classList.add('cross');
		
	},
	
	/*--- Action after a user's click ---*/
	userClick : function (element) {
		var e= element.target;
		var cases = e.id.split('-');
		var i= cases[0];
		var j= cases[1];
		
		//If IA
		if(Game.ia) {
			if(Game.plateau[i][j] == null) {
				Game.plateau[i][j] =1;
				Game.drawCross(e);
				if(!Game.checkWinner()) {
					IAManager.play(Game.plateau,1);
				}
			}	
		}
		//If 2 humans players
		else {
			if(Game.plateau[i][j] == null) {
				if(Game.currentplayer==='player1') {
					Game.plateau[i][j] =1;
					Game.drawCross(e);
					Game.currentplayer='player2';
					Game.checkWinner();
				}
				else {
					Game.plateau[i][j] =2;
					Game.drawCircle(e);
					Game.currentplayer='player1';
					Game.checkWinner();

				}
			}
		}
	},
	
	/*--- Check if the game is finished ---*/
	checkWinner: function () {
		var res = IAManager.gagnant(Game.plateau);
		if(res===1) {
			Game.displayWinner(this.player1,"player1");
			return true;
		}
		else if(res===2) {
			if(Game.player2!=="IA") {
				Game.displayWinner(this.player2,"player2");
			}
			else {
			    Game.displayWinner(this.player2,"player1");
			}
			return true;
		}
		else if(res===3) {
			Game.displayWinner("nobody",this.currentplayer);
			return true;
		}
		return false;
		
	},
	
	displayWinner : function (nameplayer,currentplayer) {
		document.getElementById("winnermessage").innerHTML= nameplayer + " wins";
		Game.propertyCSS('winnerbox','visibility','visible');
		Game.currentplayer = currentplayer;
		Game.reset();	
		
	}
	
	
};

/************** IA for the tic tac toe *************/

var IAManager = {
	
	/*--- IA play ---*/
    play: function (game,depth) {
	    var maximum = -100000;
		var maxi = 0;
		var maxj = 0;
     
        for(var i=0;i<3;i++) {
          	for(var j=0;j<3;j++) {
                if(game[i][j] == null) {
                      game[i][j] = 2;
                      var tmp;
                      tmp = IAManager.evaluation(game);                      
                      if(tmp > maximum || ((tmp == maximum) && (((Math.random())*10+1)%2 == 0) )) {

                            maximum = tmp;
                            maxi = i;
                            maxj = j;
                      }
                      game[i][j] = null;
                }
          	}
     	}
 
     game[maxi][maxj]=2;
     
     var rest = IAManager.gagnant(game);

     var id = maxi+"-"+maxj;
     
     var div = document.getElementById(id);
     
     Game.drawCircle(div);
     
     Game.checkWinner();
},
	
	
	
    /*--- Returns the 'score' of the lines, columns or diagonals---*/
	calcScore : function (cntpion,cntjoueur) {
		switch(cntpion)
		    {
		    case 1:
		        return 1*cntjoueur;
		    case 2:
		        return 10*cntjoueur;
		    case 3 :
		    	return -100*cntjoueur;
		    default:
		        return 0;
			}
	},
	
/*--- Evaluation fonction for this max_min algorithm---*/
	evaluation : function (game) {
	     var vainqueur;
	     var nb_de_pions = 0;
	     var score =0;
	     var i;
	     var j;
	     //Count number pions
		 for(i=0;i<3;i++) {
		          for(j=0;j<3;j++) {
		               if(game[i][j] != null) {
		                    nb_de_pions++;
		               }
		          }
		  }
 		
 		//If game is finished
	     vainqueur = IAManager.gagnant(game);
	     if( vainqueur!= 0)
	     {
	         //IA wins
	         if( vainqueur == 2 )
	          {
	             return 1000 - nb_de_pions;
	          }
	          //Player wins
	          else if( vainqueur == 1 )
	          {
	          	 return -1000 + nb_de_pions;
	          }
	          //Egality
	          else
	          {
	               return 0;
	          }
	      }
      
         //Diagonal
	     var cntpion=0;
	     var cntjoueur=0;
         for(i=0;i<3;i++) {
	          if(game[i][i] == 2) {
	               cntpion++;
	               cntjoueur++;
	 
	          }
	          else if(game[i][i] == 1) {
	               cntpion++;
	               cntjoueur--;          
	          }       
	     }

	 	score+=IAManager.calcScore(cntpion,cntjoueur);
	     
	    //Diagonal
	 	cntpion =0;
	    cntjoueur =0;
	    for(i=0;i<3;i++) {
	         
	          if(game[i][2-i] == 2) {
	               cntpion++;
	               cntjoueur++;
	          }
	          else if(game[i][2-i] == 1) {
	          		cntpion++;
	               	cntjoueur--;            
	          }       
	     }

 		score+=IAManager.calcScore(cntpion,cntjoueur);
	
	    //Line
	     for(i=0;i<3;i++) {
	          cntpion =0;
	    	  cntjoueur =0;
	         
	          for(j=0;j<3;j++) {
	               if(game[i][j] == 2) {
	                     cntpion++;
	                     cntjoueur++;
	               }
	               
	               else if(game[i][j] == 1) {
	                    cntpion++;
	               		cntjoueur--;                
	               }
	          }
	
	          score+=IAManager.calcScore(cntpion,cntjoueur);    
	     }
          
          
     	//Columns
	     for(i=0;i<3;i++) {
	          cntpion = 0;
	          cntjoueur = 0;         
	          for(j=0;j<3;j++) {
	               if(game[j][i] == 2) {
	                     cntpion++;
	                     cntjoueur++;
	                }
	               else if(game[j][i] == 1) {
	                    cntpion++;
	               		cntjoueur--; 
	               }
	          }
	          score+=IAManager.calcScore(cntpion,cntjoueur);         
	  	 }
  		return score;
	},
	
/*--- Returns the game is finished (with a winner or egality , 0 else---*/
	gagnant : function mgagnant(game) {
	
		var obj = IAManager.nb_series(game);
		var i;
		var j;
		//IA win
		if(obj[1]==1) {
			return 2;	
		}
		//Player win
		else if (obj[0]==1) {
			return 1;
			
		}
		else {
			for(i = 0; i < 3  ;i++) {
	               for(j = 0; j < 3; j++) {
	                    if(game[i][j] == null) {
	                         return 0;
	                    }
	               }
	          }
	     }
	     //Egality
	     return 3;
	},

/*--- Returns the line number with have 3 same symbols---*/
	nb_series : function (game) {
	 
		 var compteur1;
		 var compteur2;
		 var i;
		 var j;
	      
	     var series_j1 = 0;
	     var series_j2 = 0;
	 
	     compteur1 = 0;
	     compteur2 = 0;
	 
	     //Diagonal
	     for(i = 0; i < 3; i++)
	     {
	          if(game[i][i] == 1)
	          {
	               compteur1++;
	               compteur2 = 0;
	 
	               if(compteur1 == 3)
	               {
	                    series_j1++;
	               }
	          }
	          else if(game[i][i] == 2)
	          {
	               compteur2++;
	               compteur1 = 0;
	       
	               if(compteur2 == 3)
	               {
	                     series_j2++;
	               }
	          }       
	     }
	 
	     compteur1 = 0;
	     compteur2 = 0;
	 
	     //Diagonal
	     for(i = 0;i < 3; i++) {
	          if(game[i][2-i] == 1) {
	               compteur1++;
	               compteur2 = 0;
	 
	               if(compteur1 == 3) {
	                    series_j1++;
	               }
	          }
	          else if(game[i][2-i] == 2) {
	               compteur2++;
	               compteur1 = 0;
	       
	               if(compteur2 == 3) {
	                     series_j2++;
	               }
	          }       
	     }
 
	     //Line
	     for(var i=0;i<3;i++) {
	          compteur1 = 0;
	          compteur2 = 0;
	         
	          for(var j=0;j<3;j++) {
	               if(game[i][j] == 1) {
	                    compteur1++;
	                    compteur2 = 0;
	 
	                    if(compteur1 == 3) {
	                         series_j1++;
	                    }
	               }
	               else if(game[i][j] == 2) {
	                    compteur2++;
	                    compteur1 = 0;
	 
	                    if(compteur2 == 3) {
	                         series_j2++;
	                         
	                    }
	               }
	          	}
         
      	   	}
          
          
	     //Columns 
	     for(var i=0;i<3;i++) {
	          compteur1 = 0;
	          compteur2 = 0;
	         
	          for(var j=0;j<3;j++) {
	               if(game[j][i] == 1) {
	                    compteur1++;
	                    compteur2 = 0;
	 
	                    if(compteur1 == 3) {
	                         series_j1++;
	                    }
	               }
	               else if(game[j][i] == 2) {
	                    compteur2++;
	                    compteur1 = 0;
	 
	                    if(compteur2 == 3) {
	                         series_j2++;
	                         
	                    }
	               	}
	          	} 
	       	}

         var obj =[] ;
         obj[0]=series_j1 ;
         obj[1]=series_j2; 
          
         return obj;
     }
	
};

document.addEventListener('DOMContentLoaded',Game.initEvent);
document.addEventListener('DOMContentLoaded',Game.reset);
