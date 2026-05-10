import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:               new Date().toISOString().slice(0, 10),
  headerDistrict:     "",
  mainDistrict:       "",
  palikaName:         MUNICIPALITY?.name || "",
  wardNo:             "",
  residentName:       "",
  relation:           "छोरा",
  guardianName:       "",
  casteName:          "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: kacc-)
───────────────────────────────────────────── */
const styles = `
.kacc-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Kalimati','Kokila','Arial',sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

.kacc-header-row {
  margin-bottom: 16px;
}

.kacc-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
}

.kacc-header-to-group {
  display: flex;
  flex-direction: column;
}
.kacc-header-to-group h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
.kacc-header-to-group input {
  font-family: inherit;
  font-size: 16px;
  padding: 4px 6px;
  margin-bottom: 8px;
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  width: 250px;
  max-width: 100%;
  outline: none;
}

.kacc-date-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-weight: bold;
  gap: 8px;
}
.kacc-date-group input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  padding: 2px 4px;
}

.kacc-subject-line {
  text-align: center;
  margin: 25px 0;
  font-size: 16px;
}

.kacc-certificate-body {
  line-height: 2.8;
  font-size: 16px;
  text-align: justify;
}
.kacc-certificate-body input[type="text"],
.kacc-certificate-body select {
  display: inline-block;
  vertical-align: baseline;
  padding: 4px 6px;
  font-family: inherit;
  font-size: 15px;
  background-color: #fff;
  border: none;
  border-bottom: 1px dotted #000;
  margin: 0 5px;
  width: 120px;
  max-width: 100%;
  box-sizing: border-box;
  outline: none;
}
.kacc-certificate-body select {
  width: auto;
  min-width: 80px;
}
.kacc-certificate-body .kacc-short { width: 80px; }

.kacc-submit-area {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}
.kacc-submit-btn {
  background-color: #343a40;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.kacc-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.kacc-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }

  .kacc-container,
  .kacc-container * { visibility: visible; }

  .kacc-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .kacc-submit-area { display: none !important; }

  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    box-shadow: none !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .kacc-container { width: 100%; padding: 15px; }
  .kacc-form-row { flex-direction: column; gap: 12px; }
  .kacc-certificate-body input[type="text"] { width: 90px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ApplicationforKhasAryaCasteCertification = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.headerDistrict?.trim()) return "हेडर जिल्ला आवश्यक छ";
    if (!formData.mainDistrict?.trim())   return "मुख्य जिल्ला आवश्यक छ";
    if (!formData.residentName?.trim())   return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName?.trim())   return "अभिभावकको नाम आवश्यक छ";
    if (!formData.casteName?.trim())      return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null),
      );

      const res = await axios.post(
        "/api/forms/khas-arya-certification",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => setFormData(INITIAL_STATE), 500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="kacc-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality header ── */}
          <div className="kacc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date row ── */}
          <div className="kacc-form-row">
            <div className="kacc-header-to-group">
              <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                placeholder="जिल्ला"
              />
            </div>

            <div className="kacc-date-group">
              <label>मिति :</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="kacc-subject-line">
            <strong>
              विषय: <u>खस आर्य जाति प्रमाणित गरि पाउँ ।</u>
            </strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="kacc-certificate-body">
            <input
              type="text"
              name="mainDistrict"
              value={formData.mainDistrict}
              onChange={handleChange}
              placeholder="जिल्ला"
            />
            जिल्ला
            <input
              type="text"
              name="palikaName"
              value={formData.palikaName}
              onChange={handleChange}
            />
            वडा नं.
            <input
              type="text"
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
              className="kacc-short"
            />
            निवासी
            <input
              type="text"
              name="residentName"
              value={formData.residentName}
              onChange={handleChange}
              placeholder="निवासीको नाम"
            />
            को
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="पति">पति</option>
              <option value="पत्नी">पत्नी</option>
            </select>
            म
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="अभिभावकको नाम"
            />
            खस आर्य जाति अन्तर्गत
            <input
              type="text"
              name="casteName"
              value={formData.casteName}
              onChange={handleChange}
              placeholder="जातिको नाम"
            />
            जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
            सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
            निवेदन पेश गरेको छु ।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Submit ── */}
          <div className="kacc-submit-area">
            <button
              type="submit"
              className="kacc-submit-btn"
              disabled={submitting}
            >
              {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default ApplicationforKhasAryaCasteCertification;