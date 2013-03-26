function openPopup() {
	$("#popup").fadeIn();
	$('body').append('<div id="fade"></div>'); 
	$("#popup").append('<a href="#" class="close"><img src="style/images/close_pop.png" class="btn_close" title="Close Window" alt="Close" onclick="closePopup();"/></a>');
    $('#fade').fadeIn(1000);   

}

function closePopup() {
	$('#fade , #popup').fadeOut();
}


//document.addEventListener('DOMContentLoaded',init());
 
 

 

 
