<?php
// Set response headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow requests from all origins
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Disable PHP warnings or notices in JSON output
error_reporting(0);
ini_set('display_errors', 0);

// Get raw JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Check if JSON was decoded
if (!$input) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}

// Extract values
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$role = trim($input['role'] ?? '');

// Validate input
if (empty($name) || empty($email) || empty($password) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$database_host ='localhost';
$database_user = 'root';
$database_password = '';
$database_name = 'Shopease';

$conn = new mysqli($database_host,$database_user,$database_password,$database_name);
if($conn->connect_error){
    die("DB connection Failed:" .$conn->connect_error);
}


// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $hashed_password, $role);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
}

$stmt->close();
$conn->close();
?>
