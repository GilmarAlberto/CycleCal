from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import datetime, timezone
import os

SCOPES = ["https://www.googleapis.com/auth/calendar"]

def load_calendar_id():
    with open("CYCLECAL_CALENDAR_ID.txt", "r") as f:
        return f.read().strip()

def main():
    creds = Credentials.from_authorized_user_file("credentials/token.json", SCOPES)
    service = build("calendar", "v3", credentials=creds)

    calendar_id = load_calendar_id()

    now = datetime.now(timezone.utc).isoformat()

    events_result = service.events().list(
        calendarId=calendar_id,
        timeMin=now,
        singleEvents=True,
        orderBy="startTime"
    ).execute()

    events = events_result.get("items", [])

    if not events:
        print("📭 Nenhum evento encontrado no calendário CycleCal.")
        return

    print(f"📅 Eventos encontrados ({len(events)}):\n")

    for event in events:
        start = event["start"].get("dateTime", event["start"].get("date"))
        print(f"- {start} | {event.get('summary')} | id={event['id']}")

if __name__ == "__main__":
    main()

