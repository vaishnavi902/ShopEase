<?php
$database_host ='localhost';
$database_user = 'root';
$database_password = '';
$database_name = 'Shopease';

$conn = new mysqli($database_host,$database_user,$database_password,$database_name);
if($conn->connect_error){
    die("DB connection Failed:" .$conn->connect_error);
}

echo "connected Sucessfully!!";
?>
