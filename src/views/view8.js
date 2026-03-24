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
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Policy Details
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Schedule Of Forms
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Subjectivities
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Endorse Policy
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Pending Cancellation
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Cancel
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Reinstate
              </div>
            </div>

            <!-- POLICY DETAILS CARD -->
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:20px 24px;margin-bottom:20px;">
              <div style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:12px;">Policy Details</div>
              <span id="return-to-quote" style="color:#0d7ea0;cursor:pointer;font-size:13px;font-weight:600;text-decoration:underline;display:block;margin-bottom:16px;">Return to Quote Details</span>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#23282c;margin-bottom:16px;">
                <span>Total Premium</span>
                <i class="fa-solid fa-caret-down" style="font-size:10px;"></i>
                <span style="font-weight:600;">$826.00</span>
              </div>
              <span id="return-to-program" style="color:#0d7ea0;cursor:pointer;font-size:13px;font-weight:600;text-decoration:underline;">Return To Program Selection</span>
            </div>

            <!-- ISSUE POLICY FORM CARD -->
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:24px 28px;margin-bottom:24px;">
              <div style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:28px;">Issue Policy</div>

              <!-- FORM FIELDS -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px 40px;align-items:center;font-size:13px;margin-bottom:32px;">

                <div style="color:#5d6773;font-weight:500;">Effective Date *</div>
                <div style="position:relative;">
                  <label style="position:absolute;top:-8px;left:12px;background:#fff;padding:0 4px;font-size:11px;color:#5d6773;">Effective Date *</label>
                  <input type="text" value="03/25/2026" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                  <i class="fa-regular fa-calendar" style="position:absolute;right:12px;top:14px;color:#5d6773;"></i>
                </div>

                <div style="color:#5d6773;font-weight:500;">Email Address *</div>
                <div style="position:relative;">
                  <label style="position:absolute;top:-8px;left:12px;background:#fff;padding:0 4px;font-size:11px;color:#5d6773;">Email Address *</label>
                  <input type="email" value="test@gmail.com" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

                <div style="color:#5d6773;font-weight:500;">Phone Number *</div>
                <div style="position:relative;">
                  <label style="position:absolute;top:-8px;left:12px;background:#fff;padding:0 4px;font-size:11px;color:#5d6773;">Phone Number *</label>
                  <input type="tel" id="phone-input" value="(234) 567-8999" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

                <div style="color:#5d6773;font-weight:500;">Policy Number</div>
                <div style="position:relative;">
                  <label style="position:absolute;top:-8px;left:12px;background:#fff;padding:0 4px;font-size:11px;color:#5d6773;">Policy Number</label>
                  <input type="text" value="POL-0005037" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

              </div>

              <!-- BOTTOM BUTTONS -->
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <button id="policy-back-btn" style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Back</button>
                <button style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Preview Issuance</button>
                <button id="issue-policy-submit" style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Issue Policy</button>
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
  document.getElementById('policy-back-btn').addEventListener('click', () => {
    navigate('view7');
  });

  document.getElementById('phone-input').addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.substring(0, 3);
    if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
    if (digits.length >= 6) formatted += '-' + digits.substring(6, 10);
    e.target.value = formatted;
  });

  document.getElementById('return-to-quote').addEventListener('click', () => {
    navigate('view4');
  });

  document.getElementById('return-to-program').addEventListener('click', () => {
    navigate('view1');
  });

  document.getElementById('issue-policy-submit').addEventListener('click', () => {
    state.policyStatus = 'Issued';
    navigate('view9');
  });
}
