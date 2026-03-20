import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003 testagent1003',
  submissionNumber: 'SN132459',
  submissionStatus: 'Offered',
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

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- TOP TAB BAR -->
            <div style="display:flex;border-bottom:1px solid #e1e6eb;margin-bottom:20px;font-size:13px;color:#5d6773;gap:0;">
              <div id="tab-quote-details" style="padding:10px 20px;border-bottom:2px solid #1e3a5f;color:#1e3a5f;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="fa-regular fa-circle-dot"></i> Quote Details
              </div>
              <div id="tab-schedule-forms" style="padding:10px 20px;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="fa-regular fa-circle"></i> Schedule Of Forms
              </div>
              <div id="tab-subjectivities" style="padding:10px 20px;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="fa-regular fa-circle"></i> Subjectivities
              </div>
            </div>

            <!-- TAB CONTENT: QUOTE DETAILS -->
            <div id="tab-content-quote-details">
              <h2 style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:16px;">Quote Details</h2>

              <!-- action row -->
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <span id="return-to-program" style="color:#2196f3;cursor:pointer;font-size:13px;">Return To Program Selection</span>
                <button id="bind-request-btn" class="btn btn-next" style="padding:7px 18px;">Bind Request</button>
                <button class="btn btn-next" style="padding:7px 18px;">Lapse</button>
                <button class="btn btn-next" style="padding:7px 18px;">Decline</button>
              </div>

              <!-- premium row -->
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#23282c;margin-bottom:16px;">
                <span>Total Premium</span><i class="fa-solid fa-caret-down" style="font-size:10px;"></i>
                <span style="font-weight:600;">$21.57</span>
              </div>

              <!-- QUOTE LIST accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="quote-list-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>QUOTE LIST</span>
                  <i class="fa-solid fa-chevron-down" id="quote-list-icon"></i>
                </div>
                <div id="quote-list-body" style="padding:16px;background:#fff;">

                  <!-- quote number row -->
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:13px;">
                    <span style="color:#23282c;">Quote Number - <strong>Q00-0016603</strong></span>
                    <span style="color:#23282c;">Quote Status - <strong>Offered</strong></span>
                  </div>

                  <!-- 2-col detail grid -->
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 32px;font-size:13px;margin-bottom:20px;">
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Insured Name</span><span style="color:#23282c;">s Test</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Location Address</span><span style="color:#23282c;"></span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Agency Name</span><span style="color:#23282c;">TestAgency9590</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Agent Name</span><span style="color:#23282c;">testagent1003 testagent1003</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Subline</span><span style="color:#2196f3;">${state.selectedGL && state.selectedCA ? 'Commercial Package Policy' : state.selectedGL ? 'Commercial General Liability' : 'Commercial Automobile'}</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">CarrierDisplayName</span><span style="color:#23282c;">Solartis Insurance</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Quote Effective Date</span><span style="color:#23282c;">03/21/2026</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Quote Expiration Date</span><span style="color:#23282c;">03/21/2027</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Submission Number</span><span style="color:#23282c;">SN132459</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Quote Type</span><span style="color:#23282c;">New Business</span></div>
                    <div><span style="color:#5d6773;min-width:160px;display:inline-block;">Billing Type</span><span style="color:#23282c;">AgencyBill</span></div>
                  </div>

                  <!-- Documents section -->
                  <div style="font-size:15px;font-weight:600;color:#23282c;margin-bottom:12px;">Documents</div>
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;">
                    <div style="display:flex;background:#dceaf4;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                      <div style="flex:1.5;">Name</div>
                      <div style="flex:4;">Document</div>
                      <div style="flex:1.5;">Created by</div>
                      <div style="flex:2;">Created Date &amp; Time</div>
                    </div>
                    <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                      <div style="flex:1.5;">Quote Proposal</div>
                      <div style="flex:4;color:#2196f3;cursor:pointer;">Quote Proposal_MAR-20-2026-6-25-22_963144867.pdf</div>
                      <div style="flex:1.5;">uiuxunderwriter</div>
                      <div style="flex:2;">03-20-2026 06:25:21</div>
                    </div>
                    <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                      <div style="flex:1.5;">Rating Worksheet</div>
                      <div style="flex:4;color:#2196f3;cursor:pointer;">Rating Worksheet_MAR-20-2026-6-25-22_-1296479623.pdf</div>
                      <div style="flex:1.5;">uiuxunderwriter</div>
                      <div style="flex:2;">03-20-2026 06:25:21</div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                      <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                      <span>1-2 of 2</span>
                      <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                      <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- TAB CONTENT: SCHEDULE OF FORMS -->
            <div id="tab-content-schedule-forms" style="display:none;">
              <h2 style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:16px;">Schedule Of Forms</h2>
              <div style="font-size:13px;color:#5d6773;">No forms available.</div>
            </div>

            <!-- TAB CONTENT: SUBJECTIVITIES -->
            <div id="tab-content-subjectivities" style="display:none;">

              <!-- SUBJECTIVITIES accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>SUBJECTIVITIES</span>
                  <i class="fa-solid fa-chevron-up"></i>
                </div>
                <div style="padding:16px;background:#fff;">

                  <div style="display:flex;justify-content:flex-end;margin-bottom:16px;">
                    <button class="btn btn-next" style="padding:7px 18px;font-size:12px;">Add New Subjectivity</button>
                  </div>

                  <!-- Subjectivity List header -->
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;">
                    <span style="font-weight:600;color:#23282c;">Subjectivity List</span>
                    <span style="font-size:12px;color:#5d6773;cursor:pointer;">Action &gt; _______________</span>
                  </div>

                  <!-- table -->
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
                    <div style="display:flex;background:#dceaf4;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;align-items:center;">
                      <div style="width:32px;"></div>
                      <div style="flex:1.2;">Required Process</div>
                      <div style="flex:3;">Subjectivity</div>
                      <div style="flex:1;">Level</div>
                      <div style="flex:1.5;">Last Modified By</div>
                      <div style="flex:1;">Status</div>
                      <div style="flex:1;">Due Date</div>
                      <div style="flex:0.5;">Action</div>
                    </div>
                    <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                      <div style="width:32px;"><input type="checkbox"></div>
                      <div style="flex:1.2;">Pre Bind</div>
                      <div style="flex:3;color:#2196f3;cursor:pointer;">Proof of Business Income Verification</div>
                      <div style="flex:1;">Policy</div>
                      <div style="flex:1.5;">uiuxunderwriter</div>
                      <div style="flex:1;">Satisfied</div>
                      <div style="flex:1;">04/20/2026</div>
                      <div style="flex:0.5;">&#8942;</div>
                    </div>
                    <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                      <div style="width:32px;"><input type="checkbox"></div>
                      <div style="flex:1.2;">Post Bind</div>
                      <div style="flex:3;color:#2196f3;cursor:pointer;">Proof of Licenses/Permits</div>
                      <div style="flex:1;">Policy</div>
                      <div style="flex:1.5;">uiuxunderwriter</div>
                      <div style="flex:1;">Satisfied</div>
                      <div style="flex:1;">04/05/2026</div>
                      <div style="flex:0.5;">&#8942;</div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                      <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                      <span>1-2 of 2</span>
                      <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                      <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                    </div>
                  </div>

                  <!-- Attachments -->
                  <div style="font-size:14px;font-weight:600;color:#23282c;margin-bottom:8px;">Attachments <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;"></i></div>
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
                    <div style="display:flex;background:#dceaf4;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                      <div style="flex:2;">Attachment Name</div>
                      <div style="flex:1.5;text-align:center;">Uploaded By</div>
                      <div style="flex:1.5;text-align:center;">Uploaded Date</div>
                      <div style="flex:2;text-align:center;">Subjectivity List</div>
                    </div>
                    <div style="text-align:center;padding:14px;font-size:12px;color:#23282c;font-weight:600;">No Records To Display.</div>
                  </div>

                  <!-- Diary Notes -->
                  <div style="font-size:14px;font-weight:600;color:#23282c;margin-bottom:8px;">Diary Notes <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;"></i></div>
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;">
                    <div style="display:flex;background:#dceaf4;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                      <div style="flex:2;">Note Name</div>
                      <div style="flex:1.5;text-align:center;">Created By</div>
                      <div style="flex:1.5;text-align:center;">Date Created</div>
                      <div style="flex:2;text-align:center;">Subjectivity List</div>
                    </div>
                    <div style="text-align:center;padding:14px;font-size:12px;color:#23282c;font-weight:600;">No Records To Display.</div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  // ── Tab switching ────────────────────────────────────────────────────────────
  const tabs = [
    { tab: document.getElementById('tab-quote-details'),    content: document.getElementById('tab-content-quote-details') },
    { tab: document.getElementById('tab-schedule-forms'),   content: document.getElementById('tab-content-schedule-forms') },
    { tab: document.getElementById('tab-subjectivities'),   content: document.getElementById('tab-content-subjectivities') },
  ];

  tabs.forEach(({ tab, content }) => {
    tab.addEventListener('click', () => {
      // Reset all tabs to inactive style
      tabs.forEach(({ tab: t, content: c }) => {
        t.style.borderBottom = '2px solid transparent';
        t.style.color = '#5d6773';
        c.style.display = 'none';
      });
      // Activate clicked tab
      tab.style.borderBottom = '2px solid #1e3a5f';
      tab.style.color = '#1e3a5f';
      content.style.display = 'block';
    });
  });

  // ── Quote List accordion ─────────────────────────────────────────────────────
  const quoteListHeader = document.getElementById('quote-list-header');
  const quoteListBody   = document.getElementById('quote-list-body');
  const quoteListIcon   = document.getElementById('quote-list-icon');

  if (quoteListHeader) {
    quoteListHeader.addEventListener('click', () => {
      const isVisible = quoteListBody.style.display !== 'none';
      quoteListBody.style.display = isVisible ? 'none' : 'block';
      if (quoteListIcon) {
        quoteListIcon.classList.toggle('fa-chevron-down', !isVisible);
        quoteListIcon.classList.toggle('fa-chevron-up', isVisible);
      }
    });
  }

  // ── Navigation ───────────────────────────────────────────────────────────────
  document.getElementById('bind-request-btn').addEventListener('click', () => {
    state.policyStatus = 'Bound';
    navigate('view6');
  });

  document.getElementById('return-to-program').addEventListener('click', () => {
    navigate('view1');
  });

  // ── Details panel toggle ─────────────────────────────────────────────────────
  attachDetailsToggle();
}
