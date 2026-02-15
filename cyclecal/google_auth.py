from __future__ import print_function

import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/calendar"]

def get_calendar_service():
    creds = None

    # 1️⃣ Se já existe token salvo, usa ele
    if os.path.exists("credentials/token.json"):
        creds = Credentials.from_authorized_user_file(
            "credentials/token.json", SCOPES
        )

    # 2️⃣ Se não tem credenciais válidas, renova ou pede login
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials/google_oauth.json", SCOPES
            )
            creds = flow.run_local_server(port=0)

        # 3️⃣ Salva o token para próximas execuções
        with open("credentials/token.json", "w") as token:
            token.write(creds.to_json())

    return build("calendar", "v3", credentials=creds)

