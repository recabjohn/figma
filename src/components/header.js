export function renderHeader({ showTools = false } = {}) {
  return `
    <header class="top-header">
      <div class="logo">
        <img src="/download.jpg" alt="Solartis" style="height: 28px; width: auto;" />
      </div>
      ${showTools ? `
        <div class="header-tools">
          <i class="fa-regular fa-file-lines" style="cursor: pointer"></i>
          <i class="fa-regular fa-bell" style="cursor: pointer"></i>
          <div class="avatar" style="cursor: pointer">U</div>
        </div>
      ` : ''}
    </header>
  `;
}
