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

echo "Running npm start..."
npm install
npm start

echo "Started development server."

read -p "Press Enter to close..."