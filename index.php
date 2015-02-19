<!DOCTYPE html>

<html>
<head>
<title>Javascript Captcha</title>
<style type="text/css">
body {
font-family: helvetica;
font-size:12px;	
}
h1 {
  font-family: helvetica;
  font-size:14px;
  color: #2c89ff;
}

</style>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>

</head>
<body>
<?php
if ($_POST['checker']=="1") echo "Form was submitted!";
else echo "Invalid CAPTCHA code!";
?>


<h1>Fill in the form</h1>

<form method="POST" action="index.php">
Name: <input type="text" name="name"><br>
Email: <input type="text" name="name"><br>
<br>
<!-- Start CAPTCHA code -->
<div id="captcha">
	<script src="captcha.js"></script>
	<noscript>
		<input type="hidden" name="checker" value="2">
		Your browser doesn't support Javascript. The form will not be submitted!
	</noscript>
</div>
<!-- end CAPTCHA code -->
<br>
<input type="submit" name="Send" value="GO">

<!-- The next line is required, may be added via the .js file in the future -->
<input type="hidden" id="checker" name="checker" value="10">

</form>
<br><br>
Text line <br>
Text line <br>
Text line <br>
Text line <br>
</body>
</html>