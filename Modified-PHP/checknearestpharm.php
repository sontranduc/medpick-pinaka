<?php
header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access

 require_once('dbconnect.php');
 
 if($_SERVER['REQUEST_METHOD']=='POST') {
 
    //$repname = $_POST['repname'];
    
    $sql = "SELECT user_mail,business_name,busin_addr,busin_city,busin_state,busin_zip,busin_phone,location_latitude,location_longitude FROM wholesale_users_table WHERE business_type = 'Pharmacy' AND location_latitude != 'No Lat'";
     
    $res = mysqli_query($con,$sql);
    $result = array();
    
    if (mysqli_num_rows($res) > 0) {
          while($row=mysqli_fetch_array($res))
       {
        array_push($result,array('pharmemail'=>$row['user_mail'],'pharmname'=>$row['business_name'],'pharmaddr'=>$row['busin_addr'],'pharmcity'=>$row['busin_city'],'pharmzip'=>$row['busin_zip'],'pharmstate'=>$row['busin_state'],'pharmphone'=>$row['busin_phone'],'loclat'=>$row['location_latitude'],'loclng'=>$row['location_longitude']));
       }
      echo json_encode(array("result"=>$result));
    }
    else
    {
        echo 'No Pharmacy';
    }

 }			
mysqli_close($con);

?>