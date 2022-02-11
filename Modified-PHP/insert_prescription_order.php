<?php
	header('Access-Control-Allow-Origin: *');  // I added this line to make sure everyone can access
    include_once ("./socketlabs-php/InjectionApi/src/includes.php");
        
    use Socketlabs\SocketLabsClient;
    use Socketlabs\Message\BasicMessage;
    use Socketlabs\Message\EmailAddress;
        
    use PHPMailer\PHPMailer\PHPMailer;
	require_once('dbconnect.php');
		//include 'dbconnect.php';

	if($_SERVER['REQUEST_METHOD']=='POST') {

        $invoiceno = $_POST['invoice_no'];
		$customid = $_POST['custom_id'];
		$customname = $_POST['custom_name'];
		$customemail = $_POST['custom_email'];
		$customphone = $_POST['custom_phone'];
		$customepres = $_POST['custom_pres'];
		$pharmname = $_POST['pharma_name'];
		$pharmaddr = $_POST['pharma_addr'];
		$pharmemail = $_POST['pharma_email'];
		$pharmphone = $_POST['pharma_phone'];
		$orderdate = $_POST['order_date'];
		$ordertime = $_POST['order_time'];
		$tokenno = $_POST['token_no'];
		
		$customepres = base64_decode($customepres); 
		$source_img = imagecreatefromstring($customepres);
		$rotated_img = imagerotate($source_img, 0, 0);
		$imagename = $invoiceno.'.jpeg';
		$file_dest = 'presimages/'. $imagename;
		$imageSave = imagejpeg($rotated_img, $file_dest, 100);
		imagedestroy($source_img);
		
		$file_url = 'http://98.217.116.98/'.$file_dest;
		
		$sql = "INSERT INTO prescription_order_consumer(prescription_order_no,customer_id,customer_name,customer_email,customer_phone,presc_image,order_date,order_time,token_no,pharm_name,pharm_email,pharm_phone,pharm_addr,order_status,reason_for) VALUES ('$invoiceno','$customid','$customname','$customemail','$customphone','$file_url','$orderdate','$ordertime','$tokenno','$pharmname','$pharmemail','$pharmphone','$pharmaddr','Processing','No Reason')";
				
    	if(mysqli_query($con,$sql)) {
    	    //sentemail($customname,$customemail,$pharmemail,$invoiceno);
    	    //sendEmail($customname,$customemail,$pharmemail,$invoiceno);
    		//sentsmstopharmacy($pharmphone,$customname,$pharmemail);
    		sendNotification($pharmemail);
    		echo "ordered";
    	}	
		else {
			echo "order error";
		}
	}
	
	else {
		echo 'error';
	}
	
 	function sentemail($customname,$customemail,$pharmemail,$invoiceno) {

    include_once "PHPMailer/PHPMailer.php";
    include_once "PHPMailer/Exception.php";

	$content = 'Dear Pharmacist, '.$customname.' Placed a order in your pharmacy.Please check Medpick App';

        $email = new PHPMailer();
        $email->From      = 'support@medpick.in';
        $email->FromName  = 'Medpick Support';
        $email->Subject   = 'Medpick Prescription Order';
        $email->Body      = $content;
        
        $email->AddAddress(''.$pharmemail.'','Pharmacy');
        $email->AddCC(''.$customemail.'','Customer');
        $email->AddCC('meganathan@medpick.in','Medpick');

        $imagename = $invoiceno.'.jpeg';
        $file = 'presimages/'.$imagename;
        
        $email->AddAttachment( $file, $imagename);
        
        return $email->Send();
   }
   
   function sendEmail($customname,$customemail,$pharmemail,$invoiceno) {
        
        $client = new SocketLabsClient(24081, "Re2w4PJt89EfLx36MiDk");
        
        $message = new BasicMessage(); 
        $message->subject = "New Prescription Order from Medpick";
        $message->htmlBody = "<html>Dear Pharmacist,<br> Medpick customer Placed a prescription order in your pharmacy.Please check Medpick Wholesale App</html>";
        
        $message->from = new EmailAddress("support@medpick.in");
        $message->replyTo = new EmailAddress("support@medpick.in");
        
        $message->addToAddress($pharmemail);  
        $message->addCcAddress("meganathan@medpick.in", "Medpick Team");
        
        $imagename = $invoiceno.'.jpeg';
        $file = '/presimages/'.$imagename;
        
        
        //$message->attachments[] = $file;
        
        $response = $client->send($message);
    }
   
   function sentsmstopharmacy($pharmacynumber,$customname,$pharmemail)
    {
    	$mobile = "91".$pharmacynumber;
    	
    	$message= "Hi,+You+have+receieved+one+prescription+order.+please+check+your+email(+".$pharmemail."+)+or+Medpick+app";
    	$ch = curl_init();
    
    	curl_setopt($ch, CURLOPT_URL, "http://sms.datagenit.com/api.php?username=prowide&password=9035000041&sender=MEDPIC&sendto=".$mobile."&message=".$message);
    	curl_setopt($ch, CURLOPT_HEADER, 0);
    	curl_exec($ch);
    	curl_close($ch);
    }
    
    function sendNotification($pharmemail) {
    
    $servername = "localhost";
     $username = "medpifkd_medpick";
     $password = "umassboston123"; //"medpick2017";
     $databasename = "pinaka"; //"medpifkd_medpickwholesale";
    
         $conn = new PDO("mysql:host=$servername;dbname=$databasename", $username, $password);
         // set the PDO error mode to exception
         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     define( 'API_ACCESS_KEY', 'AAAA3KoVL-8:APA91bFNHBaVEfsx7X4VYnvU4veNwANbqsPUNEA692LzIU9xiswNoUI33zs65WY5vpIsakwqjjkfxUF3-yuMuN8XPU4keS1GzHur1QsqCNNc9vCOHOBhRprzIR17Wv2yvCOzjTHW99V1' );
    
     $sql = "SELECT user_token FROM wholesale_users_table WHERE user_mail ='$pharmemail' ";
    
    // $sql = " SELECT token FROM tokentable";
    
     $resultt = $conn->prepare($sql);
     $resultt->execute();
    
     $token = array();
    
     if ($resultt->rowCount()>0) 
     {
        while($row =$resultt->fetch())
           {
             $token[]=$row["user_token"]; 
            // echo $row["token"];  
      }
     }
    
     var_dump($token);
    
     $title = "Medpick Wholesale Team";
     $notification = "One Customer Placed a order. please check Medpick Wholesale app";
    
     $msg =
     [
        'message'   => $notification,
        'title'   => $title
     ];
    
     $fields = 
     [
        'registration_ids'  => $token,
        'data'      => $msg
     ];
     
     $headers = 
     [
       'Authorization: key=' . API_ACCESS_KEY,
       'Content-Type: application/json'
     ];
    
     $ch = curl_init();
     curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
     curl_setopt( $ch,CURLOPT_POST, true );
     curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
     curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
     curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
     curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
     $result = curl_exec($ch );
     curl_close( $ch );
    
    }


?>