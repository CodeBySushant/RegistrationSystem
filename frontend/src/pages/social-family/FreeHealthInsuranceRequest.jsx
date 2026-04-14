import { useState } from "react";
import "./FreeHealthInsuranceRequest.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "free-health-insurance-request";

/** Resolve API base safely (works with Vite or CRA) */
const API_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    (process.env.REACT_APP_API_BASE || process.env.API_BASE)) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "";

const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

/** Helper: format JS Date (or ISO string) -> MySQL DATETIME "YYYY-MM-DD HH:MM:SS" */
function toMySQLDateTime(value) {
  if (!value) return null;
  // If already looks like "YYYY-MM-DD HH:MM:SS" return it
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return value;
  // Try parse (ISO or other)
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}

const FreeHealthInsuranceRequest = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/free-health-insurance-request", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/free-health-insurance-request", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="health-insurance-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        निशुल्क स्वास्थ्य बिमा गरि पाउँ ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; निशुल्क स्वास्थ्य बिमा गरि पाउँ
        </span>
      </div>

      {/* --- Header Section (Date only on right) --- */}
      <div className="header-right-date">
        <p>
          मिति : <span className="bold-text">२०८२-०८-०६</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p>श्रीमान् नगर प्रमुख ज्यू</p>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input medium-input"
            defaultValue="नागार्जुन नगरपालिका"
            name="addressee_local"
          />
          <span>,</span>
          <input
            type="text"
            className="line-input medium-input"
            defaultValue="काठमाडौँ"
            name="addressee_district"
          />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            निशुल्क स्वास्थ्य बिमा गरिदिनु हुन ।
          </span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस नगरपालिकाबाट आ. व.{" "}
          <input
            name="fiscal_year"
            type="text"
            className="inline-box-input medium-box"
          />{" "}
          <span className="red">*</span> मा गरिब, विपन्न, किसान, मजदुरको लागि
          निशुल्क स्वास्थ्य बिमा गरिदिने कार्यक्रम रहेकोले तपशिलको विवरण पेश गरि
          सो कार्यक्रममा मेरो परिवारलाई समावेश गरिदिनुहुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Tapsil Section --- */}
      <div className="tapsil-container">
        <h4 className="bold-text">तपशिल</h4>

        {/* Table 1 */}
        <p className="bold-text">क) परिवारमा सदस्यहरुको विवरण :</p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
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
                <td>
                  <input
                    name="family_1_name"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="family_1_relation"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="family_1_gender"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="family_1_age"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="family_1_education"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="family_1_contact"
                    type="text"
                    className="table-input"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
          </div>
        </div>

        {/* Table 2 */}
        <p className="bold-text mt-20">ख) परिवारमा रोजगारी सम्बन्धि विवरण :</p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
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
                <td>
                  <input
                    name="emp_1_name"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="emp_1_status"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input name="emp_1_org" type="text" className="table-input" />
                </td>
                <td>
                  <input
                    name="emp_1_position"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="emp_1_income"
                    type="text"
                    className="table-input"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
          </div>
        </div>

        {/* Table 3 */}
        <p className="bold-text mt-20">
          ग) परिवारको स्वामित्वमा रहेको जग्गाजमिनको विवरण :
        </p>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
                <th style={{ width: "35%" }}>जग्गाधनीको नाम</th>
                <th style={{ width: "25%" }}>क्षेत्रफल</th>
                <th style={{ width: "25%" }}>कैफियत</th>
                <th style={{ width: "10%" }}>थप</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>
                  <input
                    name="land_1_owner"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="land_1_area"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td>
                  <input
                    name="land_1_remarks"
                    type="text"
                    className="table-input"
                  />
                </td>
                <td className="action-cell">
                  <button type="button" className="add-btn">
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial & Other Details */}
        <div className="financial-details mt-20">
          <div className="form-row">
            <label>घ) परिवारमा वार्षिक आम्दानी रु.</label>
            <span className="red">*</span>
            <input
              name="family_annual_income"
              type="text"
              className="line-input medium-input"
            />
          </div>
          <div className="form-row">
            <label>ङ) परिवारमा ऋण कति छ ? रु.</label>
            <span className="red">*</span>
            <input
              name="family_debt"
              type="text"
              className="line-input medium-input"
            />
          </div>

          <div className="form-row mt-10">
            <label>
              च) गरिब घरपरिवार परिचयपत्रको लागि नेपाल सरकार, नगरपालिकाले गरिब घर
              परिवारको सुचिमा परेको छ / छैन ?
            </label>
          </div>
          <div className="radio-group">
            <input
              name="poverty"
              type="radio"
              value="yes"
              id="yes"
              defaultChecked
            />{" "}
            <label htmlFor="yes">(१) छ</label>
            <input
              name="poverty"
              type="radio"
              value="no"
              id="no"
              className="ml-20"
            />{" "}
            <label htmlFor="no">(२) छैन</label>
          </div>

          <div className="form-row mt-10">
            <label className="bold-text">परेको भए कुन तहमा ?</label>
          </div>
          <div className="radio-group">
            <input name="level" type="radio" value="1" id="level1" />{" "}
            <label htmlFor="level1">१) अति गरिब</label>
            <input
              name="level"
              type="radio"
              value="2"
              id="level2"
              className="ml-20"
            />{" "}
            <label htmlFor="level2">२) मध्यम गरिब</label>
            <input
              name="level"
              type="radio"
              value="3"
              id="level3"
              className="ml-20"
            />{" "}
            <label htmlFor="level3">३) सामान्य गरिब</label>
          </div>

          <div className="form-row mt-20">
            <label>छ) अन्य कुरा भए उल्लेख गर्नुहोस ।</label>
          </div>
          <textarea
            name="other_notes"
            className="details-textarea"
            rows="4"
          ></textarea>
        </div>
      </div>

      {/* Applicant Signature Section */}
      <div className="applicant-signature-section">
        <div className="sig-row">
          <label>
            निवेदकको नाम, थर : <span className="red">*</span>
          </label>
          <input
            name="applicant_name"
            type="text"
            className="line-input medium-input"
          />
        </div>
        <div className="sig-row">
          <label>दस्तखत :</label>
          <input
            name="applicant_signature"
            type="text"
            className="line-input medium-input"
          />
        </div>
        <div className="sig-row">
          <label>
            ठेगाना : <span className="red">*</span>
          </label>
          <input
            name="applicant_address"
            type="text"
            className="line-input medium-input"
          />
        </div>
      </div>

      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
};

export default FreeHealthInsuranceRequest;
