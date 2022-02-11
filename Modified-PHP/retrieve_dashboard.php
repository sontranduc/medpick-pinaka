<?php
	header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
    require_once('dbconnect.php');
 
    if($_SERVER['REQUEST_METHOD']=='POST') {

    $passWord = $_POST['pass_word'];

    $sql = "SELECT * FROM pinaka_dashboard WHERE secret_word = '$passWord'";
    
    $res = mysqli_query($con,$sql);
    $result = array();

 
    if (mysqli_num_rows($res) > 0) {
          while($row=mysqli_fetch_array($res))
       {
        array_push($result,array('blink'=>$row['banner_data'],'bimg'=>$row['banner_link'],'pone'=>$row['prod_one'],'ptwo'=>$row['prod_two'],'pthree'=>$row['prod_three'],'pfour'=>$row['prod_four'],'poname'=>$row['prod_one_name'],'ptwname'=>$row['prod_two_name'],'pthname'=>$row['prod_three_name'],'pfname'=>$row['prod_four_name'],'polink'=>$row['prod_one_link'],'ptlink'=>$row['prod_two_link'],'pthlink'=>$row['prod_three_link'],'pflink'=>$row['prod_four_link']));
       }
      echo json_encode(array("result"=>$result));
    }
    else
    {
        echo 'No Images';
    }
 }		
mysqli_close($con);

?>