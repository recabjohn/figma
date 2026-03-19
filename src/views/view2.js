import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
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

            <!-- STEPPER WRAPPER -->
            <div class="stepper-wrapper">
              <div class="stepper-card" style="gap:80px;">
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
                <div class="step active">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Risk/Coverage</span>
                </div>
                <div class="step">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Program Selection</span>
                </div>
              </div>
              <div class="secondary-tabs">
                <div class="sec-tab active" id="tab-gl">
                  <i class="fa-regular fa-circle-down"></i>
                  <span>General Liability</span>
                </div>
                <div class="sec-tab" id="tab-ca">
                  <i class="fa-regular fa-circle-down"></i>
                  <span>Commercial Automobile</span>
                </div>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- GL CONTENT -->
            <div id="content-gl">
              <div class="accordion-card">
                <div class="acc-row" id="state-row">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  STATE
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-state-btn" style="cursor:pointer;"></i>
                </div>

                <div class="state-form-container" id="state-form" style="display:none;">
                  <div class="form-group" style="position:relative;margin-top:16px;">
                    <label id="lbl-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AK">Alaska</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                  <div class="form-group" id="subline-group" style="display:none;position:relative;margin-top:28px;">
                    <label style="font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">Subline *</label>
                    <select class="custom-select" id="subline-select">
                      <option value="" disabled selected hidden>Select</option>
                      <option value="1">Premises/Operations and Products/Completed Operations</option>
                      <option value="2">Premises/Operations</option>
                      <option value="3">Products/Completed Operations</option>
                      <option value="4">Liquor</option>
                      <option value="5">Owners and Contractors</option>
                      <option value="6">Pollution</option>
                      <option value="7">Product Withdrawal</option>
                      <option value="8">Railroad</option>
                      <option value="9">Underground Storage Tank</option>
                      <option value="10">Electronic Data Liability</option>
                    </select>
                  </div>
                  <div class="form-actions">
                    <button class="btn btn-save">Save</button>
                  </div>
                </div>

                <div class="acc-row" style="border-top:2px solid #f0f3f6;">
                  <i class="fa-solid fa-chevron-right acc-icon"></i>
                  RISK SCHEDULE
                </div>
              </div>
            </div>

            <!-- CA CONTENT -->
            <div id="content-ca" style="display:none;">
              <div class="accordion-card">
                <div class="acc-row" id="policy-row" style="border-bottom:2px solid #f0f3f6;">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  POLICY
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-policy-btn" style="cursor:pointer;"></i>
                </div>

                <div class="state-form-container" id="policy-form-container" style="display:none;padding-bottom:24px;">
                  <div class="form-group" style="position:relative;">
                    <label id="lbl-policy-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="policy-state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="CA">California</option>
                    </select>
                    <p id="policy-state-error" style="color:#d9534f;font-size:11px;margin-top:4px;display:none;">State is required.</p>
                  </div>

                  <div id="policy-details" style="display:none;margin-top:24px;">
                    <div class="floating-group">
                      <label>NAICS Code *</label>
                      <select class="custom-select"><option>111110</option></select>
                    </div>
                    <div class="floating-group">
                      <label>NAICS Definition *</label>
                      <select class="custom-select"><option>Soybean Farming</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Symbol Rating Applies *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="sym" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="sym" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Rate With RACA *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="raca" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="raca" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Policy Type *</label>
                      <select class="custom-select"><option>Business Auto Coverage Form</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Individual Named Insured On The Policy *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="indi" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="indi" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Legal Entity</label>
                      <select class="custom-select"><option>Corporation</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Accept Certified Acts Of Terrorism Coverage *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="terr" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="terr" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Liability Deductible *</label>
                      <select class="custom-select"><option>No Deductible</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Ride Sharing Arrangements Endorsement Indicator *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>

                    <div class="subheader">Uninsured Motorists Coverage</div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Type *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Combined Single Limit *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Split Limit *</option></select>
                    </div>

                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Gross Receipts Basis Or Mileage Basis</div>
                        <div style="font-size:11px;margin-top:4px;">Gross Receipts Basis Or Mileage Basis *</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="gross" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="gross" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Experience Rating</div>
                        <div style="font-size:11px;margin-top:4px;">Experience Rating</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="exp" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="exp" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Schedule Rating</div>
                        <div style="font-size:11px;margin-top:4px;">Schedule Rating Applies</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="sch" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="sch" class="custom-radio"> Yes</label>
                      </div>
                    </div>

                    <div class="subheader">Minimum Premiums</div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Auto Dealers Liability Premium To Reach Minimum Coverage</div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:24px;">Special Types Repossessed Auto Liability Premium To Reach Minimum Coverage</div>

                    <div class="inner-card">
                      <div class="subheader" style="margin-top:0;">Non-Truckers Liability Coverage</div>
                      <div class="floating-group">
                        <label>Liability Coverage Type *</label>
                        <select class="custom-select"><option>Combined Single Limit</option></select>
                      </div>
                      <div class="floating-group">
                        <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Liability Premium</p>
                        <label>Liability Limit *</label>
                        <select class="custom-select"><option>500,000</option></select>
                      </div>
                      <div style="font-size:11px;color:#5d6773;margin-bottom:4px;">Liability Deductible</div>
                      <div class="radio-row">
                        <div class="radio-labels">With Hold Harmless Agreement *</div>
                        <div class="radio-options">
                          <label class="radio-option"><input type="radio" name="hold" checked class="custom-radio"> No</label>
                          <label class="radio-option"><input type="radio" name="hold" class="custom-radio"> Yes</label>
                        </div>
                      </div>
                      <div class="floating-group">
                        <label>Cost Of Hire - Insured Providing Primary *</label>
                        <input type="text" class="custom-input" value="0">
                      </div>
                      <div class="floating-group">
                        <label>Cost Of Hire - Insured Providing Excess *</label>
                        <input type="text" class="custom-input" value="0">
                      </div>
                    </div>

                    <div class="subheader">Physical Damage Coverages</div>
                    <div class="floating-group">
                      <label>Other Than Collision Coverage Type *</label>
                      <select class="custom-select"><option>No Coverage</option></select>
                    </div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Other Than Collision Premium</p>
                      <label>Deductible *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Collision Coverage Type *</label>
                      <select class="custom-select"><option>No Coverage</option></select>
                    </div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Collision Premium</p>
                      <label>Deductible *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Zip Code">
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Non-Ownership Risk Type *</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Number Of Employees *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Garaging Location">
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Zip Code *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Territory *</option></select>
                    </div>
                  </div>

                  <div class="form-actions" style="margin-top:24px;">
                    <button class="btn btn-save" id="policy-save-btn">Save</button>
                  </div>
                </div>

                <div class="acc-row" style="padding-bottom:24px;border-top:2px solid #f0f3f6;border-bottom:none;">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  VEHICLE
                  <i class="fa-solid fa-circle-plus plus-icon" style="cursor:pointer;"></i>
                </div>

                <div class="vehicle-table-container">
                  <div class="v-table-header">
                    <div class="v-col">Unit<div class="v-line"></div></div>
                    <div class="v-col">Class Code<div class="v-line"></div></div>
                    <div class="v-col">Original Cost New<div class="v-line"></div></div>
                    <div class="v-col">State<div class="v-line"></div></div>
                    <div class="v-col">Year<div class="v-line"></div></div>
                    <div class="v-col">Make<div class="v-line"></div></div>
                    <div class="v-col">Model<div class="v-line"></div></div>
                    <div class="v-col">VIN<div class="v-line"></div></div>
                    <div class="v-col">Vehicle Sub Types<div class="v-line"></div></div>
                    <div class="v-col" style="flex:0.5;">Action</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions">
              <button class="btn btn-prev" id="prevBtn2">Previous</button>
              <button class="btn btn-next" id="nextBtn2">Next</button>
            </div>

          </div>

          <footer class="footer">
            <div><span class="brand">Solartis</span> &copy; 2026</div>
            <div>Powered by <span class="brand">Solartis</span></div>
          </footer>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  // Tab switching
  const tabGL = document.getElementById('tab-gl');
  const tabCA = document.getElementById('tab-ca');
  const contentGL = document.getElementById('content-gl');
  const contentCA = document.getElementById('content-ca');

  tabGL.addEventListener('click', () => {
    tabGL.classList.add('active');
    tabCA.classList.remove('active');
    contentGL.style.display = 'block';
    contentCA.style.display = 'none';
  });
  tabCA.addEventListener('click', () => {
    tabCA.classList.add('active');
    tabGL.classList.remove('active');
    contentCA.style.display = 'block';
    contentGL.style.display = 'none';
  });

  // STATE accordion
  const addStateBtn = document.getElementById('add-state-btn');
  const stateForm = document.getElementById('state-form');
  const stateRow = document.getElementById('state-row');
  const stateSelect = document.getElementById('state-select');
  const lblState = document.getElementById('lbl-state');
  const sublineGroup = document.getElementById('subline-group');

  addStateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (stateForm.style.display === 'none') {
      stateForm.style.display = 'block';
      stateRow.style.paddingBottom = '20px';
      stateRow.style.borderBottom = 'none';
    } else {
      stateForm.style.display = 'none';
      stateRow.style.paddingBottom = '40px';
      stateRow.style.borderBottom = '2px solid #f0f3f6';
    }
  });

  stateSelect.addEventListener('change', () => {
    if (stateSelect.value) {
      lblState.style.display = 'block';
      sublineGroup.style.display = 'block';
    } else {
      lblState.style.display = 'none';
      sublineGroup.style.display = 'none';
    }
  });

  // POLICY accordion
  const addPolicyBtn = document.getElementById('add-policy-btn');
  const policyFormContainer = document.getElementById('policy-form-container');
  const policyRow = document.getElementById('policy-row');
  const policyStateSelect = document.getElementById('policy-state-select');
  const policyDetails = document.getElementById('policy-details');
  const lblPolicyState = document.getElementById('lbl-policy-state');
  const policySaveBtn = document.getElementById('policy-save-btn');
  const policyStateError = document.getElementById('policy-state-error');

  addPolicyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (policyFormContainer.style.display === 'none') {
      policyFormContainer.style.display = 'block';
      policyRow.style.paddingBottom = '20px';
      policyRow.style.borderBottom = 'none';
    } else {
      policyFormContainer.style.display = 'none';
      policyRow.style.paddingBottom = '40px';
      policyRow.style.borderBottom = '2px solid #f0f3f6';
    }
  });

  policyStateSelect.addEventListener('change', () => {
    if (policyStateSelect.value) {
      lblPolicyState.style.display = 'block';
      policyDetails.style.display = 'block';
      policyStateError.style.display = 'none';
    } else {
      lblPolicyState.style.display = 'none';
      policyDetails.style.display = 'none';
    }
  });

  policySaveBtn.addEventListener('click', () => {
    if (!policyStateSelect.value) {
      policyStateError.style.display = 'block';
    }
  });

  // Navigation
  document.getElementById('prevBtn2').addEventListener('click', () => navigate('view1'));
  document.getElementById('nextBtn2').addEventListener('click', () => navigate('view3'));

  attachDetailsToggle();
}
