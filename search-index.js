/*
 * 站内搜索数据源（search.html 引用）
 * ---------------------------------------------
 * 维护方式与 updates.js 完全一致：每发布一篇新文章，就在对应分组里加一条。
 *   t     必填，文章标题（搜索结果里显示的标题，也参与匹配）
 *   u     必填，跳转链接，如 "learn/l1/bank.html#za-bank"
 *   cat   必填，分类："课程" / "研究" / "专题" / "工具" / "页面"（决定过滤标签归属）
 *   badge 必填，结果左侧小标签："L1"~"L5"（课程）/ "研究" / "专题" / "工具" / "页面"
 *   path  必填，面包屑路径，如 "系统课程 › L1 Web3 实操基础"（结果里灰色小字显示）
 *   kw    选填，补充关键词（中英文均可，空格分隔）——用来让搜不到标题原词时也能命中，
 *         例如给 MetaMask 教程加 "小狐狸 钱包"，给入金教程加 "充值 法币 onramp"
 * 顺序不影响搜索（结果会自动按相关度排序），加在所在分组末尾即可。
 */
const SEARCH_INDEX = [
  /* —— L1 · Web3 实操基础 —— */
  { t:"加密交易所开户", u:"learn/l1/crypto-exchange.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础", kw:"交易所 开户 注册 币安 okx backpack cex" },
  { t:"银行开户", u:"learn/l1/bank.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础", kw:"银行 开户 港卡 香港 众安 za bank" },
  { t:"ZA Bank（众安银行）开户教程，2026 最新", u:"learn/l1/bank.html#za-bank", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 银行开户", kw:"za bank 众安银行 香港 开户 港卡 银行卡 出金 入金" },
  { t:"WeChat Pay HK（香港微信支付）开通教程", u:"learn/l1/bank.html#wechat-hk", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 银行开户", kw:"微信支付 香港 wechat pay hk 出金 消费" },
  { t:"境外支付", u:"learn/l1/overseas-pay.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础", kw:"境外支付 支付 visa 信用卡 payment" },
  { t:"美股券商开户", u:"learn/l1/us-broker.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础", kw:"美股 券商 开户 老虎 富途 ibkr broker" },
  { t:"投资美股必备！嘉信理财，2026最新开户教程", u:"learn/l1/us-broker.html#schwab", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 美股券商开户", kw:"嘉信理财 schwab charles schwab 美股 券商 开户 国际版 护照 w-8ben w8ben 预扣税 非美国居民 出金 入金" },

  /* —— L1 · Web3 实操基础（入金与出金） —— */
  { t:"入金", u:"learn/l2/deposit.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 入金", kw:"入金 充值 法币 c2c onramp 买币" },
  { t:"2026 Backpack 合规入金教程", u:"learn/l2/deposit.html#backpack-deposit", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 入金", kw:"backpack bp 入金 充值 法币 电汇 swift 众安 za bank 港卡 美元 到账 c2c onramp 安全 不被抓" },
  { t:"2026 币安 合规入金教程", u:"learn/l2/deposit.html#binance-deposit", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 入金", kw:"binance 币安 入金 充值 法币 swift 银行转账 众安 za bank 港卡 美元 巴林 到账" },
  { t:"出金", u:"learn/l2/withdraw.html", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 出金", kw:"出金 提现 法币 c2c withdraw 卖币" },
  { t:"2026最新 Backpack 合规出金教程", u:"learn/l2/withdraw.html#backpack-withdraw", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 出金", kw:"backpack bp 出金 提现 withdraw 法币 电汇 swift 众安 za bank 港卡 美元 到账 零手续费 中间行 收款人 合规 安全" },
  { t:"WeChat Pay HK（港版微信支付）开通教程", u:"learn/l2/withdraw.html#wechat-pay-hk", cat:"课程", badge:"L1", path:"系统课程 › L1 Web3 实操基础 › 出金", kw:"wechat pay hk 微信支付 港版 香港 出金 消费 磨损 众安 za bank u卡 c2c 绑卡 切换钱包 backpack usdc" },

  /* —— L2 · Web3 实操进阶 —— */
  { t:"钱包管理与链上转账（一）", u:"learn/l3/sub-1.html", cat:"课程", badge:"L2", path:"系统课程 › L2 Web3 实操进阶", kw:"钱包 链上 转账 metamask 代币交互" },
  { t:"钱包管理与链上转账（二）", u:"learn/l3/sub-2.html", cat:"课程", badge:"L2", path:"系统课程 › L2 Web3 实操进阶", kw:"钱包 链上 转账 gas 授权" },
  { t:"钱包管理与链上转账（三）", u:"learn/l3/sub-3.html", cat:"课程", badge:"L2", path:"系统课程 › L2 Web3 实操进阶", kw:"钱包 链上 转账 区块浏览器" },

  /* —— L3 · DeFi 协议实战 —— */
  { t:"Hyperliquid 实操", u:"learn/l4/hyperliquid.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"hyperliquid 永续合约 perp" },
  { t:"Sky（MakerDAO）实操", u:"learn/l4/sky.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"sky makerdao dai 稳定币" },
  { t:"Aave 借贷实操", u:"learn/l4/aave.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"aave 借贷 lending" },
  { t:"Uniswap 实操", u:"learn/l4/uniswap.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"uniswap dex swap 换币" },
  { t:"Jupiter 实操", u:"learn/l4/jupiter.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"jupiter solana 聚合 dex" },
  { t:"Circle / USDC 实操", u:"learn/l4/circle.html", cat:"课程", badge:"L3", path:"系统课程 › L3 DeFi 协议实战", kw:"circle usdc 稳定币" },

  /* —— L4 · 10倍项目研报 —— */
  { t:"Chainlink 项目研究", u:"learn/l5/chainlink.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"chainlink link 预言机 oracle" },
  { t:"Ethereum 项目研究", u:"learn/l5/ethereum.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"ethereum eth 以太坊" },
  { t:"BNB 项目研究", u:"learn/l5/bnb.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"bnb chain 币安链 bsc" },
  { t:"Pumpfun 项目研究", u:"learn/l5/pumpfun.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"pumpfun 发币 meme solana" },
  { t:"Pendle 项目研究", u:"learn/l5/pendle.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"pendle 收益代币化 pt yt" },
  { t:"Ethena 项目研究", u:"learn/l5/ethena.html", cat:"课程", badge:"L4", path:"系统课程 › L4 10倍项目研报", kw:"ethena usde 合成美元" },

  /* —— 项目研究（深度研报） —— */
  { t:"Web3 项目基本面研究框架", u:"research.html#r-framework", cat:"研究", badge:"研究", path:"项目研究 › 研究方法论", kw:"基本面 研究框架 方法论" },
  { t:"代币经济学深度解析", u:"research.html#r-tokenomics", cat:"研究", badge:"研究", path:"项目研究 › 研究方法论", kw:"代币经济学 tokenomics 供应 解锁" },
  { t:"Web3 估值方法论：FDV / TVL / P/S / P/F", u:"research.html#r-valuation", cat:"研究", badge:"研究", path:"项目研究 › 研究方法论", kw:"估值 fdv tvl ps pf 市销率" },
  { t:"竞争格局分析：DEX / 借贷 / LSD 赛道", u:"research.html#r-competition", cat:"研究", badge:"研究", path:"项目研究 › 研究方法论", kw:"竞争格局 赛道 dex 借贷 lsd" },
  { t:"Hyperliquid 深度研究", u:"research.html#r-hyperliquid", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"hyperliquid 永续 perp dex" },
  { t:"Aave 深度研究", u:"research.html#r-aave", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"aave 借贷 lending" },
  { t:"Jupiter 深度研究", u:"research.html#r-jupiter", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"jupiter solana 聚合器" },
  { t:"Uniswap 深度研究", u:"research.html#r-uniswap", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"uniswap dex amm" },
  { t:"Circle / USDC 深度研究", u:"research.html#r-circle", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"circle usdc 稳定币" },
  { t:"Chainlink 深度研究", u:"research.html#r-chainlink", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"chainlink link 预言机 oracle" },
  { t:"Ethereum 深度研究", u:"research.html#r-ethereum", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"ethereum eth 以太坊" },
  { t:"BNB Chain 深度研究", u:"research.html#r-bnb", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"bnb chain 币安链 bsc" },
  { t:"Pump.fun 深度研究", u:"research.html#r-pumpfun", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"pumpfun 发币 meme solana" },
  { t:"Pendle 深度研究", u:"research.html#r-pendle", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"pendle 收益代币化 pt yt" },
  { t:"Ethena 深度研究", u:"research.html#r-ethena", cat:"研究", badge:"研究", path:"项目研究 › 协议案例", kw:"ethena usde 合成美元 收益型稳定币" },

  /* —— 专题与页面 —— */
  { t:"出入金涉及政策风险与防控", u:"topics.html#series-io", cat:"专题", badge:"专题", path:"专题系列", kw:"出入金 政策 风险 防控 反诈 银行卡" },
  { t:"专题系列总览", u:"topics.html", cat:"专题", badge:"专题", path:"专题系列", kw:"专题 系列 深度" },
  { t:"国内加密政策一览表", u:"policy.html", cat:"专题", badge:"专题", path:"专题系列 › 政策", kw:"政策 加密 国内 监管 合规 法律" },
  { t:"常用工具导航", u:"tools.html", cat:"工具", badge:"工具", path:"Web3 工具", kw:"工具 导航 钱包 数据 安全 metamask dune defillama" },
  { t:"关于 DF 实战营", u:"about.html", cat:"页面", badge:"页面", path:"站点", kw:"关于 about 介绍" },
  { t:"加入社群", u:"community.html", cat:"页面", badge:"页面", path:"站点", kw:"社群 community 加入 群" }
];
