import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN132459',
  submissionStatus: 'Bound',
  insuredName: 's Test',
};

/** @returns {string} HTML string for the Policy Details page */
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
            <div style="display:flex;border-bottom:1px solid #e1e6eb;margin-bottom:20px;font-size:13px;color:#5d6773;flex-wrap:wrap;">
              <div id="v5-tab-policy" style="padding:10px 16px;border-bottom:2px solid #1e3a5f;color:#1e3a5f;cursor:pointer;display:flex;align-items:center;gap:5px;white-space:nowrap;">
                <i class="fa-regular fa-circle-dot"></i> Policy Details
              </div>
              <div id="v5-tab-forms" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:5px;white-space:nowrap;">
                <i class="fa-regular fa-circle"></i> Schedule Of Forms
              </div>
              <div id="v5-tab-subj" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:5px;white-space:nowrap;">
                <i class="fa-regular fa-circle"></i> Subjectivities
              </div>
            </div>

            <!-- TAB: POLICY DETAILS -->
            <div id="v5-content-policy">
              <h2 style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:16px;">Policy Details</h2>

              <!-- Action row -->
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
                <span id="return-to-quote-link" style="color:#2196f3;cursor:pointer;font-size:13px;">Return to Quote Details</span>
                ${state.policyStatus !== 'Issued' ? '<button id="issue-policy-btn" class="btn btn-next" style="padding:7px 18px;">Issue Policy</button>' : ''}
              </div>

              <!-- Premium row -->
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#23282c;margin-bottom:8px;">
                <span>Total Premium</span>
                <i class="fa-solid fa-caret-down" style="font-size:10px;"></i>
                <span style="font-weight:600;">$21.57</span>
              </div>
              <div style="margin-bottom:16px;">
                <span style="color:#2196f3;cursor:pointer;font-size:13px;">Return To Program Selection</span>
              </div>

              <!-- POLICY LIST accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="policy-list-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>POLICY LIST</span>
                  <i class="fa-solid fa-chevron-down" id="policy-list-icon"></i>
                </div>
                <div id="policy-list-body" style="padding:16px;background:#fff;">

                  <!-- Policy number row -->
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:13px;">
                    <span style="color:#23282c;">Policy Number - <strong>POL-0004883-00</strong></span>
                    <span style="color:#23282c;">Policy Status - <strong id="policy-status-text">${state.policyStatus}</strong></span>
                  </div>

                  <!-- 2-column detail grid -->
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 32px;font-size:13px;margin-bottom:20px;">
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Insured Name</span><span style="color:#23282c;">s Test</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Location Address</span><span style="color:#23282c;"></span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Agency Name</span><span style="color:#23282c;">TestAgency9590</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Agent Name</span><span style="color:#23282c;">testagent1003</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Subline</span><span style="color:#2196f3;">${state.selectedGL && state.selectedCA ? 'Commercial Package Policy' : state.selectedGL ? 'Commercial General Liability' : 'Commercial Automobile'}</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">CarrierDisplayName</span><span style="color:#23282c;">Solartis Insurance</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Submission Number</span><span style="color:#23282c;">SN132459</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Quote Number</span><span style="color:#23282c;">Q00-0016603</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Policy Effective Date</span><span style="color:#23282c;">03/21/2026</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Policy Expiration Date</span><span style="color:#23282c;">03/21/2027</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Policy Type</span><span style="color:#23282c;">New Business</span></div>
                    <div><span style="color:#5d6773;min-width:170px;display:inline-block;">Billing Type</span><span style="color:#23282c;">AgencyBill</span></div>
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
                    <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                      <div style="flex:1.5;">Binder</div>
                      <div style="flex:4;color:#2196f3;cursor:pointer;">Binder_MAR-20-2026-6-29-3_167415314.pdf</div>
                      <div style="flex:1.5;">uiuxunderwriter</div>
                      <div style="flex:2;">03-20-2026 06:29:03</div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                      <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                      <span>1-3 of 3</span>
                      <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                      <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- TAB: SCHEDULE OF FORMS -->
            <div id="v5-content-forms" style="display:none;">
              <h2 style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:16px;">Schedule Of Forms</h2>
              <p style="color:#5d6773;font-size:13px;">No forms available.</p>
            </div>

            <!-- TAB: SUBJECTIVITIES -->
            <div id="v5-content-subj" style="display:none;">
              <h2 style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:16px;">Subjectivities</h2>

              <!-- SUBJECTIVITIES accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="v5-subj-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>SUBJECTIVITIES</span>
                  <i class="fa-solid fa-chevron-down" id="v5-subj-icon"></i>
                </div>
                <div id="v5-subj-body" style="padding:16px;background:#fff;">

                  <!-- Inner tab row: Pre Bind / Post Bind -->
                  <div style="display:flex;border-bottom:1px solid #e1e6eb;margin-bottom:16px;font-size:13px;">
                    <div id="v5-subj-tab-pre" style="padding:8px 16px;border-bottom:2px solid #1e3a5f;color:#1e3a5f;cursor:pointer;font-weight:500;">Pre Bind</div>
                    <div id="v5-subj-tab-post" style="padding:8px 16px;cursor:pointer;color:#5d6773;">Post Bind</div>
                  </div>

                  <!-- Pre Bind content -->
                  <div id="v5-subj-pre">
                    <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:16px;">
                      <div style="display:flex;background:#f4f7fa;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                        <div style="flex:2;">Subjectivity</div>
                        <div style="flex:1;text-align:center;">Status</div>
                        <div style="flex:1;text-align:center;">Due Date</div>
                        <div style="flex:1;text-align:right;">Action</div>
                      </div>
                      <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:2;">Signed Application Required</div>
                        <div style="flex:1;text-align:center;"><span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px;font-size:11px;">Satisfied</span></div>
                        <div style="flex:1;text-align:center;">03/21/2026</div>
                        <div style="flex:1;text-align:right;color:#2196f3;cursor:pointer;font-size:11px;">View</div>
                      </div>
                      <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:2;">Loss Runs (3 Years)</div>
                        <div style="flex:1;text-align:center;"><span style="background:#fff3e0;color:#e65100;padding:2px 8px;border-radius:10px;font-size:11px;">Pending</span></div>
                        <div style="flex:1;text-align:center;">03/21/2026</div>
                        <div style="flex:1;text-align:right;color:#2196f3;cursor:pointer;font-size:11px;">View</div>
                      </div>
                      <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                        <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                        <span>1-2 of 2</span>
                        <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                        <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Post Bind content (hidden by default) -->
                  <div id="v5-subj-post" style="display:none;">
                    <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:16px;">
                      <div style="display:flex;background:#f4f7fa;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                        <div style="flex:2;">Subjectivity</div>
                        <div style="flex:1;text-align:center;">Status</div>
                        <div style="flex:1;text-align:center;">Due Date</div>
                        <div style="flex:1;text-align:right;">Action</div>
                      </div>
                      <div style="padding:16px;text-align:center;font-size:12px;color:#5d6773;">No post-bind subjectivities.</div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- ATTACHMENTS accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="v5-attach-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>ATTACHMENTS</span>
                  <i class="fa-solid fa-chevron-down" id="v5-attach-icon"></i>
                </div>
                <div id="v5-attach-body" style="padding:16px;background:#fff;">
                  <div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
                    <button style="padding:6px 14px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;">
                      <i class="fa-solid fa-upload"></i> Upload
                    </button>
                  </div>
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;">
                    <div style="display:flex;background:#f4f7fa;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                      <div style="flex:2;">File Name</div>
                      <div style="flex:1.5;">Uploaded By</div>
                      <div style="flex:2;">Upload Date &amp; Time</div>
                      <div style="flex:1;text-align:right;">Action</div>
                    </div>
                    <div style="padding:16px;text-align:center;font-size:12px;color:#5d6773;">No attachments available.</div>
                  </div>
                </div>
              </div>

              <!-- DIARY NOTES accordion -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="v5-diary-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>DIARY NOTES</span>
                  <i class="fa-solid fa-chevron-down" id="v5-diary-icon"></i>
                </div>
                <div id="v5-diary-body" style="padding:16px;background:#fff;">
                  <div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
                    <button style="padding:6px 14px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;">
                      <i class="fa-solid fa-plus"></i> Add Note
                    </button>
                  </div>
                  <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;">
                    <div style="display:flex;background:#f4f7fa;padding:10px 16px;font-size:12px;font-weight:600;color:#1e3a5f;">
                      <div style="flex:2;">Note</div>
                      <div style="flex:1.5;">Created By</div>
                      <div style="flex:2;">Created Date &amp; Time</div>
                      <div style="flex:1;text-align:right;">Action</div>
                    </div>
                    <div style="padding:16px;text-align:center;font-size:12px;color:#5d6773;">No diary notes available.</div>
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

/**
 * Activates a top-level tab by id, hiding the others.
 * @param {string} activeTabId - The id of the tab button to activate.
 * @param {string} activeContentId - The id of the content div to show.
 */
function activateTab(activeTabId, activeContentId) {
  const TAB_MAP = [
    { tabId: 'v5-tab-policy', contentId: 'v5-content-policy' },
    { tabId: 'v5-tab-forms',  contentId: 'v5-content-forms' },
    { tabId: 'v5-tab-subj',   contentId: 'v5-content-subj' },
  ];

  TAB_MAP.forEach(({ tabId, contentId }) => {
    const tab     = document.getElementById(tabId);
    const content = document.getElementById(contentId);
    if (!tab || !content) return;

    const isActive = tabId === activeTabId;
    content.style.display = isActive ? 'block' : 'none';
    tab.style.borderBottom = isActive ? '2px solid #1e3a5f' : 'none';
    tab.style.color        = isActive ? '#1e3a5f' : '#5d6773';
  });
}

/**
 * Wires a collapsible accordion: click header to toggle body and flip chevron.
 * @param {string} headerId - The id of the accordion header element.
 * @param {string} bodyId   - The id of the accordion body element.
 * @param {string} iconId   - The id of the chevron icon inside the header.
 */
function wireAccordion(headerId, bodyId, iconId) {
  const header = document.getElementById(headerId);
  const body   = document.getElementById(bodyId);
  const icon   = document.getElementById(iconId);
  if (!header || !body) return;

  header.addEventListener('click', () => {
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    if (icon) {
      icon.classList.toggle('fa-chevron-down', !isOpen);
      icon.classList.toggle('fa-chevron-up',    isOpen);
    }
  });
}

/** Binds all DOM events for the Policy Details page. */
export function attach() {
  // ── Top tab bar ──────────────────────────────────────────────────────────────
  document.getElementById('v5-tab-policy')?.addEventListener('click', () => {
    activateTab('v5-tab-policy', 'v5-content-policy');
  });
  document.getElementById('v5-tab-forms')?.addEventListener('click', () => {
    activateTab('v5-tab-forms', 'v5-content-forms');
  });
  document.getElementById('v5-tab-subj')?.addEventListener('click', () => {
    activateTab('v5-tab-subj', 'v5-content-subj');
  });

  // ── Issue Policy button ──────────────────────────────────────────────────────
  document.getElementById('issue-policy-btn')?.addEventListener('click', () => {
    state.policyStatus = 'Issued';
    navigate('view6');
  });

  // ── Policy List accordion ────────────────────────────────────────────────────
  wireAccordion('policy-list-header', 'policy-list-body', 'policy-list-icon');

  // ── Return to Quote Details link ─────────────────────────────────────────────
  document.getElementById('return-to-quote-link')?.addEventListener('click', () => {
    navigate('view4');
  });

  // ── Subjectivities inner accordions ─────────────────────────────────────────
  wireAccordion('v5-subj-header',   'v5-subj-body',   'v5-subj-icon');
  wireAccordion('v5-attach-header', 'v5-attach-body', 'v5-attach-icon');
  wireAccordion('v5-diary-header',  'v5-diary-body',  'v5-diary-icon');

  // ── Subjectivities Pre/Post Bind inner tabs ──────────────────────────────────
  const tabPre  = document.getElementById('v5-subj-tab-pre');
  const tabPost = document.getElementById('v5-subj-tab-post');
  const prePane  = document.getElementById('v5-subj-pre');
  const postPane = document.getElementById('v5-subj-post');

  if (tabPre && tabPost && prePane && postPane) {
    tabPre.addEventListener('click', () => {
      prePane.style.display  = 'block';
      postPane.style.display = 'none';
      tabPre.style.borderBottom  = '2px solid #1e3a5f';
      tabPre.style.color         = '#1e3a5f';
      tabPost.style.borderBottom = 'none';
      tabPost.style.color        = '#5d6773';
    });

    tabPost.addEventListener('click', () => {
      postPane.style.display = 'block';
      prePane.style.display  = 'none';
      tabPost.style.borderBottom = '2px solid #1e3a5f';
      tabPost.style.color        = '#1e3a5f';
      tabPre.style.borderBottom  = 'none';
      tabPre.style.color         = '#5d6773';
    });
  }

  // ── Details panel collapse toggle ────────────────────────────────────────────
  attachDetailsToggle();
}
