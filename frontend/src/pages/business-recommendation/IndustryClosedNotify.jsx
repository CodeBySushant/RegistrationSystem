import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   HELPER
───────────────────────────────────────────── */
const toNepaliDigits = (str) => {
  const map = { 0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_FORM = {
  date:                    new Date().toISOString().slice(0, 10),
  to_line1:                MUNICIPALITY.officeLine || "",
  to_line2:                MUNICIPALITY.name       || "",
  place_extra:             "",
  registered_date:         "",
  registered_municipality: MUNICIPALITY.name || "",
  ward:                    "",
  industry_name:           "",
  closure_from_date:       "",
  closure_to_date:         "",
  detailed_description:    "",
  attached_docs:           "",
  signature:               "",
  signer_name:             "",
  signer_position:         "",
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ucn-)
───────────────────────────────────────────── */
const styles = `
.ucn-page {
  max-width: 950px;
  margin: 0 auto;
  font-family: "Kalimati", "Kokila", "Mangal", sans-serif;
  background: #d6d7da;
  min-height: 100vh;
}

.ucn-topbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ucn-top-right { font-size: 0.9rem; color: #777; font-weight: normal; }

.ucn-paper {
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  color: #000;
  position: relative;
}

.ucn-annex { text-align: center; font-size: 1rem; line-height: 1.8; margin-bottom: 10px; }
.ucn-annex-title { margin-top: 4px; font-weight: bold; font-size: 1.1rem; }

.ucn-date-row { text-align: right; margin-top: 10px; font-size: 1rem; }
.ucn-date-input {
  width: 120px; padding: 2px 5px;
  border: none; border-bottom: 1px dotted #000;
  background: #fff; outline: none;
  font-family: inherit; font-size: 1rem;
}

.ucn-to-block { margin-top: 22px; font-size: 1.05rem; line-height: 2; }
.ucn-long-input {
  width: 280px; padding: 4px 6px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; margin: 0 6px;
  font-family: inherit; font-size: 1rem; outline: none;
}
.ucn-medium-input {
  width: 150px; padding: 4px 6px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; margin: 0 4px;
  font-family: inherit; font-size: 1rem; outline: none;
}

.ucn-subject-row {
  display: flex; align-items: center; justify-content: center;
  margin-top: 22px; font-size: 1.1rem; font-weight: bold;
}
.ucn-subject-label { margin-right: 6px; }
.ucn-subject-text  { text-decoration: underline; }

.ucn-body { margin-top: 18px; font-size: 1.05rem; line-height: 2.4; text-align: justify; }
.ucn-small-input {
  width: 110px; padding: 3px 5px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; margin: 0 4px;
  font-family: inherit; font-size: 1rem; outline: none;
}
.ucn-tiny-input {
  width: 55px; padding: 3px 5px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; margin: 0 4px;
  font-family: inherit; font-size: 1rem; outline: none;
}

.ucn-reasons { margin-top: 16px; font-size: 1rem; }
.ucn-reasons-title { font-weight: bold; margin-bottom: 4px; }
.ucn-reasons ol { margin: 4px 0; padding-left: 20px; line-height: 1.9; }

.ucn-editor-wrapper { margin-top: 16px; border: 1px solid #ccc; border-radius: 3px; overflow: hidden; }
.ucn-editor-toolbar {
  padding: 5px 8px; border-bottom: 1px solid #ccc;
  background: #f5f5f5; display: flex; align-items: center;
  gap: 4px; font-size: 0.9rem;
}
.ucn-editor-toolbar button {
  border: 1px solid #ccc; background: #fff;
  padding: 2px 7px; cursor: pointer;
  border-radius: 2px; font-family: inherit;
}
.ucn-editor-toolbar button:hover { background: #e8e8e8; }
.ucn-toolbar-label { margin-left: 8px; color: #666; }
.ucn-editor-area {
  width: 100%; box-sizing: border-box;
  border: none; padding: 10px;
  font-family: inherit; font-size: 1rem;
  resize: vertical; min-height: 140px;
  background: #fff; outline: none;
}

.ucn-bottom-grid {
  display: flex; justify-content: space-between;
  margin-top: 20px; gap: 20px;
}
.ucn-docs { font-size: 1rem; flex: 1; }
.ucn-docs-title { font-weight: bold; margin-bottom: 4px; }
.ucn-docs ol { margin: 4px 0; padding-left: 20px; line-height: 1.9; }

.ucn-sign-box {
  border: 1px solid #ccc; padding: 12px 14px;
  font-size: 0.95rem; min-width: 240px;
  background: #fff; border-radius: 3px;
}
.ucn-sign-caption { text-align: right; font-weight: bold; margin-bottom: 8px; }
.ucn-sign-field { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.ucn-sign-field span { white-space: nowrap; }
.ucn-sign-field input {
  flex: 1; border: none; border-bottom: 1px dotted #000;
  background: #fff; padding: 3px 4px;
  font-family: inherit; font-size: 0.95rem; outline: none;
}

.ucn-footer { text-align: center; margin-top: 40px; }
.ucn-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.ucn-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ucn-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.ucn-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .ucn-paper, .ucn-paper * { visibility: visible; }
  .ucn-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .ucn-footer, .ucn-top-right, .ucn-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ucn-paper { padding: 15px; }
  .ucn-bottom-grid { flex-direction: column; }
  .ucn-long-input { width: 180px; }
  .ucn-medium-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function IndustryClosedNotify() {
  const { user } = useAuth();
  const [form, setForm]   = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  // Pre-fill ward from logged-in user (only once on mount)
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.ward]);

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    return payload;
  };

  const validate = () => {
    if (!form.industry_name?.trim())     return "उद्योगको नाम आवश्यक छ";
    if (!form.closure_from_date?.trim()) return "बन्द मिति आवश्यक छ";
    if (!form.applicantName?.trim())     return "निवेदकको नाम आवश्यक छ";
    if (!form.applicantPhone?.trim())    return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert(err); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/industry-closed-notify",
        buildPayload(),
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => setForm(INITIAL_FORM), 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ucn-page">
        <div className="ucn-topbar">
          उद्योग बन्द भएको जानकारी पत्र ।
          <span className="ucn-top-right">
            उद्योग &gt; उद्योग बन्द भएको जानकारी पत्र
          </span>
        </div>

        <form className="ucn-paper" onSubmit={handleSubmit}>

          {/* ── Annex heading ── */}
          <div className="ucn-annex">
            <div>अनुसूची–३३</div>
            <div>(नियम ९ संग सम्बन्धित)</div>
            <div className="ucn-annex-title">उद्योग बन्द भएको जानकारी पत्र</div>
          </div>

          {/* ── Date ── */}
          <div className="ucn-date-row">
            मिति :{" "}
            <input
              readOnly
              className="ucn-date-input"
              value={toNepaliDigits(form.date)}
            />
          </div>

          {/* ── To block ── */}
          <div className="ucn-to-block">
            <span>श्री</span>
            <input
              type="text"
              className="ucn-long-input"
              value={form.to_line1}
              onChange={(e) => update("to_line1", e.target.value)}
            />
            <span>ज्यु,</span>
            <br />
            <span>{MUNICIPALITY.name}, {MUNICIPALITY.city}</span>
            <input
              type="text"
              className="ucn-medium-input"
              value={form.place_extra}
              onChange={(e) => update("place_extra", e.target.value)}
            />
          </div>

          {/* ── Subject ── */}
          <div className="ucn-subject-row">
            <span className="ucn-subject-label">विषयः</span>
            <span className="ucn-subject-text">
              उद्योग बन्द भएको जानकारी सम्बन्धमा ।
            </span>
          </div>

          {/* ── Body ── */}
          <p className="ucn-body">
            उपरोक्त विषयमा उद्योग मिति{" "}
            <input type="text" className="ucn-small-input" value={form.registered_date} onChange={(e) => update("registered_date", e.target.value)} />{" "}
            मा दर्ता भई{" "}
            <input type="text" className="ucn-small-input" value={form.registered_municipality} onChange={(e) => update("registered_municipality", e.target.value)} />{" "}
            नगरपालिका वडा नं.{" "}
            <input type="text" className="ucn-tiny-input" value={form.ward} onChange={(e) => update("ward", e.target.value)} />{" "}
            मा स्थापना भई संचालन गर्न गराइएको परेको यस{" "}
            <input type="text" className="ucn-medium-input" value={form.industry_name} onChange={(e) => update("industry_name", e.target.value)} />{" "}
            उद्योग मिति{" "}
            <input type="text" className="ucn-small-input" value={form.closure_from_date} onChange={(e) => update("closure_from_date", e.target.value)} />{" "}
            देखि अपरिहार्य कारणवश{" "}
            <input type="text" className="ucn-small-input" value={form.closure_to_date} onChange={(e) => update("closure_to_date", e.target.value)} />{" "}
            देखि बन्द गरेको भनी बुझाई दिनुको लागि अनुरोध गर्दछु / गर्दछौं ।
          </p>

          {/* ── Reasons ── */}
          <div className="ucn-reasons">
            <div className="ucn-reasons-title">उद्योग बन्द हुने सम्भावित कारणहरू:</div>
            <ol>
              <li>आवश्यक कच्चा पदार्थ पाउन नसकेको।</li>
              <li>पूँजीको अभाव भएको।</li>
              <li>बजारको अभाव भएको।</li>
              <li>आर्थिक व्यवस्थापनमा समस्या भएको।</li>
              <li>कामदारहरूको अभाव भएको।</li>
              <li>उद्योग सञ्चालन नहुनुको कारणले व्यवस्थापन समस्या।</li>
              <li>प्रायोजन आवश्यकता नपर्न गई उद्योग बन्द गरिएको।</li>
            </ol>
          </div>

          {/* ── Description textarea ── */}
          <div className="ucn-editor-wrapper">
            <div className="ucn-editor-toolbar">
              <button type="button">B</button>
              <button type="button">I</button>
              <button type="button">U</button>
              <button type="button">•</button>
              <button type="button">1.</button>
              <span className="ucn-toolbar-label">Styles</span>
            </div>
            <textarea
              className="ucn-editor-area"
              rows="8"
              placeholder="यहाँ उद्योग बन्दसम्बन्धी विस्तृत विवरण लेख्नुहोस्..."
              value={form.detailed_description}
              onChange={(e) => update("detailed_description", e.target.value)}
            />
          </div>

          {/* ── Docs + Signature ── */}
          <div className="ucn-bottom-grid">
            <div className="ucn-docs">
              <div className="ucn-docs-title">संलग्न कागजातः</div>
              <ol>
                <li>उद्योग बन्द हुने कारण / कारणहरू स्पष्ट हुने गरी तयार गरिएको विस्तृत प्रतिवेदन।</li>
                <li>नियमावलीको नियम ९ को उपनियम (३) मा उल्लेखित कागजातको विवरण।</li>
              </ol>
              <div style={{ marginTop: 8 }}>
                <label>अन्य संलग्न: </label>
                <input
                  type="text"
                  className="ucn-medium-input"
                  value={form.attached_docs}
                  onChange={(e) => update("attached_docs", e.target.value)}
                />
              </div>
            </div>

            <div className="ucn-sign-box">
              <div className="ucn-sign-caption">निवेदकको :</div>
              <div className="ucn-sign-field">
                <span>हस्ताक्षर :</span>
                <input type="text" value={form.signature}       onChange={(e) => update("signature",       e.target.value)} />
              </div>
              <div className="ucn-sign-field">
                <span>नाम, थर :</span>
                <input type="text" value={form.signer_name}     onChange={(e) => update("signer_name",     e.target.value)} />
              </div>
              <div className="ucn-sign-field">
                <span>पद :</span>
                <input type="text" value={form.signer_position} onChange={(e) => update("signer_position", e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="ucn-footer">
            <button className="ucn-save-print-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ucn-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}