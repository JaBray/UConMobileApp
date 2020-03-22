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
	//TODO Remove the minus one
	$year = date("Y") - 1;

	//Kill connection in case of error and print error message
	if($conn->connect_error){
		die("Connenction to database failed. Error: ".$conn->connect_error);
	}
	
	
	
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
			getUserEvents($_POST['userID'], 2019);
		
	}





	
	
	
	
	// A method that finds all events being attended and hosted by user
	function getUserEvents($userId){ // takes  the User ID 
		global $conn;
		global $year;
		// finding all of the tickets purchased for games by user id
		$stmt = $conn->prepare("SELECT s_subtype FROM ucon_order WHERE id_member = ? AND s_type = 'Ticket' AND id_convention = ?");
		$stmt->bind_param("ss", $userId, $year);
		$stmt->execute();
		$result = $stmt->get_result();
			
			
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
		$stmt = $conn->prepare("SELECT id_event FROM ucon_event WHERE id_gm = ? AND id_convention = ? ORDER BY e_day, i_time ASC");
		$stmt->bind_param("ss", $userId, $year);
		$stmt->execute();
		$result = $stmt->get_result();
		
		
		
		// Same loop that instead runs the event id's that the User is running
		if (mysqli_num_rows($result) > 0) {
			echo "<b> List of $userId's $year events that they are Game Master of: <br><br></b>";
			while($row = mysqli_fetch_assoc($result)) {
				$event = $row["id_event"];
				getEventInfo((int)$event);
			}
		
		}
		
	}
		
		
	//Return event information given the event id
	function getEventInfo($eventId){
		global $conn;
		
		$stmt = $conn->prepare("SELECT s_title, i_time, e_day, id_room, s_table FROM ucon_event WHERE id_event = ? ORDER BY e_day, i_time ASC");
		$stmt->bind_param("s",$eventId);
		$stmt->execute();
		$result = $stmt->get_result();
		
		// I added a day to be displayed for the event.
	
		$eventObj = new stdClass();
		if (mysqli_num_rows($result) > 0) {
			
			while($row = mysqli_fetch_assoc($result)) {
				$eventObj->title = $row["s_title"];
				$eventObj->day = $row["e_day"];
				$eventObj->time = $row["i_time"];
				$eventObj->room = $row["id_room"];
				$eventObj->table = $row["s_table"];
				
				$eventJSON = json_encode($eventObj);
				echo $eventJSON."<br>";
			}
		} else {
			echo "0 results";
			}
		
		
	}

?>

</head>


<body>
	<button onclick="goBack()">Go Back</button>
</body>



</html>