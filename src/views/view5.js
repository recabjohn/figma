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
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Quote Details
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Schedule Of Forms
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#5d6773;">
                <i class="fa-regular fa-circle-check" style="color:#5d6773;"></i> Subjectivities
              </div>
            </div>

            <!-- ISSUE BINDER CARD -->
            <div style="background:#fff;border:1px solid #e1e6eb;border-radius:6px;padding:24px 28px;margin-bottom:24px;">
              <div style="font-size:18px;font-weight:600;color:#23282c;margin-bottom:28px;">Issue Binder</div>

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
                  <input type="email" placeholder="Email Address *" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

                <div style="color:#5d6773;font-weight:500;">Phone Number *</div>
                <div style="position:relative;">
                  <input type="tel" id="phone-input" placeholder="(XXX) XXX-XXXX" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

                <div style="color:#5d6773;font-weight:500;">Policy Number</div>
                <div style="position:relative;">
                  <input type="text" placeholder="Policy Number" style="width:100%;border:1px solid #ccc;border-radius:4px;padding:12px 14px;font-size:13px;color:#23282c;outline:none;box-sizing:border-box;">
                </div>

              </div>

              <!-- BOTTOM BUTTONS -->
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <button id="binder-back-btn" style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Back</button>
                <button style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Preview Binder</button>
                <button id="issue-binder-submit" style="padding:8px 24px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:500;">Issue Binder</button>
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
  document.getElementById('binder-back-btn').addEventListener('click', () => {
    navigate('view6');
  });

  document.getElementById('phone-input').addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.substring(0, 3);
    if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
    if (digits.length >= 6) formatted += '-' + digits.substring(6, 10);
    e.target.value = formatted;
  });

  document.getElementById('issue-binder-submit').addEventListener('click', () => {
    state.policyStatus = 'Issued';
    navigate('view7');
  });
}
