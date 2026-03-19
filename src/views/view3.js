import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN13203B',
  submissionStatus: 'In Progress',
  insuredName: 't t',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- STEPPER WRAPPER -->
            <div class="stepper-wrapper">
              <div class="stepper-card" style="justify-content:space-between;">
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Agency &amp; Agent</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Insured Details</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Program Selection</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Risk/Coverage</span>
                </div>
                <div class="step active">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Program Selection</span>
                </div>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- RATE INDICATION CARD -->
            <div class="white-card">
              <div class="card-title">Rate Indication</div>
              <div class="grid-2col">
                <div class="floating-group">
                  <label>Subline *</label>
                  <select class="custom-select" id="page3-subline-select">
                    <option>Package Policy</option>
                  </select>
                </div>
                <div class="floating-group">
                  <label>State *</label>
                  <select class="custom-select"><option>AL</option></select>
                </div>
                <div class="floating-group">
                  <label>State *</label>
                  <select class="custom-select"><option>AK-Premises/Operations and Products/Completed Operations</option></select>
                </div>
                <div class="floating-group">
                  <label>Effective Date</label>
                  <div class="icon-input">
                    <input type="text" class="custom-input" value="03/21/2026">
                    <i class="fa-regular fa-calendar" style="position:absolute;right:12px;top:18px;"></i>
                  </div>
                </div>
                <div class="floating-group">
                  <label>Expiration Date</label>
                  <div class="icon-input">
                    <input type="text" class="custom-input" value="03/21/2027">
                    <i class="fa-regular fa-calendar" style="position:absolute;right:12px;top:18px;"></i>
                  </div>
                </div>
                <div class="floating-group">
                  <label>Billing Type</label>
                  <select class="custom-select"><option>Agency Bill</option></select>
                </div>
                <div class="floating-group">
                  <label>Quote Type</label>
                  <select class="custom-select" disabled><option>New Business</option></select>
                </div>
              </div>
            </div>

            <!-- GL SECTION -->
            <div id="gl-section" style="display:none;">
              <div class="toggle-row">
                <div class="toggle-label">General liability</div>
                <label class="switch">
                  <input type="checkbox" checked id="gl-toggle">
                  <span class="slider"></span>
                </label>
              </div>
              <div id="gl-content">
                <div class="section-header">Risk Schedule</div>
                <div class="table-container">
                  <div class="v-table-header">
                    <div class="v-col">Subline</div>
                    <div class="v-col">State</div>
                    <div class="v-col">Location Number</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- CA SECTION -->
            <div id="ca-section" style="display:none;">
              <div class="toggle-row">
                <div class="toggle-label">Commercial Automobile</div>
                <label class="switch">
                  <input type="checkbox" checked id="ca-toggle">
                  <span class="slider"></span>
                </label>
              </div>
              <div id="ca-content">
                <div class="section-header" style="margin-top:8px;">Vehicle Schedule</div>
                <div class="table-container">
                  <div class="v-table-header">
                    <div class="v-col" style="flex:0.5">Unit</div>
                    <div class="v-col" style="flex:1.5">VehicleSubTypes</div>
                    <div class="v-col" style="flex:1">ClassCode</div>
                    <div class="v-col" style="flex:1.5">OriginalClassNew</div>
                    <div class="v-col" style="flex:0.8">State</div>
                    <div class="v-col" style="flex:0.8">City</div>
                    <div class="v-col" style="flex:1">VIN</div>
                    <div class="v-col" style="flex:0.8">Year</div>
                    <div class="v-col" style="flex:1">Make</div>
                    <div class="v-col" style="flex:1">Model</div>
                    <div class="v-col" style="flex:1">Premium</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- TAXES AND FEES -->
            <div class="section-header" style="margin-top:8px;">
              Taxes and Fees <span class="sub-plus"><i class="fa-solid fa-plus"></i></span>
            </div>
            <div class="table-container" style="margin-bottom:24px;">
              <div class="v-table-header">
                <div class="v-col">TAX</div>
                <div class="v-col">PERCENTAGE</div>
                <div class="v-col">Amount</div>
                <div class="v-col">Action</div>
              </div>
              <div class="v-table-body">No Records To Display.</div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions" style="margin-bottom:24px;">
              <button class="btn btn-prev" id="prevBtn3">Previous</button>
              <button class="btn btn-next" style="padding:8px 32px;">Save</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  // Populate subline from state
  const sublineSelect = document.getElementById('page3-subline-select');
  if (state.selectedGL && state.selectedCA) {
    sublineSelect.innerHTML = '<option>Commercial Package Policy</option>';
  } else if (state.selectedCA) {
    sublineSelect.innerHTML = '<option>Commercial Automobile</option>';
  } else if (state.selectedGL) {
    sublineSelect.innerHTML = '<option>General Liability</option>';
  } else {
    sublineSelect.innerHTML = '<option>Package Policy</option>';
  }

  // Show/hide GL and CA sections
  const glSection = document.getElementById('gl-section');
  const caSection = document.getElementById('ca-section');
  if (state.selectedGL) glSection.style.display = 'block';
  if (state.selectedCA) caSection.style.display = 'block';

  // Toggle switches
  const glToggle = document.getElementById('gl-toggle');
  const glContent = document.getElementById('gl-content');
  const caToggle = document.getElementById('ca-toggle');
  const caContent = document.getElementById('ca-content');

  if (glToggle) {
    glToggle.addEventListener('change', (e) => {
      glContent.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  if (caToggle) {
    caToggle.addEventListener('change', (e) => {
      caContent.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  // Navigation
  document.getElementById('prevBtn3').addEventListener('click', () => navigate('view2'));

  attachDetailsToggle();
}
