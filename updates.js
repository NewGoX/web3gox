/*
 * 首页右侧「本期更新」数据源
 * ---------------------------------------------
 * 规则：每新增一篇文章，就在数组最前面加一条。
 *   date  必填，格式 "YYYY-MM-DD"（首页会自动显示成 "MM·DD" 并按日期倒序）
 *   title 必填，只写文章标题本身，不要带 "L2-12 ·" 这类章节序号前缀
 *   tag   必填，"课程" / "研究" / "专题"（"研究" 会自动用红色标记）
 *   url   选填，点击标题跳转的链接，如 "courses.html#l2-12"；留空则不可点
 * 首页只展示最新 5 条，旧的保留在此即可（作为归档数据）。
 */
const UPDATES = [
  { date: "2026-06-30", title: "ZA Bank（众安银行）开户教程，2026 最新", tag: "课程", url: "courses.html#l2-za-bank" },
  { date: "2026-06-20", title: "WeChat Pay HK（香港微信支付）开通教程", tag: "课程", url: "courses.html#l2-wechat-hk" },
  { date: "2026-05-24", title: "Ethena USDe 合成美元协议深度解读", tag: "研究", url: "" },
  { date: "2026-05-20", title: "Pendle 收益代币化实操指南", tag: "课程", url: "" },
  { date: "2026-05-15", title: "「Web3 资产安全·全景防御」第一篇上线", tag: "专题", url: "" },
  { date: "2026-05-12", title: "币安 C2C 入金教程（2026 最新版）", tag: "课程", url: "" },
  { date: "2026-05-10", title: "Jupiter 聚合交易所案例更新至 2026Q1", tag: "研究", url: "" },
];
