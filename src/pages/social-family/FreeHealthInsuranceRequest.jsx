import { useState } from "react";
import "./FreeHealthInsuranceRequest.css";

const FORM_KEY = "free-health-insurance-request";

/** Resolve API base safely (works with Vite or CRA) */
const API_BASE =
  (typeof process !== "undefined" && process.env && (process.env.REACT_APP_API_BASE || process.env.API_BASE)) ||
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  "";

const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

/** Helper: format JS Date (or ISO string) -> MySQL DATETIME "YYYY-MM-DD HH:MM:SS" */
function toMySQLDateTime(value) {
  if (!value) return null;
  // If already looks like "YYYY-MM-DD HH:MM:SS" return it
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return value;
  // Try parse (ISO or other)
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}

const FreeHealthInsuranceRequest = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const collectTableRows = (tableEl) => {
    if (!tableEl) return [];
    const tbody = tableEl.querySelector("tbody");
    if (!tbody) return [];
    const rows = Array.from(tbody.querySelectorAll("tr"));
    return rows.map((tr) => {
      const inputs = Array.from(tr.querySelectorAll("input, select, textarea"));
      const obj = {};
      inputs.forEach((input, idx) => {
        const key = input.name || `col${idx + 1}`;
        obj[key] = input.value || "";
      });
      return obj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const formEl = e.target;
      const fd = new FormData(formEl);
      const flat = {};
      for (const [k, v] of fd.entries()) flat[k] = v;

      // collect tables inside tapsil container
      const tapsil = formEl.querySelector(".tapsil-container");
      let familyMembers = [];
      let employment = [];
      let landOwnership = [];

      if (tapsil) {
        const tables = tapsil.querySelectorAll(".details-table");
        familyMembers = collectTableRows(tables[0]);
        employment = collectTableRows(tables[1]);
        landOwnership = collectTableRows(tables[2]);
      }

      const financial = {
        family_annual_income: flat.family_annual_income || "",
        family_debt: flat.family_debt || "",
        poverty: flat.poverty || "",
        poverty_level: flat.level || "",
        other_notes: flat.other_notes || ""
      };

      const applicant = {
        name: flat.applicant_name || "",
        signature: flat.applicant_signature || "",
        address: flat.applicant_address || "",
        citizenship_no: flat.applicant_citizenship_no || "",
        phone: flat.applicant_phone || ""
      };

      // prepare addressee object (keeps structure like earlier suggestions)
      const addressee = {
        local: flat.addressee_local || "",
        district: flat.addressee_district || ""
      };

      // convert meta_date to MySQL DATETIME if present
      // NOTE: don't send created_at/updated_at — DB will fill those
      const metaDateRaw = flat.meta_date || flat.fiscal_year || null; 
      // you used 'fiscal_year' as year; if you actually have a date input named meta_date use that instead.
      // Here we attempt conversion only if meta_date exists and looks like date
      const meta_date = toMySQLDateTime(flat.meta_date || null);

      // Build payload but omit undefined/null DB-managed fields:
      const payload = {
        // only include values you intend to write to DB
        chalani_no: flat.chalani_no || null,
        fiscal_year: flat.fiscal_year || null,
        addressee,
        family_members: familyMembers.length ? familyMembers : null,
        employment: employment.length ? employment : null,
        land_ownership: landOwnership.length ? landOwnership : null,
        financial,
        applicant,
        // pass meta_date only if valid; otherwise omit (send null)
        ...(meta_date ? { meta_date } : {})
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved — id: ${data.id}` });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="health-insurance-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        निशुल्क स्वास्थ्य बिमा गरि पाउँ ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; निशुल्क स्वास्थ्य बिमा गरि पाउँ</span>
      </div>

      {/* --- Header Section (Date only on right) --- */}
      <div className="header-right-date">
        <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p>श्रीमान् नगर प्रमुख ज्यू</p>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन नगरपालिका" name="addressee_local" />
           <span>,</span>
           <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" name="addressee_district" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">निशुल्क स्वास्थ्य बिमा गरिदिनु हुन ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस नगरपालिकाबाट आ. व. <input name="fiscal_year" type="text" className="inline-box-input medium-box" /> <span className="red">*</span> मा गरिब, विपन्न, किसान, मजदुरको लागि निशुल्क स्वास्थ्य बिमा गरिदिने कार्यक्रम रहेकोले तपशिलको विवरण पेश गरि सो कार्यक्रममा मेरो परिवारलाई समावेश गरिदिनुहुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Tapsil Section --- */}
      <div className="tapsil-container">
        <h4 className="bold-text">तपशिल</h4>

        {/* Table 1 */}
        <p className="bold-text">क) परिवारमा सदस्यहरुको विवरण :</p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>क्र.सं.</th>
                <th style={{width: '25%'}}>नाम, थर</th>
                <th style={{width: '20%'}}>घरमुलीसँगको नाता</th>
                <th style={{width: '15%'}}>लिङ्ग</th>
                <th style={{width: '10%'}}>उमेर</th>
                <th style={{width: '15%'}}>शैक्षिक योग्यता</th>
                <th style={{width: '10%'}}>सम्पर्क</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input name="family_1_name" type="text" className="table-input" /></td>
                <td><input name="family_1_relation" type="text" className="table-input" /></td>
                <td><input name="family_1_gender" type="text" className="table-input" /></td>
                <td><input name="family_1_age" type="text" className="table-input" /></td>
                <td><input name="family_1_education" type="text" className="table-input" /></td>
                <td><input name="family_1_contact" type="text" className="table-input" /></td>
              </tr>
            </tbody>
          </table>
          <div className="fake-scrollbar"><div className="scroll-thumb"></div></div>
        </div>

        {/* Table 2 */}
        <p className="bold-text mt-20">ख) परिवारमा रोजगारी सम्बन्धि विवरण :</p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>क्र.सं.</th>
                <th style={{width: '25%'}}>नाम, थर</th>
                <th style={{width: '20%'}}>रोजगारीको अवस्था</th>
                <th style={{width: '20%'}}>कुन संस्था</th>
                <th style={{width: '15%'}}>पद</th>
                <th style={{width: '15%'}}>परिवारको आय</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input name="emp_1_name" type="text" className="table-input" /></td>
                <td><input name="emp_1_status" type="text" className="table-input" /></td>
                <td><input name="emp_1_org" type="text" className="table-input" /></td>
                <td><input name="emp_1_position" type="text" className="table-input" /></td>
                <td><input name="emp_1_income" type="text" className="table-input" /></td>
              </tr>
            </tbody>
          </table>
          <div className="fake-scrollbar"><div className="scroll-thumb"></div></div>
        </div>

        {/* Table 3 */}
        <p className="bold-text mt-20">ग) परिवारको स्वामित्वमा रहेको जग्गाजमिनको विवरण :</p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>क्र.सं.</th>
                <th style={{width: '35%'}}>जग्गाधनीको नाम</th>
                <th style={{width: '25%'}}>क्षेत्रफल</th>
                <th style={{width: '25%'}}>कैफियत</th>
                <th style={{width: '10%'}}>थप</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input name="land_1_owner" type="text" className="table-input" /></td>
                <td><input name="land_1_area" type="text" className="table-input" /></td>
                <td><input name="land_1_remarks" type="text" className="table-input" /></td>
                <td className="action-cell"><button type="button" className="add-btn">+</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial & Other Details */}
        <div className="financial-details mt-20">
          <div className="form-row">
            <label>घ) परिवारमा वार्षिक आम्दानी रु.</label>
            <span className="red">*</span>
            <input name="family_annual_income" type="text" className="line-input medium-input" />
          </div>
          <div className="form-row">
            <label>ङ) परिवारमा ऋण कति छ ? रु.</label>
            <span className="red">*</span>
            <input name="family_debt" type="text" className="line-input medium-input" />
          </div>

          <div className="form-row mt-10">
            <label>च) गरिब घरपरिवार परिचयपत्रको लागि नेपाल सरकार, नगरपालिकाले गरिब घर परिवारको सुचिमा परेको छ / छैन ?</label>
          </div>
          <div className="radio-group">
            <input name="poverty" type="radio" value="yes" id="yes" defaultChecked /> <label htmlFor="yes">(१) छ</label>
            <input name="poverty" type="radio" value="no" id="no" className="ml-20" /> <label htmlFor="no">(२) छैन</label>
          </div>

          <div className="form-row mt-10">
            <label className="bold-text">परेको भए कुन तहमा ?</label>
          </div>
          <div className="radio-group">
            <input name="level" type="radio" value="1" id="level1" /> <label htmlFor="level1">१) अति गरिब</label>
            <input name="level" type="radio" value="2" id="level2" className="ml-20" /> <label htmlFor="level2">२) मध्यम गरिब</label>
            <input name="level" type="radio" value="3" id="level3" className="ml-20" /> <label htmlFor="level3">३) सामान्य गरिब</label>
          </div>

          <div className="form-row mt-20">
            <label>छ) अन्य कुरा भए उल्लेख गर्नुहोस ।</label>
          </div>
          <textarea name="other_notes" className="details-textarea" rows="4"></textarea>
        </div>
      </div>

      {/* Applicant Signature Section */}
      <div className="applicant-signature-section">
        <div className="sig-row">
          <label>निवेदकको नाम, थर : <span className="red">*</span></label>
          <input name="applicant_name" type="text" className="line-input medium-input" />
        </div>
        <div className="sig-row">
          <label>दस्तखत :</label>
          <input name="applicant_signature" type="text" className="line-input medium-input" />
        </div>
        <div className="sig-row">
          <label>ठेगाना : <span className="red">*</span></label>
          <input name="applicant_address" type="text" className="line-input medium-input" />
        </div>
      </div>

      {/* Applicant Details Box (Footer) */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input name="applicant_name_copy" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input name="applicant_address_copy" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input name="applicant_phone" type="text" className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && (
        <div style={{ marginTop: 8, color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default FreeHealthInsuranceRequest;
