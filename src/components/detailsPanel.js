export function renderDetailsPanel(details) {
  const { agencyName, agentName, submissionNumber, submissionStatus, insuredName } = details;
  return `
    <div class="details-panel">
      <div class="details-header">
        <span>DETAILS</span>
        <i class="fa-solid fa-chevron-down" id="details-chevron"></i>
      </div>
      <div class="details-grid">
        <div class="detail-item">
          <span class="label">Agency Name</span>
          <span class="val">${agencyName}</span>
        </div>
        <div class="detail-item">
          <span class="label">Agent Name</span>
          <span class="val">${agentName}</span>
        </div>
        <div class="detail-item">
          <span class="label">Submission Number</span>
          <span class="val">${submissionNumber}</span>
        </div>
        <div class="detail-item">
          <span class="label">Submission Status</span>
          <span class="val">${submissionStatus}</span>
        </div>
        <div class="detail-item">
          <span class="label">Insured Name</span>
          <span class="val">${insuredName}</span>
        </div>
      </div>
    </div>
  `;
}

export function attachDetailsToggle() {
  const header = document.querySelector('.details-header');
  if (!header) return;
  header.addEventListener('click', () => {
    const panel = document.querySelector('.details-panel');
    const grid = document.querySelector('.details-grid');
    const icon = document.getElementById('details-chevron');
    if (!panel || !grid || !icon) return;
    if (panel.classList.contains('collapsed')) {
      panel.classList.remove('collapsed');
      grid.style.display = 'flex';
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-down');
    } else {
      panel.classList.add('collapsed');
      grid.style.display = 'none';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-right');
    }
  });
}
