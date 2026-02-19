#!/bin/bash
set -e

echo "Gerando backups..."
cp roadmap.md roadmap.bak
cp ./mobile/index.html ./mobile/index.bak
cp ./mobile/sw.js ./mobile/sw.bak
echo "OK"

