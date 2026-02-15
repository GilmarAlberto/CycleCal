from cyclecal.google_auth import get_calendar_service

TIME_MIN = "2027-01-01T00:00:00Z"
TITLE = "Folga"


def main():
    service = get_calendar_service()

    events = []
    page_token = None

    # Buscar todos os eventos a partir de 2027
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

    # Filtrar apenas eventos "Folga"
    folgas = [
        e for e in events
        if TITLE.lower() in e.get("summary", "").lower()
    ]

    print(f"🧹 Apagando {len(folgas)} folgas a partir de 2027...\n")

    for e in folgas:
        start = e["start"].get("date") or e["start"].get("dateTime")

        service.events().delete(
            calendarId="primary",
            eventId=e["id"]
        ).execute()

        print(f"❌ Apagada: {start}")

    print("\n✅ Limpeza concluída.")


if __name__ == "__main__":
    main()

