#!/usr/bin/env python3
"""
给 backpack 文件夹所有 PNG 图片加水印 "Web3_DF"
- 45度斜方平铺
- 字体52px Bold
- 15%透明度
- 输出到 watermarked/ 子目录（不覆盖原图）
"""

from PIL import Image, ImageDraw, ImageFont
import os, glob

WATERMARK_TEXT = "Web3_DF"
FONT_SIZE = 52
OPACITY = 0.15          # 15%
ANGLE = 45
TEXT_COLOR = (200, 200, 200)   # 浅灰色

script_dir = os.path.dirname(os.path.abspath(__file__))
output_dir = os.path.join(script_dir, "watermarked")
os.makedirs(output_dir, exist_ok=True)

# 尝试加载字体
def get_font(size):
    candidates = [
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    print("⚠️  未找到系统字体，使用默认字体（效果可能偏小）")
    return ImageFont.load_default()

def add_watermark(img_path, output_path, font):
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size

    alpha = int(255 * OPACITY)
    watermark = Image.new("RGBA", img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(watermark)

    bbox = draw.textbbox((0, 0), WATERMARK_TEXT, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    step_x = tw + 80
    step_y = th + 70

    for x in range(-step_x * 2, w + step_x * 2, step_x):
        for y in range(-step_y * 2, h + step_y * 2, step_y):
            txt_layer = Image.new("RGBA", (tw + 20, th + 20), (255, 255, 255, 0))
            txt_draw = ImageDraw.Draw(txt_layer)
            txt_draw.text((10, 10), WATERMARK_TEXT, font=font, fill=(*TEXT_COLOR, alpha))
            rotated = txt_layer.rotate(ANGLE, expand=True)
            rw, rh = rotated.size
            watermark.paste(rotated, (x - rw // 2, y - rh // 2), rotated)

    out = Image.alpha_composite(img, watermark).convert("RGB")
    out.save(output_path, quality=95)

def main():
    font = get_font(FONT_SIZE)
    png_files = sorted(glob.glob(os.path.join(script_dir, "*.png")))

    if not png_files:
        print("没有找到 PNG 文件")
        return

    print(f"找到 {len(png_files)} 张图片，开始处理...\n")
    for i, src in enumerate(png_files, 1):
        name = os.path.basename(src)
        dst = os.path.join(output_dir, name)
        add_watermark(src, dst, font)
        print(f"  [{i}/{len(png_files)}] ✓ {name}")

    print(f"\n✅ 全部完成！输出目录：{output_dir}")

if __name__ == "__main__":
    main()
