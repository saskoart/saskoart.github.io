#!/bin/bash

set -e

cd "$(dirname "$0")"

git pull

# Load conda
source "$(conda info --base)/etc/profile.d/conda.sh"

echo "Activating conda environment: saskoart"
conda activate saskoart

echo "Running Python processing script..."
python process_files.py

git add -A
git commit -m "update"
git push

echo "Running npm deploy..."
npm install
npm run deploy

echo "Deployment completed successfully."

read -p "Press Enter to close..."