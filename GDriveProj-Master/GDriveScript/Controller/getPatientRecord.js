/**
 * get phone number from user and pass it AJAX 
 *
 */
function getPhoneNum() {

	let inpObj = document.getElementById("phoneId");
	
	if (!inpObj.checkValidity()) {
		document.getElementById("error").innerHTML = inpObj.validationMessage;
		
		//clear previous display
		document.getElementById("pname").innerHTML = "";
		document.getElementById("pmail").innerHTML = "";
		document.getElementById("pphone").innerHTML = "";
	} else{
		//passing phone number to AJAX
		getRecordByPhoneNum(inpObj.value, processPatientData);		// passing phone number to AJAX
	} 
}



/**
*  connect to database server, call php file to retrieve patient record in JSON format
**/
function getRecordByPhoneNum(phonenum, callback) {

	$.ajax({
			url: 'http://98.217.116.98/retrieve_user_details.php',
			type: "POST", 
			data: {phonenum: phonenum},	// use phone numer as the key to query
			dataType: "json",
			success: function(response){

			// send the response (JSON) to the callback
				callback(response);
				},
			error: function () {

				document.getElementById("error").innerHTML = "Patient not found";
				
				//clear previous display
				document.getElementById("pname").innerHTML = "";
				document.getElementById("pmail").innerHTML = "";
				document.getElementById("pphone").innerHTML = "";
			}
	});

};
		
		
		
function processPatientData(jsonObj) {
	
	let validPatient = jsonObj.result[0];		//	parse JSON object
	
	let verifiedPatient = SingletonPatient.getInstance(validPatient);	// 	get instance of Patient Object
	document.getElementById("error").innerHTML = "";	//Removes previous display
	verifiedPatient.displayPatientInfo();				//	display verified patient info
	verifiedPatient.savePatienInfo();					//	save patient info to prescOrder object
	
	if (jsonObj){	// if retrieving patient record sucessfully, then enable uploading option
		isValidPatient = true;
		if (getSelectPosition()) {
			
			document.getElementById("uploadimage").innerHTML = "Please upload prescription image, when done click SUBMIT";
			uploadPrescription();	// show upload prescription option
		} else {
			alert("Please select Pharmacy");
		}
	}
}



