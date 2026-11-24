"""生成社交分享图 public/og-default.png（1200 x 630）。"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
out = root / "public" / "og-default.png"
out.parent.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630
bg = (250, 249, 246)
ink = (36, 33, 29)
muted = (116, 110, 102)
accent = (161, 85, 58)

img = Image.new("RGB", (W, H), bg)
draw = ImageDraw.Draw(img)

font_path = "C:/Windows/Fonts/msyh.ttc"
font_candidates = [font_path, "C:/Windows/Fonts/simhei.ttf"]
def font(size, bold=False):
    for path in font_candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

draw.rounded_rectangle((80, 78, 120, 118), radius=12, fill=accent)
draw.text((142, 76), "zhangyiyan", font=font(28, True), fill=accent)

draw.text((80, 190), "章亦颜的个人博客", font=font(78, True), fill=ink)
draw.text((82, 300), "记录生活，随手写的一些东西。", font=font(38), fill=muted)

draw.line((80, 410, W - 80, 410), fill=(230, 225, 216), width=2)
draw.text((80, 445), "生活随笔  ·  把普通的日子写下来", font=font(30), fill=muted)

img.save(out, "PNG", optimize=True)
print(out)
