// src/components/CitizenshipCertificateRecommendation.jsx  (नागरिकता प्रमाणपत्र सिफारिस)
import React, { useState } from "react";
import "./CitizenshipCertificateRecommendation.css";
// import ApplicantDetailsNp from "../../components/ApplicantDetailsNp"; // uncomment when available

const FORM_KEY = "citizenship-certificate-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;
const MUNICIPALITY_NAME = "नगरपालिका"; // replace with actual municipality name

const initialState = {
  full_name_np: "",
  full_name_en: "",
  sex: "पुरुष",
  dob_bs: "",
  dob_ad: "",
  birth_district_np: "",
  birth_municipality_np: "",
  birth_ward_np: "",
  birth_district_en: "",
  birth_municipality_en: "",
  birth_ward_en: "",
  permanent_district_np: "",
  permanent_municipality_np: "",
  permanent_ward_np: "",
  grandfather_name: "",
  grandfather_relation: "",
  father_name: "",
  father_address: "",
  father_citizenship_no: "",
  husband_name: "",
  husband_address: "",
  husband_citizenship_no: "",
  mother_name: "",
  mother_citizenship_no: "",
  witness_name: "",
  witness_address: "",
  witness_citizenship_no: "",
  witness_signature: "",
  declaration_text: "",
  recommender_name: "",
  recommender_designation: "",
  recommender_date: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function CitizenshipCertificateRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Unified change handler — works for both synthetic events and direct (key, value) calls
  const handleChange = (eOrKey, valueIfDirect) => {
    if (typeof eOrKey === "string") {
      // Called as handleChange("field_name", value)
      setForm(s => ({ ...s, [eOrKey]: valueIfDirect }));
    } else {
      // Called as onChange={handleChange} from an input
      const { name, value } = eOrKey.target;
      setForm(s => ({ ...s, [name]: value }));
    }
  };

  // Convenience updater for inline onChange usage: onChange={update("field_name")}
  const update = (key) => (e) => setForm(s => ({ ...s, [key]: e.target.value }));

  const validate = () => {
    if (!form.full_name_np.trim()) return "पूरा नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no.trim()) return "निवेदकको नागरिकता नं. आवश्यक छ।";
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    return null;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }
      setMessage({ type: "success", text: `सेभ भयो (id: ${body.id || "unknown"})` });
      setForm(initialState);
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-rec-container" onSubmit={handleSubmit}>

      {/* ── Top Bar ── */}
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र पाउँ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र पाउँ</span>
      </div>

      {/* ── Applicant Details Grid ── */}
      <div className="applicant-details-grid">

        {/* Full Name (Nepali) */}
        <div className="row-group">
          <label>पूरा नाम : <span className="red">*</span></label>
          <input
            type="text"
            name="full_name_np"
            value={form.full_name_np}
            onChange={update("full_name_np")}
            className="dotted-input long-input"
          />
        </div>

        {/* Full Name (English) */}
        <div className="row-group">
          <label className="en-label">Full Name (In Block) :</label>
          <input
            type="text"
            name="full_name_en"
            value={form.full_name_en}
            onChange={update("full_name_en")}
            className="dotted-input long-input"
          />
        </div>

        {/* Sex + DOB */}
        <div className="row-group-split">
          <div className="split-item">
            <label>लिङ्ग :</label>
            <select name="sex" value={form.sex} onChange={update("sex")}>
              <option>पुरुष</option>
              <option>महिला</option>
              <option>अन्य</option>
            </select>
          </div>

          <div className="split-item">
            <label>जन्म मिति (वि.स.) :</label>
            <input
              type="text"
              name="dob_bs"
              value={form.dob_bs}
              onChange={update("dob_bs")}
              className="dotted-input medium-input"
            />
            <label style={{ marginLeft: 10 }}>Date of Birth (A.D.) :</label>
            <input
              type="date"
              name="dob_ad"
              value={form.dob_ad}
              onChange={update("dob_ad")}
              className="dotted-input medium-input"
            />
          </div>
        </div>

        {/* Birth Address (Nepali) */}
        <div className="row-group-full">
          <label>जन्म स्थान (जिल्ला / नगरपालिका / वडा) :</label>
          <input type="text" name="birth_district_np" value={form.birth_district_np} onChange={update("birth_district_np")} placeholder="जिल्ला" className="dotted-input medium-input" />
          <input type="text" name="birth_municipality_np" value={form.birth_municipality_np} onChange={update("birth_municipality_np")} placeholder="नगरपालिका" className="dotted-input medium-input" />
          <input type="text" name="birth_ward_np" value={form.birth_ward_np} onChange={update("birth_ward_np")} placeholder="वडा नं." className="dotted-input small-input" />
        </div>

        {/* Birth Address (English) */}
        <div className="row-group-full">
          <label>Place of Birth (District / Municipality / Ward) :</label>
          <input type="text" name="birth_district_en" value={form.birth_district_en} onChange={update("birth_district_en")} placeholder="District" className="dotted-input medium-input" />
          <input type="text" name="birth_municipality_en" value={form.birth_municipality_en} onChange={update("birth_municipality_en")} placeholder="Municipality" className="dotted-input medium-input" />
          <input type="text" name="birth_ward_en" value={form.birth_ward_en} onChange={update("birth_ward_en")} placeholder="Ward No." className="dotted-input small-input" />
        </div>

        {/* Permanent Address */}
        <div className="row-group-full">
          <label>स्थायी ठेगाना (जिल्ला / नगरपालिका / वडा) :</label>
          <input type="text" name="permanent_district_np" value={form.permanent_district_np} onChange={update("permanent_district_np")} placeholder="जिल्ला" className="dotted-input medium-input" />
          <input type="text" name="permanent_municipality_np" value={form.permanent_municipality_np} onChange={update("permanent_municipality_np")} placeholder="नगरपालिका" className="dotted-input medium-input" />
          <input type="text" name="permanent_ward_np" value={form.permanent_ward_np} onChange={update("permanent_ward_np")} placeholder="वडा नं." className="dotted-input small-input" />
        </div>

        {/* Grandfather */}
        <div className="row-group-full">
          <label>बाजेको नाम, नाता :</label>
          <input type="text" name="grandfather_name" value={form.grandfather_name} onChange={update("grandfather_name")} placeholder="बाजेको नाम" className="dotted-input medium-input" />
          <input type="text" name="grandfather_relation" value={form.grandfather_relation} onChange={update("grandfather_relation")} placeholder="नाता" className="dotted-input medium-input" />
        </div>

        {/* Father */}
        <div className="row-group-full">
          <label>बाबुको नाम, ठेगाना, नागरिकता नं. : <span className="red">*</span></label>
          <input type="text" name="father_name" value={form.father_name} onChange={update("father_name")} placeholder="बाबुको नाम" className="dotted-input medium-input" />
          <input type="text" name="father_address" value={form.father_address} onChange={update("father_address")} placeholder="ठेगाना" className="dotted-input medium-input" />
          <input type="text" name="father_citizenship_no" value={form.father_citizenship_no} onChange={update("father_citizenship_no")} placeholder="नागरिकता नं." className="dotted-input small-input" />
        </div>

        {/* Husband (optional) */}
        <div className="row-group-full">
          <label>पतिको नाम, ठेगाना, नागरिकता नं. :</label>
          <input type="text" name="husband_name" value={form.husband_name} onChange={update("husband_name")} placeholder="पतिको नाम" className="dotted-input medium-input" />
          <input type="text" name="husband_address" value={form.husband_address} onChange={update("husband_address")} placeholder="ठेगाना" className="dotted-input medium-input" />
          <input type="text" name="husband_citizenship_no" value={form.husband_citizenship_no} onChange={update("husband_citizenship_no")} placeholder="नागरिकता नं." className="dotted-input small-input" />
        </div>

        {/* Mother */}
        <div className="row-group-full">
          <label>आमाको नाम, नागरिकता नं. :</label>
          <input type="text" name="mother_name" value={form.mother_name} onChange={update("mother_name")} placeholder="आमाको नाम" className="dotted-input medium-input" />
          <input type="text" name="mother_citizenship_no" value={form.mother_citizenship_no} onChange={update("mother_citizenship_no")} placeholder="नागरिकता नं." className="dotted-input small-input" />
        </div>

        {/* Witness */}
        <div className="witness-details-row">
          <h4 className="section-title">रोहबर</h4>
          <div className="witness-grid">
            <div className="witness-item">
              <label>नाम थर</label>
              <input type="text" name="witness_name" value={form.witness_name} onChange={update("witness_name")} className="dotted-input" />
            </div>
            <div className="witness-item">
              <label>ठेगाना</label>
              <input type="text" name="witness_address" value={form.witness_address} onChange={update("witness_address")} className="dotted-input" />
            </div>
            <div className="witness-item">
              <label>नागरिकता नं.</label>
              <input type="text" name="witness_citizenship_no" value={form.witness_citizenship_no} onChange={update("witness_citizenship_no")} className="dotted-input" />
            </div>
            <div className="witness-item">
              <label>सहीछाप</label>
              <input type="text" name="witness_signature" value={form.witness_signature} onChange={update("witness_signature")} className="dotted-input" />
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="declaration-text">
          <textarea
            name="declaration_text"
            value={form.declaration_text}
            onChange={update("declaration_text")}
            placeholder="घोषणा..."
            rows={4}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {/* Recommendation Footer */}
        <div className="recommendation-footer-section">
          <div className="row-group">
            <label>सिफारिस गर्नेको नाम :</label>
            <input
              type="text"
              name="recommender_name"
              value={form.recommender_name}
              onChange={update("recommender_name")}
              placeholder="सिफारिस गर्नेको नाम"
              className="dotted-input medium-input"
            />
          </div>
          <div className="row-group">
            <label>पद :</label>
            <select name="recommender_designation" value={form.recommender_designation} onChange={update("recommender_designation")}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
          <div className="row-group">
            <label>मिति :</label>
            <input
              type="date"
              name="recommender_date"
              value={form.recommender_date}
              onChange={update("recommender_date")}
              className="dotted-input medium-input"
            />
          </div>
        </div>

        {/* ── Applicant Details Box (inline — replace with <ApplicantDetailsNp> when available) ── */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम <span className="red">*</span></label>
              <input
                type="text"
                name="applicant_name"
                value={form.applicant_name}
                onChange={update("applicant_name")}
                className="detail-input"
              />
            </div>
            <div className="detail-group">
              <label>ठेगाना</label>
              <input
                type="text"
                name="applicant_address"
                value={form.applicant_address}
                onChange={update("applicant_address")}
                className="detail-input"
              />
            </div>
            <div className="detail-group">
              <label>नागरिकता नं. <span className="red">*</span></label>
              <input
                type="text"
                name="applicant_citizenship_no"
                value={form.applicant_citizenship_no}
                onChange={update("applicant_citizenship_no")}
                className="detail-input"
              />
            </div>
            <div className="detail-group">
              <label>सम्पर्क नं.</label>
              <input
                type="tel"
                name="applicant_phone"
                value={form.applicant_phone}
                onChange={update("applicant_phone")}
                className="detail-input"
              />
            </div>
            <div className="detail-group">
              <label>कैफियत / थप जानकारी</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={update("notes")}
                className="detail-input"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className="form-footer">
          {message && (
            <div style={{
              color: message.type === "error" ? "crimson" : "green",
              marginBottom: 12,
              fontWeight: "bold"
            }}>
              {message.text}
            </div>
          )}
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ गर्नुहोस्"}
          </button>
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
            style={{ marginLeft: 12 }}
          >
            प्रिन्ट गर्नुहोस्
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY_NAME}
        </div>

      </div>{/* end .applicant-details-grid */}
    </form>
  );
}