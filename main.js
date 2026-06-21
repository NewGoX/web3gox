/* Theme bootstrap (also runs inline in <head>) */
(function() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', function() {

  /* Theme toggle */
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* Nav scroll state (legacy) */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
  }

  /* Sidebar section title: click → collapse/expand */
  document.querySelectorAll('.sidebar-section-title[data-section]').forEach(function(title) {
    const arrow = document.createElement('span');
    arrow.className = 'sidebar-arrow';
    arrow.innerHTML = '▾';
    title.style.cursor = 'pointer';
    title.appendChild(arrow);

    const sideSection = title.nextElementSibling;
    const sectionId   = title.getAttribute('data-section');
    const mainSection = document.getElementById(sectionId);

    /* Default collapsed */
    title.classList.add('collapsed');
    if (sideSection) {
      sideSection.classList.add('collapsed');
      sideSection.style.display = 'none';
    }

    title.addEventListener('click', function() {
      const isCollapsed = title.classList.toggle('collapsed');
      if (sideSection) {
        if (isCollapsed) {
          sideSection.classList.add('collapsed');
          sideSection.style.display = 'none';
        } else {
          sideSection.classList.remove('collapsed');
          sideSection.style.display = '';
        }
      }
      if (mainSection) {
        const moduleList = mainSection.querySelector('.module-list');
        if (moduleList) moduleList.style.display = isCollapsed ? 'none' : '';
        if (!isCollapsed) {
          showAllModules();
          requestAnimationFrame(function() {
            const top = mainSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: top, behavior: 'smooth' });
          });
        }
      }
    });
  });

  /* Article expand/collapse */
  window.toggleArticle = function(id, toggleEl) {
    const body = document.getElementById(id);
    if (!body) return;
    const isOpen = body.classList.contains('active');
    body.classList.toggle('active', !isOpen);
    if (toggleEl) toggleEl.classList.toggle('open', !isOpen);
  };

  let currentModuleId = null;

  function showOnlyModule(moduleId) {
    document.querySelectorAll('.module').forEach(function(m) {
      m.style.display = m.id === moduleId ? '' : 'none';
    });
    document.querySelectorAll('.chapter-title').forEach(function(el) { el.style.display = 'none'; });
    const target = document.getElementById(moduleId);
    if (!target) return;
    const body = target.querySelector('.article-body');
    const toggle = target.querySelector('.module-toggle');
    if (body && !body.classList.contains('active')) {
      body.classList.add('active');
      if (toggle) toggle.classList.add('open');
    }
    requestAnimationFrame(function() {
      const rect = target.getBoundingClientRect();
      const top = rect.top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
    currentModuleId = moduleId;
  }

  function showAllModules() {
    document.querySelectorAll('.module').forEach(function(m) { m.style.display = ''; });
    document.querySelectorAll('.chapter-title').forEach(function(el) { el.style.display = ''; });
    currentModuleId = null;
  }

  let lastActiveId = null;
  document.querySelectorAll('.sidebar-link[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      lastActiveId = id;
      /* 方案A：保持整页可见（不隐藏其它小节）；若点的是具体小节则展开其正文 */
      showAllModules();
      if (target.classList.contains('module')) {
        const body = target.querySelector('.article-body');
        const toggle = target.querySelector('.module-toggle');
        if (body && !body.classList.contains('active')) {
          body.classList.add('active');
          if (toggle) toggle.classList.add('open');
        }
      }
      requestAnimationFrame(function() {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      });
      /* 点击时更新地址栏（replaceState：不触发跳转、不新增历史记录） */
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      else location.hash = id;
    });
  });

  /* 滚动时高亮当前目录 + 同步地址栏（scroll-spy） */
  const sidebarItems = [];
  document.querySelectorAll('.sidebar-link[href^="#"]').forEach(function(link) {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sidebarItems.push({ el, link, id });
  });
  let spyTick = false;
  function runSpy() {
    spyTick = false;
    const pos = window.pageYOffset + 110;
    let active = null;
    sidebarItems.forEach(function(item) {
      if (item.el.offsetTop <= pos) active = item;
    });
    if (active && active.id !== lastActiveId) {
      lastActiveId = active.id;
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      active.link.classList.add('active');
      if (history.replaceState) history.replaceState(null, '', '#' + active.id);
    }
  }
  window.addEventListener('scroll', function() {
    if (spyTick) return;
    spyTick = true;
    requestAnimationFrame(runSpy);
  }, { passive: true });

  /* Research sidebar */
  document.querySelectorAll('.research-sidebar .sidebar-link[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      document.querySelectorAll('.research-sidebar .sidebar-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      }
    });
  });

  /* Image lightbox: click any article image to enlarge (all chapters) */
  (function() {
    const imgs = document.querySelectorAll('.article-img');
    if (!imgs.length) return;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img class="lightbox-img" alt="">';
    document.body.appendChild(overlay);
    const lbImg = overlay.querySelector('.lightbox-img');
    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
    }
    imgs.forEach(function(img) {
      img.addEventListener('click', function() { openLb(img.src, img.alt); });
    });
    overlay.addEventListener('click', closeLb);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeLb();
    });
  })();

  /* Active nav link based on current page */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function(a) {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
