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
		die("Connenction to database failed. Error: ".$conn->connect_error);
	}
	
	
	
	// A method that finds all events being attended and hosted by user
	function getUserEvents($userId, $year){ // takes 2 variables, the User ID and the Year of the convention
		global $conn;
		// finding all of the tickets purchased for games by user id
		$sql = "SELECT s_subtype FROM ucon_order WHERE id_member = '$userId' AND s_type = 'Ticket' AND id_convention = '$year'";
		$result = mysqli_query($conn, $sql);
			
			
		// This calls the getEventInfo for all events being attended
		if (mysqli_num_rows($result) > 0) {
			echo "<b>List of $userId's $year events that they are attending: <br><br></b>";
			while($row = mysqli_fetch_assoc($result)) {
				$event = $row["s_subtype"];
				getEventInfo((int)$event);
			}
		
		}
		else{
		echo "No events listed for $userId in $year";}
		// Finding all of the games being ran by the userId
		$sql = "SELECT id_event FROM ucon_event WHERE id_gm = '$userId' AND id_convention = '$year'";
		$result = mysqli_query($conn, $sql);
		// Same loop that instead runs the event id's that the User is running
		if (mysqli_num_rows($result) > 0) {
			echo "<b>List of $userId's $year events that they are Game Master of: <br><br></b>";
			while($row = mysqli_fetch_assoc($result)) {
				$event = $row["id_event"];
				getEventInfo((int)$event);
			}
		
		}
		
	}
		
		
	//Return event information given the event id
	function getEventInfo($eventId){
		global $conn;
		$sql = "SELECT s_title, i_time, e_day, id_room, s_table FROM ucon_event WHERE id_event = ".$eventId;
		// I added a day to be displayed for the event.
		$result = mysqli_query($conn, $sql);
		
		if (mysqli_num_rows($result) > 0) {
			
			while($row = mysqli_fetch_assoc($result)) {
				$eventObj->title = $row["s_title"];
				$eventObj->day = $row["e_day"];
				$eventObj->time = $row["i_time"];
				$eventObj->room = $row["id_room"];
				$eventObj->table = $row["s_table"];
				
				//echo "Game: " . $row["s_title"]. "<br>Day: ".$row["e_day"]. " <br> Time: " . $row["i_time"]. "<br> Room " . $row["id_room"]. "<br>Table ". $row["s_table"] . "<br><br>";
				$eventJSON = json_encode($eventObj);
				echo $eventJSON;
			}
		} else {
			echo "0 results";
			}
		
		
	}

?>

</head>


<body>
<?php

	getUserEvents(5469, 2019);
?>


</body>



</html>
