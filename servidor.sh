#!/bin/bash

PORT=8000

echo "🔍 Verificando porta $PORT..."

PID=$(lsof -t -i:$PORT)

if [ ! -z "$PID" ]; then
    echo "⚠️ Porta ocupada. Matando processo $PID..."
    kill -9 $PID
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR/docs" 2>/dev/null || cd "$SCRIPT_DIR"

echo "🚀 Subindo servidor na porta $PORT..."
npx serve . -l $PORT
