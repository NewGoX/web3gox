#!/usr/bin/env python3
"""
批量加水印脚本
水印文字: Web3_DF | 透明度: 8% | 角度: 30° | 位置: 居中
"""

from PIL import Image, ImageDraw, ImageFont
import os, pathlib

BASE_DIR = pathlib.Path(__file__).parent

# 需要处理的目录列表
TARGET_DIRS = [
    BASE_DIR.parent / "图片",
]

WATERMARK_TEXT = "Web3_DF"
OPACITY = int(255 * 0.08)   # 8%
ANGLE = 30
FONT_SIZE = 60

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

def get_font():
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, FONT_SIZE)
            except Exception:
                pass
    return ImageFont.load_default()

def add_watermark(img_path, font):
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size

    watermark = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    wdraw = ImageDraw.Draw(watermark)

    bbox = wdraw.textbbox((0, 0), WATERMARK_TEXT, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    x = (w - tw) // 2
    y = (h - th) // 2
    wdraw.text((x, y), WATERMARK_TEXT, font=font, fill=(128, 128, 128, OPACITY))

    watermark = watermark.rotate(ANGLE, resample=Image.BICUBIC, center=(w // 2, h // 2))

    out = Image.alpha_composite(img, watermark).convert("RGB")
    out.save(img_path)

def main():
    font = get_font()
    exts = {".png", ".jpg", ".jpeg", ".webp"}

    files = []
    for d in TARGET_DIRS:
        if not d.exists():
            print(f"跳过（目录不存在）: {d}")
            continue
        found = [p for p in d.rglob("*") if p.suffix.lower() in exts and p.is_file()]
        print(f"  {d.name}/  →  {len(found)} 张")
        files.extend(found)

    print(f"\n共 {len(files)} 张图片，开始处理...\n")

    for i, f in enumerate(files, 1):
        try:
            add_watermark(f, font)
            print(f"[{i}/{len(files)}] ✓ {f}")
        except Exception as e:
            print(f"[{i}/{len(files)}] ✗ {f} — {e}")

    print(f"\n完成！共处理 {len(files)} 张图片。")

if __name__ == "__main__":
    main()
