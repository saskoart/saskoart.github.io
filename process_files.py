import shutil
import pandas as pd

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import os
from pathlib import Path

from numpy.f2py.auxfuncs import throw_error

# ======================
# KONFIGURATION
# ======================

INPUT_DIR = Path("raw_data")
OUTPUT_DIR = Path("public/data")

MAX_WIDTH = 1280
MAX_HEIGHT = 1280

WATERMARK_TEXT = "© Sasko Art"
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"
COLOR = (255, 255, 255, 128)  # weiß

PADDING = 20  # Abstand vom Rand

# ======================
# SETUP
# ======================

os.makedirs(OUTPUT_DIR, exist_ok=True)

SUPPORTED_EXTENSIONS = (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp")

# ======================
# FUNKTIONEN
# ======================

def resize_with_aspect_ratio(img, max_width, max_height):
    h, w = img.size

    scale = min(max_width / w, max_height / h, 1.0)
    new_w = int(w * scale)
    new_h = int(h * scale)

    return img.resize((new_h, new_w), Image.LANCZOS)


def add_watermark(img, text):
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    txt_layer = Image.new("RGBA", img.size, (255, 255, 255, 0))  # Transparent Layer
    draw = ImageDraw.Draw(txt_layer)

    w = img.width
    h = img.height

    # Start with a big font and scale down
    font_size = 10  # initial large font
    font = ImageFont.truetype(FONT, font_size)

    # Measure text
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    # Scale down font so text + 2*border fits
    scale_w = (w - 2 * PADDING) / text_w
    scale_h = (h - 2 * PADDING) / text_h
    scale = min(scale_w, scale_h)

    final_font_size = max(1, int(font_size * scale))
    font = ImageFont.truetype(FONT, final_font_size)

    # Recalculate text size
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    # Position bottom-right with border
    x = w - text_w - PADDING
    y = int((h/2) - (text_h/2) + PADDING)

    # Draw watermark with transparency
    draw.text((x, y), text, font=font, fill=COLOR)

    # Combine original image with text layer
    watermarked = Image.alpha_composite(img, txt_layer)
    return watermarked.convert("RGB")


# ======================
# HAUPTLOGIK
# ======================
if OUTPUT_DIR.exists():
    shutil.rmtree(OUTPUT_DIR)

OUTPUT_DIR.mkdir(parents=True)

if (INPUT_DIR / "folders.xlsx").exists():
    pd.read_excel(INPUT_DIR / "folders.xlsx").to_csv(OUTPUT_DIR / "folders.csv", index=False)
else:
    print("no foders.xlsx file")

for folder in Path(INPUT_DIR).glob("*/raw_images"):

    (OUTPUT_DIR / folder.parent.name).mkdir(parents=True)

    if (folder.parent / "series.xlsx").exists():
        pd.read_excel(folder.parent / "series.xlsx").to_csv(OUTPUT_DIR / folder.parent.name / "series.csv", index=False)
    else:
        print(f"no excel file in folder: {folder.parent.name}")

    for filename in folder.iterdir():
        if filename.suffix.lower() not in {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"}:
            continue

        input_path = filename
        output_folder = OUTPUT_DIR / folder.parent.name / "images"
        output_folder.mkdir(exist_ok=True, parents=True)
        output_path = output_folder / filename.with_suffix(".jpg").name

        img = Image.open(input_path)
        if img is None:
            print(f"⚠️ Konnte Bild nicht laden: {filename}")
            continue

        img = resize_with_aspect_ratio(img, MAX_WIDTH, MAX_HEIGHT)
        img = add_watermark(img, WATERMARK_TEXT)

        img.save(output_path)
        print(f"✅ Verarbeitet: {filename}")

print("🎉 Fertig!")
