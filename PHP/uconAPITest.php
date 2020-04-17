<?php

	//Sets the response type to json
	header('Content-Type: application/json');

	//Includes adodb library https://adodb.org/dokuwiki/doku.php
  require_once 'adodb5/adodb.inc.php';

//Database credentials
	$servername = "localhost";
	$username = "admin";
	$password = "password";
	$dbname = "ucon";
//Sets the connection type for the database and connects
  $driver = 'mysqli';
  $db = newAdoConnection($driver);
  $ADODB_FETCH_MODE = ADODB_FETCH_ASSOC;
  $db->connect('localhost','admin','password','ucon');

	//Grabs the current year
	//TODO Remove the minus one
	$year = date("Y") - 1;

	//If the user ID is supplied and is not empty, store the ID and displays the resulting schedule JSON from getUserEvents
	if(isset($_GET['user_id']) && $_GET['user_id']!=""){
		$userId = $_GET['user_id'];
		echo getUserEvents($userId);

	}


	// Method takes one parameter, UserID, and returns a JSON object of the user and their schedules
	function getUserEvents($userId){ // takes  the User ID
		//Database connection object and year
		global $db;
		global $year;

		//Grabs order information from database
    $sql = "SELECT s_subtype FROM ucon_order WHERE id_member = ? AND s_type = 'Ticket' AND id_convention = ?";
    $bindVars = array($userId, $year);
		$result = $db->execute($sql, $bindVars);


		//Create user object to store data
		$userObj = new stdClass();
		$userObj->userId = $userId;
		//Create schedule arrays
		$attendeeSchedule=array();
		$gamemasterSchedule=array();


		// This calls the getEventInfo for all events being attended and adds them to the array
		if ($result->recordCount() > 0) {
			//Iterate through the result and add the event info for each event into the schedule
			while($row = $result->fetchRow()) {
				$event = $row["s_subtype"];
				array_push($attendeeSchedule, getEventInfo((int)$event));
			}
		}

		// Finds all events for which the supplied user ID is GameMaster
    $sql = "SELECT id_event FROM ucon_event WHERE id_gm = ? AND id_convention = ? ORDER BY e_day, i_time ASC";
		$result = $db->execute($sql, $bindVars);



		// Iterate through result and grab event information
		if ($result->recordCount() > 0) {

			while($row = $result->fetchRow()) {
				$event = $row["id_event"];
				array_push($gamemasterSchedule, getEventInfo((int)$event));
			}

		}

		//Bundles and returns the json object
		$userObj->eventYear = $year;
		$userObj->attendeeSchedule = $attendeeSchedule;
		$userObj->gamemasterSchedule = $gamemasterSchedule;

		return json_encode($userObj);



	}


	//Takes one parameter, eventID, and returns an object with event information
	function getEventInfo($eventId){
		global $db;
		//Select relevant fields from database given the event ID
    $sql = "SELECT s_title, s_game, i_time, e_day, id_room, s_table, s_desc, i_maxplayers, e_exper, e_complex, i_length, id_gm FROM ucon_event WHERE id_event = ?";
    $result = $db->execute($sql, $eventId);

		//Create a basic object to store the data
		$eventObj = new stdClass();


			//Bind each of the values from the result into a single object
			$row = $result->fetchRow();
				$eventObj->eventId = $eventId;
				$eventObj->title = $row["s_title"];

				$eventObj->game = $row["s_game"];

				$eventObj->day = $row["e_day"];
				$eventObj->time = $row["i_time"];
				$eventObj->length = $row["i_length"];

				$eventObj->complex = $row["e_complex"];
				$eventObj->room = $row["id_room"];
				$eventObj->table = $row["s_table"];
				$eventObj->maxPlayers = $row["i_maxplayers"];
				$eventObj->experience = $row["e_exper"];
				$eventObj->descLong = $row["s_desc"];
				$eventObj->gmName = getGameMasterName($row["id_gm"]);

				// make sure its not table


		return $eventObj;
	}

//Takes on parameter, GM ID, and returns the first and last name of the user with the given ID
function getGameMasterName($id_gm){
  global $db;
  $sql = "SELECT s_fname, s_lname FROM ucon_member WHERE id_member = ?";
  $result = $db->execute($sql, $id_gm);
  $row = $result->fetchRow();




    $name = $row["s_fname"]." ".$row["s_lname"];

  return $name;

}




?>
