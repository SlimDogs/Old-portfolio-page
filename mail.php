<?php
if ((isset($_POST["message"]) && !empty($_POST["message"])) && (isset($_POST["name"]) && !empty($_POST["name"])) && (isset($_POST["email"]) && !empty($_POST["email"]))) {
	$to = "tautvydasuk@gmail.com";
	$subject = "Gudr.us contact message from " . $_POST['name'];
	$message = $_POST['name'] . " contacted you using http://gudr.us contact form:\r\n\r\n" . $_POST['message'] . "\r\n\r\nSenders email: " . $_POST['email'];

	if (mail($to,$subject,$message,"From: contact@gudr.us")) { echo "201"; }
	else { echo "Fail"; }
}
else { echo "Are you serious?"; }
?>