/** 暗色模式切换：点击按钮在 light/dark 间切换并记住选择（初始值见 BaseLayout 内联脚本） */

const btn = document.getElementById('theme-btn');

btn?.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('sc-theme', next);
  } catch {
    /* 忽略 */
  }
});
