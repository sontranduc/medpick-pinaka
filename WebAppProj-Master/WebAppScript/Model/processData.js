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
	for (let i = 0; i < myResult.length; i++) {
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


/** 
** hidding and showing the DIV element, hidding and showing canvas
**/
function showingHiddingCanvas(mode){
	
	  let x = document.getElementById("display-mode");
	  x.style.display = mode;

}


