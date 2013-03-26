
		var ww = window.innerHeight;
        document.body.style.height =ww+'px';
        var taille= ww - document.getElementsByClassName('title')[0].clientHeight - 
        			document.getElementsByClassName('text')[0].clientHeight -
        			document.getElementsByClassName('bouton')[0].clientHeight;

        document.getElementById('container1').style.height=taille+'px';
        var cw = window.innerWidth;
        if(cw > taille) {
			document.getElementsByClassName('container')[0].style.height=taille+'px';
			document.getElementsByClassName('container')[0].style.width=taille+'px'; 
			document.getElementsByClassName('bouton')[0].style.width=taille+'px';              
      
       
		}
		else {				
			document.getElementsByClassName('container')[0].style.height=cw+'px';
			document.getElementsByClassName('container')[0].style.width=cw+'px';
		}


