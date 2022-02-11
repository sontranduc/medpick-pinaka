<?php
	header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$customId = $_POST['customId'];
		$customName = $_POST['customName'];
        $email = $_POST['email'];
		$phone = $_POST['phone'];
		$password = $_POST['password'];
		$customtoken = $_POST['custom_token'];

		require_once('dbconnect.php');
		
		$sql = "INSERT INTO prescription_customer_details(customer_id,customer_name,customer_email,customer_phone,customer_password,custom_token) VALUES 
('$customId','$customName','$email','$phone','$password','$customtoken')";
				
		if(mysqli_query($con,$sql)) {
			echo "Successfully Registered";
		}else{
			echo "Could not register";
		}
	}else{
echo 'error';
}
?>