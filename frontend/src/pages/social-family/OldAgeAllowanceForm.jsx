import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OldAgeAllowanceForm.css)
   All classes prefixed with "oaa-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .oaa-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  /* ── Utility ── */
  .oaa-bold      { font-weight: bold; }
  .oaa-underline { text-decoration: underline; }
  .oaa-red       { color: red; font-weight: bold; margin-left: 2px; }
  .oaa-center    { text-align: center; }
  .oaa-pt-20     { padding-top: 20px; }

  /* ── Top Bar ── */
  .oaa-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 30px;
    font-size: 0.9rem;
    color: #555;
  }
  .oaa-breadcrumb { font-size: 0.9rem; color: #777; }

  /* ── Header ── */
  .oaa-header { text-align: center; margin-bottom: 30px; }
  .oaa-main-title { font-size: 1.8rem; margin: 0; font-weight: bold; }
  .oaa-sub-title  { font-size: 1rem; margin: 5px 0 0 0; font-weight: normal; }

  /* ── Salutation / Date / Ward ── */
  .oaa-salutation-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  .oaa-ward-row { margin-bottom: 20px; font-size: 1.1rem; }

  /* ── Input styles ── */
  .oaa-input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .oaa-input-group label {
    margin-right: 5px;
    white-space: nowrap;
  }
  .oaa-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
    margin-left: 5px;
  }
  .oaa-small-input  { width: 60px;  text-align: center; }
  .oaa-medium-input { width: 150px; }
  .oaa-full-width   { width: 100%; }
  .oaa-tiny-input   { width: 100px; }

  .oaa-styled-select {
    border: 1px solid #ccc;
    padding: 5px;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    margin-left: 10px;
    background: #fff;
  }

  /* ── Subject ── */
  .oaa-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.2rem;
  }

  /* ── Body ── */
  .oaa-body {
    font-size: 1.1rem;
    line-height: 1.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .oaa-body-paragraph { margin-top: 10px; }

  /* ── Target group ── */
  .oaa-target-group {
    margin-bottom: 30px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }

  /* ── Applicant section ── */
  .oaa-section-title { font-size: 1.4rem; margin-bottom: 20px; }
  .oaa-applicant-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .oaa-grid-column {
    display: flex;
    flex-direction: column;
  }
  .oaa-grid-column .oaa-input-group { justify-content: flex-start; }
  .oaa-grid-column .oaa-input-group label { min-width: 90px; }

  /* ── Footer ── */
  .oaa-footer { text-align: center; margin-top: 40px; }
  .oaa-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .oaa-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .oaa-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .oaa-copyright {
    text-align: right;
    font-size: 0.9rem;
    color: #666;
    margin-top: 50px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .oaa-container, .oaa-container * { visibility: visible; }
    .oaa-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .oaa-top-bar, .oaa-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  municipality:       "नागार्जुन नगरपालिका",
  ward_no:            "",
  date_bs:            "२०८२-०८-०५",
  subject:            "नाम दर्ता सम्बन्धमा",
  target_group:       "जेष्ठ नागरिक (अन्य)",
  applicant_name:     "",
  father_name:        "",
  mother_name:        "",
  address:            "",
  npr_no:             "",
  npr_issue_district: "",
  gender:             "पुरुष",
  dob_bs:             "२०८२-०८-०५",
  age_reach_date:     "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const OldAgeAllowanceForm = () => {
  // FIX: original called useWardForm + setField without importing either.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/old-age-allowance", form);
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

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/old-age-allowance", form);
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

      <form className="oaa-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="oaa-top-bar">
          वृद्धा भत्ताको निवेदन
          <span className="oaa-breadcrumb">
            सामाजिक / पारिवारिक &gt; वृद्धा भत्ताको निवेदन
          </span>
        </div>

        {/* ── Header ── */}
        <div className="oaa-header">
          <h1 className="oaa-main-title">वृद्धा भत्ताको निवेदन ।</h1>
          <h2 className="oaa-sub-title">(दफा ६ को उपदफा ३ सँग सम्बन्धित)</h2>
        </div>

        {/* ── Salutation + Date ── */}
        <div className="oaa-salutation-row">
          <div className="oaa-salutation-left">
            <p className="oaa-bold">श्री अध्यक्ष ज्यू,</p>
            <div className="oaa-input-group">
              <label>{MUNICIPALITY.name}</label>
              <span className="oaa-red">*</span>
              <input
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
                type="text"
                className="oaa-line-input oaa-medium-input"
              />
            </div>
          </div>
          <div className="oaa-salutation-right">
            <p>
              मिति :
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="oaa-line-input oaa-tiny-input"
              />
            </p>
          </div>
        </div>

        {/* ── Ward ── */}
        <div className="oaa-ward-row">
          <div className="oaa-input-group">
            <label style={{ marginLeft: "200px" }}>वडा नं</label>
            <span className="oaa-red">*</span>
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              type="text"
              className="oaa-line-input oaa-small-input"
            />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="oaa-subject-section">
          <p>
            विषय:{" "}
            <span className="oaa-underline oaa-bold">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="oaa-line-input"
              />
            </span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="oaa-body">
          <p>महोदय,</p>
          <p className="oaa-body-paragraph">
            उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता
            गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य
            कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा
            पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम
            सहुँला बुझाउँला।
          </p>
        </div>

        {/* ── Target Group ── */}
        <div className="oaa-target-group">
          <label htmlFor="targetGroup">लक्षित समूह:</label>
          <select
            id="targetGroup"
            name="target_group"
            value={form.target_group}
            onChange={handleChange}
            className="oaa-styled-select"
          >
            <option value="जेष्ठ नागरिक (दलित)">जेष्ठ नागरिक (दलित)</option>
            <option value="जेष्ठ नागरिक (अन्य)">जेष्ठ नागरिक (अन्य)</option>
            <option value="एकल महिला">एकल महिला</option>
            <option value="विधवा">विधवा</option>
            <option value="पूर्ण अपाङ्गता">पूर्ण अपाङ्गता</option>
            <option value="अति अशक्त अपाङ्गता">अति अशक्त अपाङ्गता</option>
            <option value="लोपोन्मुख आदिवासी/जनजाति">लोपोन्मुख आदिवासी/जनजाति</option>
            <option value="बालबालिका">बालबालिका</option>
          </select>
        </div>

        {/* ── Applicant Details ── */}
        <div className="oaa-applicant-section">
          <h3 className="oaa-section-title oaa-center">निवेदक</h3>
          <div className="oaa-applicant-grid">
            {/* Left column */}
            <div className="oaa-grid-column">
              <div className="oaa-input-group">
                <label>नाम, थर: <span className="oaa-red">*</span></label>
                <input
                  name="applicant_name"
                  value={form.applicant_name}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
              <div className="oaa-input-group">
                <label>बाबुको नाम: <span className="oaa-red">*</span></label>
                <input
                  name="father_name"
                  value={form.father_name}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
              <div className="oaa-input-group">
                <label>ठेगाना: <span className="oaa-red">*</span></label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
              <div className="oaa-input-group">
                <label>ना.प्र.नं.: <span className="oaa-red">*</span></label>
                <input
                  name="npr_no"
                  value={form.npr_no}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
              <div className="oaa-input-group">
                <label>जारी जिल्ला: <span className="oaa-red">*</span></label>
                <input
                  name="npr_issue_district"
                  value={form.npr_issue_district}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="oaa-grid-column">
              <div className="oaa-input-group">
                <label>लिङ्ग: <span className="oaa-red">*</span></label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="oaa-styled-select oaa-full-width"
                >
                  <option value="पुरुष">पुरुष</option>
                  <option value="महिला">महिला</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
              <div className="oaa-input-group">
                <label>आमाको नाम: <span className="oaa-red">*</span></label>
                <input
                  name="mother_name"
                  value={form.mother_name}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
              <div className="oaa-input-group oaa-pt-20">
                <label>
                  जन्ममिति:{" "}
                  <span className="oaa-bold">
                    <input
                      name="dob_bs"
                      value={form.dob_bs}
                      onChange={handleChange}
                      className="oaa-line-input"
                    />
                  </span>
                </label>
              </div>
              <div className="oaa-input-group">
                <label>जेष्ठ नागरिकको हकमा उमेर पुग्ने मिति:</label>
                <input
                  name="age_reach_date"
                  value={form.age_reach_date}
                  onChange={handleChange}
                  type="text"
                  className="oaa-line-input oaa-full-width"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="oaa-footer">
          <button
            className="oaa-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="oaa-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default OldAgeAllowanceForm;