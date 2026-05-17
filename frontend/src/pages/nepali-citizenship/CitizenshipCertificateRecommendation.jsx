import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "citizenship-certificate-recommendation"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  full_name_np:              "",
  full_name_en:              "",
  sex:                       "पुरुष",
  dob_bs:                    "",
  dob_ad:                    "",
  birth_district_np:         "",
  birth_municipality_np:     "",
  birth_ward_np:             "",
  birth_district_en:         "",
  birth_municipality_en:     "",
  birth_ward_en:             "",
  permanent_district_np:     "",
  permanent_municipality_np: "",
  permanent_ward_np:         "",
  grandfather_name:          "",
  grandfather_relation:      "",
  father_name:               "",
  father_address:            "",
  father_citizenship_no:     "",
  husband_name:              "",
  husband_address:           "",
  husband_citizenship_no:    "",
  mother_name:               "",
  mother_citizenship_no:     "",
  witness_name:              "",
  witness_address:           "",
  witness_citizenship_no:    "",
  witness_signature:         "",
  declaration_text:          "",
  recommender_name:          "",
  recommender_designation:   "",
  recommender_date:          "",
  applicant_name:            "",
  applicant_address:         "",
  applicant_citizenship_no:  "",
  applicant_phone:           "",
  notes:                     "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ccr-)
───────────────────────────────────────────── */
const styles = `
.ccr-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #000;
  position: relative;
}

.ccr-red      { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.ccr-en-label { font-family: sans-serif; font-size: 0.9rem; color: #333; }

.ccr-top-bar-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ccr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ccr-section-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 10px;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 5px;
}

.ccr-row-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
  font-size: 0.95rem;
}
.ccr-row-group-full {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
  font-size: 0.95rem;
  border-bottom: 1px dotted #eee;
  padding-bottom: 5px;
}
.ccr-row-group label,
.ccr-row-group-full label {
  white-space: nowrap;
  margin-right: 5px;
  font-weight: 500;
}

.ccr-row-group-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  border-bottom: 1px dotted #eee;
  padding-bottom: 5px;
  margin-bottom: 8px;
}
.ccr-split-item { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }

.ccr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  outline: none;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 0.9rem;
  border-radius: 2px;
  transition: background-color 0.15s, border-bottom-color 0.15s;
}
.ccr-dotted-input:focus {
  background-color: #f0f7ff;
  border-bottom-color: #3b7dd8;
}

.ccr-long-input   { width: 340px; }
.ccr-medium-input { width: 220px; }
.ccr-small-input  { width: 120px; }

.ccr-container select {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}
.ccr-container select:focus { border-color: #3b7dd8; }

.ccr-witness-details-row { margin-top: 20px; padding-top: 10px; border-top: 1px dotted #ccc; }
.ccr-witness-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  text-align: center;
  margin-top: 10px;
}
.ccr-witness-item { display: flex; flex-direction: column; align-items: center; }
.ccr-witness-item label { margin-bottom: 5px; }
.ccr-witness-item .ccr-dotted-input { width: 100%; }

.ccr-declaration-text { margin-top: 30px; font-size: 0.95rem; text-align: justify; }
.ccr-declaration-text textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  padding: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
}
.ccr-declaration-text textarea:focus { border-color: #3b7dd8; outline: none; }

.ccr-recommendation-footer-section {
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px dotted #ccc;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ccr-applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;
}
.ccr-applicant-details-box h3 {
  color: #555;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.ccr-details-grid { display: flex; flex-direction: column; gap: 15px; }
.ccr-detail-group { display: flex; flex-direction: column; }
.ccr-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.ccr-detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  background-color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
}
.ccr-detail-input:focus { border-color: #3b7dd8; outline: none; }
textarea.ccr-detail-input { max-width: 100%; resize: vertical; }

.ccr-message-success { color: green; margin-bottom: 12px; font-weight: bold; }
.ccr-message-error   { color: crimson; margin-bottom: 12px; font-weight: bold; }

.ccr-footer { text-align: center; margin-top: 40px; }
.ccr-save-btn {
  background-color: #2c3e50;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: background-color 0.2s;
}
.ccr-save-btn:hover:not(:disabled) { background-color: #1a252f; }
.ccr-save-btn:disabled { background-color: #7f8c8d; cursor: not-allowed; }
.ccr-print-btn {
  background-color: #4a5568;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  margin-left: 12px;
}
.ccr-print-btn:hover { background-color: #2d3748; }

.ccr-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .ccr-container,
  .ccr-container * { visibility: visible; }
  .ccr-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }
  .ccr-footer,
  .ccr-top-right-bread,
  .ccr-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ccr-container { padding: 15px; }
  .ccr-row-group-split { grid-template-columns: 1fr; }
  .ccr-witness-grid { grid-template-columns: 1fr 1fr; }
  .ccr-long-input, .ccr-medium-input { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CitizenshipCertificateRecommendation() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Convenience field updater for inline onChange
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const validate = () => {
    if (!form.full_name_np.trim())          return "पूरा नाम आवश्यक छ।";
    if (!form.father_name.trim())           return "बाबुको नाम आवश्यक छ।";
    if (!form.applicant_name.trim())        return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no.trim()) return "निवेदकको नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/citizenship-certificate-recommendation",
        payload,
      );

      setMessage({
        type: "success",
        text: `सेभ भयो (id: ${res.data?.id || "unknown"})`,
      });
      window.print();
      setTimeout(() => setForm(INITIAL_STATE), 500);
    } catch (err) {
      console.error("submit error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "सेभ गर्न सकिएन",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="ccr-container" onSubmit={handleSubmit}>

        {/* ── Top bar ── */}
        <div className="ccr-top-bar-title">
          नेपाली नागरिकताको प्रमाण पत्र पाउँ।
          <span className="ccr-top-right-bread">
            नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र पाउँ
          </span>
        </div>

        <div className="ccr-applicant-details-grid">

          {/* Full Name (Nepali) */}
          <div className="ccr-row-group">
            <label>पूरा नाम : <span className="ccr-red">*</span></label>
            <input
              type="text" name="full_name_np" value={form.full_name_np}
              onChange={update("full_name_np")}
              className="ccr-dotted-input ccr-long-input"
            />
          </div>

          {/* Full Name (English) */}
          <div className="ccr-row-group">
            <label className="ccr-en-label">Full Name (In Block) :</label>
            <input
              type="text" name="full_name_en" value={form.full_name_en}
              onChange={update("full_name_en")}
              className="ccr-dotted-input ccr-long-input"
            />
          </div>

          {/* Sex + DOB */}
          <div className="ccr-row-group-split">
            <div className="ccr-split-item">
              <label>लिङ्ग :</label>
              <select name="sex" value={form.sex} onChange={update("sex")}>
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>
            <div className="ccr-split-item">
              <label>जन्म मिति (वि.स.) :</label>
              <input
                type="text" name="dob_bs" value={form.dob_bs}
                onChange={update("dob_bs")}
                className="ccr-dotted-input ccr-medium-input"
              />
              <label style={{ marginLeft: 10 }}>Date of Birth (A.D.) :</label>
              <input
                type="date" name="dob_ad" value={form.dob_ad}
                onChange={update("dob_ad")}
                className="ccr-dotted-input ccr-medium-input"
              />
            </div>
          </div>

          {/* Birth Address (Nepali) */}
          <div className="ccr-row-group-full">
            <label>जन्म स्थान (जिल्ला / नगरपालिका / वडा) :</label>
            <input type="text" name="birth_district_np" value={form.birth_district_np} onChange={update("birth_district_np")} placeholder="जिल्ला" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="birth_municipality_np" value={form.birth_municipality_np} onChange={update("birth_municipality_np")} placeholder="नगरपालिका" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="birth_ward_np" value={form.birth_ward_np} onChange={update("birth_ward_np")} placeholder="वडा नं." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Birth Address (English) */}
          <div className="ccr-row-group-full">
            <label>Place of Birth (District / Municipality / Ward) :</label>
            <input type="text" name="birth_district_en" value={form.birth_district_en} onChange={update("birth_district_en")} placeholder="District" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="birth_municipality_en" value={form.birth_municipality_en} onChange={update("birth_municipality_en")} placeholder="Municipality" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="birth_ward_en" value={form.birth_ward_en} onChange={update("birth_ward_en")} placeholder="Ward No." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Permanent Address */}
          <div className="ccr-row-group-full">
            <label>स्थायी ठेगाना (जिल्ला / नगरपालिका / वडा) :</label>
            <input type="text" name="permanent_district_np" value={form.permanent_district_np} onChange={update("permanent_district_np")} placeholder="जिल्ला" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="permanent_municipality_np" value={form.permanent_municipality_np} onChange={update("permanent_municipality_np")} placeholder="नगरपालिका" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="permanent_ward_np" value={form.permanent_ward_np} onChange={update("permanent_ward_np")} placeholder="वडा नं." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Grandfather */}
          <div className="ccr-row-group-full">
            <label>बाजेको नाम, नाता :</label>
            <input type="text" name="grandfather_name" value={form.grandfather_name} onChange={update("grandfather_name")} placeholder="बाजेको नाम" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="grandfather_relation" value={form.grandfather_relation} onChange={update("grandfather_relation")} placeholder="नाता" className="ccr-dotted-input ccr-medium-input" />
          </div>

          {/* Father */}
          <div className="ccr-row-group-full">
            <label>बाबुको नाम, ठेगाना, नागरिकता नं. : <span className="ccr-red">*</span></label>
            <input type="text" name="father_name" value={form.father_name} onChange={update("father_name")} placeholder="बाबुको नाम" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="father_address" value={form.father_address} onChange={update("father_address")} placeholder="ठेगाना" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="father_citizenship_no" value={form.father_citizenship_no} onChange={update("father_citizenship_no")} placeholder="नागरिकता नं." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Husband */}
          <div className="ccr-row-group-full">
            <label>पतिको नाम, ठेगाना, नागरिकता नं. :</label>
            <input type="text" name="husband_name" value={form.husband_name} onChange={update("husband_name")} placeholder="पतिको नाम" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="husband_address" value={form.husband_address} onChange={update("husband_address")} placeholder="ठेगाना" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="husband_citizenship_no" value={form.husband_citizenship_no} onChange={update("husband_citizenship_no")} placeholder="नागरिकता नं." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Mother */}
          <div className="ccr-row-group-full">
            <label>आमाको नाम, नागरिकता नं. :</label>
            <input type="text" name="mother_name" value={form.mother_name} onChange={update("mother_name")} placeholder="आमाको नाम" className="ccr-dotted-input ccr-medium-input" />
            <input type="text" name="mother_citizenship_no" value={form.mother_citizenship_no} onChange={update("mother_citizenship_no")} placeholder="नागरिकता नं." className="ccr-dotted-input ccr-small-input" />
          </div>

          {/* Witness */}
          <div className="ccr-witness-details-row">
            <h4 className="ccr-section-title">रोहबर</h4>
            <div className="ccr-witness-grid">
              <div className="ccr-witness-item">
                <label>नाम थर</label>
                <input type="text" name="witness_name" value={form.witness_name} onChange={update("witness_name")} className="ccr-dotted-input" />
              </div>
              <div className="ccr-witness-item">
                <label>ठेगाना</label>
                <input type="text" name="witness_address" value={form.witness_address} onChange={update("witness_address")} className="ccr-dotted-input" />
              </div>
              <div className="ccr-witness-item">
                <label>नागरिकता नं.</label>
                <input type="text" name="witness_citizenship_no" value={form.witness_citizenship_no} onChange={update("witness_citizenship_no")} className="ccr-dotted-input" />
              </div>
              <div className="ccr-witness-item">
                <label>सहीछाप</label>
                <input type="text" name="witness_signature" value={form.witness_signature} onChange={update("witness_signature")} className="ccr-dotted-input" />
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="ccr-declaration-text">
            <textarea
              name="declaration_text"
              value={form.declaration_text}
              onChange={update("declaration_text")}
              placeholder="घोषणा..."
              rows={4}
            />
          </div>

          {/* Recommender */}
          <div className="ccr-recommendation-footer-section">
            <div className="ccr-row-group">
              <label>सिफारिस गर्नेको नाम :</label>
              <input
                type="text" name="recommender_name" value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिस गर्नेको नाम"
                className="ccr-dotted-input ccr-medium-input"
              />
            </div>
            <div className="ccr-row-group">
              <label>पद :</label>
              <select name="recommender_designation" value={form.recommender_designation} onChange={update("recommender_designation")}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
            </div>
            <div className="ccr-row-group">
              <label>मिति :</label>
              <input
                type="date" name="recommender_date" value={form.recommender_date}
                onChange={update("recommender_date")}
                className="ccr-dotted-input ccr-medium-input"
              />
            </div>
          </div>

          {/* Applicant details */}
          <div className="ccr-applicant-details-box">
            <h3>निवेदकको विवरण</h3>
            <div className="ccr-details-grid">
              <div className="ccr-detail-group">
                <label>निवेदकको नाम <span className="ccr-red">*</span></label>
                <input type="text" name="applicant_name" value={form.applicant_name} onChange={update("applicant_name")} className="ccr-detail-input" />
              </div>
              <div className="ccr-detail-group">
                <label>ठेगाना</label>
                <input type="text" name="applicant_address" value={form.applicant_address} onChange={update("applicant_address")} className="ccr-detail-input" />
              </div>
              <div className="ccr-detail-group">
                <label>नागरिकता नं. <span className="ccr-red">*</span></label>
                <input type="text" name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} className="ccr-detail-input" />
              </div>
              <div className="ccr-detail-group">
                <label>सम्पर्क नं.</label>
                <input type="tel" name="applicant_phone" value={form.applicant_phone} onChange={update("applicant_phone")} className="ccr-detail-input" />
              </div>
              <div className="ccr-detail-group">
                <label>कैफियत / थप जानकारी</label>
                <textarea name="notes" value={form.notes} onChange={update("notes")} className="ccr-detail-input" rows={3} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ccr-footer">
            {message && (
              <div className={message.type === "error" ? "ccr-message-error" : "ccr-message-success"}>
                {message.text}
              </div>
            )}
            <button className="ccr-save-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ccr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </div>
      </form>
    </>
  );
}