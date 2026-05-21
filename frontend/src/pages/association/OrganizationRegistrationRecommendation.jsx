// OrganizationRegistrationRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OrganizationRegistrationRecommendation.css)
   Classes kept with "orr-" prefix (already scoped in original).
   BUG FIX: @media print was targeting .insurance-claim-container (wrong form).
            Corrected to .orr-page / .orr-paper.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .orr-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #d6d7da;
    font-family: 'Kalimati', 'Kokila', 'Mangal', 'Segoe UI', sans-serif;
    margin: 0;
  }

  /* ── Top Bar ── */
  .orr-topbar {
    background-color: #111827;
    color: #fff;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .orr-top-left  { font-weight: 600; }
  .orr-top-right { opacity: 0.9; }

  /* ── Paper ── */
  .orr-paper {
    margin: 0 24px 20px;
    padding: 28px 40px 40px;
    background-size: 280px 280px;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    background-color: #fff;
  }

  /* ── Letterhead ── */
  .orr-letterhead { display: flex; justify-content: space-between; align-items: center; }
  .orr-head-meta  { font-size: 13px; text-align: right; }
  .orr-meta-line  { margin-top: 4px; }
  .orr-small-input { width: 120px; padding: 4px 6px; border: 1px solid #c1c1c1; font-family: inherit; font-size: 13px; }

  /* ── Ref row ── */
  .orr-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; }
  .orr-ref-block { display: flex; align-items: center; gap: 6px; }
  .orr-ref-block input { width: 170px; padding: 5px 6px; border: 1px solid #c1c1c1; font-family: inherit; font-size: 13px; }

  /* ── To block ── */
  .orr-to-block { margin-top: 22px; font-size: 14px; }
  .orr-long-input { width: 260px; padding: 4px 6px; border: 1px solid #c1c1c1; margin: 0 4px; font-family: inherit; font-size: 13px; }
  .orr-to-second  { margin-top: 6px; }

  /* ── Subject ── */
  .orr-subject-row { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
  .orr-sub-label   { font-weight: 600; margin-right: 6px; }
  .orr-subject-text { text-decoration: underline; }

  /* ── Body ── */
  .orr-body { margin-top: 16px; font-size: 14px; line-height: 1.9; }
  .orr-body input { padding: 3px 4px; border: 1px solid #c1c1c1; font-family: inherit; }
  .orr-bold { font-weight: 600; }

  .orr-tiny-input   { width: 60px;  font-family: inherit; }
  .orr-small-inline { width: 100px; font-family: inherit; }
  .orr-medium-input { width: 170px; font-family: inherit; }

  /* ── Location rows ── */
  .orr-location-row {
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }
  .orr-location-row input { padding: 3px 4px; border: 1px solid #c1c1c1; font-family: inherit; }

  /* ── Divider ── */
  .orr-divider { margin-top: 20px; border-top: 1px solid #d1d1d1; }

  /* ── Signature ── */
  .orr-sign-top { margin-top: 18px; display: flex; justify-content: flex-end; align-items: center; gap: 8px; }
  .orr-sign-name   { width: 200px; padding: 4px 6px; border: 1px solid #c1c1c1; font-family: inherit; }
  .orr-post-select { padding: 4px 6px; border: 1px solid #c1c1c1; font-family: inherit; }

  /* ── Submit row ── */
  .orr-submit-row { text-align: center; margin-top: 30px; }
  .orr-submit-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .orr-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
  .orr-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Applicant details overrides ── */
  .orr-page .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .orr-page .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .orr-page .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .orr-page .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .nprc-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin: 0 24px 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  /* ── Print ──
     BUG FIX: original targeted .insurance-claim-container (copy-paste error).
     Corrected to .orr-page / .orr-paper. */
  @media print {
    body * { visibility: hidden; }
    .orr-page,
    .orr-page * { visibility: visible; }
    .orr-page {
      background: white;
    }
    .orr-paper {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .orr-topbar,
    .orr-submit-row,
    .nprc-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function OrganizationRegistrationRecommendation() {
  const [form, setForm] = useState({
    date:               new Date().toISOString().slice(0, 10),
    refLetterNo:        "",
    chalaniNo:          "",
    toOffice:           "",
    toOfficeLine2:      "",
    toOfficeLine3:      MUNICIPALITY.name,
    wardNo:             MUNICIPALITY.wardNumber,
    sabikWardNo:        "",
    sabikWardNo2:       "",
    applicant_name:     "",
    industryName:       "",
    industryAddress:    "",
    locationMunicipality: MUNICIPALITY.name,
    locationWard:       MUNICIPALITY.wardNumber,
    // BUG FIX: was the same field "locationWard" used in two separate inputs,
    // causing them to be always in sync. Introduced separate industryLocationWard.
    industryLocationWard: MUNICIPALITY.wardNumber,
    locationTole:       "",
    kittaNo:            "",
    area:               "",
    boundaryEast:       "",
    boundaryWest:       "",
    boundarySouth:      "",
    boundaryNorth:      "",
    signerName:         "",
    signerDesignation:  "",
    applicantName:      "",
    applicantAddress:   "",
    applicantCitizenship: "",
    applicantPhone:     "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      /* BUG FIX: was hardcoded "http://localhost:5000/api/forms/..."
         and used bare axios (no auth headers).
         Now uses relative URL + axiosInstance (auth headers included). */
      const res = await axiosInstance.post(
        "/api/forms/organization-registration-recommendation",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("Saved: " + JSON.stringify(res.data));
        window.print();
      } else {
        alert("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error(err);
      alert("Submit error: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="orr-page">

        {/* ── Top Bar ── */}
        <header className="orr-topbar">
          <div className="orr-top-left">घरेलु तथा साना उद्योग दर्ता सिफारिस</div>
          <div className="orr-top-right">
            अवलोकन पृष्ठ / संस्था दर्ता सिफारिस सम्बन्धमा
          </div>
        </header>

        <form className="orr-paper" onSubmit={handleSubmit}>

          {/* ── Letterhead ── */}
          <div className="orr-letterhead">
            <div className="orr-head-meta">
              <div>
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="orr-small-input"
                />
              </div>
              <div className="orr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* ── Ref row ── */}
          <div className="orr-ref-row">
            <div className="orr-ref-block">
              <label>पत्र संख्या :</label>
              <input name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="orr-ref-block">
              <label>चलानी नं. :</label>
              <input name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          {/* ── To block ── */}
          <div className="orr-to-block">
            <span>श्री</span>
            <input name="toOffice" className="orr-long-input" value={form.toOffice} onChange={handleChange} />
            <span>ज्यु,</span>
            <br />
            <input name="toOfficeLine2" className="orr-long-input orr-to-second" placeholder="उद्योग शाखा," value={form.toOfficeLine2} onChange={handleChange} />
            <br />
            <input name="toOfficeLine3" className="orr-long-input orr-to-second" placeholder="नागार्जुन नगरपालिका, काठमाडौं" value={form.toOfficeLine3} onChange={handleChange} />
          </div>

          {/* ── Subject ── */}
          <div className="orr-subject-row">
            <span className="orr-sub-label">विषयः</span>
            <span className="orr-subject-text">सिफारिस सम्बन्धमा ।</span>
          </div>

          {/* ── Body ── */}
          <p className="orr-body">
            उपर्युक्त सम्बन्धमा जिल्ला {MUNICIPALITY.englishDistrict}{" "}
            <span className="orr-bold">{MUNICIPALITY.name}</span> वडा नं.
            <input className="orr-tiny-input"   name="wardNo"       value={form.wardNo}       onChange={handleChange} />{" "}
            साबिक
            <input className="orr-small-inline" name="sabikWardNo"  value={form.sabikWardNo}  onChange={handleChange} />{" "}
            वडा नं.
            <input className="orr-tiny-input"   name="sabikWardNo2" value={form.sabikWardNo2} onChange={handleChange} />{" "}
            मा बस्ने
            <input className="orr-medium-input" name="applicant_name" value={form.applicant_name} onChange={handleChange} />{" "}
            ले हाल
            <input className="orr-medium-input" name="industryName" value={form.industryName} onChange={handleChange} />{" "}
            {/* BUG FIX: was name="locationWard" — same field as the location section below.
                Renamed to industryLocationWard so the two inputs are independent. */}
            वडा नं.
            <input className="orr-tiny-input" name="industryLocationWard" value={form.industryLocationWard} onChange={handleChange} />{" "}
            मा बसेर
            <input className="orr-medium-input" name="industryAddress" value={form.industryAddress} onChange={handleChange} />{" "}
            नामक उद्योग / व्यवसाय स्थापना गर्न चाहेकोले ...
          </p>

          {/* ── Location rows ── */}
          <div className="orr-location-row">
            <span>उद्योग स्थापना हुने स्थान :</span>
            <span>गाउँपालिका / नगरपालिका :</span>
            <input className="orr-small-inline" name="locationMunicipality" value={form.locationMunicipality} onChange={handleChange} />
            <span>वडा नं. :</span>
            <input className="orr-tiny-input"   name="locationWard"         value={form.locationWard}         onChange={handleChange} />
            <span>टोल/स्थान :</span>
            <input className="orr-medium-input" name="locationTole"         value={form.locationTole}         onChange={handleChange} />
          </div>

          <div className="orr-location-row">
            <span>कित्ता नं. :</span>
            <input className="orr-small-inline" name="kittaNo"        value={form.kittaNo}        onChange={handleChange} />
            <span>क्षेत्रफल :</span>
            <input className="orr-small-inline" name="area"           value={form.area}           onChange={handleChange} />
            <span>सीमा पूर्व :</span>
            <input className="orr-medium-input" name="boundaryEast"   value={form.boundaryEast}   onChange={handleChange} />
            <span>पश्चिम :</span>
            <input className="orr-medium-input" name="boundaryWest"   value={form.boundaryWest}   onChange={handleChange} />
          </div>

          <div className="orr-location-row">
            <span>दक्षिण :</span>
            <input className="orr-medium-input" name="boundarySouth"  value={form.boundarySouth}  onChange={handleChange} />
            <span>उत्तर :</span>
            <input className="orr-medium-input" name="boundaryNorth"  value={form.boundaryNorth}  onChange={handleChange} />
          </div>

          <div className="orr-divider" />

          {/* ── Signature ── */}
          <div className="orr-sign-top">
            <input
              className="orr-sign-name"
              name="signerName"
              value={form.signerName}
              onChange={handleChange}
              placeholder="नाम, थर"
            />
            <select
              className="orr-post-select"
              name="signerDesignation"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="orr-submit-row">
            <button className="orr-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="nprc-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}

export default OrganizationRegistrationRecommendation;