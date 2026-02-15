from datetime import date
from cyclecal.google_auth import get_calendar_service
from cyclecal.calendar_writer import create_folga_event

DATES = [
    date(2026, 2, 1),
    date(2026, 2, 22),
    date(2026, 3, 15),
]


def main():
    service = get_calendar_service()

    for d in DATES:
        create_folga_event(service, d)


if __name__ == "__main__":
    main()

