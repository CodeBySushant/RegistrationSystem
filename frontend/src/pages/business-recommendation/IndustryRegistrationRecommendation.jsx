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
  sabik_district:          "",
  sabik_ward_no:           "",
  current_residence:       "",
  residence_from:          "",
  residence_to:            "",
  place_details:           "",
  industry_place_details:  "",
  kitta_no:                "",
  area_size:               "",
  boundary_east:           "",
  boundary_west:           "",
  boundary_north:          "",
  boundary_south:          "",
  structure_types:         "",
  inspection_notes:        "",
  sign_name:               "",
  sign_position:           "",
  ward_no:                 MUNICIPALITY.wardNumber || "",
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: irr-)
───────────────────────────────────────────── */
const styles = `
.irr-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  background: #d6d7da;
}

.irr-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.irr-top-left  { font-weight: 600; }
.irr-top-right { opacity: 0.9; }

.irr-paper {
  max-width: 950px;
  margin: 24px auto 20px;
  padding: 28px 40px 40px;
  background-color: #fff;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #000;
}

.irr-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.irr-logo img { width: 80px; height: 80px; }
.irr-head-text { flex: 1; text-align: center; }
.irr-head-main { font-size: 2rem;   font-weight: bold; color: #e74c3c; }
.irr-head-ward { font-size: 2.2rem; font-weight: bold; color: #e74c3c; }
.irr-head-sub  { margin-top: 4px;   font-size: 1rem;   color: #e74c3c; }
.irr-head-meta { font-size: 13px;   text-align: right; }

.irr-small-input {
  width: 120px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  background-color: #fff;
  outline: none;
  font-family: inherit;
}

.irr-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; }
.irr-ref-block { display: flex; align-items: center; gap: 6px; }
.irr-ref-block input {
  width: 160px; padding: 5px 6px;
  border: 1px solid #c1c1c1;
  background-color: #fff; outline: none;
  font-family: inherit;
}

.irr-to-block { margin-top: 22px; font-size: 14px; }
.irr-long-input {
  width: 260px; padding: 4px 6px;
  border: 1px solid #c1c1c1;
  margin: 0 4px;
  background-color: #fff; outline: none;
  font-family: inherit;
}
.irr-to-second { margin-top: 6px; }

.irr-subject-row { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
.irr-sub-label   { font-weight: 600; margin-right: 6px; }
.irr-subject-text{ text-decoration: underline; }

.irr-body {
  margin-top: 16px;
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
}
.irr-body input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  margin: 0 4px;
  outline: none;
  vertical-align: middle;
  font-family: inherit;
  font-size: inherit;
}
.irr-small-field  { width: 100px; }
.irr-medium-field { width: 170px; }
.irr-tiny-field   { width: 60px; }

.irr-sign-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.irr-sign-name {
  width: 200px; padding: 4px 6px;
  border: 1px solid #c1c1c1;
  background-color: #fff; outline: none;
  font-family: inherit;
}
.irr-post-select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  background-color: #fff;
  font-family: inherit;
}

.irr-footer { text-align: center; margin-top: 40px; }
.irr-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.irr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.irr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.irr-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .irr-paper, .irr-paper * { visibility: visible; }
  .irr-page > .irr-topbar { display: none; }
  .irr-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .irr-footer, .irr-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .irr-paper { padding: 15px; margin: 10px; }
  .irr-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .irr-ref-row { flex-direction: column; gap: 8px; }
  .irr-long-input { width: 180px; }
  .irr-medium-field { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function IndustryRegistrationRecommendation() {
  const { user } = useAuth();
  const [form, setForm]   = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  // Pre-fill ward from logged-in user (only once on mount)
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.ward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.current_residence?.trim()) return "निवेदकको नाम/बासस्थान आवश्यक छ";
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
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axiosInstance.post(
        "/api/forms/industry-registration-recommendation",
        payload,
      );

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

      <div className="irr-page">
        <header className="irr-topbar">
          <div className="irr-top-left">उद्योग दर्ता सिफारिस ।</div>
          <div className="irr-top-right">अवलोकन पृष्ठ / उद्योग दर्ता सिफारिस</div>
        </header>

        <form className="irr-paper" onSubmit={handleSubmit}>

          {/* ── Letterhead ── */}
          <div className="irr-letterhead">
            <div className="irr-logo">
              <img alt="Emblem" src={MUNICIPALITY.logoSrc || "/nepallogo.svg"} />
            </div>
            <div className="irr-head-text">
              <div className="irr-head-main">{MUNICIPALITY.name}</div>
              <div className="irr-head-ward">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || ""} वडा कार्यालय`}
              </div>
              <div className="irr-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="irr-head-meta">
              <div>
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="irr-small-input"
                />
              </div>
            </div>
          </div>

          {/* ── Ref ── */}
          <div className="irr-ref-row">
            <div className="irr-ref-block">
              <label>पत्र संख्या :</label>
              <input name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="irr-ref-block">
              <label>चलानी नं. :</label>
              <input name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          {/* ── To ── */}
          <div className="irr-to-block">
            <span>श्री</span>
            <input name="to_line1" value={form.to_line1} onChange={handleChange} className="irr-long-input" />
            <span>ज्यु,</span>
            <br />
            <input name="to_line2" value={form.to_line2} onChange={handleChange} className="irr-long-input irr-to-second" />
          </div>

          {/* ── Subject ── */}
          <div className="irr-subject-row">
            <span className="irr-sub-label">विषयः</span>
            <span className="irr-subject-text">प्रमाणित सिफारिस गरिएको बारे ।</span>
          </div>

          {/* ── Body paragraph 1 ── */}
          <p className="irr-body">
            उपरोक्त सम्बन्धमा जिल्ला {MUNICIPALITY.englishDistrict} साबिक{" "}
            <input type="text" name="sabik_district" className="irr-small-field" value={form.sabik_district} onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input type="text" name="sabik_ward_no" className="irr-tiny-field" value={form.sabik_ward_no} onChange={handleChange} />{" "}
            भई हाल {MUNICIPALITY.name} वडा नं. {form.ward_no} मा बस्ने{" "}
            <input type="text" name="current_residence" className="irr-medium-field" value={form.current_residence} onChange={handleChange} />{" "}
            ले{" "}
            <input type="text" name="place_details" className="irr-small-field" value={form.place_details} onChange={handleChange} />{" "}
            उद्योग दर्ता गर्न सिफारिस पाऊँ भनी निवेदन अनुसार, मिति{" "}
            <input type="text" name="residence_from" className="irr-small-field" value={form.residence_from} onChange={handleChange} />{" "}
            देखि{" "}
            <input type="text" name="residence_to" className="irr-small-field" value={form.residence_to} onChange={handleChange} />{" "}
            सम्म स्थानमा रहेर व्यवसाय संचालन गर्दै आएको र सो स्थान{" "}
            <input type="text" name="industry_place_details" className="irr-medium-field" value={form.industry_place_details} onChange={handleChange} />{" "}
            को किता नं.{" "}
            <input type="text" name="kitta_no" className="irr-small-field" value={form.kitta_no} onChange={handleChange} />{" "}
            को क्षेत्रफल{" "}
            <input type="text" name="area_size" className="irr-small-field" value={form.area_size} onChange={handleChange} />{" "}
            मा रहेको देखिन्छ ।
          </p>

          {/* ── Body paragraph 2 (boundaries) ── */}
          <p className="irr-body">
            स्थानमा पूर्व{" "}
            <input name="boundary_east"  className="irr-medium-field" value={form.boundary_east}  onChange={handleChange} />{" "}
            पश्चिम{" "}
            <input name="boundary_west"  className="irr-medium-field" value={form.boundary_west}  onChange={handleChange} />{" "}
            उत्तर{" "}
            <input name="boundary_north" className="irr-medium-field" value={form.boundary_north} onChange={handleChange} />{" "}
            दक्षिण{" "}
            <input name="boundary_south" className="irr-medium-field" value={form.boundary_south} onChange={handleChange} />{" "}
            गरी चार किल्ला घेरिएको जग्गामा कस्ता प्रकारका संरचना रहेको...
          </p>

          {/* ── Signature ── */}
          <div className="irr-sign-top">
            <input
              name="sign_name"
              placeholder="नाम, थर"
              value={form.sign_name}
              onChange={handleChange}
              className="irr-sign-name"
            />
            <select
              name="sign_position"
              className="irr-post-select"
              value={form.sign_position}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="irr-footer">
            <button className="irr-save-print-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="irr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}