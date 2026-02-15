from cyclecal.google_auth import get_calendar_service

TITLE = "Folga"
TIME_MIN = "2025-02-01T00:00:00Z"


def delete_from_calendar(calendar_id: str, label: str):
    service = get_calendar_service()

    events = []
    page_token = None

    while True:
        resp = service.events().list(
            calendarId=calendar_id,
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

    print(f"\n🧹 {label}: {len(folgas)} folgas encontradas a partir de 01/02/2025")

    for e in folgas:
        start = e["start"].get("date") or e["start"].get("dateTime")
        service.events().delete(
            calendarId=calendar_id,
            eventId=e["id"]
        ).execute()
        print(f"❌ Apagada: {start}")

    print(f"✅ Limpeza concluída em {label}")


def main():
    # Calendário principal
    delete_from_calendar(
        calendar_id="primary",
        label="Calendário principal"
    )

    # Calendário CycleCal
    with open("CYCLECAL_CALENDAR_ID.txt") as f:
        cyclecal_id = f.read().strip()

    delete_from_calendar(
        calendar_id=cyclecal_id,
        label="Folgas – CycleCal"
    )


if __name__ == "__main__":
    main()

