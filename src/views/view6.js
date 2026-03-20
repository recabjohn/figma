import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN132459',
  submissionStatus: 'In Progress',
  insuredName: 's Test',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            ${renderDetailsPanel(details)}

            <!-- TOP TABS -->
            <div style="display:flex;border-bottom:1px solid #e1e6eb;margin-bottom:20px;font-size:13px;color:#5d6773;">
              <div style="padding:10px 20px;display:flex;align-items:center;gap:6px;cursor:pointer;">
                <i class="fa-regular fa-circle"></i> Quote Details
              </div>
              <div style="padding:10px 20px;display:flex;align-items:center;gap:6px;cursor:pointer;">
                <i class="fa-regular fa-circle"></i> Schedule Of Forms
              </div>
              <div style="padding:10px 20px;display:flex;align-items:center;gap:6px;cursor:pointer;">
                <i class="fa-regular fa-circle"></i> Subjectivities
              </div>
            </div>

            <!-- ISSUE BINDER CARD -->
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:24px;margin-bottom:24px;">
              <h2 style="font-size:17px;font-weight:600;color:#23282c;margin-bottom:24px;">Issue Binder</h2>

              <!-- FORM FIELDS -->
              <div style="display:grid;grid-template-columns:200px 1fr;gap:16px 24px;align-items:center;font-size:13px;margin-bottom:20px;">
                <label style="color:#5d6773;">Effective Date *</label>
                <input type="text" value="03/21/2026" style="border:none;border-bottom:1px solid #ccc;padding:6px 4px;font-size:13px;color:#23282c;outline:none;background:transparent;width:100%;">

                <label style="color:#5d6773;">Email Address *</label>
                <input type="email" value="test@test.com" style="border:none;border-bottom:1px solid #ccc;padding:6px 4px;font-size:13px;color:#23282c;outline:none;background:transparent;width:100%;">

                <label style="color:#5d6773;">Phone Number *</label>
                <input type="text" value="(768) 900-9879" style="border:none;border-bottom:1px solid #ccc;padding:6px 4px;font-size:13px;color:#23282c;outline:none;background:transparent;width:100%;">

                <label style="color:#5d6773;">Policy Number</label>
                <input type="text" placeholder="Policy Number" style="border:none;border-bottom:1px solid #ccc;padding:6px 4px;font-size:13px;color:#aaa;outline:none;background:transparent;width:100%;">
              </div>

              <!-- SUBJECTIVITY TABLE -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
                <div style="display:flex;background:#dceaf4;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                  <div style="flex:4;">Subjectivity</div>
                  <div style="flex:1;">Level</div>
                  <div style="flex:2;">Risk Name</div>
                  <div style="flex:1.5;">Current Status</div>
                </div>
                ${state.selectedGL ? `
                <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;align-items:center;">
                  <div style="flex:4;color:#c0392b;cursor:pointer;">Proof of Business Income Verification</div>
                  <div style="flex:1;color:#c0392b;">Policy</div>
                  <div style="flex:2;color:#5d6773;">General Liability</div>
                  <div style="flex:1.5;color:#c0392b;">Open</div>
                </div>` : ''}
                ${state.selectedCA ? `
                <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;align-items:center;">
                  <div style="flex:4;color:#c0392b;cursor:pointer;">Driver's License Verification</div>
                  <div style="flex:1;color:#c0392b;">Vehicle</div>
                  <div style="flex:2;color:#5d6773;">Commercial Automobile</div>
                  <div style="flex:1.5;color:#c0392b;">Open</div>
                </div>` : ''}
                <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                  <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                  <span>1-${[state.selectedGL, state.selectedCA].filter(Boolean).length} of ${[state.selectedGL, state.selectedCA].filter(Boolean).length}</span>
                  <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                  <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                </div>
              </div>

              <!-- BOTTOM BUTTONS -->
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;gap:12px;">
                  <button id="binder-back-btn" class="btn btn-prev" style="padding:7px 20px;">Back</button>
                  <button class="btn btn-next" style="padding:7px 20px;">Preview Binder</button>
                  <button class="btn btn-next" style="padding:7px 20px;">Go To Subjectivity</button>
                </div>
                <button id="issue-binder-btn" class="btn btn-next" style="padding:7px 20px;">Issue Binder</button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  document.getElementById('binder-back-btn').addEventListener('click', () => {
    if (state.policyStatus === 'Issued') {
      navigate('view5');
    } else {
      navigate('view4');
    }
  });

  document.getElementById('issue-binder-btn').addEventListener('click', () => {
    navigate('view5');
  });

  attachDetailsToggle();
}
