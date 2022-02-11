/**
**  send prescription to Medpick database by Ajax as an API
**/
function sendPrescription(){
	
	$.ajax({
		url: 'http://98.217.116.98/insert_prescription_order.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		type: "POST", 
		data: {
				"invoice_no": prescOrder.invoice_no,
				"custom_id": prescOrder.custom_id,
				"custom_name": prescOrder.custom_name,
				"custom_email": prescOrder.custom_email,
				"custom_phone": prescOrder.custom_phone,
				"custom_pres": prescOrder.custom_pres,
				"pharma_name": prescOrder.pharm_name,
				"pharma_addr": prescOrder.pharm_addr,
				"pharma_email": prescOrder.pharm_email,
				"pharma_phone": prescOrder.pharm_phone,
				"order_date": prescOrder.order_date,
				"order_time": prescOrder.order_time,
				"token_no": prescOrder.custom_token
				
				},
		dataType: "json",
		success: 
			
				window.alert("Prescription was successfully uploaded"),

		error: function () {

			console.log("if you see an error message, it was from php files");

		}
	});

};
	



		