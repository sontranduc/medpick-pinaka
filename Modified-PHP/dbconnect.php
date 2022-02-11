<?php
 define('HOST','localhost');
 define('PORT', '3306');
 define('USER','medpifkd_medpick');
 define('PASS','umassboston123');
 define('DB','pinaka');
 
 $con = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');

?>