<?php
 header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
 require_once('dbconnect.php');
 
 if($_SERVER['REQUEST_METHOD']=='POST') {
 
    $customerphone = $_POST['phonenum']; //['customer_id'];
 
	$sql = "SELECT * FROM prescription_order_consumer WHERE customer_phone ='$customerphone'";
         
    $res = mysqli_query($con,$sql);
    $result = array();

    if (mysqli_num_rows($res) > 0) {
          while($row=mysqli_fetch_array($res))
       {
        array_push($result,array('customer_name'=>$row['customer_name'],'pharmacy_name'=>$row['pharm_name'],'pharmacy_address'=>$row['pharm_addr'],'prescription_image'=>$row['presc_image'],'order_status'=>$row['order_status'],'order_date'=>$row['order_date'],'order_time'=>$row['order_time'],'pharm_phone'=>$row['pharm_phone'],'presc_order_no'=>$row['prescription_order_no']));
       } 
      echo json_encode(array("result"=>$result));
    }
    else
    {
    echo 'No Orders';
    }
    
     }			
    mysqli_close($con);

?>