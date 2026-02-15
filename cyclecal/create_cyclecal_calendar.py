from cyclecal.google_auth import get_calendar_service

CALENDAR_NAME = "Folgas – CycleCal"
DESCRIPTION = "Calendário de folgas gerenciado automaticamente pelo CycleCal"

def main():
    service = get_calendar_service()

    calendar = {
        "summary": CALENDAR_NAME,
        "description": DESCRIPTION,
        "timeZone": "America/Sao_Paulo",
    }

    created = service.calendars().insert(body=calendar).execute()

    print("✅ Calendário criado com sucesso!")
    print(f"Nome: {created['summary']}")
    print(f"ID: {created['id']}")

    # Guardar o ID para uso futuro
    with open("CYCLECAL_CALENDAR_ID.txt", "w") as f:
        f.write(created["id"])

    print("📝 calendarId salvo em CYCLECAL_CALENDAR_ID.txt")

if __name__ == "__main__":
    main()

