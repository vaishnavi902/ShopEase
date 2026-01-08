<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "shopease");

$data = json_decode(file_get_contents("php://input"), true);

$product_id = $data["product_id"];
$quantity = $data["quantity"];

$result = $conn->query("SELECT name, price, description FROM products WHERE id=$product_id");
$product = $result->fetch_assoc();

if ($product) {
    $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (1, ?, ?)");
    $stmt->bind_param("ii", $product_id, $quantity);
    $stmt->execute();
    echo json_encode(["status" => "success", "product" => $product]);
} else {
    echo json_encode(["status" => "error", "message" => "Product not found"]);
}
