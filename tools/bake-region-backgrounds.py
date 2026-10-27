# -*- coding: utf-8 -*-
"""给马来西亚 / 香港的城市插画烘焙「背景 + 白色遮罩」单层图。

新加坡的背景有两种形态：

- 登录 / 注册 / 忘记密码：`.landscape` 直接铺原图，不加遮罩；
- 其余页面：`.employer-landscape` / `.reviews-landscape` / `.attendance-landscape`
  铺的是已经烘焙好白色渐变的 `bay-cover-*.webp` / `bay-scrim.webp`，
  内容浮在这一层淡白雾之上，对比度才够。

MY / HK 早前只是把城市图原样铺上去，没有这层雾，文字就直接压在插画上。
这里按新加坡完全相同的渐变色标，给两个地区的城市图各烘三版，
CSS 里换成对应文件即可（仍然是单层 background，Figma 只认第一层也能完整还原）。

    python tools/bake-region-backgrounds.py
"""
from PIL import Image

# 与 tools/bake-backgrounds.py 里新加坡三张图用的色标保持一致
SCRIMS = {
    # 工作台 / 公司资料等卡片型页面
    "cover-employer": [
        (0.00, "#eaf5ff42"),
        (0.50, "#eaf4ff9c"),
        (1.00, "#e8f2ff48"),
    ],
    # 评价 / 写评价
    "cover-reviews": [
        (0.00, "#e8f4ff42"),
        (1.00, "#e7f3ffcf"),
    ],
    # 考勤（表格要读，中段更实）
    "scrim": [
        (0.00, "#e8f3ff35"),
        (0.12, "#e5f2ff66"),
        (0.19, "#e5f1fff7"),
        (0.76, "#e5f1fff5"),
        (0.91, "#e5f1ff70"),
        (1.00, "#e5f1ff30"),
    ],
}

REGIONS = {
    "my": "public/assets/kl-city.webp",
    "hk": "public/assets/hk-city.webp",
}

OUT_SIZE = (1568, 1174)  # 与新加坡烘焙图同尺寸，够 1366 视口用且体积更小


def hexa(c):
    c = c.lstrip("#")
    rgb = (int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16))
    a = int(c[6:8], 16) if len(c) == 8 else 255
    return rgb, a


def sample(t, stops):
    """在两个 gradient stop 之间线性插值（颜色与 alpha 一起插）。"""
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


def vertical_gradient(size, rgb_stops):
    """生成一整张自上而下的 RGBA 渐变图。"""
    w, h = size
    strip = Image.new("RGBA", (1, h))
    px = strip.load()
    for y in range(h):
        rgb, a = sample((y + 0.5) / h, rgb_stops)
        px[0, y] = rgb + (a,)
    return strip.resize((w, h), Image.NEAREST)


def main():
    for region, src in REGIONS.items():
        art = Image.open(src).convert("RGB").resize(OUT_SIZE, Image.LANCZOS)
        for name, stops in SCRIMS.items():
            stops = [(p, *hexa(c)) for p, c in stops]
            out = Image.alpha_composite(art.convert("RGBA"), vertical_gradient(OUT_SIZE, stops))
            path = f"public/assets/{region}-{name}.webp"
            out.save(path, "WEBP", quality=90, method=6)
            print("wrote", path)


if __name__ == "__main__":
    main()
