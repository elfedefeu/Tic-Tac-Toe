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
	     
	     //Count number pions
		 for(var i=0;i<3;i++) {
		          for(var j=0;j<3;j++) {
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
	
}