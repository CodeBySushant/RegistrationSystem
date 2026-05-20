// HouseDestroyedRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from HouseDestroyedRecommendation.css)
   All classes prefixed with "hdr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .hdr-container {
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

  /* ── Utility ── */
  .hdr-bold      { font-weight: bold; }
  .hdr-underline { text-decoration: underline; }
  .hdr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .hdr-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .hdr-bg-gray   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

  /* ── Top Bar ── */
  .hdr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .hdr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .hdr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .hdr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .hdr-header-text { display: flex; flex-direction: column; align-items: center; }
  .hdr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .hdr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .hdr-address-text,
  .hdr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .hdr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .hdr-meta-left p, .hdr-meta-right p { margin: 5px 0; }
  .hdr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .hdr-w-small { width: 120px; }

  /* ── Addressee ── */
  .hdr-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .hdr-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .hdr-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .hdr-w-medium { width: 200px; }
  .hdr-w-full   { width: 100%; }

  /* ── Subject ── */
  .hdr-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .hdr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .hdr-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .hdr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .hdr-w-small-box { width: 100px; }
  .hdr-w-long-box  { width: 250px; }

  /* ── Signature ── */
  .hdr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .hdr-signature-block   { width: 220px; text-align: center; position: relative; }
  .hdr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .hdr-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .hdr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .hdr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .hdr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .hdr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .hdr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .hdr-footer { text-align: center; margin-top: 40px; }
  .hdr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .hdr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .hdr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .hdr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing in original CSS) ── */
  @media print {
    body * { visibility: hidden; }
    .hdr-container,
    .hdr-container * { visibility: visible; }
    .hdr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .hdr-top-bar,
    .hdr-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .hdr-municipality-name,
    .hdr-ward-title,
    .hdr-address-text,
    .hdr-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined — crashes on load.
   BUG FIX: applicantName was missing — ApplicantDetailsNp needs it.
   BUG FIX: header was hardcoded — now reads from MUNICIPALITY config.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:             "२०८२/८३",
  chalani_no:            "",
  date_nep:              new Date().toISOString().slice(0, 10),
  addressee_name:        "",
  addressee_line2:       "",
  municipality:          MUNICIPALITY?.name || "",
  ward_no:               MUNICIPALITY?.wardNumber || "1",
  owner_prefix:          "श्री",
  owner_name:            "",
  plot_number:           "",
  plot_area:             "",
  notes:                 "",
  signer_name:           "",
  signer_designation:    "",
  // ApplicantDetailsNp fields — BUG FIX: applicantName was missing
  applicantName:         "",
  applicantAddress:      "",
  applicantCitizenship:  "",
  applicantPhone:        "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function HouseDestroyedRecommendation() {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/house-destroyed-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/house-destroyed-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="hdr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top Bar ── */}
          <div className="hdr-top-bar">
            घर पाताल भएको सिफारिस ।
            <span className="hdr-breadcrumb">
              घर / जग्गा जमिन &gt; घर पाताल भएको सिफारिस
            </span>
          </div>

          {/* ── Header ──
              BUG FIX: was hardcoded "नागार्जुन नगरपालिका" / "१ नं. वडा कार्यालय"
              Now dynamic from MUNICIPALITY config + user ward */}
          <div className="hdr-header">
            <div className="hdr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="hdr-header-text">
              <h1 className="hdr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="hdr-ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
              </h2>
              <p className="hdr-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
              <p className="hdr-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="hdr-meta-row">
            <div className="hdr-meta-left">
              <p>पत्र संख्या : <span className="hdr-bold">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  type="text"
                  className="hdr-dotted-input hdr-w-small"
                />
              </p>
            </div>
            <div className="hdr-meta-right">
              <p>मिति : <span className="hdr-bold">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Addressee ── */}
          <div className="hdr-addressee">
            <div className="hdr-addressee-row">
              <span>श्री</span>
              <input
                name="addressee_name"
                value={form.addressee_name}
                onChange={handleChange}
                type="text"
                className="hdr-line-input hdr-w-medium"
                required
              />
              <span className="hdr-red">*</span>
            </div>
            <div className="hdr-addressee-row">
              <input
                name="addressee_line2"
                value={form.addressee_line2}
                onChange={handleChange}
                type="text"
                className="hdr-line-input hdr-w-medium"
                required
              />
              <span className="hdr-red">*</span>
            </div>
            <div className="hdr-addressee-row">
              <span className="hdr-bold">काठमाडौँ</span>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="hdr-subject">
            <p>विषय: <span className="hdr-underline">सिफारिस सम्बन्धमा</span></p>
          </div>

          {/* ── Body ── */}
          <div className="hdr-body">
            <p>
              उपरोक्त सम्बन्धमा{" "}
              <span className="hdr-bold hdr-bg-gray">{form.municipality}</span>{" "}
              वडा नं.{" "}
              <span className="hdr-bold hdr-bg-gray">{form.ward_no}</span> स्थित{" "}
              <select
                name="owner_prefix"
                value={form.owner_prefix}
                onChange={handleChange}
                className="hdr-inline-select"
              >
                <option>श्री</option>
                <option>सुश्री</option>
                <option>श्रीमती</option>
              </select>{" "}
              <input
                name="owner_name"
                value={form.owner_name}
                onChange={handleChange}
                type="text"
                className="hdr-inline-input hdr-w-long-box"
                required
              />{" "}
              <span className="hdr-red">*</span> को नाममा रहेको कि.नं.{" "}
              <input
                name="plot_number"
                value={form.plot_number}
                onChange={handleChange}
                type="text"
                className="hdr-inline-input hdr-w-small-box"
                required
              />{" "}
              <span className="hdr-red">*</span> क्षे.फ.{" "}
              <input
                name="plot_area"
                value={form.plot_area}
                onChange={handleChange}
                type="text"
                className="hdr-inline-input hdr-w-small-box"
                required
              />{" "}
              <span className="hdr-red">*</span> मा बनेको घर भत्किई पाताल भएकोले सोही
              अनुसारको सिफारिस गरी पाउन भनी यस वडा कार्यालयमा पर्न आएको निवेदन
              सम्बन्धमा उल्लेखित कि.नं. मा बनेको घर पाताल भएको व्यहोरा प्रमाणित
              सिफारिस गरिन्छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="hdr-signature-section">
            <div className="hdr-signature-block">
              <div className="hdr-signature-line"></div>
              <span className="hdr-red-mark">*</span>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                type="text"
                className="hdr-sig-name-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="hdr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Footer ── */}
          <div className="hdr-footer">
            <button
              className="hdr-save-print-btn"
              type="button"
              onClick={handlePrint}
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="hdr-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}