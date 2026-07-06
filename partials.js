/* 占位/子目录页共享部件：顶栏 + 导航 + 页脚。同步注入，须在 main.js 之前引用。
   子文件夹页面在 <body data-root="../../"> 上声明相对根前缀，链接会自动加前缀。 */
(function () {
  var R = (document.body && document.body.getAttribute('data-root')) || '';

  var weekdays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var now = new Date();
  var utc8 = new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
  var dateStr = utc8.getFullYear()+'年'+(utc8.getMonth()+1)+'月'+utc8.getDate()+'日 '+weekdays[utc8.getDay()];

  var top =
    '<div class="masthead-bar"><div class="mb-inner">'+
    '<span class="mb-date">'+dateStr+'</span>'+
    '<span class="mb-spacer"></span>'+
    '<span class="mb-meta">52 节 课程 · 持续更新</span>'+
    '</div></div>'+
    '<nav class="navbar" id="navbar"><div class="nav-inner">'+
    '<a href="'+R+'index.html" class="nav-logo"><span class="logo-mark">DF的加密笔记</span></a>'+
    '<div class="nav-links">'+
      '<div class="nav-dropdown"><a href="'+R+'courses.html" class="nav-dropdown-toggle">系统课程 <span class="dropdown-arrow">▾</span></a>'+
      '<div class="nav-dropdown-menu">'+
        '<a href="'+R+'courses.html#l1">L1  ·  注册与开户</a>'+
        '<a href="'+R+'courses.html#l2">L2  ·  入金与出金</a>'+
        '<a href="'+R+'courses.html#l3">L3  ·  Web3链上实操</a>'+
        '<a href="'+R+'courses.html#l4">L4  ·  DeFi 协议实战</a>'+
        '<a href="'+R+'courses.html#l5">L5  ·  Web3 项目研究</a>'+
      '</div></div>'+
      '<div class="nav-dropdown"><a href="'+R+'topics.html" class="nav-dropdown-toggle">专题系列 <span class="dropdown-arrow">▾</span></a>'+
      '<div class="nav-dropdown-menu">'+
        '<a href="'+R+'tools.html">Web3 工具</a>'+
        '<a href="'+R+'research.html">项目研究</a>'+
        '<a href="'+R+'policy.html">国内加密政策一览表</a>'+
        '<a href="'+R+'topics.html#series-io">出入金涉及政策风险与防控</a>'+
        '<span class="dropdown-soon">其他待更新</span>'+
      '</div></div>'+
      '<a href="'+R+'about.html">关 于</a>'+
    '</div>'+
    '<div class="nav-right">'+
      '<a href="'+R+'search.html" class="theme-toggle nav-search" aria-label="站内搜索" title="站内搜索" style="text-decoration:none;">🔍</a>'+
      '<button class="theme-toggle" id="themeToggle"><span class="icon-sun">☀️</span><span class="icon-moon">🌙</span></button>'+
      '<a href="'+R+'community.html" class="btn btn-primary btn-sm">加入社群</a>'+
    '</div>'+
    '<button class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>'+
    '</div>'+
    '<div class="nav-mobile" id="navMobile">'+
      '<a href="'+R+'search.html" class="mobile-sub">🔍 站内搜索</a>'+
      '<div class="mobile-section-title">系统课程</div>'+
      '<a href="'+R+'courses.html#l1" class="mobile-sub">注册与开户</a>'+
      '<a href="'+R+'courses.html#l2" class="mobile-sub">入金与出金</a>'+
      '<a href="'+R+'courses.html#l3" class="mobile-sub">Web3链上实操</a>'+
      '<a href="'+R+'courses.html#l4" class="mobile-sub">DeFi 协议实战</a>'+
      '<a href="'+R+'courses.html#l5" class="mobile-sub">Web3 项目研究</a>'+
      '<div class="mobile-section-title">专题系列</div>'+
      '<a href="'+R+'tools.html" class="mobile-sub">Web3 工具</a>'+
      '<a href="'+R+'research.html" class="mobile-sub">项目研究</a>'+
      '<a href="'+R+'policy.html" class="mobile-sub">国内加密政策一览表</a>'+
      '<a href="'+R+'topics.html#series-io" class="mobile-sub">出入金涉及政策风险与防控</a>'+
      '<a href="'+R+'about.html">关 于</a>'+
      '<a href="'+R+'community.html" class="mobile-cta">加入社群 →</a>'+
    '</div></nav>';

  var foot =
    '<footer class="foot"><div class="foot-grid">'+
    '<div class="foot-brand"><a href="'+R+'index.html" class="brand"><span class="brand-mark"></span><span class="brand-name">DF的加密笔记</span></a>'+
    '<p>面向中文用户的 web3 系列课程。守住本金，系统认知，安全参与。</p></div>'+
    '<div class="foot-col"><h4>课程</h4>'+
      '<a href="'+R+'courses.html#l1">Ⅰ · 注册与开户</a><a href="'+R+'courses.html#l2">Ⅱ · 入金与出金</a>'+
      '<a href="'+R+'courses.html#l3">Ⅲ · Web3链上实操</a><a href="'+R+'courses.html#l4">Ⅳ · DeFi 协议实战</a>'+
      '<a href="'+R+'courses.html#l5">Ⅴ · Web3 项目研究</a></div>'+
    '<div class="foot-col"><h4>内容</h4>'+
      '<a href="'+R+'research.html">项目研究</a><a href="'+R+'tools.html">Web3 工具</a>'+
      '<a href="'+R+'topics.html">专题系列</a><a href="'+R+'about.html">关 于</a>'+
      '<a href="'+R+'community.html">加入社群</a></div>'+
    '<div class="foot-col"><h4>声明</h4>'+
      '<p class="foot-fine">© 2026 DF的加密笔记<br>内容仅供教育目的，不构成投资建议。<br>守住本金，系统认知，安全参与。</p></div>'+
    '</div><div class="foot-rule"></div><div class="foot-bottom">'+
      '<span>字体 · 正文 IBM Plex Sans / Noto Serif SC · 标题 Fraunces / Instrument Serif</span>'+
      '<span>made for serious learners</span></div></footer>';

  var topSlot = document.getElementById('site-top');
  var footSlot = document.getElementById('site-foot');
  if (topSlot) topSlot.innerHTML = top;
  if (footSlot) footSlot.innerHTML = foot;
})();
