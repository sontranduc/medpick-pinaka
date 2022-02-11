/**
** JSON Object to store data which will be sent to medpick database
**/
let prescOrder = {};
prescOrder.invoice_no = getInvoice();		// set invoice number to JSON
prescOrder.order_date = orderDate();		// set assign date order of prescription to JSON
prescOrder.order_time = orderTime();		// set assign time order of prescription to JSON

let pharmList = [];
let isValidPatient = false;

/**
** Build Pharmacy Dropdown List for operator to select 
*/
function buildDropDownList(myResult){

	let DropDownList = document.getElementById("pharmDropDownList");
	
	//Set Default Pharmacy Name
	let defaultOption = document.createElement('option');
    defaultOption.text = '----select pharmacy----';
	pharmDropDownList.add(defaultOption);

	//Add the Options to the DropDownList.	
	for (let i = 0;  i < myResult.length; i++) {
		let option = document.createElement("OPTION");

		//Set Pharmacy Name in Text part.
		option.innerHTML = myResult[i].pharmname;

		//Set Pharmacy in Value parts.
		option.value = myResult[i].pharmname;
		
		//Add the Option element to DropDownList.
		DropDownList.options.add(option);

	}

}




/**
**		Return selected position of the Dropdown list
**/
function getSelectPosition(){
	
	let p = document.getElementById("pharmDropDownList");
	
		return p.selectedIndex;
		
}




/** 
**	upload prescription image
**/
function uploadPrescription(){

	if (!document.getElementById("myfile")){
		
		let x = document.createElement("INPUT");
		x.setAttribute("type", "file");
		x.setAttribute("id", "myfile");
		x.setAttribute("onchange", "encodeImageFileAsURL(this)");
		document.body.appendChild(x);
		sendPresc();	// send prescription
	}
}
	
		

/** 
** select prescription image file and then convert it to base64 string encoding
**/
function encodeImageFileAsURL(element) {
	
	let file = element.files[0];
	let reader = new FileReader();

	reader.onloadend = function() {
		
		// display prescription image for preview
		let image = document.getElementById('output');
		image.src = URL.createObjectURL(file);
		document.getElementById("output").innerHTML;
		
		// Trim base64 string and save to JSON prescOrder
		prescOrder.custom_pres = reader.result.replace(/^data:.+;base64,/, '');

	  }
	reader.readAsDataURL(file);

}


/**
** send prescription
**/
function sendPresc(){
	
	let btn = document.createElement("BUTTON");
	let linebk = document.createElement("hr");
	linebk.setAttribute("class", "uk-divider");

	btn.setAttribute("onclick", "sendPrescription()");
	btn.setAttribute("class", "uk-button uk-button-primary uk-button-small");
	btn.innerHTML = "Submit";
	document.body.appendChild(linebk);	// create break line
	document.body.appendChild(btn);
	
}

/**
** generates an invoice number (MPMonthDateMinuteSeconds)
**/
function getInvoice(){
	
	let date = new Date();
    let monthStr = ('0' + (date.getMonth()+1)).slice(-2);
    let dateStr = ('0' + date.getDate()).slice(-2);
    let minutesStr = ('0' + date.getMinutes()).slice(-2);
    let secondsStr = ('0' + date.getSeconds()).slice(-2);
	let invoiceNumber = monthStr + dateStr + minutesStr + secondsStr;
	return parseInt(invoiceNumber);
	
}


function orderDate(){
	
	let date = new Date();
	return dateString = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
	
}

function orderTime(){
	
	let date = new Date();
	let timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	return timeString
}
