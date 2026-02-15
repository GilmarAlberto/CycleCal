from datetime import date
from dateutil.relativedelta import relativedelta

from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

from cyclecal.patterns import generate_cycle_dates

SCOPES = ["https://www.googleapis.com/auth/calendar"]

# =========================
# PARÂMETROS DE PRODUÇÃO
# =========================
START_DATE = date(2026, 2, 15)
MONTHS_AHEAD = 12
EVENT_TITLE = "Folga 💚"
TIMEZONE = "America/Sao_Paulo"

CYCLE_LENGTH = 3
ACTIVE_POSITIONS = [0]  # domingo sim, dois não


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

    end_date = START_DATE + relativedelta(months=MONTHS_AHEAD)

    folga_dates = generate_cycle_dates(
        base_date=START_DATE,
        months=MONTHS_AHEAD,
        cycle_length=CYCLE_LENGTH,
        active_positions=ACTIVE_POSITIONS
    )

    print(f"📅 Criando folgas de {START_DATE} até {end_date}\n")

    created = 0

    for d in folga_dates:
        if d < START_DATE or d > end_date:
            continue

        event = {
            "summary": EVENT_TITLE,
            "start": {
                "date": d.isoformat(),
                "timeZone": TIMEZONE,
            },
            "end": {
                "date": d.isoformat(),
                "timeZone": TIMEZONE,
            },
        }

        service.events().insert(
            calendarId=calendar_id,
            body=event
        ).execute()

        print(f"✅ Folga criada: {d}")
        created += 1

    print(f"\n🎉 Produção concluída. {created} folgas criadas.")


if __name__ == "__main__":
    main()

