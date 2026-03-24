import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- TOP TAB BAR -->
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <div id="tab-policy-details" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;font-weight:600;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:4px;">
                <i class="fa-regular fa-circle-check" style="color:#1e3a5f;"></i> Policy Details
              </div>
              <div id="tab-schedule-forms" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Schedule Of Forms
              </div>
              <div id="tab-subjectivities" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Subjectivities
              </div>
              <div id="tab-endorse-policy" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Endorse Policy
              </div>
              <div id="tab-pending-cancellation" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Pending Cancellation
              </div>
              <div id="tab-cancel" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Cancel
              </div>
              <div id="tab-reinstate" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Reinstate
              </div>
            </div>

            <!-- TAB CONTENT: POLICY DETAILS -->
            <div id="tab-content-policy-details">

              <!-- POLICY DETAILS CARD -->
              <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:20px 24px;margin-bottom:20px;">
                <div style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:12px;">Policy Details</div>
                <span id="return-to-quote" style="color:#0d7ea0;cursor:pointer;font-size:13px;font-weight:600;text-decoration:underline;display:block;margin-bottom:16px;">Return to Quote Details</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#23282c;margin-bottom:16px;">
                  <span>Total Premium</span>
                  <i id="premium-dropdown-toggle" class="fa-solid fa-caret-down" style="font-size:10px;cursor:pointer;"></i>
                  <span style="font-weight:600;">$826.00</span>
                </div>
                <span id="return-to-program" style="color:#0d7ea0;cursor:pointer;font-size:13px;font-weight:600;text-decoration:underline;">Return To Program Selection</span>
              </div>

              <!-- POLICY LIST ACCORDION -->
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
                <div id="policy-list-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>POLICY LIST</span>
                  <i class="fa-solid fa-chevron-down" id="policy-list-icon"></i>
                </div>
                <div id="policy-list-body" style="display:none;background:#fff;">
                  <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:12px;">
                      <thead>
                        <tr style="border-bottom:1px solid #e1e6eb;">
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Policy Number</th>
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Quote Type</th>
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Quote Number</th>
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Program</th>
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Status</th>
                          <th style="padding:12px 16px;text-align:left;font-weight:600;color:#5d6773;">Premium</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="border-bottom:1px solid #f0f3f6;">
                          <td style="padding:12px 16px;color:#2196f3;cursor:pointer;">POL-0005037-00</td>
                          <td style="padding:12px 16px;color:#23282c;">New Business</td>
                          <td style="padding:12px 16px;color:#2196f3;cursor:pointer;">Q00-0016909</td>
                          <td style="padding:12px 16px;color:#23282c;"></td>
                          <td style="padding:12px 16px;color:#23282c;">Issued</td>
                          <td style="padding:12px 16px;color:#23282c;">$826.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                    <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                    <span>1-1 of 1</span>
                    <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                    <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                  </div>
                </div>
              </div>

              <!-- POLICY NUMBER HEADER BAR -->
              <div style="background:linear-gradient(135deg,#dceaf4 0%,#c8dbe8 100%);border-radius:6px 6px 0 0;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;font-size:14px;">
                <span style="color:#23282c;">Policy Number - <strong>POL-0005037-00</strong></span>
                <span style="color:#23282c;">Policy Status - <strong>Issued</strong></span>
              </div>

              <!-- POLICY DETAIL GRID -->
              <div style="background:#fff;border:1px solid #e1e6eb;border-top:none;border-radius:0 0 6px 6px;padding:20px 24px;margin-bottom:24px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px 40px;font-size:13px;">
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Insured Name</span><span style="color:#23282c;">test test</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Location Address</span><span style="color:#23282c;"></span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Agency Name</span><span style="color:#23282c;">test 23423</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Agent Name</span><span style="color:#23282c;">agent</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Subline</span><span style="color:#23282c;">${state.selectedGL && state.selectedCA ? 'Commercial Package Policy' : state.selectedGL ? 'Commercial General Liability' : 'Commercial Automobile'}</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">CarrierDisplayName</span><span style="color:#23282c;">Solartis Insurance</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Submission Number</span><span style="color:#23282c;">SN133140</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Quote Number</span><span style="color:#23282c;">Q00-0016909</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Policy Effective Date</span><span style="color:#23282c;">03/25/2026</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Policy Expiration Date</span><span style="color:#23282c;">03/25/2027</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Policy Type</span><span style="color:#23282c;">New Business</span></div>
                  <div style="display:flex;"><span style="color:#5d6773;font-weight:600;min-width:200px;">Billing Type</span><span style="color:#23282c;">AgencyBill</span></div>
                </div>
              </div>

              <!-- DOCUMENTS -->
              <div style="font-size:16px;font-weight:600;color:#23282c;margin-bottom:12px;">Documents</div>
              <div class="table-container" style="margin-bottom:24px;">
                <div class="v-table-header">
                  <div class="v-col" style="flex:1.5;">Name</div>
                  <div class="v-col" style="flex:4;">Document</div>
                  <div class="v-col" style="flex:1.5;">Created by</div>
                  <div class="v-col" style="flex:2;">Created Date &amp; Time</div>
                </div>
                <div class="v-table-body" style="padding:0;">
                  <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                    <div style="flex:1.5;">Quote Proposal</div>
                    <div style="flex:4;color:#2196f3;cursor:pointer;">Quote Proposal_MAR-24-2026-6-37-46_-294994031.pdf</div>
                    <div style="flex:1.5;">uiuxunderwriter</div>
                    <div style="flex:2;">03-24-2026 06:37:45</div>
                  </div>
                  <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                    <div style="flex:1.5;">Rating Worksheet</div>
                    <div style="flex:4;color:#2196f3;cursor:pointer;">Rating Worksheet_MAR-24-2026-6-37-46_1215929810.pdf</div>
                    <div style="flex:1.5;">uiuxunderwriter</div>
                    <div style="flex:2;">03-24-2026 06:37:45</div>
                  </div>
                  <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                    <div style="flex:1.5;">Binder</div>
                    <div style="flex:4;color:#2196f3;cursor:pointer;">Binder_MAR-24-2026-7-18-57_-406463079.pdf</div>
                    <div style="flex:1.5;">uiuxunderwriter</div>
                    <div style="flex:2;">03-24-2026 07:18:57</div>
                  </div>
                  <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                    <div style="flex:1.5;">Issuance</div>
                    <div style="flex:4;color:#2196f3;cursor:pointer;">Issuance_MAR-24-2026-7-38-37_-342365534.pdf</div>
                    <div style="flex:1.5;">uiuxunderwriter</div>
                    <div style="flex:2;">03-24-2026 07:38:36</div>
                  </div>
                  <div style="display:flex;justify-content:flex-end;align-items:center;padding:10px 16px;font-size:11px;color:#5d6773;gap:12px;">
                    <span>Rows per page: <select style="border:none;background:transparent;font-size:11px;cursor:pointer;"><option>5</option></select></span>
                    <span>1-4 of 4</span>
                    <i class="fa-solid fa-chevron-left" style="color:#ccc;cursor:not-allowed;"></i>
                    <i class="fa-solid fa-chevron-right" style="color:#ccc;cursor:not-allowed;"></i>
                  </div>
                </div>
              </div>

              <!-- ATTACHMENTS -->
              <div style="font-size:16px;font-weight:600;color:#23282c;margin-bottom:12px;">Attachments <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;margin-left:4px;"></i></div>
              <div class="table-container" style="margin-bottom:24px;">
                <div class="v-table-header">
                  <div class="v-col" style="flex:1.5;">Name</div>
                  <div class="v-col" style="flex:1.5;">Description</div>
                  <div class="v-col" style="flex:2;">Link To Attachment</div>
                  <div class="v-col" style="flex:1.2;">Review Status</div>
                  <div class="v-col" style="flex:1.2;">Uploaded By</div>
                  <div class="v-col" style="flex:1.2;">Uploaded Date</div>
                  <div class="v-col" style="flex:0.8;">Action</div>
                </div>
                <div class="v-table-body">No Records To Display.</div>
              </div>

              <!-- DIARY NOTES -->
              <div style="font-size:16px;font-weight:600;color:#23282c;margin-bottom:12px;">Diary Notes <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;margin-left:4px;"></i></div>
              <div class="table-container" style="margin-bottom:24px;">
                <div class="v-table-header">
                  <div class="v-col" style="flex:2;">Category</div>
                  <div class="v-col" style="flex:2;">Created By</div>
                  <div class="v-col" style="flex:2;">Date Created</div>
                  <div class="v-col" style="flex:2;">Date Due</div>
                  <div class="v-col" style="flex:1;">Action</div>
                </div>
                <div class="v-table-body">No Records To Display.</div>
              </div>

              <!-- EMAILS -->
              <div style="font-size:16px;font-weight:600;color:#23282c;margin-bottom:12px;">Emails <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;margin-left:4px;"></i></div>
              <div class="table-container" style="margin-bottom:24px;">
                <div class="v-table-header">
                  <div class="v-col" style="flex:2;">Sent To</div>
                  <div class="v-col" style="flex:2.5;">Email Subject</div>
                  <div class="v-col" style="flex:1.5;">Email Status</div>
                  <div class="v-col" style="flex:2.5;">Email Sent Date &amp; Time</div>
                </div>
                <div class="v-table-body">No Records To Display.</div>
              </div>

            </div>

            <!-- TAB CONTENT: SCHEDULE OF FORMS -->
            <div id="tab-content-schedule-forms" style="display:none;">
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div id="forms-header" style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>FORMS</span>
                  <i class="fa-solid fa-chevron-up" id="forms-icon"></i>
                </div>
                <div id="forms-body" style="background:#fff;padding:16px 20px;">
                  <div style="font-size:15px;font-weight:600;color:#23282c;margin-bottom:14px;">Schedule of Forms</div>
                  <div class="table-container">
                    <div class="v-table-header">
                      <div class="v-col" style="flex:0.3;"></div>
                      <div class="v-col" style="flex:1.5;">Form Number</div>
                      <div class="v-col" style="flex:4;">Form Name</div>
                      <div class="v-col" style="flex:1.5;">Fill In(s)</div>
                      <div class="v-col" style="flex:0.5;">Action</div>
                    </div>
                    <div class="v-table-body" style="padding:0;">
                      <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;color:#999;cursor:grab;">&#8942;&#8942;</div>
                        <div style="flex:1.5;">SWP02</div>
                        <div style="flex:4;color:#2196f3;cursor:pointer;">TEST FORM</div>
                        <div style="flex:1.5;"></div>
                        <div style="flex:0.5;color:#5d6773;cursor:pointer;">&#8942;</div>
                      </div>
                      <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;color:#999;cursor:grab;">&#8942;&#8942;</div>
                        <div style="flex:1.5;">CG 00 01</div>
                        <div style="flex:4;color:#2196f3;cursor:pointer;">COMMERCIAL GENERAL LIABILITY COVERAGE FORM</div>
                        <div style="flex:1.5;"></div>
                        <div style="flex:0.5;color:#5d6773;cursor:pointer;">&#8942;</div>
                      </div>
                      <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;color:#999;cursor:grab;">&#8942;&#8942;</div>
                        <div style="flex:1.5;">IL 00 17</div>
                        <div style="flex:4;color:#2196f3;cursor:pointer;">COMMON POLICY CONDITIONS</div>
                        <div style="flex:1.5;"></div>
                        <div style="flex:0.5;color:#5d6773;cursor:pointer;">&#8942;</div>
                      </div>
                      <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;color:#999;cursor:grab;">&#8942;&#8942;</div>
                        <div style="flex:1.5;">IL 00 21</div>
                        <div style="flex:4;color:#2196f3;cursor:pointer;">NUCLEAR ENERGY LIABILITY EXCLUSION ENDORSEMENT (BROAD FORM)</div>
                        <div style="flex:1.5;"></div>
                        <div style="flex:0.5;color:#5d6773;cursor:pointer;">&#8942;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB CONTENT: SUBJECTIVITIES -->
            <div id="tab-content-subjectivities" style="display:none;">
              <div style="border:1px solid #e1e6eb;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <div style="background:#dceaf4;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:#1e3a5f;letter-spacing:0.5px;">
                  <span>SUBJECTIVITIES</span>
                  <i class="fa-solid fa-chevron-up"></i>
                </div>
                <div style="padding:16px;background:#fff;">
                  <div style="display:flex;justify-content:flex-end;margin-bottom:16px;">
                    <button style="padding:8px 20px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;">Add New Subjectivity</button>
                  </div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;">
                    <span style="font-weight:600;color:#23282c;">Subjectivity List</span>
                  </div>
                  <div class="table-container" style="margin-bottom:20px;">
                    <div class="v-table-header">
                      <div class="v-col" style="flex:0.3;"></div>
                      <div class="v-col" style="flex:1.2;">Required Process</div>
                      <div class="v-col" style="flex:3;">Subjectivity</div>
                      <div class="v-col" style="flex:1;">Level</div>
                      <div class="v-col" style="flex:1.5;">Last Modified By</div>
                      <div class="v-col" style="flex:1;">Status</div>
                      <div class="v-col" style="flex:1;">Due Date</div>
                      <div class="v-col" style="flex:0.5;">Action</div>
                    </div>
                    <div class="v-table-body" style="padding:0;">
                      <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;"><input type="checkbox"></div>
                        <div style="flex:1.2;">Pre Bind</div>
                        <div style="flex:3;color:#2196f3;cursor:pointer;">Proof of Business Income Verification</div>
                        <div style="flex:1;">Policy</div>
                        <div style="flex:1.5;">uiuxunderwriter</div>
                        <div style="flex:1;">Satisfied</div>
                        <div style="flex:1;">04/20/2026</div>
                        <div style="flex:0.5;">&#8942;</div>
                      </div>
                      <div style="display:flex;padding:10px 16px;border-bottom:1px solid #f0f3f6;font-size:12px;color:#23282c;align-items:center;">
                        <div style="flex:0.3;"><input type="checkbox"></div>
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
                  </div>
                  <div style="font-size:14px;font-weight:600;color:#23282c;margin-bottom:8px;">Attachments <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;"></i></div>
                  <div class="table-container" style="margin-bottom:20px;">
                    <div class="v-table-header">
                      <div class="v-col" style="flex:2;">Attachment Name</div>
                      <div class="v-col" style="flex:1.5;text-align:center;">Uploaded By</div>
                      <div class="v-col" style="flex:1.5;text-align:center;">Uploaded Date</div>
                      <div class="v-col" style="flex:2;text-align:center;">Subjectivity List</div>
                    </div>
                    <div class="v-table-body">No Records To Display.</div>
                  </div>
                  <div style="font-size:14px;font-weight:600;color:#23282c;margin-bottom:8px;">Diary Notes <i class="fa-solid fa-circle-plus" style="font-size:14px;color:#8ba0b5;cursor:pointer;"></i></div>
                  <div class="table-container">
                    <div class="v-table-header">
                      <div class="v-col" style="flex:2;">Note Name</div>
                      <div class="v-col" style="flex:1.5;text-align:center;">Created By</div>
                      <div class="v-col" style="flex:1.5;text-align:center;">Date Created</div>
                      <div class="v-col" style="flex:2;text-align:center;">Subjectivity List</div>
                    </div>
                    <div class="v-table-body">No Records To Display.</div>
                  </div>
                </div>
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
  // Tab switching
  const tabs = [
    { tab: document.getElementById('tab-policy-details'), content: document.getElementById('tab-content-policy-details') },
    { tab: document.getElementById('tab-schedule-forms'), content: document.getElementById('tab-content-schedule-forms') },
    { tab: document.getElementById('tab-subjectivities'), content: document.getElementById('tab-content-subjectivities') },
    { tab: document.getElementById('tab-endorse-policy'), content: null },
    { tab: document.getElementById('tab-pending-cancellation'), content: null },
    { tab: document.getElementById('tab-cancel'), content: null },
    { tab: document.getElementById('tab-reinstate'), content: null },
  ];

  tabs.forEach(({ tab }) => {
    tab.addEventListener('click', () => {
      tabs.forEach(({ tab: t, content: c }) => {
        t.style.borderBottom = '2px solid transparent';
        t.style.color = '#5d6773';
        t.style.fontWeight = '400';
        t.querySelector('i').style.color = '#5d6773';
        if (c) c.style.display = 'none';
      });
      tab.style.borderBottom = '2px solid #1e3a5f';
      tab.style.color = '#1e3a5f';
      tab.style.fontWeight = '600';
      tab.querySelector('i').style.color = '#1e3a5f';
      const match = tabs.find(t => t.tab === tab);
      if (match && match.content) match.content.style.display = 'block';
    });
  });

  // Policy List accordion
  const policyListHeader = document.getElementById('policy-list-header');
  const policyListBody = document.getElementById('policy-list-body');
  const policyListIcon = document.getElementById('policy-list-icon');
  if (policyListHeader) {
    policyListHeader.addEventListener('click', () => {
      const isVisible = policyListBody.style.display !== 'none';
      policyListBody.style.display = isVisible ? 'none' : 'block';
      policyListIcon.classList.toggle('fa-chevron-down', isVisible);
      policyListIcon.classList.toggle('fa-chevron-up', !isVisible);
    });
  }

  // Forms accordion
  const formsHeader = document.getElementById('forms-header');
  const formsBody = document.getElementById('forms-body');
  const formsIcon = document.getElementById('forms-icon');
  if (formsHeader) {
    formsHeader.addEventListener('click', () => {
      const isVisible = formsBody.style.display !== 'none';
      formsBody.style.display = isVisible ? 'none' : 'block';
      formsIcon.classList.toggle('fa-chevron-up', !isVisible);
      formsIcon.classList.toggle('fa-chevron-down', isVisible);
    });
  }

  // Return to Quote Details
  document.getElementById('return-to-quote').addEventListener('click', () => {
    navigate('view4');
  });

  // Return To Program Selection
  document.getElementById('return-to-program').addEventListener('click', () => {
    navigate('view1');
  });

  // Show success toast
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;top:16px;right:16px;background:#2e7d32;color:#fff;padding:16px 20px;border-radius:4px;font-size:14px;font-weight:500;z-index:9999;display:flex;align-items:center;gap:16px;min-width:260px;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
  toast.innerHTML = '<span>Policy Issued Successfully</span><span style="cursor:pointer;font-size:18px;line-height:1;margin-left:auto;">&#x2715;</span>';
  document.body.appendChild(toast);
  toast.querySelector('span:last-child').addEventListener('click', () => toast.remove());
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 5000);
}
