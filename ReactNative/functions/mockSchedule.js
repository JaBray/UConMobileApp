export function mockSchedule() {
  return {
    "players": [
      {
        "id_member": "2",
        "name": "Jane Doe",
        "events": [
          {
            /* I'm assuming the php team can return the follwing properties:
            title: for the game title
            day: for the day of the game
            time: for the start time of the game
            e_time: for the end time of the game
            s_fname & s_lname: for the GM name
            i_maxplayers: for the max number of seats
            e_exper: for the experience required in the game
            e_complex: for the complexity of the game
            e_day: for the day of the game
            s_room: for the room information
            */
            "title": "Empire Builder/Euorails",
            "id": 5,
            "day": "Friday",
            "time": "9AM",
            "tableNo": 0,
            "short": "This is the description that will go on the detail screen, it's actually fairly long and includes a lot of information.",
            "shorter": "This is the description for the summary screen that includes some information",
            "e_time": "12PM",
            "s_fname": "Puffing",
            "s_lname": "Billy",
            "i_maxplayers": 10,
            "e_exper": "No",
            "e_complex": "XP/Simple",
            "s_room": "Ballroom 317",
          },
          {
            "title": "Sentinels of the Multiverse",
            "id": 6,
            "day": "Friday",
            "time": "2pm",
            "tableNo": 7,
            "short": "game1",
            "shorter": "This is a short description for another game.",
            "e_time": "4PM",
            "s_fname": "Evans",
            "s_lname": "Collins",
            "i_maxplayers": 5,
            "e_exper": "No",
            "e_complex": "XP/Average",
            "s_room": "Ballroom 209",
          }
        ]
      },
      {
        "id_member": "151",
        "name": "Brother Bob",
        "events": [
          {
            "title": "Empire Builder/Eurorails",
            "id": 5,
            "day": "Friday",
            "time": "9AM",
            "tableNo": 7,
            "short": "game1",
            "shorter": "This description might be for another game or it might be for the same game Jane is going to.",
            "e_time": "12PM",
            "s_fname": "Puffing",
            "s_lname": "Billy",
            "i_maxplayers": 10,
            "e_exper": "No",
            "e_complex": "XP/Simple",
            "s_room": "Ballroom 317",
          }
        ]
      }
    ]
  }
}
