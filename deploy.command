#!/bin/bash

set -e

git pull

# Load conda
source "$(conda info --base)/etc/profile.d/conda.sh"

echo "Activating conda environment: saskoart"
conda activate saskoart

echo "Running Python processing script..."
python process_files.py

echo "Running npm deploy..."
npm run deploy

echo "Deployment completed successfully."

read -p "Press Enter to close..."