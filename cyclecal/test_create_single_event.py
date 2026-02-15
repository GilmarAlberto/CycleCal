from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import date, timedelta

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def load_calendar_id():
    with open("CYCLECAL_CALENDAR_ID.txt", "r") as f:
        return f.read().strip()


def get_service():
    creds = Credentials.from_authorized_user_file(
        "credentials/token.json",
        SCOPES
    )
    return build("calendar", "v3", credentials=creds)


def main():
    service = get_service()
    calendar_id = load_calendar_id()

    # Evento de teste: amanhã
    event_date = date.today() + timedelta(days=1)

    event = {
        "summary": "Folga – Teste",
        "description": "Evento de teste criado pelo CycleCal",
        "start": {
            "date": event_date.isoformat(),
            "timeZone": "America/Sao_Paulo",
        },
        "end": {
            "date": event_date.isoformat(),
            "timeZone": "America/Sao_Paulo",
        },
    }

    created_event = service.events().insert(
        calendarId=calendar_id,
        body=event
    ).execute()

    print("✅ Evento criado com sucesso!")
    print(f"📅 Data: {event_date}")
    print(f"🆔 ID do evento: {created_event['id']}")


if __name__ == "__main__":
    main()   

