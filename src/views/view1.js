import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN131907',
  submissionStatus: 'In Progress',
  insuredName: 'test test',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- STEPPER CARD -->
            <div class="stepper-card" style="gap:100px;">
              <div class="step completed">
                <i class="fa-solid fa-check-circle"></i>
                <span>Agency &amp; Agent</span>
              </div>
              <div class="step completed">
                <i class="fa-solid fa-check-circle"></i>
                <span>Insured Details</span>
              </div>
              <div class="step active">
                <i class="fa-solid fa-file-alt"></i>
                <span>Program Selection</span>
              </div>
              <div class="step">
                <i class="fa-solid fa-file-alt"></i>
                <span>Risk/Coverage</span>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- MAIN PROGRAM INFO CARD -->
            <div class="program-info">
              <h2>Program Information</h2>
              <div class="subtitle">Select Program</div>
              <div class="checkbox-container">
                <label class="custom-check-row">
                  <input type="checkbox" class="custom-checkbox" id="gl-check" ${state.selectedGL ? 'checked' : ''} />
                  General Liability
                </label>
                <label class="custom-check-row">
                  <input type="checkbox" class="custom-checkbox" id="ca-check" ${state.selectedCA ? 'checked' : ''} />
                  Commercial Automobile
                </label>
              </div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions">
              <button class="btn btn-prev">Previous</button>
              <button class="btn btn-next" id="nextBtn">Next</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', () => {
    const glCheck = document.getElementById('gl-check');
    const caCheck = document.getElementById('ca-check');
    if (glCheck.checked && caCheck.checked) {
      state.selectedGL = glCheck.checked;
      state.selectedCA = caCheck.checked;
      navigate('view2');
    } else {
      alert('Please click both General Liability and Commercial Automobile to proceed.');
    }
  });
  attachDetailsToggle();
}
