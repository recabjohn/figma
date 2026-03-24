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
                    <div class="v-col" style="flex:4; text-align:left;">Subline</div>
                    <div class="v-col" style="flex:1; text-align:center;">State</div>
                    <div class="v-col" style="flex:1; text-align:right;">Location Number</div>
                  </div>
                  <div class="v-table-body" style="padding:0;">
                    <div style="display: flex; padding: 12px 16px; border-bottom: 1px solid #e1e6eb; align-items: center; font-size: 12px; color: #23282c;">
                      <div style="flex:4; text-align:left;">Premises/Operations and Products/Completed Operations</div>
                      <div style="flex:1; text-align:center;">CT</div>
                      <div style="flex:1; text-align:right;">1</div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 11px; color: #5d6773; padding: 12px 16px;">
                      <span style="margin-right: 16px;">Rows per page: <select style="border:none; background:transparent; font-size:11px; color:#23282c; cursor:pointer;"><option>5</option></select></span>
                      <span style="margin-right: 16px;">1-1 of 1</span>
                      <i class="fa-solid fa-chevron-left" style="margin-right: 16px; color:#ccc; cursor:not-allowed;"></i>
                      <i class="fa-solid fa-chevron-right" style="color:#ccc; cursor:not-allowed;"></i>
                    </div>
                  </div>
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
                    <div class="v-col" style="flex:0.8; text-align:center;">Unit</div>
                    <div class="v-col" style="flex:1.5; text-align:center;">VehicleSubTypes</div>
                    <div class="v-col" style="flex:1.2; text-align:center;">ClassCode</div>
                    <div class="v-col" style="flex:1.8; text-align:center;">OriginalClassNew</div>
                    <div class="v-col" style="flex:0.8; text-align:center;">State</div>
                    <div class="v-col" style="flex:1.2; text-align:center;">City</div>
                    <div class="v-col" style="flex:1.2; text-align:center;">VIN</div>
                    <div class="v-col" style="flex:0.8; text-align:center;">Year</div>
                    <div class="v-col" style="flex:1.2; text-align:center;">Make</div>
                    <div class="v-col" style="flex:1.2; text-align:center;">Model</div>
                    <div class="v-col" style="flex:1.2; text-align:right;">Premium</div>
                  </div>
                  <div class="v-table-body" style="padding:0;">
                    <div style="display: flex; padding: 12px 16px; border-bottom: 1px solid #e1e6eb; align-items: center; font-size: 11px; color: #23282c;">
                      <div style="flex:0.8; text-align:center;">1</div>
                      <div style="flex:1.5; text-align:center;">Passenger</div>
                      <div style="flex:1.2; text-align:center;">123456</div>
                      <div style="flex:1.8; text-align:center;">New</div>
                      <div style="flex:0.8; text-align:center;">AL</div>
                      <div style="flex:1.2; text-align:center;">Birmingham</div>
                      <div style="flex:1.2; text-align:center;">ABC123XYZ</div>
                      <div style="flex:0.8; text-align:center;">2024</div>
                      <div style="flex:1.2; text-align:center;">Toyota</div>
                      <div style="flex:1.2; text-align:center;">Camry</div>
                      <div style="flex:1.2; text-align:right;">$ 500.00</div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 11px; color: #5d6773; padding: 12px 16px;">
                      <span style="margin-right: 16px;">Rows per page: <select style="border:none; background:transparent; font-size:11px; color:#23282c; cursor:pointer;"><option>5</option></select></span>
                      <span style="margin-right: 16px;">1-1 of 1</span>
                      <i class="fa-solid fa-chevron-left" style="margin-right: 16px; color:#ccc; cursor:not-allowed;"></i>
                      <i class="fa-solid fa-chevron-right" style="color:#ccc; cursor:not-allowed;"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PACKAGE PREMIUM BREAKDOWN -->
            ${state.selectedGL && state.selectedCA ? `
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;margin-bottom:16px;overflow:hidden;">
              <table style="width:100%;border-collapse:collapse;font-size:12px;color:#23282c;">
                <thead>
                  <tr style="background:#e8edf1;">
                    <th style="padding:10px 16px;text-align:left;font-weight:600;font-size:11px;color:#5d6773;">Subline</th>
                    <th style="padding:10px 16px;text-align:right;font-weight:600;font-size:11px;color:#5d6773;">Written Premium</th>
                    <th style="padding:10px 16px;text-align:right;font-weight:600;font-size:11px;color:#5d6773;">Surplus Lines Tax</th>
                    <th style="padding:10px 16px;text-align:right;font-weight:600;font-size:11px;color:#5d6773;">Stamping Fee</th>
                    <th style="padding:10px 16px;text-align:right;font-weight:600;font-size:11px;color:#5d6773;">Total Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid #e1e6eb;">
                    <td style="padding:10px 16px;">General Liability</td>
                    <td style="padding:10px 16px;text-align:right;">$300.00</td>
                    <td style="padding:10px 16px;text-align:right;">$9.00</td>
                    <td style="padding:10px 16px;text-align:right;">$0.75</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:600;">$309.75</td>
                  </tr>
                  <tr style="border-bottom:1px solid #e1e6eb;">
                    <td style="padding:10px 16px;">Commercial Automobile</td>
                    <td style="padding:10px 16px;text-align:right;">$500.00</td>
                    <td style="padding:10px 16px;text-align:right;">$15.00</td>
                    <td style="padding:10px 16px;text-align:right;">$1.25</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:600;">$516.25</td>
                  </tr>
                  <tr style="background:#f5f7f9;">
                    <td style="padding:10px 16px;font-weight:700;color:#1e3a5f;">Package Total</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:700;color:#1e3a5f;">$800.00</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:700;color:#1e3a5f;">$24.00</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:700;color:#1e3a5f;">$2.00</td>
                    <td style="padding:10px 16px;text-align:right;font-weight:700;color:#1e3a5f;">$826.00</td>
                  </tr>
                </tbody>
              </table>
            </div>` : ''}

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

            <!-- SAVE / GET AVAILABLE CARRIERS -->
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-bottom:16px;">
              <button class="btn btn-next" id="save-btn" style="padding:8px 28px; background:#1e3a5f;">Save</button>
              <button class="btn btn-next" id="get-carriers-btn" style="padding:8px 28px; background:#1e3a5f; display:none;">Get Available Carriers</button>
            </div>

            <!-- CARRIER ROW -->
            <div id="carrier-row" style="display:none; align-items:center; background:#fff; border:1px solid #e1e6eb; border-radius:6px; padding:12px 16px; gap:24px; margin-bottom:24px; box-shadow:0 1px 4px rgba(0,0,0,0.07); font-size:13px;">
              <div style="min-width:100px;">
                <div style="font-size:11px; color:#5d6773;">Total Premium</div>
                <div id="carrier-premium" style="font-weight:600; color:#23282c;">$0.00</div>
              </div>
              <div style="color:#23282c; font-weight:500; min-width:130px;">Solartis Insurance</div>
              <div style="color:#2196f3; cursor:pointer; min-width:100px;">Subjectivities</div>
              <div style="color:#2196f3; cursor:pointer; min-width:60px;">Forms</div>
              <div style="flex:1;"></div>
              <button class="carrier-action-btn" style="display:none; padding:7px 14px; background:#1e3a5f; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">Preview Rating Worksheet</button>
              <button class="carrier-action-btn" style="display:none; padding:7px 14px; background:#1e3a5f; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">Preview Quote</button>
              <button id="create-quote-btn" class="carrier-action-btn" style="display:none; padding:7px 14px; background:#1e3a5f; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">Create Quote</button>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="white-card" style="padding:24px; margin-bottom:24px;">
              <div style="margin-bottom:48px;">
                <button class="btn btn-prev" id="prevBtn3" style="background-color:#375471;">Previous</button>
              </div>
              <div style="display:flex; justify-content:flex-end;">
                <button class="btn btn-next" id="nextBtn3" style="background-color:#375471;">Next</button>
              </div>
            </div>

          </div>
        </main>
      </div>
      <footer class="footer">
        <div><span class="brand">Solartis</span> &copy; 2026</div>
        <div>Powered by <span class="brand">Solartis</span></div>
      </footer>
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

  // Save button - show Get Available Carriers
  document.getElementById('save-btn').addEventListener('click', () => {
    document.getElementById('get-carriers-btn').style.display = '';
  });

  // Get Available Carriers - show carrier row and action buttons, update premium
  document.getElementById('get-carriers-btn').addEventListener('click', () => {
    document.getElementById('carrier-row').style.display = 'flex';
    document.getElementById('carrier-premium').textContent = '$826.00';
    document.querySelectorAll('.carrier-action-btn').forEach(btn => {
      btn.style.display = '';
    });
  });

  // Create Quote toast then navigate to Quote Details
  document.getElementById('create-quote-btn').addEventListener('click', () => {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:16px;right:16px;background:#2e7d32;color:#fff;padding:16px 20px;border-radius:4px;font-size:14px;font-weight:500;z-index:9999;display:flex;align-items:center;gap:16px;min-width:260px;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
    toast.innerHTML = '<span>Quote Created Successfully</span><span style="cursor:pointer;font-size:18px;line-height:1;margin-left:auto;">&#x2715;</span>';
    document.body.appendChild(toast);
    toast.querySelector('span:last-child').addEventListener('click', () => toast.remove());
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
      navigate('view4');
    }, 1500);
  });

  // Navigation
  document.getElementById('prevBtn3').addEventListener('click', () => navigate('view2'));
  document.getElementById('nextBtn3').addEventListener('click', () => navigate('view4'));

  attachDetailsToggle();
}
