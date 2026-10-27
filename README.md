# YY Business APP

YY Business APP 的 iPad 高保真原型（React 19 + TypeScript + Vite），包含新加坡（SG）与马来西亚（MY）两套独立的页面流程。

## 本地运行

```bash
pnpm install
pnpm dev        # http://localhost:8443
```

页面必须带 `?viewport=ipad` 才会渲染真实界面，否则只会看到 iPad 外壳预览。

## 页面路由

| 页面 | 地址 |
| --- | --- |
| 登录 | `/?viewport=ipad` |
| 注册 | `/?viewport=ipad#signup` |
| 忘记密码 | `/?viewport=ipad#forgot` |
| 部门主页 | `/?viewport=ipad#employer` |
| 考勤（Sign In / Sign Out） | `/?viewport=ipad#attendance` |
| 雇主端考勤列表 / 明细 | `/?viewport=ipad#e-attendance-list` / `#e-attendance-detail` |
| 评价 / 写评价 / 批量评价 | `/?viewport=ipad#reviews` / `#write-review` / `#batch-review` |
| 历史记录 | `/?viewport=ipad#history`、`#history-detail` |
| 用工申请 / 工服 / 工服尺码 | `/?viewport=ipad#labour-requisition`、`#staff-clothing`、`#staff-clothing-size` |
| 客户反馈 | `/?viewport=ipad#customer-feedback` |
| 修改密码 / 账单方式 | `/?viewport=ipad#change-password`、`#billing-method` |

在任意地址追加 `&region=my` 或 `&region=hk` 即切换到马来西亚 / 香港版本，例如 `/?viewport=ipad&region=my#attendance`、`/?viewport=ipad&region=hk#attendance`。

## 目录结构

- `src/` — 新加坡版页面与共享组件、样式
- `src/my/`、`src/hk/` — 马来西亚 / 香港版页面（与 SG 一一对应，样式与工具复用上一级）
- `src/pages-sg.ts` / `src/my/index.ts` — 两套页面汇总，`App.tsx` 按 `region` 参数选用
- `public/assets/` — 背景图、图标等静态资源
- `tools/` — 图片烘焙等辅助脚本

## 交付约定

- 设计尺寸按设计稿宽度等比缩放（`--a` / `--e` / `--r` 三套基准），正文字号单独设下限。
- 页面根节点保持 `<main>`，Copy to Figma 只抓取 `main` 内容。
- 背景必须是单层图片，不使用伪元素绘制可见图形，居中不用 `margin: auto`。
