/** 侧边栏折叠交互：点击章节头折叠/展开，状态存 localStorage */
/** 移动端：顶栏汉堡按钮开合抽屉式侧边栏（窄屏生效，桌面无此元素） */

const menuBtn = document.getElementById('menu-btn');
const backdrop = document.getElementById('sidebar-backdrop');

function setSidebarOpen(open: boolean) {
  document.body.classList.toggle('sidebar-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  if (backdrop) backdrop.hidden = !open;
}

menuBtn?.addEventListener('click', () =>
  setSidebarOpen(!document.body.classList.contains('sidebar-open'))
);
backdrop?.addEventListener('click', () => setSidebarOpen(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setSidebarOpen(false);
});

const navEl = document.querySelector<HTMLElement>('.sidebar__nav');
const STORAGE_KEY = 'sc-nav-collapsed';

function collapsedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function save(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* 忽略 */
  }
}

function applyCollapsed() {
  for (const id of collapsedIds()) {
    const el = document.getElementById('section-' + id);
    // 当前页所属章节不折叠（force-open 由构建期注入）
    if (!el || el.dataset.forceOpen === 'true') continue;
    el.classList.add('is-collapsed');
    el.querySelector('.section-head')?.setAttribute('aria-expanded', 'false');
  }
}

function toggle(id: string) {
  const el = document.getElementById('section-' + id);
  if (!el) return;
  const collapsed = el.classList.toggle('is-collapsed');
  el.querySelector('.section-head')?.setAttribute('aria-expanded', String(!collapsed));
  const ids = collapsedIds();
  const i = ids.indexOf(id);
  if (collapsed && i === -1) ids.push(id);
  if (!collapsed && i !== -1) ids.splice(i, 1);
  save(ids);
}

if (navEl) {
  navEl.addEventListener('click', (e) => {
    const head = (e.target as HTMLElement).closest<HTMLElement>('.section-head');
    if (!head) return;
    const section = head.closest<HTMLElement>('.section');
    if (section?.dataset.section && section.classList.contains('has-children')) {
      toggle(section.dataset.section);
    }
  });

  navEl.addEventListener('keydown', (e) => {
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      (e.target as HTMLElement).classList?.contains('section-head')
    ) {
      e.preventDefault();
      const section = (e.target as HTMLElement).closest<HTMLElement>('.section');
      if (section?.dataset.section && section.classList.contains('has-children')) {
        toggle(section.dataset.section);
      }
    }
  });

  // 移动端：点击导航链接后收起抽屉
  navEl.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setSidebarOpen(false);
  });

  applyCollapsed();
}
