from cyclecal.google_auth import get_calendar_service

TIME_MIN = "2027-01-01T00:00:00Z"
TITLE = "Folga"

def main():
    service = get_calendar_service()

    events = []
    page_token = None

    while True:
        resp = service.events().list(
            calendarId="primary",
            timeMin=TIME_MIN,
            singleEvents=True,
            orderBy="startTime",
            maxResults=2500,
            pageToken=page_token,
        ).execute()

        events.extend(resp.get("items", []))
        page_token = resp.get("nextPageToken")
        if not page_token:
            break

    folgas = [
        e for e in events
        if TITLE.lower() in e.get("summary", "").lower()
    ]

    print(f"🔎 Folgas a partir de 2027 encontradas: {len(folgas)}\n")
    for e in folgas:
        start = e["start"].get("date") or e["start"].get("dateTime")
        cal = e.get("organizer", {}).get("displayName", "desconhecido")
        print(f"- {start} | {e.get('summary')} | id={e['id']} | cal={cal}")

if __name__ == "__main__":
    main()

