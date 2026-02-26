#!/bin/bash
set -e

echo "Gerando backups..."
cp roadmap.md roadmap.bak
cp ./docs/index.html ./docs/index.bak
cp ./docs/sw.js ./docs/sw.bak
echo "OK"

