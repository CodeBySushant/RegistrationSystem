import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                    new Date().toISOString().slice(0, 10),
  refLetterNo:             "",
  chalaniNo:               "",
  to_line1:                "",
  to_line2:                "",
  ward:                    MUNICIPALITY.wardNumber || "",
  sabik_ward:              "",
  sabik_ward_no:           "",
  resident_name:           "",
  resident_from:           "",
  resident_to:             "",
  firm_name:               "",
  proprietor_name:         "",
  proprietor_citizen_no:   "",
  proprietor_address:      "",
  firm_address:            "",
  firm_capital:            "",
  firm_purpose:            "",
  notes:                   "",
  sign_name:               "",
  sign_position:           "",
  // footer applicant details — stored under standard names
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: nbp-)
───────────────────────────────────────────── */
const styles = `
.nbp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
  background: #d6d7da;
}

.nbp-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.nbp-top-left  { font-weight: 600; }
.nbp-top-right { opacity: 0.9; font-size: 0.9rem; font-weight: normal; }

.nbp-paper {
  max-width: 950px;
  margin: 24px auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,0.25);
  color: #000;
  position: relative;
}

.nbp-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.nbp-logo img { width: 80px; height: 80px; }
.nbp-head-text {
  flex: 1; text-align: center;
  display: flex; flex-direction: column; align-items: center;
}
.nbp-head-main { color: #e74c3c; font-size: 2.2rem; font-weight: bold; margin: 0; line-height: 1.2; }
.nbp-head-ward { color: #e74c3c; font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.nbp-head-sub  { color: #e74c3c; margin: 0; font-size: 1rem; }
.nbp-head-meta { font-size: 13px; text-align: right; }
.nbp-meta-line { margin-top: 4px; }

.nbp-paper input,
.nbp-paper select,
.nbp-paper textarea {
  background-color: #fff !important;
  color: #000;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
}

.nbp-small-input {
  width: 120px;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent !important;
  padding: 2px 5px;
}

.nbp-ref-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.nbp-ref-block { display: flex; align-items: center; gap: 6px; }
.nbp-ref-block input {
  width: 160px;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent !important;
  padding: 2px 5px;
}

.nbp-to-block { margin-top: 22px; font-size: 1.05rem; }
.nbp-long-input {
  width: 260px;
  border: 1px solid #ccc;
  background-color: #fff !important;
  padding: 4px 8px;
  border-radius: 3px;
  margin-left: 6px;
  vertical-align: middle;
}
.nbp-to-second { margin-top: 6px; }

.nbp-body { margin-top: 16px; font-size: 1.05rem; line-height: 2.6; text-align: justify; }
.nbp-body input {
  border: 1px solid #ccc;
  background-color: #fff !important;
  padding: 4px 8px;
  border-radius: 3px;
  vertical-align: middle;
  display: inline-block;
}
.nbp-bold        { font-weight: 600; }
.nbp-tiny-input  { width: 60px; }
.nbp-medium-input{ width: 170px; }

.nbp-section  { margin-top: 18px; }
.nbp-subtitle { font-size: 1.05rem; font-weight: 600; margin-bottom: 6px; }

.nbp-field-row {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 8px; font-size: 1rem; margin-top: 6px;
}
.nbp-field-row label { min-width: 200px; }
.nbp-field-row input {
  border: 1px solid #ccc;
  background-color: #fff !important;
  padding: 4px 8px;
  border-radius: 3px;
}
.nbp-wide-input { flex: 1; min-width: 220px; }
.nbp-textarea-row { align-items: flex-start; }
.nbp-textarea {
  flex: 1; min-height: 60px; padding: 6px 8px;
  border: 1px solid #ccc; border-radius: 3px;
  resize: vertical; background-color: #fff !important;
  font-family: inherit; font-size: 1rem;
}

.nbp-sign-top {
  display: flex; justify-content: flex-end;
  align-items: center; gap: 8px;
  margin-top: 50px; margin-bottom: 30px;
}
.nbp-sign-name {
  width: 200px; border: none;
  border-bottom: 1px solid #000;
  background: transparent !important;
  padding: 4px 6px; font-family: inherit;
}
.nbp-post-select {
  padding: 5px 6px; border: 1px solid #ccc;
  background-color: #fff !important; border-radius: 3px;
  font-family: inherit;
}

.nbp-footer { text-align: center; margin-top: 40px; }
.nbp-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.nbp-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.nbp-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.nbp-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

/* ── Print ── */
@media print {
  @page { size: A4; margin: 15mm 20mm; }
  body * { visibility: hidden; }
  .nbp-paper, .nbp-paper * { visibility: visible; }
  .nbp-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; margin: 0; padding: 0;
    background-image: none; background: white;
  }
  .nbp-topbar, .nbp-footer, .nbp-copyright-footer { display: none !important; }
  .nbp-paper input, .nbp-paper select, .nbp-paper textarea {
    border: none !important;
    border-bottom: 1px solid #333 !important;
    background: transparent !important;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .nbp-paper { padding: 15px; margin: 10px; }
  .nbp-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .nbp-ref-row { flex-direction: column; gap: 8px; }
  .nbp-long-input { width: 180px; }
  .nbp-field-row label { min-width: 0; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function NewBusinessPannumber() {
  const { user } = useAuth();
  const [form, setForm]   = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  // Pre-fill ward from logged-in user
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.ward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.resident_name?.trim())   return "बस्नेको नाम आवश्यक छ";
    if (!form.firm_name?.trim())       return "फर्मको नाम आवश्यक छ";
    if (!form.applicantName?.trim())   return "निवेदकको नाम आवश्यक छ";
    if (!form.applicantPhone?.trim())  return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert(err); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axiosInstance.post("/api/forms/new-business-pan", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => setForm(INITIAL_STATE), 500);
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

      <div className="nbp-page">
        <header className="nbp-topbar">
          <div className="nbp-top-left">नयाँ स्थायी लेखा नं.</div>
          <div className="nbp-top-right">अवलोकन पृष्ठ / नयाँ स्थायी लेखा नं.</div>
        </header>

        <form className="nbp-paper" onSubmit={handleSubmit}>

          {/* ── Letterhead ── */}
          <div className="nbp-letterhead">
            <div className="nbp-logo">
              <img alt="Emblem" src={MUNICIPALITY.logoSrc || "/nepallogo.svg"} />
            </div>
            <div className="nbp-head-text">
              <div className="nbp-head-main">{MUNICIPALITY.name}</div>
              <div className="nbp-head-ward">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || ""} वडा कार्यालय`}
              </div>
              <div className="nbp-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="nbp-head-meta">
              <div>
                मिति :{" "}
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="nbp-small-input"
                />
              </div>
              <div className="nbp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* ── Ref ── */}
          <div className="nbp-ref-row">
            <div className="nbp-ref-block">
              <label>पत्र संख्या :</label>
              <input name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="nbp-ref-block">
              <label>चलानी नं. :</label>
              <input name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          {/* ── To ── */}
          <div className="nbp-to-block">
            <span>श्री</span>
            <input name="to_line1" value={form.to_line1} onChange={handleChange} className="nbp-long-input" />
            <br />
            <input name="to_line2" value={form.to_line2} onChange={handleChange} className="nbp-long-input nbp-to-second" />
          </div>

          {/* ── Body ── */}
          <p className="nbp-body">
            उपर्युक्त सम्बन्धमा{" "}
            <span className="nbp-bold">{MUNICIPALITY.name}</span>
            वडा नं.{" "}
            <input name="ward" value={form.ward} onChange={handleChange} className="nbp-tiny-input" />
            (साबिक{" "}
            <input name="sabik_ward" value={form.sabik_ward} onChange={handleChange} className="nbp-small-input" />{" "}
            वडा नं.
            <input name="sabik_ward_no" value={form.sabik_ward_no} onChange={handleChange} className="nbp-tiny-input" />
            ) मा बस्ने श्री
            <input name="resident_name" value={form.resident_name} onChange={handleChange} className="nbp-medium-input" />{" "}
            ले मिति
            <input name="resident_from" value={form.resident_from} onChange={handleChange} className="nbp-small-input" />{" "}
            देखि
            <input name="resident_to" value={form.resident_to} onChange={handleChange} className="nbp-small-input" />{" "}
            सम्म व्यवसाय संचालन गर्दै आएको र उक्त व्यवसायको नाममा नयाँ स्थायी
            लेखा नं. प्राप्त गर्न सिफारिस गर्नु पर्ने भएकोले सिफारिस साथ
            अनुरोध गरिएको छ ।
          </p>

          {/* ── Detail section ── */}
          <section className="nbp-section">
            <h3 className="nbp-subtitle">विवरण:</h3>

            <div className="nbp-field-row">
              <label>फर्मको नाम :</label>
              <input name="firm_name" value={form.firm_name} onChange={handleChange} className="nbp-wide-input" />
            </div>
            <div className="nbp-field-row">
              <label>प्रोपाइटरको नाम :</label>
              <input name="proprietor_name" value={form.proprietor_name} onChange={handleChange} className="nbp-wide-input" />
            </div>
            <div className="nbp-field-row">
              <label>प्रोपाइटरको नागरिकता नं. :</label>
              <input name="proprietor_citizen_no" value={form.proprietor_citizen_no} onChange={handleChange} className="nbp-medium-input" />
            </div>
            <div className="nbp-field-row">
              <label>ठेगाना :</label>
              <input name="proprietor_address" value={form.proprietor_address} onChange={handleChange} className="nbp-wide-input" />
            </div>
            <div className="nbp-field-row">
              <label>फर्मको ठेगाना :</label>
              <input name="firm_address" value={form.firm_address} onChange={handleChange} className="nbp-wide-input" />
            </div>
            <div className="nbp-field-row">
              <label>फर्म पूँजी :</label>
              <input name="firm_capital" value={form.firm_capital} onChange={handleChange} className="nbp-medium-input" />
            </div>
            <div className="nbp-field-row">
              <label>फर्म उद्देश्य :</label>
              <input name="firm_purpose" value={form.firm_purpose} onChange={handleChange} className="nbp-wide-input" />
            </div>
            <div className="nbp-field-row nbp-textarea-row">
              <label>बोधार्थ :</label>
              <textarea
                name="notes"
                rows="3"
                value={form.notes}
                onChange={handleChange}
                className="nbp-textarea"
              />
            </div>
          </section>

          {/* ── Signature ── */}
          <div className="nbp-sign-top">
            <input
              name="sign_name"
              value={form.sign_name}
              onChange={handleChange}
              className="nbp-sign-name"
              placeholder="नाम, थर"
            />
            <select
              name="sign_position"
              className="nbp-post-select"
              value={form.sign_position}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="अध्यक्ष">अध्यक्ष</option>
              <option value="सचिव">सचिव</option>
              <option value="अधिकृत">अधिकृत</option>
            </select>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="nbp-footer">
            <button className="nbp-save-print-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="nbp-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}