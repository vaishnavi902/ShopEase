<?php
header("Access-control-allow-origin: *");
header("Access-control-allow-headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");
$data = json_decode(file_get_contents("php://input"));

$email = $data->email ?? null;
$password = $data->password ?? null;

if(!$email || !$password){
    echo json_encode(["status"=>"error", "message"=>"Missing fields"]);
    exit;
}

$sql = "select * from users where email=? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$email);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()){
    //verify hashed password
    if(password_verify($password,$row["password"])){
    echo json_encode([
        "status"=>"success",
        "users"=>[
            "id"=>$row["id"],
            "name"=>$row["name"],
            "email"=>$row["email"],
            "role"=>$row["role"]
        ]
    ]);
}else{
    echo json_encode(["status"=>"error", "message"=>"Invalid credentials"]);
    }
}else{
    echo json_encode(["status"=> "error", "messgae"=> "Invalid Credentials"]);
}

$stmt->close();
$conn->close();
?>
