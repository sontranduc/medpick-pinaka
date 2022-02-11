/**
 * Request Pharmacy List from server.
 *
 * @param callback to get executed once done.
 */
function getPharmList(callback) {

	$.ajax({
			url: 'http://98.217.116.98/checknearestpharm.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: "POST", 
			dataType: "json",
			success: function(response){

			// send the response (JSON) to the callback
				callback(response);				
				},
			error: function () {

				console.log("error");

			}
	});

};
	
	

/**
 * Parses JSON after AJAX is complete.
 */
function parsePharmList(jsonObj) {
	if (pharmList.length == 0) {
		for (let key in jsonObj) {
			console.log("test One");
			for (let i=0; i < jsonObj[key].length; i++){
				pharmList.push(jsonObj[key][i]); // push pharmacy list into array
			}
		}
		buildDropDownList(pharmList);		// build pharmacy DropDowm List
	}
		/* process the retrived data */
		processingRetrivedPharmacyData(pharmList);
};



/**
 * Final callback for when the pharmacy list is loaded.
 */
function processingRetrivedPharmacyData(pharmArray) {
	
	
	let x = getSelectPosition();	// get selected position from dropdown list

	if ( x > 0) { 	// ignore select position of default option
	
		let i = x -1; // get index of pharmacy array list
		let selectedPharm = new SelectedPharmacy(pharmArray[i]);  // create new instance                      
	
		selectedPharm.displaySelectPharmInfo();		//	display selected pharmacy's info
		selectedPharm.saveSelectPharmInfo();		// save selected pharmacy's info JSON
		if (isValidPatient) {	// if retrieving patient record sucessfully, then show canvas
			showingHiddingCanvas("");
		}
	}
	
};


