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
  { date: "2026-08-22", title: "投资美股必备！嘉信理财，2026最新开户教程", tag: "课程", url: "learn/l1/us-broker.html#schwab" },
  { date: "2026-07-11", title: "2026最新 Backpack 合规出金教程", tag: "课程", url: "learn/l2/withdraw.html#backpack-withdraw" },
  { date: "2026-07-11", title: "WeChat Pay HK（港版微信支付）开通教程", tag: "课程", url: "learn/l2/withdraw.html#wechat-pay-hk" },
  { date: "2026-07-11", title: "2026 Backpack 合规入金教程", tag: "课程", url: "learn/l2/deposit.html#backpack-deposit" },
  { date: "2026-07-11", title: "2026 币安 合规入金教程", tag: "课程", url: "learn/l2/deposit.html#binance-deposit" },
  { date: "2026-07-10", title: "币安交易所手把手开户教程，2026最新", tag: "课程", url: "learn/l1/crypto-exchange.html#binance" },
  { date: "2026-07-06", title: "Backpack手把手图文开户教程，2026最新", tag: "课程", url: "learn/l1/crypto-exchange.html#backpack" },
  { date: "2026-06-30", title: "ZA Bank（众安银行）开户教程，2026 最新", tag: "课程", url: "learn/l1/bank.html#za-bank" },
  { date: "2026-06-20", title: "WeChat Pay HK（香港微信支付）开通教程", tag: "课程", url: "learn/l1/bank.html#wechat-hk" },
];
