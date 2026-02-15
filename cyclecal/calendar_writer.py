from datetime import date
from cyclecal.google_auth import get_calendar_service


def event_exists(service, event_date: date) -> bool:
    start = event_date.isoformat()
    end = (event_date).isoformat()

    events = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=start + "T00:00:00Z",
            timeMax=end + "T23:59:59Z",
            singleEvents=True,
        )
        .execute()
        .get("items", [])
    )

    for event in events:
        if event.get("summary") == "Folga":
            return True

    return False


def create_folga_event(service, event_date: date):
    if event_exists(service, event_date):
        print(f"⏭️  Já existe folga em {event_date}")
        return

    event = {
        "summary": "Folga",
        "description": "Criado pelo CycleCal",
        "start": {"date": event_date.isoformat()},
        "end": {"date": event_date.isoformat()},
    }

    service.events().insert(calendarId="primary", body=event).execute()
    print(f"✅ Folga criada em {event_date}")

