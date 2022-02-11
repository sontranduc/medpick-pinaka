<?php
	header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$customName = $_POST['customName'];
        $email = $_POST['email'];
		$phone = $_POST['phone'];
		$lat = $_POST['g_latitude'];
		$lng = $_POST['g_lngitude'];
		$rfor = $_POST['requestfor'];
		$reqdate = date('Y-m-d H:i:s');
		
		require_once('dbconnect.php');
		
		$sql = "INSERT INTO medpick_pharmacy_requests(customer_name,customer_email,customer_phone,glatitude,glongitude,request_for,date) VALUES ('$customName','$email','$phone','$lat','$lng','$rfor','$reqdate')";
				
		if(mysqli_query($con,$sql)) {
			echo "Successfully Registered";
		} else {
			echo "Could not register";
		}
	}else{
echo 'error';
}
?>