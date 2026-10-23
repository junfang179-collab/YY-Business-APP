# -*- coding: utf-8 -*-
"""把 CSS 里的「渐变 + 背景图 + mask」烘焙成单层图片。

    为什么：`.attendance-landscape` 这类元素用的是
    `background: linear-gradient(...), url(...)` 两层叠图，浏览器渲染正确，
    但 Figma 的 h2d 导入只认第一层（渐变），图片层被丢弃；另外
    `mask-image` 根本不在抓取脚本的采集范围内。
    烘焙成单层 url() 之后，浏览器效果不变，复制到 Figma 也能完整还原。
"""
from PIL import Image, ImageChops

SRC = "public/assets/singapore-bay.webp"
A = 2736 / 1568.0  # 设计单位(a) -> 原图像素


def hexa(c):
    c = c.lstrip("#")
    rgb = (int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16))
    a = int(c[6:8], 16) if len(c) == 8 else 255
    return rgb, a


def _sample(t, stops):
    """在 CSS 渐变 stop 之间做线性插值（颜色与 alpha 都插值）。"""
    if t <= stops[0][0]:
        return stops[0][1], stops[0][2]
    if t >= stops[-1][0]:
        return stops[-1][1], stops[-1][2]
    for i in range(len(stops) - 1):
        p0, c0, a0 = stops[i]
        p1, c1, a1 = stops[i + 1]
        if p0 <= t <= p1:
            k = 0 if p1 == p0 else (t - p0) / (p1 - p0)
            rgb = tuple(round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3))
            return rgb, round(a0 + (a1 - a0) * k)
    return stops[-1][1], stops[-1][2]


def gradient(size, stops, vertical=True):
    """生成一整张渐变 RGBA 图（沿垂直或水平方向）。"""
    w, h = size
    if vertical:
        strip = Image.new("RGBA", (1, h))
        px = strip.load()
        for y in range(h):
            rgb, a = _sample((y + 0.5) / h, stops)
            px[0, y] = rgb + (a,)
        return strip.resize((w, h), Image.NEAREST)
    strip = Image.new("RGBA", (w, 1))
    px = strip.load()
    for x in range(w):
        rgb, a = _sample((x + 0.5) / w, stops)
        px[x, 0] = rgb + (a,)
    return strip.resize((w, h), Image.NEAREST)


def alpha_mask(size, stops, vertical=True):
    """生成 L 模式的遮罩（0 黑 → 255 白）。stops 形如 [(pos, alpha0_255), ...]。"""
    stops = [(p, (255, 255, 255), a) for p, a in stops]
    w, h = size
    if vertical:
        strip = Image.new("L", (1, h))
        px = strip.load()
        for y in range(h):
            _, a = _sample((y + 0.5) / h, stops)
            px[0, y] = a
        return strip.resize((w, h), Image.NEAREST)
    strip = Image.new("L", (w, 1))
    px = strip.load()
    for x in range(w):
        _, a = _sample((x + 0.5) / w, stops)
        px[x, 0] = a
    return strip.resize((w, h), Image.NEAREST)


def scrim(rgb_img, stops):
    """把垂直渐变叠到图片上层（渐变颜色的 alpha 就是它自己的不透明度）。"""
    out = rgb_img.convert("RGBA")
    out = Image.alpha_composite(out, gradient(out.size, stops, vertical=True))
    return out


def crop_region(im, x0, y0, x1, y1, out_w, out_h):
    """按设计单位裁一块；超出原图的区域留透明（对应 CSS 的 no-repeat）。"""
    W, H = im.size
    px0, py0 = int(round(x0 * A)), int(round(y0 * A))
    px1, py1 = int(round(x1 * A)), int(round(y1 * A))
    canvas = Image.new("RGBA", (px1 - px0, py1 - py0), (0, 0, 0, 0))
    sx0, sy0 = max(0, px0), max(0, py0)
    sx1, sy1 = min(W, px1), min(H, py1)
    if sx1 > sx0 and sy1 > sy0:
        canvas.paste(im.crop((sx0, sy0, sx1, sy1)), (sx0 - px0, sy0 - py0))
    return canvas.resize((out_w, out_h), Image.LANCZOS)


def apply_mask(img, mask):
    r, g, b, a = img.split()
    return Image.merge("RGBA", (r, g, b, ImageChops.darker(a, mask)))


def main():
    im = Image.open(SRC).convert("RGB")

    # 1) 整图 + 顶部渐变压暗 —— 替代 .attendance-landscape 的两层 background
    big = im.resize((1568, 1174), Image.LANCZOS)
    scrim_img = scrim(big, [
        (0.00, *hexa("#e8f3ff35")),
        (0.12, *hexa("#e5f2ff66")),
        (0.19, *hexa("#e5f1fff7")),
        (0.76, *hexa("#e5f1fff5")),
        (0.91, *hexa("#e5f1ff70")),
        (1.00, *hexa("#e5f1ff30")),
    ])
    scrim_img.save("public/assets/bay-scrim.webp", "WEBP", quality=90, method=6)

    # 2) 天际线两块不要用这里的坐标去裁。
    #    `background-position: left calc(-405 * var(--a))` 是双值写法，长度作用于
    #    垂直轴而不是水平轴，手工换算极易搞错。这两张图改用「渲染结果反向烘焙」：
    #    用旧写法渲染页面 → 截取元素（黑白双底还原 alpha）→ 输出
    #    public/assets/bay-skyline-left.webp / -right.webp。

    # 4) 全屏 cover 用的两张：employer 页 与 reviews / write-review 页
    #    （同样是「渐变 + url」两层，复制到 Figma 会丢图，一起烘焙掉）
    scrim(big, [
        (0.00, *hexa("#eaf5ff42")),
        (0.50, *hexa("#eaf4ff9c")),
        (1.00, *hexa("#e8f2ff48")),
    ]).save("public/assets/bay-cover-employer.webp", "WEBP", quality=90, method=6)

    scrim(big, [
        (0.00, *hexa("#e8f4ff42")),
        (1.00, *hexa("#e7f3ffcf")),
    ]).save("public/assets/bay-cover-reviews.webp", "WEBP", quality=90, method=6)

    print("ok")


if __name__ == "__main__":
    main()
