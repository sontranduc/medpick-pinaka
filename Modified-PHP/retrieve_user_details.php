<?php
 header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
 
 /**
 *	I have modified some codes to fit in our project
 **/
 require_once('dbconnect.php');
 
 if($_SERVER['REQUEST_METHOD']=='POST') {
     
     //$userId = $_POST['userid'];
     //$newtoken = $_POST['user_token'];
     
     //$tokensql = "UPDATE prescription_customer_details SET custom_token ='$newtoken' WHERE customer_phone = $phoneNum";
	 $phoneNum = $_POST['phonenum'];
	 
     
     $sql = "SELECT customer_id,customer_name,customer_email,customer_phone, custom_token FROM prescription_customer_details WHERE customer_phone = $phoneNum";
				
		//if(mysqli_query($con,$tokensql)) {
			$res = mysqli_query($con,$sql);
		//}
     
    $result = array();

    if (mysqli_num_rows($res) > 0) {
      while($row = mysqli_fetch_array($res))
        {
            array_push($result,array('user_id'=>$row['customer_id'],'user_name'=>$row['customer_name'],'user_mail'=>$row['customer_email'],'user_phone'=>$row['customer_phone'],'user_token'=>$row['custom_token']));
        }
        echo json_encode(array("result"=>$result));
    }
    else
    {
        echo 'No Details';
    }
}			
mysqli_close($con);

?>