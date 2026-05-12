// FreeHealthInsuranceRequest.jsx
import { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from FreeHealthInsuranceRequest.css)
   All classes prefixed with "fhir-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .fhir-container {
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
  .fhir-bold      { font-weight: bold; }
  .fhir-underline { text-decoration: underline; }
  .fhir-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .fhir-mt10 { margin-top: 10px; }
  .fhir-mt20 { margin-top: 20px; }
  .fhir-ml20 { margin-left: 20px; }

  /* ── Top Bar ── */
  .fhir-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .fhir-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Date right ── */
  .fhir-header-date { text-align: right; margin-bottom: 20px; font-size: 1rem; }

  /* ── Addressee ── */
  .fhir-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .fhir-addressee-row { margin-top: 5px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

  /* ── Shared inputs ── */
  .fhir-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .fhir-w-medium { width: 200px; }
  .fhir-w-long   { width: 300px; }

  /* ── Subject ── */
  .fhir-subject { text-align: center; margin: 20px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .fhir-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 20px;
  }
  .fhir-inline-input {
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
  .fhir-w-medium-box { width: 180px; }

  /* ── Tapsil / tables ── */
  .fhir-tapsil          { margin-bottom: 30px; }
  .fhir-table-responsive { overflow-x: auto; margin-bottom: 10px; }
  .fhir-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .fhir-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
  }
  .fhir-table td { border: 1px solid #555; padding: 5px; }
  .fhir-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #000;
    font-family: inherit;
  }
  .fhir-action-cell { text-align: center; }
  .fhir-add-btn {
    background-color: blue;
    color: white;
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
  }

  /* ── Financial section ── */
  .fhir-form-row  { margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap; }
  .fhir-radio-row { display: flex; align-items: center; margin-bottom: 10px; gap: 6px; flex-wrap: wrap; }
  .fhir-radio-row input[type="radio"] { margin-right: 4px; }
  .fhir-textarea {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    box-sizing: border-box;
    outline: none;
  }

  /* ── Applicant signature section ── */
  .fhir-sig-section { margin-top: 30px; margin-bottom: 30px; }
  .fhir-sig-row     { margin-bottom: 10px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .fhir-sig-row label { white-space: nowrap; }

  /* ── Applicant details overrides ── */
  .fhir-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .fhir-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .fhir-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .fhir-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .fhir-footer { text-align: center; margin-top: 40px; }
  .fhir-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .fhir-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
  .fhir-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .fhir-copyright {
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
    .fhir-container,
    .fhir-container * { visibility: visible; }
    .fhir-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .fhir-top-bar,
    .fhir-footer,
    .fhir-add-btn { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .fhir-table th {
      background-color: #e0e0e0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined — crashes on load.
   All table inputs and financial inputs were uncontrolled — now wired.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  // addressee
  addressee_local:    MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  addressee_district: MUNICIPALITY?.city  || "काठमाडौँ",
  // body
  fiscal_year: "",
  // family members table (fixed 1 row — can be extended to dynamic if needed)
  family_1_name:      "", family_1_relation: "", family_1_gender: "",
  family_1_age:       "", family_1_education: "", family_1_contact: "",
  // employment table
  emp_1_name:         "", emp_1_status:  "", emp_1_org:    "",
  emp_1_position:     "", emp_1_income:  "",
  // land table
  land_1_owner:       "", land_1_area:   "", land_1_remarks: "",
  // financial
  family_annual_income: "",
  family_debt:          "",
  poverty:              "yes",
  level:                "",
  other_notes:          "",
  // applicant signature
  applicant_name:       "",
  applicant_signature:  "",
  applicant_address:    "",
  // ApplicantDetailsNp fields
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const FreeHealthInsuranceRequest = () => {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Generic field setter ── */
  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ── handleChange for ApplicantDetailsNp and named inputs ── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField(name, type === "checkbox" ? checked : value);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/free-health-insurance-request", form);
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
      const res = await axios.post("/api/forms/free-health-insurance-request", form);
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

      <form className="fhir-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="fhir-top-bar">
          निशुल्क स्वास्थ्य बिमा गरि पाउँ ।
          <span className="fhir-breadcrumb">
            सामाजिक / पारिवारिक &gt; निशुल्क स्वास्थ्य बिमा गरि पाउँ
          </span>
        </div>

        {/* ── Date right ── */}
        <div className="fhir-header-date">
          <p>मिति : <span className="fhir-bold">२०८२-०८-०६</span></p>
        </div>

        {/* ── Addressee ── */}
        <div className="fhir-addressee">
          <p>श्रीमान् नगर प्रमुख ज्यू</p>
          <div className="fhir-addressee-row">
            {/* BUG FIX: was defaultValue (uncontrolled) — now value/onChange */}
            <input
              name="addressee_local"
              type="text"
              className="fhir-line-input fhir-w-medium"
              value={form.addressee_local}
              onChange={handleChange}
            />
            <span>,</span>
            <input
              name="addressee_district"
              type="text"
              className="fhir-line-input fhir-w-medium"
              value={form.addressee_district}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="fhir-subject">
          <p>
            विषय:{" "}
            <span className="fhir-underline">निशुल्क स्वास्थ्य बिमा गरिदिनु हुन ।</span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="fhir-body">
          <p>
            प्रस्तुत विषयमा यस नगरपालिकाबाट आ. व.{" "}
            {/* BUG FIX: was uncontrolled — now wired */}
            <input
              name="fiscal_year"
              type="text"
              className="fhir-inline-input fhir-w-medium-box"
              value={form.fiscal_year}
              onChange={handleChange}
            />{" "}
            <span className="fhir-red">*</span> मा गरिब, विपन्न, किसान, मजदुरको लागि
            निशुल्क स्वास्थ्य बिमा गरिदिने कार्यक्रम रहेकोले तपशिलको विवरण पेश गरि
            सो कार्यक्रममा मेरो परिवारलाई समावेश गरिदिनुहुन अनुरोध छ ।
          </p>
        </div>

        {/* ── Tapsil ── */}
        <div className="fhir-tapsil">
          <h4 className="fhir-bold">तपशिल</h4>

          {/* Table 1 — Family members */}
          <p className="fhir-bold">क) परिवारमा सदस्यहरुको विवरण :</p>
          <div className="fhir-table-responsive">
            <table className="fhir-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "25%" }}>नाम, थर</th>
                  <th style={{ width: "20%" }}>घरमुलीसँगको नाता</th>
                  <th style={{ width: "15%" }}>लिङ्ग</th>
                  <th style={{ width: "10%" }}>उमेर</th>
                  <th style={{ width: "15%" }}>शैक्षिक योग्यता</th>
                  <th style={{ width: "10%" }}>सम्पर्क</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td><input name="family_1_name"      className="fhir-table-input" value={form.family_1_name}      onChange={handleChange} /></td>
                  <td><input name="family_1_relation"  className="fhir-table-input" value={form.family_1_relation}  onChange={handleChange} /></td>
                  <td><input name="family_1_gender"    className="fhir-table-input" value={form.family_1_gender}    onChange={handleChange} /></td>
                  <td><input name="family_1_age"       className="fhir-table-input" value={form.family_1_age}       onChange={handleChange} /></td>
                  <td><input name="family_1_education" className="fhir-table-input" value={form.family_1_education} onChange={handleChange} /></td>
                  <td><input name="family_1_contact"   className="fhir-table-input" value={form.family_1_contact}   onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2 — Employment */}
          <p className="fhir-bold fhir-mt20">ख) परिवारमा रोजगारी सम्बन्धि विवरण :</p>
          <div className="fhir-table-responsive">
            <table className="fhir-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "25%" }}>नाम, थर</th>
                  <th style={{ width: "20%" }}>रोजगारीको अवस्था</th>
                  <th style={{ width: "20%" }}>कुन संस्था</th>
                  <th style={{ width: "15%" }}>पद</th>
                  <th style={{ width: "15%" }}>परिवारको आय</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td><input name="emp_1_name"     className="fhir-table-input" value={form.emp_1_name}     onChange={handleChange} /></td>
                  <td><input name="emp_1_status"   className="fhir-table-input" value={form.emp_1_status}   onChange={handleChange} /></td>
                  <td><input name="emp_1_org"      className="fhir-table-input" value={form.emp_1_org}      onChange={handleChange} /></td>
                  <td><input name="emp_1_position" className="fhir-table-input" value={form.emp_1_position} onChange={handleChange} /></td>
                  <td><input name="emp_1_income"   className="fhir-table-input" value={form.emp_1_income}   onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 3 — Land */}
          <p className="fhir-bold fhir-mt20">ग) परिवारको स्वामित्वमा रहेको जग्गाजमिनको विवरण :</p>
          <div className="fhir-table-responsive">
            <table className="fhir-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "35%" }}>जग्गाधनीको नाम</th>
                  <th style={{ width: "25%" }}>क्षेत्रफल</th>
                  <th style={{ width: "25%" }}>कैफियत</th>
                  <th style={{ width: "10%" }}>थप</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td><input name="land_1_owner"   className="fhir-table-input" value={form.land_1_owner}   onChange={handleChange} /></td>
                  <td><input name="land_1_area"    className="fhir-table-input" value={form.land_1_area}    onChange={handleChange} /></td>
                  <td><input name="land_1_remarks" className="fhir-table-input" value={form.land_1_remarks} onChange={handleChange} /></td>
                  <td className="fhir-action-cell">
                    <button type="button" className="fhir-add-btn">+</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial & other details */}
          <div className="fhir-mt20">
            <div className="fhir-form-row">
              <label>घ) परिवारमा वार्षिक आम्दानी रु.</label>
              <span className="fhir-red">*</span>
              <input name="family_annual_income" type="text" className="fhir-line-input fhir-w-medium" value={form.family_annual_income} onChange={handleChange} />
            </div>
            <div className="fhir-form-row">
              <label>ङ) परिवारमा ऋण कति छ ? रु.</label>
              <span className="fhir-red">*</span>
              <input name="family_debt" type="text" className="fhir-line-input fhir-w-medium" value={form.family_debt} onChange={handleChange} />
            </div>

            <div className="fhir-form-row fhir-mt10">
              <label>
                च) गरिब घरपरिवार परिचयपत्रको लागि नेपाल सरकार, नगरपालिकाले गरिब घर
                परिवारको सुचिमा परेको छ / छैन ?
              </label>
            </div>
            <div className="fhir-radio-row">
              <input name="poverty" type="radio" value="yes" id="fhir-yes" checked={form.poverty === "yes"} onChange={handleChange} />
              <label htmlFor="fhir-yes">(१) छ</label>
              <input name="poverty" type="radio" value="no"  id="fhir-no"  checked={form.poverty === "no"}  onChange={handleChange} className="fhir-ml20" />
              <label htmlFor="fhir-no">(२) छैन</label>
            </div>

            <div className="fhir-form-row fhir-mt10">
              <label className="fhir-bold">परेको भए कुन तहमा ?</label>
            </div>
            <div className="fhir-radio-row">
              <input name="level" type="radio" value="1" id="fhir-l1" checked={form.level === "1"} onChange={handleChange} />
              <label htmlFor="fhir-l1">१) अति गरिब</label>
              <input name="level" type="radio" value="2" id="fhir-l2" checked={form.level === "2"} onChange={handleChange} className="fhir-ml20" />
              <label htmlFor="fhir-l2">२) मध्यम गरिब</label>
              <input name="level" type="radio" value="3" id="fhir-l3" checked={form.level === "3"} onChange={handleChange} className="fhir-ml20" />
              <label htmlFor="fhir-l3">३) सामान्य गरिब</label>
            </div>

            <div className="fhir-form-row fhir-mt20">
              <label>छ) अन्य कुरा भए उल्लेख गर्नुहोस ।</label>
            </div>
            <textarea name="other_notes" className="fhir-textarea" rows="4" value={form.other_notes} onChange={handleChange} />
          </div>
        </div>

        {/* ── Applicant signature ── */}
        <div className="fhir-sig-section">
          <div className="fhir-sig-row">
            <label>निवेदकको नाम, थर : <span className="fhir-red">*</span></label>
            <input name="applicant_name"      type="text" className="fhir-line-input fhir-w-medium" value={form.applicant_name}      onChange={handleChange} />
          </div>
          <div className="fhir-sig-row">
            <label>दस्तखत :</label>
            <input name="applicant_signature" type="text" className="fhir-line-input fhir-w-medium" value={form.applicant_signature} onChange={handleChange} />
          </div>
          <div className="fhir-sig-row">
            <label>ठेगाना : <span className="fhir-red">*</span></label>
            <input name="applicant_address"   type="text" className="fhir-line-input fhir-w-medium" value={form.applicant_address}   onChange={handleChange} />
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="fhir-footer">
          <button className="fhir-save-print-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="fhir-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default FreeHealthInsuranceRequest;