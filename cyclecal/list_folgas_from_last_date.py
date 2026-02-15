from cyclecal.google_auth import get_calendar_service

TIME_MIN = "2056-01-09T00:00:00Z"
TITLE = "Folga"


def main():
    service = get_calendar_service()

    events = []
    page_token = None

    while True:
        response = service.events().list(
            calendarId="primary",
            timeMin=TIME_MIN,
            singleEvents=True,
            orderBy="startTime",
            maxResults=2500,
            pageToken=page_token,
        ).execute()

        events.extend(response.get("items", []))
        page_token = response.get("nextPageToken")

        if not page_token:
            break

    folgas = [
        e for e in events
        if TITLE.lower() in e.get("summary", "").lower()
    ]

    print(f"🔎 Folgas encontradas a partir de 2056-01-09: {len(folgas)}\n")

    for e in folgas:
        start = e["start"].get("date") or e["start"].get("dateTime")
        print(f"- {start} | {e.get('summary')} | id={e['id']}")

    if not folgas:
        print("✅ Nenhuma folga encontrada. Calendário limpo.")


if __name__ == "__main__":
    main()

