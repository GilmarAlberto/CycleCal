#!/bin/bash

if [ -z "$1" ]; then
  echo "Uso: ./format.sh <arquivo>"
  exit 1
fi

echo "Formatando $1 ..."
npx prettier --write "$1"

echo "Concluído."
