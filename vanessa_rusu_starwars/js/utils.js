// JavaScript Document

//utility function to create AJAX request/XHR object

function createRequest() {
	var request;
	
	try {
		request = new XMLHttpRequest(); // for modern browsers
		} catch(e) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP"); //try ms way if first fails
		 
		} catch(e) {
			try {
			request = new ActiveXObject("Microsoft.XMLHTTP");			
			} 	catch(e) {
				request = null; //not working after all 3 tries - set to null
			
		}
	}
}
	return request;
}

//create your own live search, folling the example we did in class. Rework the in class example by changing:
//variable names, images, database name etc
//must have thumbnails in results
//use additional enhancements - css3 etc (i want to figure out how to get the "enter" on the keyboard to go to the link)
