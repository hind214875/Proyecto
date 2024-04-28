<?php
require_once "../config/database.php"; // Adjust the path as necessary for your project
require_once "../models/User.php"; // Adjust the path as necessary for your project

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Set properties for a new user
$user->nombre = "Test User";
$user->Email = "test@example.com";
$user->password = "password123";
$user->tipo = "client";

// Attempt to create a new user
if ($user->create()) {
    echo "User created successfully.";
} else {
    echo "User could not be created.";
}