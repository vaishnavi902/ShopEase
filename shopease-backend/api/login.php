<?php
error_reporting(0);
ini_set('display_errors', 1);               //to connect with server
ini_set('display_startup_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,OPTIONS");     //To connect backend
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];
$role = $data['role'];

// Connect to database (adjust credentials)
$conn = new mysqli("localhost", "root", "", "shopease_db");

if ($conn->connect_error) {
    echo json_encode(["status"=>"error","message"=>"Database connection failed"]);
    exit;
}

// Check user
$sql = "SELECT * FROM users WHERE email=? AND password=? AND role=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $email, $password, $role);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()){
    if(password_verify($password, $row['password'])){
        echo json_encode(["status"=>"success","message"=>"Login successful"]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Invalid credentials"]);
    }
} else {
    echo json_encode(["status"=>"error","message"=>"User not found"]);
}

$stmt->close();
$conn->close();
?>
