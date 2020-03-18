export function mockSchedule() {
  return {
    "players": [
      {
        "id_member": "2",
        "name": "Jane Doe",
        "events": [
          {
            "id": 5,
            "day": "Friday",
            "time": 12,
            "tableNo": 0,
            "short": "This is the description that will go on the detail screen, it's actually fairly long and includes a lot of information.",
            "shorter": "This is the description for the summary screen that includes some information",
          },
          {
            "id": 6,
            "day": "Friday",
            "time": 12,
            "tableNo": 7,
            "short": "game1",
            "shorter": "This is a short description for another game.",
          }
        ]
      },
      {
        "id_member": "151",
        "name": "Brother Bob",
        "events": [
          {
            "id": 5,
            "day": "Friday",
            "time": 12,
            "tableNo": 7,
            "short": "game1",
            "shorter": "This description might be for another game or it might be for the same game Jane is going to.",
          }
        ]
      }
    ]
  }
}
