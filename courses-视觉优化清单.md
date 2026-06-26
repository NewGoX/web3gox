# 系统课程页（courses.html）视觉优化 · 可执行清单

> 范围：仅列"经代码核验、确实该改"的项。按风险从低到高排序。
> 回滚：仓库已有 `备份/` 旧版；建议每改一项前先 `git commit`，便于单项回退。
> 所有行号对应当前 `style.css` / `courses.html`。

---

## Item 1 ·正文行宽（measure）失控 —— 核心，中风险

**问题**：`.course-content` 没有任何 `max-width`，正文铺满约 900px，中文一行 50+ 字，超出 35–45 字的舒适视距。这是全页第一可读性硬伤。

**位置**：`style.css` L980 `.course-content, .research-content`
当前：
```css
.course-content, .research-content {
  padding: 56px 0 80px 56px;
  min-width: 0;
}
```
建议（主方案，整列收束、一并修好"左对齐轴"问题）：
```css
.course-content, .research-content {
  padding: 56px 0 80px 56px;
  max-width: 780px;          /* 文本净宽 ≈ 724px ≈ 40 中文字/行，与 .article-img 720px 同轴 */
  min-width: 0;
}
```
- 效果：概览、Level 标题、正文、表格、配图全部收窄到同一左对齐轴，右侧自然留呼吸白边。
- **影响范围**：`research.html` 共用此类，会一起变窄（通常是好事，一致性更强）。需在 1280 宽屏目视确认。

**保守备选**（只想动展开文章、不碰概览/标题）：
```css
.article-body { max-width: 720px; }   /* L1134 追加一行 */
```
风险更低，但概览列表仍是满宽，左对齐轴的统一收益会少一半。

---

## Item 2 · 去 justify + 去首行缩进 —— 低风险，纯排版

**问题**：正文 `text-align: justify` 在屏幕长行上拉开字距、`text-indent: 2em` 首行缩进，二者叠加削弱左缘节奏（这也是前一份诊断里"对齐轴割裂"的真正主因，它误判成了 abstract 的边框）。

**位置**：`style.css` L1140 `.article-body p` 与 L1149 `.body-p`
当前：
```css
.article-body p { /* … */ text-align: justify; text-indent: 2em; }
.body-p { text-indent: 2em !important; }
```
建议：
```css
.article-body p { /* … */ text-align: left; text-indent: 0; }
.body-p { text-indent: 0 !important; }   /* 或整条删除 */
```
- `justify → left`：无争议的改进（web 上 justify 几乎总是劣化）。
- 去 `2em` 缩进：是"印刷感 ↔ web 阅读感"的取舍。建议去掉以换取干净左缘；若想保留纸质感可只改 justify。**可随时回退。**
- 影响范围：仅文章正文。风险低。

---

## Item 3 · 锚点跳转偏移（--nav-h 校正）—— 低风险，1 行

**问题**：导航 `height:auto` + 18/18 padding，**实际高 ≈72px**；`.sidebar { top:72px }` 是对的。但 `--nav-h: 88px`（L60）偏大，`[id]{ scroll-margin-top: calc(var(--nav-h)+16px) }`（L112）导致点击目录跳转时，目标上方多空出约 16px。

**位置**：`style.css` L60
当前：`--nav-h: 88px;`
建议：先量准导航真实高度（约 72px），改为
```css
--nav-h: 72px;
```
- 让锚点偏移与侧栏 sticky 顶沿一致。改完点几个 `#l1-01 / #l3-25` 目视即可。
- 风险低；注意别再有别处依赖 88 的硬假设（已查，仅 L112 与 sidebar 相关）。

---

## Item 4 · emoji 功能图标 → 线性 SVG —— 视觉低风险，多文件

**问题**：导航里 `🔍 ☀️ 🌙`（`courses.html` L142–143）是彩色 emoji，与本站 Mono/衬线/黑白纸感冲突，最掉精致度。

**建议**：换 1.5px 描边的内联 SVG（放大镜 / 日 / 月），主题切换用两个 SVG + CSS 显隐。
- **影响范围**：同一段 nav 出现在 about / topics / research / tools / community / policy / search 等**所有页面** → 属"全站 nav 组件"问题，建议**单独排期**统一替换，避免只改课程页造成页间不一致。

---

## Item 5 · 色彩系统取舍 —— 待你拍板（你选了"我不知道"）

**现状（已核验）**：`:root` 把 `--teal / --purple / --rose` 全部重映射成 `vermillion / ink-2`，`.s-dot` 还 `!important` 强制朱砂 → 5 个 Level 视觉**完全同色**，分级配色名存实亡，留下一堆 `ov-teal / s-purple / lh-rose` 死类名。

两条路：

**A. 单色到底（我推荐）**
承诺朱砂单强调色，清理失效类名与死代码。最省、最 Apple、零新增视觉负担；靠 Level 编号（01–05）+ 留白做方位感。
工作量：清理约 10 处类名 / CSS。

**B. 恢复分级色**
给 5 级一套低饱和、同明度、仅相位移动的克制色，长页面里提供"我在第几阶段"的方位感。
工作量更大，且需小心不破坏三色克制。

> 推荐 A：本站 DNA 是"三色 / 纸感 / 克制"，分级色与之张力大。等你定 A/B 再动手。

---

## 建议执行顺序

1. **Item 2**（去 justify/缩进）—— 最低风险，立即见效
2. **Item 3**（--nav-h 校正）—— 1 行，目视确认
3. **Item 1**（正文行宽）—— 收益最大，需宽屏目视
4. **Item 5** 定调后清理死色码
5. **Item 4** 全站图标，单独排期

> Item 1–3 我可以现在直接改 `style.css`；Item 4–5 建议确认后再动。
