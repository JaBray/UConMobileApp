<?php
	
	//Sets the response type to json
	header('Content-Type: application/json');

//Database credentials
//TODO replace with adoDB creds
	$servername = "localhost";
	$username = "admin";
	$password = "password";
	$dbname = "ucon";

	//Create connection to database using provided inputs
	$conn = new mysqli($servername, $username,$password,$dbname);
	//Grabs the current year
	//TODO Remove the minus one
	$year = date("Y") - 1;

	//Kill connection in case of error and print error message
	if($conn->connect_error){
		die("Connenction to database failed. Error: ".$conn->connect_error);
	}

	//If the user ID is supplied and is not empty
	if(isset($_GET['user_id']) && $_GET['user_id']!=""){
		$userId = $_GET['user_id'];
		getUserEvents($userId);
			
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
			
			
		//Create user object to store data
		$userObj = new stdClass();
		$userObj->userId = $userId;
		//Create schedule arrays
		$attendeeSchedule=array();
		$gamemasterSchedule=array();
			
			
		// This calls the getEventInfo for all events being attended and adds them to the array
		if (mysqli_num_rows($result) > 0) {
			
			while($row = mysqli_fetch_assoc($result)) {
				$event = $row["s_subtype"];
				array_push($attendeeSchedule, getEventInfo((int)$event));
			}
		}
		
		// Finding all of the games being ran by the userId
		$stmt = $conn->prepare("SELECT id_event FROM ucon_event WHERE id_gm = ? AND id_convention = ? ORDER BY e_day, i_time ASC");
		$stmt->bind_param("ss", $userId, $year);
		$stmt->execute();
		$result = $stmt->get_result();
		
		
		
		// Same loop that instead runs the event id's that the user is running and adds them to the array
		if (mysqli_num_rows($result) > 0) {
	
			while($row = mysqli_fetch_assoc($result)) {
				$event = $row["id_event"];
				array_push($gamemasterSchedule, getEventInfo((int)$event));
			}
		
		}
		
		//Creates and echoes the json object
		$userObj->eventYear = $year;
		$userObj->attendeeSchedule = $attendeeSchedule;
		$userObj->gamemasterSchedule = $gamemasterSchedule;
		
		echo json_encode($userObj);
		
		
		
	}
		
		
	//Return event information object given the event id
	function getEventInfo($eventId){
		global $conn;
		
		$stmt = $conn->prepare("SELECT s_title, i_time, e_day, id_room, s_table FROM ucon_event WHERE id_event = ? ORDER BY e_day, i_time ASC");
		$stmt->bind_param("s",$eventId);
		$stmt->execute();
		$result = $stmt->get_result();
		
		
	
		$eventObj = new stdClass();
		if (mysqli_num_rows($result) > 0) {
			
			while($row = mysqli_fetch_assoc($result)) {
				$eventObj->eventId = $eventId;
				$eventObj->title = $row["s_title"];
				$eventObj->day = $row["e_day"];
				$eventObj->time = $row["i_time"];
				$eventObj->room = $row["id_room"];
				$eventObj->table = $row["s_table"];

			}
			
			
		} 
		return $eventObj;
	}

	


?>
