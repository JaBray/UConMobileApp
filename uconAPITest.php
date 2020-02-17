<!DOCTYPE html>
<html>
<head>
<?php
	$servername = "localhost";
	$username = "admin";
	$password = "password";
	$dbname = "ucon";

	//Create connection to database using provided inputs
	$conn = new mysqli($servername, $username,$password,$dbname);

	//Kill connection in case of error and print error message
	if($conn->connect_error){
		die("Connenction failed. Error: ".$conn->connect_error);
	}

	//Return event information given the event id
	function getEventInfo($eventId){
		global $conn;
			$sql = "SELECT s_title, i_time, id_room, s_table FROM ucon_event WHERE id_event = ".$eventId;
		$result = mysqli_query($conn, $sql);
		
		
		
		
		if (mysqli_num_rows($result) > 0) {
			// output data of each row
			while($row = mysqli_fetch_assoc($result)) {
				echo "Name: " . $row["s_title"]. " <br> Time: " . $row["i_time"]. "<br> Room " . $row["id_room"]. "Table ". $row["s_table"];
			}
		} else {
			echo "0 results";
			}
		
		
	}


getEventInfo(6137);
?>

</head>


<body>

</body>



</html>
