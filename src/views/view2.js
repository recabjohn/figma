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
  const deductOpts = `<option value="" disabled selected>Select</option>
      <option>No Deductible</option>
      <option>250 Per Claim</option>
      <option>250 Per Occurrence</option>
      <option>500 Per Claim</option>
      <option>500 Per Occurrence</option>
      <option>750 Per Claim</option>
      <option>750 Per Occurrence</option>
      <option>1,000 Per Claim</option>
      <option>1,000 Per Occurrence</option>
      <option>2,000 Per Claim</option>
      <option>2,000 Per Occurrence</option>
      <option>3,000 Per Claim</option>
      <option>3,000 Per Occurrence</option>
      <option>4,000 Per Claim</option>
      <option>4,000 Per Occurrence</option>
      <option>5,000 Per Claim</option>
      <option>5,000 Per Occurrence</option>
      <option>10,000 Per Claim</option>
      <option>10,000 Per Occurrence</option>
      <option>15,000 Per Claim</option>
      <option>15,000 Per Occurrence</option>
      <option>25,000 Per Claim</option>
      <option>25,000 Per Occurrence</option>`;
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
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-state-btn" style="cursor:pointer; color:#1f6bc0;"></i>
                </div>

                <div id="saved-states-container" style="display:none; padding: 0 24px 24px 64px;">
                  <div style="font-weight:700; font-size:13px; color:#23282c; display:flex; align-items:center;">
                    <i class="fa-solid fa-chevron-right" style="margin-right:12px; font-size:12px; color:#5d6773;"></i>
                    <span id="saved-state-text">NE - PREMISES/OPERATIONS AND PRODUCTS/COMPLETED OPERATIONS (PRIMARY STATE)</span>
                  </div>
                </div>

                <div class="state-form-container" id="state-form" style="display:none;">
                  <div class="form-group" style="position:relative;margin-top:16px;">
                    <label id="lbl-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  <div class="form-group" id="subline-group" style="display:none;position:relative;margin-top:28px;">
                    <label style="font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">Subline *</label>
                    <select class="custom-select" id="subline-select">
                      <option value="" disabled hidden>Select</option>
                      <option value="1" selected>Premises/Operations and Products/Completed Operations</option>
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
                  <div id="gl-extra-fields" style="display:none;">
                    <div class="floating-group" style="margin-top:16px;">
                      <label>Governmental Subdivision *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Limited Product Withdrawal Coverage *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Size Of Risk Rating *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Each Occurrence Limit *</label>
                      <select class="custom-select">
                        <option selected>100,000 CSL</option>
                        <option>200,000 CSL</option>
                        <option>300,000 CSL</option>
                        <option>500,000 CSL</option>
                        <option>1,000,000 CSL</option>
                        <option>2,000,000 CSL</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Medical Payments Exclusion for Entire Policy *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Medical Payments Limit *</label>
                      <select class="custom-select">
                        <option>1,000</option>
                        <option>2,000</option>
                        <option selected>5,000</option>
                        <option>10,000</option>
                        <option>25,000</option>
                        <option>50,000</option>
                        <option>100,000</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Damage to Premises Rented to You Limit</label>
                      <select class="custom-select">
                        <option>50,000</option>
                        <option selected>100,000</option>
                        <option>300,000</option>
                        <option>500,000</option>
                        <option>1,000,000</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Personal and Advertising Injury Limit *</label>
                      <select class="custom-select">
                        <option selected>100,000</option>
                        <option>300,000</option>
                        <option>500,000</option>
                        <option>1,000,000</option>
                        <option>2,000,000</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>General Aggregate Limit *</label>
                      <select class="custom-select">
                        <option selected>200,000 CSL</option>
                        <option>500,000 CSL</option>
                        <option>1,000,000 CSL</option>
                        <option>2,000,000 CSL</option>
                        <option>4,000,000 CSL</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Products/Completed Operations Aggregate Limit *</label>
                      <select class="custom-select">
                        <option selected>200,000 CSL</option>
                        <option>500,000 CSL</option>
                        <option>1,000,000 CSL</option>
                        <option>2,000,000 CSL</option>
                        <option>4,000,000 CSL</option>
                      </select>
                    </div>

                    <div class="subheader" style="margin-top:20px;margin-bottom:24px;">Deductibles</div>
                    <div class="floating-group">
                      <label>Premises/Operations BI Deductible *</label>
                      <select class="custom-select">${deductOpts.replace('<option>No Deductible</option>', '<option selected>No Deductible</option>')}</select>
                    </div>
                    <div class="floating-group">
                      <label>Products/Completed Operations BI Deductible *</label>
                      <select class="custom-select">${deductOpts.replace('<option>1,000 Per Occurrence</option>', '<option selected>1,000 Per Occurrence</option>')}</select>
                    </div>
                    <div class="floating-group">
                      <label>Premises/Operations PD Deductible *</label>
                      <select class="custom-select">${deductOpts}</select>
                    </div>
                    <div class="floating-group">
                      <label>Products/Completed Operations PD Deductible *</label>
                      <select class="custom-select">${deductOpts}</select>
                    </div>
                    <div class="floating-group">
                      <label>Premises/Operations BI and PD Deductible *</label>
                      <select class="custom-select">${deductOpts}</select>
                    </div>
                    <div class="floating-group">
                      <label>Products/Completed Operations BI and PD Deductible *</label>
                      <select class="custom-select">${deductOpts}</select>
                    </div>
                    <div class="floating-group">
                      <label>Coverage Form *</label>
                      <select class="custom-select">
                        <option selected>Occurrence</option>
                        <option>Claims Made</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Legal Entity *</label>
                      <select class="custom-select">
                        <option selected>Individual</option>
                        <option>Corporation</option>
                        <option>Partnership</option>
                        <option>LLC</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div class="floating-group">
                      <label>Limited Coverage For Designated Unmanned Aircraft *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Condominium or Townhouse Association *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>

                    <div class="subheader" style="margin-top:20px;margin-bottom:24px;">Experience Rating and Schedule Rating</div>
                    <div class="floating-group">
                      <label>Experience Rating *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Schedule Rating *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Terrorism Risk Insurance Program (TRIP) terminates before policy expiration date *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Accept Certified Acts of Terrorism Coverage *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Composite Rating Applies *</label>
                      <select class="custom-select"><option selected>No</option><option>Yes</option></select>
                    </div>

                    <div class="form-actions">
                      <button class="btn btn-save" id="state-save-btn">Save</button>
                    </div>
                  </div>
                </div>

                <div class="acc-row" id="risk-schedule-row" style="border-top:2px solid #f0f3f6; cursor:pointer;">
                  <i class="fa-solid fa-chevron-right acc-icon" id="risk-schedule-icon"></i>
                  RISK SCHEDULE
                </div>
                
                <div id="risk-schedule-content" style="display:none; padding-bottom: 24px;">
                  <div class="acc-row" id="location-row" style="padding-left: 48px; font-size: 14px; border-top: 1px solid #f0f3f6; cursor:pointer;">
                    <i class="fa-solid fa-chevron-down acc-icon" id="location-icon"></i>
                    LOCATION AND CLASSIFICATION INFORMATION
                  </div>
                  <div id="location-content" style="padding: 16px 48px 24px;">
                    <div style="display:flex; align-items:center; font-size: 20px; color: #5d6773; margin-bottom: 12px; font-weight: 400;">
                      Location <i class="fa-solid fa-circle-plus" id="add-location-btn" style="margin-left: 8px; cursor: pointer; color: #8ba0b5; font-size: 16px;"></i>
                    </div>
                    <div class="vehicle-table-container" style="box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 6px; overflow: hidden; border: 1px solid #e1e6eb;">
                      <div class="v-table-header" style="background-color: #e6f0f9; padding: 12px 16px; font-size: 12px; font-weight: 600; color: #1e3a5f; display: flex;">
                        <div style="flex:1.5;">Location Number</div>
                        <div style="flex:2; text-align:center;">State-Subline</div>
                        <div style="flex:3; text-align:center;">Address</div>
                        <div style="flex:1.5; text-align:center;">Premium</div>
                        <div style="flex:1; text-align:center;">Action</div>
                      </div>
                      <div class="v-table-body" id="location-empty-state" style="background-color: #fff; padding: 16px; text-align: center; font-size: 12px; font-weight: 700; color: #23282c;">
                        No Records To Display.
                      </div>
                      
                      <!-- LOCATION FORM -->
                      <div id="location-add-form" style="display:none; background-color: #fff; padding: 16px;">
                        <div style="display:flex; justify-content: space-between; align-items: center; color: #5d6773; margin-bottom: 16px;">
                          <i class="fa-solid fa-chevron-up" style="cursor:pointer;" id="collapse-location-btn"></i>
                          <i class="fa-solid fa-ellipsis-vertical" style="cursor:pointer;"></i>
                        </div>
                        
                        <div class="input-group" style="position:relative; margin-top:20px; margin-bottom: 24px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Subline State *</label>
                          <select class="custom-select" id="loc-subline-state-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option value="" id="dynamic-subline-opt"></option>
                          </select>
                        </div>
                        
                        <div style="font-size:13px; color:#5d6773; margin-bottom: 16px;">Location Number</div>
                        
                        <hr style="border:none; border-top:1px solid #7b8f9e; margin-bottom: 24px;">
                        
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Address Line 1 *</label>
                            <input type="text" class="custom-input" value="26 Federal Plaza" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>
                          
                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Address Line 2</label>
                            <input type="text" class="custom-input" value="" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">City *</label>
                            <input type="text" class="custom-input" value="New York" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">State *</label>
                            <input type="text" class="custom-input" value="NY" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">County *</label>
                            <input type="text" class="custom-input" value="New York County" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Zipcode 1 *</label>
                            <input type="text" class="custom-input" value="10278" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Zipcode 2</label>
                            <input type="text" class="custom-input" value="" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>

                          <div class="input-group" style="position:relative;">
                            <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Country *</label>
                            <input type="text" class="custom-input" value="US" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c;">
                          </div>
                        </div>
                        
                        <div class="input-group" style="position:relative; margin-bottom: 24px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Zip Code *</label>
                          <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option>35014</option>
                          </select>
                        </div>
                        
                        <div style="font-weight: 700; font-size: 14px; color: #23282c; margin-bottom: 20px;">Premises/Operations</div>
                        
                        <div class="input-group" style="position:relative; margin-bottom: 24px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">BI Deductible *</label>
                          <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option>No Deductible</option>
                          </select>
                        </div>

                        <div class="input-group" style="position:relative; margin-bottom: 24px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">PD Deductible *</label>
                          <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option>No Deductible</option>
                          </select>
                        </div>

                        <div class="input-group" style="position:relative; margin-bottom: 32px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">BI and PD Deductible *</label>
                          <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option>No Deductible</option>
                          </select>
                        </div>

                        <div style="font-weight: 700; font-size: 14px; color: #23282c; margin-bottom: 20px;">Territory</div>

                        <div class="input-group" style="position:relative; margin-bottom: 32px;">
                          <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Premises/Operations Code *</label>
                          <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c;">
                            <option>001</option>
                          </select>
                        </div>

                        <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
                          <button class="btn btn-save" id="location-save-btn" style="background-color: #2b435f; color: #fff; padding: 6px 20px; border-radius: 6px; border: none; font-size: 13px; font-weight: 500; cursor: pointer;">Save</button>
                        </div>

                        <div id="location-sub-panels" style="display:none; margin-top: 40px; padding-bottom: 24px;">
                          <!-- Additional Coverages -->
                          <div style="display:flex; align-items:center; margin-bottom: 16px;">
                            <h3 style="margin:0; font-size: 18px; font-weight: 700; color: #5d6773;">Additional Coverages</h3>
                            <i class="fa-solid fa-circle-plus" style="margin-left: 8px; font-size: 18px; color: #9fabb7; cursor: pointer;"></i>
                          </div>
                          
                          <div style="border: 1px solid #e1e6eb; border-radius: 6px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="display:flex; background-color: #eaf1f6; padding: 12px 16px; font-size: 12px; color: #23282c;">
                              <div style="flex:1;">Coverage</div>
                              <div style="flex:1; text-align:right;">Action</div>
                            </div>
                            <div style="background-color: #fff; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #23282c;">
                              No Records To Display.
                            </div>
                          </div>

                          <!-- Classification -->
                          <div style="display:flex; align-items:center; margin-bottom: 16px;">
                            <h3 style="margin:0; font-size: 18px; font-weight: 700; color: #5d6773;">Classification</h3>
                            <i class="fa-solid fa-circle-plus" id="add-class-btn" style="margin-left: 8px; font-size: 18px; color: #9fabb7; cursor: pointer;"></i>
                          </div>

                          <div style="border: 1px solid #e1e6eb; border-radius: 6px; overflow: hidden; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="display:flex; background-color: #eaf1f6; padding: 12px 16px; font-size: 12px; color: #23282c;">
                              <div style="flex:1.5;">Location Number</div>
                              <div style="flex:2; text-align:center;">Classification Number</div>
                              <div style="flex:2; text-align:center;">Class Description</div>
                              <div style="flex:1.5; text-align:center;">Class Code</div>
                              <div style="flex:1.5; text-align:center;">Premium</div>
                              <div style="flex:1; text-align:right;">Action</div>
                            </div>
                            
                            <!-- Empty Form -->
                            <div id="class-empty-state" style="background-color: #fff; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #23282c;">
                              No Records To Display.
                            </div>

                            <!-- Populated Row -->
                            <div id="class-populated-row" style="display:none; background-color: #fff; border-bottom: 1px solid #e1e6eb;">
                              <div style="display: flex; padding: 12px 16px; align-items: center; font-size: 12px; color: #23282c;">
                                <div style="flex:1.5; display:flex; align-items:center;">
                                  <i class="fa-solid fa-chevron-down" style="margin-right: 12px; color: #5d6773; cursor:pointer;"></i> 1
                                </div>
                                <div style="flex:2; text-align:center; color:#23282c;">1</div>
                                <div style="flex:2; text-align:center; color:#23282c;">Abrasive Wheel Mfg.</div>
                                <div style="flex:1.5; text-align:center; color:#23282c;">50010</div>
                                <div style="flex:1.5; text-align:center;"></div>
                                <div style="flex:1; text-align:right; font-size:16px; color:#5d6773; cursor:pointer;">&#8942;</div>
                              </div>
                            </div>
                            
                            <!-- Add Form -->
                            <div id="class-add-form" style="display:none; background-color: #fff; padding: 16px;">
                              <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
                                <i class="fa-solid fa-chevron-up" style="color: #5d6773; cursor:pointer;" id="collapse-class-btn"></i>
                                <i class="fa-solid fa-ellipsis-vertical" style="color: #5d6773; cursor:pointer;"></i>
                              </div>
                              
                              <div style="margin-bottom: 32px; font-size: 13px; color: #5d6773; display: flex;">
                                <span style="width: 250px;">Location Number</span>
                                <span style="color:#23282c;">1</span>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Classification Number *</label>
                                <input type="text" class="custom-input" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c; outline:none;">
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Product Coverage Only</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option selected>No</option>
                                  <option>Yes</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Class Code *</label>
                                <input type="text" list="class-codes" class="custom-input" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c; outline:none;">
                                <datalist id="class-codes">
                                  <option value="50010 - Abrasive Wheel Mfg."></option>
                                  <option value="50017 - Abrasives or Abrasive Products Mfg."></option>
                                  <option value="50015 - Abrasives or Abrasive Products Mfg. - artificial"></option>
                                  <option value="91111 - AC Systems or Equipment-dealers or distributor and installtn,servicing or repair"></option>
                                  <option value="50045 - Adhesive Mfg."></option>
                                  <option value="50047 - Adhesive Tape Mfg."></option>
                                  <option value="40005 - Adult Day Care - Not-For-Profit only"></option>
                                  <option value="40006 - Adult Day Care - Other than Not-For-Profit"></option>
                                  <option value="90089 - Advertising Sign Companies - outdoor"></option>
                                </datalist>
                              </div>
                              
                              <div style="color: #5d6773; font-size: 12px; line-height: 2.5; margin-bottom: 24px;">
                                <div>Liquor Premium</div>
                                <div>Owners and Contractors Premium</div>
                                <div>Railroad Premium</div>
                                <div>Classification Type</div>
                              </div>

                              <div style="font-weight: 700; font-size: 14px; color: #23282c; margin-bottom: 16px;">Premises/Operations</div>
                              
                              <div style="color: #5d6773; font-size: 12px; margin-bottom: 16px;">Premium</div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Coverage *</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option>Premises/Operations</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">BI Deductible *</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option>No Deductible</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">PD Deductible *</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option>No Deductible</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">BI and PD Deductible *</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option>No Deductible</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Premium Basis</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option>Gross Sales</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 24px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">'If Any' Basis *</label>
                                <select class="custom-select" style="width:100%; border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; color:#23282c; outline:none;">
                                  <option selected>No</option>
                                  <option>Yes</option>
                                </select>
                              </div>

                              <div class="input-group" style="position:relative; margin-bottom: 32px;">
                                <label style="position:absolute; top:-8px; left:10px; background:#fff; padding:0 4px; font-size:11px; color:#5d6773; z-index:5;">Exposure *</label>
                                <input type="text" class="custom-input" value="0" style="border:1px solid #ccc; border-radius:6px; height:36px; padding:0 12px; width:100%; color:#23282c; outline:none;">
                              </div>

                              <div style="display: flex; justify-content: flex-end;">
                                <button class="btn btn-save" id="class-save-btn" style="background-color: #2b435f; color: #fff; padding: 6px 20px; border-radius: 6px; border: none; font-size: 13px; font-weight: 500; cursor: pointer;">Save</button>
                              </div>
                            </div>
                            
                            <!-- Pagination inside Classification table -->
                            <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #5d6773; padding: 12px 16px; background-color: #fff; border-top: 1px solid #e1e6eb;">
                              <span style="margin-right: 16px;">Rows per page: <select style="border:none; background:transparent; font-size:12px; color:#23282c; cursor:pointer;"><option>5</option></select></span>
                              <span style="margin-right: 16px;">1-1 of 1</span>
                              <i class="fa-solid fa-chevron-left" style="margin-right: 16px; color:#ccc; cursor:not-allowed;"></i>
                              <i class="fa-solid fa-chevron-right" style="color:#ccc; cursor:not-allowed;"></i>
                            </div>
                          </div>
                        </div>

                        <hr style="border:none; border-top:1px solid #e1e6eb; margin: 0 -16px 12px -16px;">
                        
                        <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #5d6773;">
                          <span style="margin-right: 16px;">Rows per page: <select style="border:none; background:transparent; font-size:12px; color:#23282c; cursor:pointer;"><option>5</option></select></span>
                          <span style="margin-right: 16px;">1-1 of 1</span>
                          <i class="fa-solid fa-chevron-left" style="margin-right: 16px; color:#ccc; cursor:not-allowed;"></i>
                          <i class="fa-solid fa-chevron-right" style="color:#23282c; cursor:pointer;"></i>
                        </div>
                      </div>

                      <!-- POPULATED STATE -->
                      <div class="v-table-body" id="location-populated-state" style="display:none; background-color: #fff;">
                        <div style="display: flex; padding: 12px 16px; border-bottom: 1px solid #e1e6eb; align-items: center; font-size: 12px; color: #23282c;">
                          <div style="flex:1.5; display:flex; align-items:center;">
                            <i class="fa-solid fa-chevron-down" style="margin-right: 12px; color: #5d6773; cursor:pointer;"></i> 1
                          </div>
                          <div style="flex:2; text-align:center;">NE - Premises/Operations and Products/Completed Operations</div>
                          <div style="flex:3; text-align:center;">NE, MD 12345, USA</div>
                          <div style="flex:1.5; text-align:center;">$ 386.00</div>
                          <div style="flex:1; text-align:center; font-size:16px; color:#5d6773; cursor:pointer;">&#8942;</div>
                        </div>

                        <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #5d6773; padding: 12px 16px;">
                          <span style="margin-right: 16px;">Rows per page: <select style="border:none; background:transparent; font-size:12px; color:#23282c; cursor:pointer;"><option>5</option></select></span>
                          <span style="margin-right: 16px;">1-1 of 1</span>
                          <i class="fa-solid fa-chevron-left" style="margin-right: 16px; color:#ccc; cursor:not-allowed;"></i>
                          <i class="fa-solid fa-chevron-right" style="color:#ccc; cursor:not-allowed;"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bottom-actions">
                <button class="btn btn-next" id="nextBtn">Next</button>
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

                <div class="saved-policy-container" id="policy-saved-state" style="display:none;">
                  <div class="saved-policy-row">
                    <div class="saved-policy-left">
                      <i class="fa-solid fa-chevron-right"></i>
                      <span>AL-ALABAMA</span>
                    </div>
                    <i class="fa-solid fa-trash-can saved-policy-delete"></i>
                  </div>
                </div>

                <div class="state-form-container" id="policy-form-container" style="display:none;padding-bottom:24px;">
                  <div class="form-group" style="position:relative;">
                    <label id="lbl-policy-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="policy-state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
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
                    
                    <div style="font-size:11px;color:#5d6773;margin-bottom:4px;">Liability Deductible</div>
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
                      <label>Uninsured Motorists Coverage Type *</label>
                      <select class="custom-select"><option>Combined Single Limit</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Uninsured Motorists Coverage Combined Single Limit *</label>
                      <select class="custom-select"><option>500,000</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Uninsured Motorists Coverage Split Limit *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
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
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Liability Coverage Premium</div>
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

                    <div class="subheader">Truckers Liability Coverage</div>
                    <div class="floating-group">
                      <label>Liability Coverage Type *</label>
                      <select class="custom-select"><option>Combined Single Limit</option></select>
                    </div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Truckers Premium</p>
                      <label>Liability Limit *</label>
                      <select class="custom-select"><option>500,000</option></select>
                    </div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Liability Deductible</div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Average Vehicle Premium</p>
                      <label>Manual Premium</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <label>Cost Of Hire - Truckers - Insured Providing Primary *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <label>Cost Of Hire - Truckers - Insured Providing Excess *</label>
                      <input type="text" class="custom-input" value="0">
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
                      <label>Zip Code</label>
                      <input type="text" class="custom-input" placeholder="Zip Code">
                    </div>
                    <div class="floating-group">
                      <label>Non-Ownership Risk Type *</label>
                      <select class="custom-select"><option value=""></option></select>
                    </div>
                    <div class="floating-group">
                      <label>Number Of Employees *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <label>Garaging Location</label>
                      <input type="text" class="custom-input" placeholder="Garaging Location">
                    </div>
                    <div class="floating-group">
                      <label>Zip Code *</label>
                      <select class="custom-select"><option>35010</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Territory *</label>
                      <select class="custom-select"><option>129</option></select>
                    </div>
                    
                    <div class="floating-group">
                      <label>Liability Coverage Type *</label>
                      <select class="custom-select"><option>Combined Single Limit</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Liability Limit *</label>
                      <select class="custom-select"><option>500,000</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Number Of Volunteers *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <label>Number Of Partners *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <label>Extended Coverage For Volunteers *</label>
                      <select class="custom-select"><option>No</option></select>
                    </div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Premium</div>
                    <div class="floating-group">
                      <label>Extended Coverage For Partners *</label>
                      <select class="custom-select"><option>No</option></select>
                    </div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Premium</div>
                  </div>

                  <div class="form-actions" style="margin-top:24px;">
                    <button class="btn btn-save" id="policy-save-btn">Save</button>
                  </div>
                </div>

                <div class="acc-row" id="vehicle-row" style="padding-bottom:24px;border-top:2px solid #f0f3f6;border-bottom:none;">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  VEHICLE
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-vehicle-btn" style="cursor:pointer;"></i>
                </div>

                <div class="state-form-container" id="vehicle-form-container" style="display:none;padding-bottom:32px;">
                  <div style="font-size:12px;color:#8c97a3;margin-bottom:8px;border-bottom:1px solid #d1d9df;padding-bottom:4px;width:100%;max-width:48%;">
                    Solartis Garaging Location Lookup
                  </div>
                  <div class="grid-2col" style="margin-top:24px;">
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Address Line 1">
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Address Line 2">
                    </div>
                    <div class="floating-group icon-input">
                      <input type="text" class="custom-input" placeholder="Class Code *">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Solartis Vehicle Type *">
                    </div>
                  </div>
                  <div class="form-actions" style="margin-top:24px;">
                    <button class="btn btn-save" id="vehicle-save-btn">Save</button>
                  </div>
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

              <!-- BOTTOM BUTTONS -->
              <div class="bottom-actions" style="margin-top:24px;">
                <button class="btn btn-prev" id="prevBtn2">Previous</button>
                <button class="btn btn-next" id="nextBtn2">Next</button>
              </div>
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

  const savedStatesContainer = document.getElementById('saved-states-container');
  const stateSaveBtn = document.getElementById('state-save-btn');

  addStateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (stateForm.style.display === 'none') {
      stateForm.style.display = 'block';
      stateRow.style.paddingBottom = '20px';
      stateRow.style.borderBottom = 'none';
      if (savedStatesContainer) savedStatesContainer.style.display = 'none';
    } else {
      stateForm.style.display = 'none';
      if (document.getElementById('saved-state-text') && document.getElementById('saved-state-text').innerText) {
        if (savedStatesContainer) savedStatesContainer.style.display = 'block';
        stateRow.style.paddingBottom = '16px';
        stateRow.style.borderBottom = 'none';
      } else {
        stateRow.style.paddingBottom = '40px';
        stateRow.style.borderBottom = '2px solid #f0f3f6';
      }
    }
  });

  if (stateSaveBtn) {
    stateSaveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stateForm.style.display = 'none';
      if (savedStatesContainer) savedStatesContainer.style.display = 'block';
      stateRow.style.paddingBottom = '16px';
      stateRow.style.borderBottom = 'none';
    });
  }

  // RISK SCHEDULE logic
  const riskScheduleRow = document.getElementById('risk-schedule-row');
  const riskScheduleIcon = document.getElementById('risk-schedule-icon');
  const riskScheduleContent = document.getElementById('risk-schedule-content');

  if (riskScheduleRow) {
    riskScheduleRow.addEventListener('click', (e) => {
      e.stopPropagation();
      if (riskScheduleContent.style.display === 'none') {
        riskScheduleContent.style.display = 'block';
        if (riskScheduleIcon) {
          riskScheduleIcon.classList.remove('fa-chevron-right');
          riskScheduleIcon.classList.add('fa-chevron-down');
        }
      } else {
        riskScheduleContent.style.display = 'none';
        if (riskScheduleIcon) {
          riskScheduleIcon.classList.remove('fa-chevron-down');
          riskScheduleIcon.classList.add('fa-chevron-right');
        }
      }
    });
  }

  // LOCATION AND CLASSIFICATION ROW LOGIC
  const locationRow = document.getElementById('location-row');
  const locationIcon = document.getElementById('location-icon');
  const locationContent = document.getElementById('location-content');

  if (locationRow) {
    locationRow.addEventListener('click', (e) => {
      e.stopPropagation();
      if (locationContent.style.display === 'none') {
        locationContent.style.display = 'block';
        if (locationIcon) {
          locationIcon.classList.remove('fa-chevron-right');
          locationIcon.classList.add('fa-chevron-down');
        }
      } else {
        locationContent.style.display = 'none';
        if (locationIcon) {
          locationIcon.classList.remove('fa-chevron-down');
          locationIcon.classList.add('fa-chevron-right');
        }
      }
    });
  }

  // LOCATION FORM LOGIC
  const addLocationBtn = document.getElementById('add-location-btn');
  const locationEmptyState = document.getElementById('location-empty-state');
  const locationAddForm = document.getElementById('location-add-form');
  const collapseLocationBtn = document.getElementById('collapse-location-btn');
  const dynamicSublineOpt = document.getElementById('dynamic-subline-opt');
  const locSublineStateSelect = document.getElementById('loc-subline-state-select');

  if (addLocationBtn) {
    addLocationBtn.addEventListener('click', () => {
      // Auto fetch subline state based on GL state form above
      const glStateSelect = document.getElementById('state-select');
      const glSublineSelect = document.getElementById('subline-select');
      
      let stateName = glStateSelect && glStateSelect.value ? glStateSelect.value : 'AL';
      let sublineText = 'Premises/Operations';
      
      if (glSublineSelect && glSublineSelect.value) {
        // Find selected text, but fallback to Premises/Operations just for mock
        const selectedOpt = glSublineSelect.options[glSublineSelect.selectedIndex];
        if (selectedOpt && selectedOpt.text !== 'Select') {
          sublineText = selectedOpt.text;
        }
      }
      
      const combinedText = `${stateName} - ${sublineText}`;
      
      if (dynamicSublineOpt) {
        dynamicSublineOpt.textContent = combinedText;
        dynamicSublineOpt.value = combinedText;
        locSublineStateSelect.value = combinedText;
      }
      
      locationEmptyState.style.display = 'none';
      locationAddForm.style.display = 'block';
    });
  }

  if (collapseLocationBtn) {
    collapseLocationBtn.addEventListener('click', () => {
      locationAddForm.style.display = 'none';
      const subPanels = document.getElementById('location-sub-panels');
      if (subPanels && subPanels.style.display === 'block') {
         if (locationPopulatedState) locationPopulatedState.style.display = 'block';
         locationEmptyState.style.display = 'none';
      } else {
         locationEmptyState.style.display = 'block';
         if (locationPopulatedState) locationPopulatedState.style.display = 'none';
      }
    });
  }

  const locationSaveBtn = document.getElementById('location-save-btn');
  const locationPopulatedState = document.getElementById('location-populated-state');

  if (locationSaveBtn) {
    locationSaveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const subPanels = document.getElementById('location-sub-panels');
      if (subPanels) subPanels.style.display = 'block';
    });
  }

  stateSelect.addEventListener('change', () => {
    if (stateSelect.value) {
      lblState.style.display = 'block';
      sublineGroup.style.display = 'block';
    } else {
      lblState.style.display = 'none';
      sublineGroup.style.display = 'none';
      document.getElementById('gl-extra-fields').style.display = 'none';
    }
  });

  const sublineSelect = document.getElementById('subline-select');
  const glExtraFields = document.getElementById('gl-extra-fields');
  sublineSelect.addEventListener('change', () => {
    glExtraFields.style.display = sublineSelect.value ? 'block' : 'none';
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
    const policySavedState = document.getElementById('policy-saved-state');
    if (policySavedState) policySavedState.style.display = 'none';

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

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('saved-policy-delete')) {
       const ps = document.getElementById('policy-saved-state');
       if (ps) ps.style.display = 'none';
       policyRow.style.paddingBottom = '40px';
       policyRow.style.borderBottom = '2px solid #f0f3f6';
    }
  });

  // VEHICLE accordion
  const addVehicleBtn = document.getElementById('add-vehicle-btn');
  const vehicleFormContainer = document.getElementById('vehicle-form-container');
  const vehicleSaveBtn = document.getElementById('vehicle-save-btn');

  if (addVehicleBtn && vehicleFormContainer) {
    addVehicleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = vehicleFormContainer.style.display === 'none';
      vehicleFormContainer.style.display = isHidden ? 'block' : 'none';
      
      const vehicleRow = document.getElementById('vehicle-row');
      if (vehicleRow) {
        vehicleRow.style.borderBottom = isHidden ? 'none' : 'none'; 
        vehicleRow.style.paddingBottom = isHidden ? '20px' : '24px';
      }
    });

    if (vehicleSaveBtn) {
      vehicleSaveBtn.addEventListener('click', () => {
        vehicleFormContainer.style.display = 'none';
        const vehicleRow = document.getElementById('vehicle-row');
        if (vehicleRow) vehicleRow.style.paddingBottom = '24px';
      });
    }
  }

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
    } else {
      policyFormContainer.style.display = 'none';
      const policySavedState = document.getElementById('policy-saved-state');
      if (policySavedState) policySavedState.style.display = 'block';
      policyRow.style.borderBottom = 'none';
      policyRow.style.paddingBottom = '16px';
    }
  });

  // Navigation
  document.getElementById('prevBtn2').addEventListener('click', () => {
    const tabCa = document.getElementById('tab-ca');
    const tabGl = document.getElementById('tab-gl');
    const contentGl = document.getElementById('content-gl');
    const contentCa = document.getElementById('content-ca');
    
    // If CA tab is active, go back to GL tab
    if (tabCa && tabCa.classList.contains('active')) {
      tabCa.classList.remove('active');
      tabGl.classList.add('active');
      contentCa.style.display = 'none';
      contentGl.style.display = 'block';
      window.scrollTo(0, 0);
    } else {
      // Otherwise navigate to previous view
      navigate('view1');
    }
  });

  document.getElementById('nextBtn2').addEventListener('click', () => {
    const tabCa = document.getElementById('tab-ca');
    const tabGl = document.getElementById('tab-gl');
    const contentGl = document.getElementById('content-gl');
    const contentCa = document.getElementById('content-ca');
    
    // If GL tab is active, go next to CA tab
    if (tabGl && tabGl.classList.contains('active')) {
      tabGl.classList.remove('active');
      tabCa.classList.add('active');
      contentGl.style.display = 'none';
      contentCa.style.display = 'block';
      window.scrollTo(0, 0);
    } else {
      // Otherwise navigate to next view
      navigate('view3');
    }
  });

  const addClassBtn = document.getElementById('add-class-btn');
  const classEmptyState = document.getElementById('class-empty-state');
  const classAddForm = document.getElementById('class-add-form');
  const collapseClassBtn = document.getElementById('collapse-class-btn');
  const classSaveBtn = document.getElementById('class-save-btn');
  const classPopulatedRow = document.getElementById('class-populated-row');

  if (addClassBtn) {
    addClassBtn.addEventListener('click', () => {
      if (classEmptyState) classEmptyState.style.display = 'none';
      if (classPopulatedRow) classPopulatedRow.style.display = 'none';
      if (classAddForm) classAddForm.style.display = 'block';
    });
  }

  if (collapseClassBtn) {
    collapseClassBtn.addEventListener('click', () => {
      if (classAddForm) classAddForm.style.display = 'none';
      if (classEmptyState) classEmptyState.style.display = 'block';
      if (classPopulatedRow) classPopulatedRow.style.display = 'none';
    });
  }

  if (classSaveBtn) {
    classSaveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (classAddForm) classAddForm.style.display = 'none';
      if (classEmptyState) classEmptyState.style.display = 'none';
      if (classPopulatedRow) classPopulatedRow.style.display = 'block';
    });
  }

  attachDetailsToggle();
}
