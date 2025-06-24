<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "arno.van.steenbergen1@gmail.com"; 
  $subject = "New Form Submission";
  $body = "Name: " . $name . "\nEmail: " . $email . "\nMessage:\n" . $message;
  $headers = "From: " . $email;

  if (mail($to, $subject, $body, $headers)) {
    echo "Email sent successfully!";
  } else {
    echo "Email sending failed.";
  }
}
?>