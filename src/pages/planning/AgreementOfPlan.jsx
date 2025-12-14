// src/components/AgreementOfPlan.jsx
import React, { useState } from "react";
import "./AgreementOfPlan.css";

const FORM_KEY = "agreement-of-plan";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite safe; replace if using CRA
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

export default function AgreementOfPlan() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // collect values from page without changing layout or visuals
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      // container is the form element
      const formEl = e.target;

      // 1) Collect simple named fields
      const formData = new FormData(formEl);
      const obj = {};
      for (const [k, v] of formData.entries()) {
        // skip empty strings (optional)
        obj[k] = v;
      }

      // 2) Collect tapsil rows (they are multiple groups of inputs in the UI)
      // We assume each tapsil item in DOM has class `.tapsil-item` and contains inputs.
      const tapsilEls = formEl.querySelectorAll(".tapsil-item");
      const tapsil = Array.from(tapsilEls).map((itemEl) => {
        // inside each tapsil-item, read inputs in the order or by name
        const row = {};
        // find all inputs inside this tapsil item
        const inputs = itemEl.querySelectorAll("input, textarea, select");
        inputs.forEach((inp) => {
          const name = inp.getAttribute("data-tapsil-name") || inp.name || inp.getAttribute("name");
          // only include if name present
          if (name) row[name] = inp.value;
        });
        return row;
      });

      // attach tapsil only if there is meaningful data
      if (tapsil.length) obj.tapsil = tapsil;

      // 3) Send JSON to backend
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plan-agreement-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          योजना सम्झौता सिफारिस
          <span className="top-right-bread">योजना &gt; योजना सम्झौता सिफारिस</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            {/* added name attribute (invisible) so backend receives it */}
            <p>चलानी नं. : <input name="project_code_or_id" type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">योजना सम्झौता गरिदिने सम्बन्धमा।</span></p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>प्रमुख प्रशासकीय अधिकृत</span>
          </div>
          <div className="addressee-row">
            <span>नगरकार्यपालिकाको कार्यालय</span>
          </div>
          <div className="addressee-row">
            {/* name attributes added only; layout same */}
            <input name="implement_unit" type="text" className="line-input medium-input" defaultValue="नागार्जुन" />
            <input name="district" type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा काठमाडौँ <span className="ml-20">नागार्जुन नगरपालिका</span> को चालु आ.व.
            <input name="fiscal_year" type="text" className="inline-box-input medium-box" defaultValue="२०८२/८३" />
            को स्वीकृत बजेट तथा निति कार्यक्रम अनुसार
            <input name="project_title" type="text" className="inline-box-input long-box" required /> लाई
            <input name="agreement_amount" type="text" className="inline-box-input medium-box" required /> कार्य गर्न रु
            <input name="allocated_amount" type="text" className="inline-box-input medium-box" required /> (
            <input name="allocated_amount_in_words" type="text" className="inline-box-input long-box" required /> ) विनियोजन भएको हुदा त्यहाँ कार्यालयको नियम अनुसार
            <input name="party_a" type="text" className="inline-box-input long-box" required /> , र
            <input name="party_b" type="text" className="inline-box-input long-box" required /> , विच योजना / कार्यक्रम सम्झौता गरि दिनुहुन यो सिफारिस गरिएको व्यहोरा अनुरोध छ।
          </p>
        </div>

        {/* --- Tapsil (Details List) --- */}
        <div className="tapsil-section">
          <h4 className="underline-text bold-text">तपशिल</h4>

          {/* Keep same layout — each tapsil-item has inputs. 
              For collection we use data-tapsil-name attributes inside each tapsil-item so we don't touch layout. */}
          <div className="tapsil-list">
            <div className="tapsil-item">
              <label>१. योजना तथा कार्यक्रमको नाम</label>
              <span className="red">*</span>
              <input data-tapsil-name="name_of_program" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>२. विनियोजित रकम जम्मा</label>
              <span className="red">*</span>
              <input data-tapsil-name="total_allocated" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>३. हाल सम्झौता हुने रकम</label>
              <span className="red">*</span>
              <input data-tapsil-name="amount_to_be_agreed" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>४. बजेट उपशिर्षक नं.</label>
              <span className="red">*</span>
              <input data-tapsil-name="budget_subcode" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>५. खर्चको प्रकार</label>
              <span className="red">*</span>
              <input data-tapsil-name="expense_type" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>६. सिलिङ</label>
              <span className="red">*</span>
              <input data-tapsil-name="ceiling" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>७. कामको विवरण</label>
              <span className="red">*</span>
              <input data-tapsil-name="work_description" type="text" className="line-input long-input" />
            </div>
            <div className="tapsil-item">
              <label>८. उपभोक्ता समितिको नाम</label>
              <span className="red">*</span>
              <input data-tapsil-name="consumer_committee" type="text" className="line-input long-input" />
            </div>
          </div>
          {/* If you need multiple tapsil rows, keep the same structure and duplicate these tapsil-item blocks in DOM — the submit logic will read them all. */}
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signatory_name" type="text" className="line-input full-width-input" required />
            <select name="signatory_designation" className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" />
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

        {/* --- Footer Action --- */}
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
}
