/************** IA for the tic tac toe *************/

var IAManager = {
	
	/*--- IA play ---*/
	play: function mplay(game,depth)
	{
		var maximum = -100000;
		var maxi =0;
		var maxj = 0;
     
        for(var i=0;i<3;i++) {
          	for(var j=0;j<3;j++) {
                if(game[i][j] == 0) {
                      game[i][j] = 1;
                      tmp = IAManager.maximum(game,depth-1);
                      
                      if(tmp > maximum || ((tmp == maximum) && (Math.random()%2 == 0) )) {

                            maximum = tmp;
                            maxi = i;
                            maxj = j;
                      }
                      game[i][j] = 0;
                }
          	}
     	}
 
     game[maxi][maxj]=1;
     
     var rest = IAManager.gagnant(game);

     var id = maxi+"-"+maxj;
     
     var div = document.getElementById(id);
     
     drawCircle(div);
     
     if(rest ==1 ) {
     	alert("Ordinateur gagne");
     	Game.init();
     } 
     else if (rest==2) { 
     	alert("Joueur gagne");
     	Game.init();
     } 
     else if(rest==3) { 
     	alert("Egalité");
     	Game.init();
     } 

},
	
	/*--- Returns the maximum of children---*/
	maximum : function mmaximum(game,depth) {
	     if(depth == 0 || IAManager.gagnant(game)!=0) {

	          return IAManager.evaluation(game);
	     }
	 
	     var maxi = -10000;
	     var tmp;
	 
	     for(var i=0;i<3;i++) {
	          for(var j=0;j<3;j++) {
	                if(game[i][j] == 0) {
	                      game[i][j] = 2;
	                      tmp = IAManager.minimum(game,depth-1);
	                      
	                      if(tmp > maxi|| ((tmp == maxi) && (Math.random()%2 == 0))) {
	                            maxi = tmp;
	                      }
	                      game[i][j] = 0;
	                }
	          }
	     }
 		return maxi;
      
	},
	
	/*--- Returns the minimum of children---*/
	minimum : function mminimum(game,depth) {
	     if(depth == 0 || IAManager.gagnant(game)!=0) {
	          return IAManager.evaluation(game);
	     }
	 
	    var mini = 10000;
	    var tmp;
	 
	 	
	     for(var i=0;i<3;i++) {
	          for(var j=0;j<3;j++) {
	                if(game[i][j] == 0) {
	                      game[i][j] = 1;
	                      tmp = IAManager.maximum(game,depth-1);
							if(tmp < mini || ( (tmp == mini) && (Math.random()%2 == 0) ) ) {
	                            mini = tmp;
	                     	}
	                      game[i][j] = 0;
	                }
	          }
     	 }
 
     return mini;
      
	},
	
/*--- Returns the 'score' of the lines, columns or diagonals---*/
	calcScore : function mcalcScore(cntpion,cntjoueur) {
		switch(cntpion)
		    {
		    case 1:
		        return 10*cntjoueur;
		    case 2:
		        return 30*cntjoueur;
		    default:
		        return 0;
			}
	},
	
/*--- Evaluation fonction for this max_min algorithm---*/
	evaluation : function meval(game) {
	     var vainqueur;
	     var nb_de_pions = 0;
	     var score =0;
	     
	     //Count number pions
		 for(var i=0;i<3;i++) {
		          for(var j=0;j<3;j++) {
		               if(game[i][j] != 0) {
		                    nb_de_pions++;
		               }
		          }
		  }
 		
 		//If game is finished
	     vainqueur = IAManager.gagnant(game);
	     if( vainqueur!= 0)
	     {
	         if( vainqueur == 1 )
	          {
	             return 1000 - nb_de_pions;
	
	
	          }
	          else if( vainqueur == 2 )
	          {
	          	 return -1000 + nb_de_pions;
	
	          }
	          else
	          {
	               return 0;
	          }
	      }
      
         //Diagonal
	     var cntpion=0;
	     var cntjoueur=0;
         for(i=0;i<3;i++) {
	          if(game[i][i] == 1) {
	               cntpion++;
	               cntjoueur++;
	 
	          }
	          else if(game[i][i] == 2) {
	               cntpion++;
	               cntjoueur--;          
	          }       
	     }

	 	score+=IAManager.calcScore(cntpion,cntjoueur);
	     
	    //Diagonal
	 	cntpion =0;
	    cntjoueur =0;
	    for(i=0;i<3;i++) {
	         
	          if(game[i][2-i] == 1) {
	               cntpion++;
	               cntjoueur++;
	          }
	          else if(game[i][2-i] == 2) {
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
	               if(game[i][j] == 1) {
	                     cntpion++;
	                     cntjoueur++;
	               }
	               
	               else if(game[i][j] == 2) {
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
	               if(game[j][i] == 1) {
	                     cntpion++;
	                     cntjoueur++;
	                }
	               else if(game[j][i] == 2) {
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
		if(obj[0]==1) {
			return 1;	
		}
		//Player win
		else if (obj[1]==1) {
			return 2;
			
		}
		else {
			for(i=0;i<3;i++) {
	               for(j=0;j<3;j++) {
	                    if(game[i][j] == 0) {
	                         return 0;
	                    }
	               }
	          }
	     }
	     //Egality
	     return 3;
	},

/*--- Returns the line number with have 3 same symbols---*/
	nb_series : function mnb_series(game) {
	 
		 var compteur1;
		 var compteur2;
	      
	     var series_j1 = 0;
	     var series_j2 = 0;
	 
	     compteur1 = 0;
	     compteur2 = 0;
	 
	     //Diagonal
	     for(var i=0;i<3;i++)
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
	     for(var i=0;i<3;i++) {
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