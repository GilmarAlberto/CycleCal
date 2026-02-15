from datetime import datetime
from cyclecal.google_auth import get_calendar_service


def list_next_events(max_results=10):
    service = get_calendar_service()

    now = datetime.utcnow().isoformat() + "Z"
    events_result = service.events().list(
        calendarId="primary",
        timeMin=now,
        maxResults=max_results,
        singleEvents=True,
        orderBy="startTime",
    ).execute()

    events = events_result.get("items", [])

    if not events:
        print("Nenhum evento encontrado.")
        return

    for event in events:
        start = event["start"].get("dateTime", event["start"].get("date"))
        print(start, "-", event.get("summary", "(sem título)"))


if __name__ == "__main__":
    list_next_events()

