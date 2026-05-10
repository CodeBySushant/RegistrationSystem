import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE  (single source of truth)
───────────────────────────────────────────── */
const INITIAL_STATE = {
  nagarpalika:           MUNICIPALITY.name        || "",
  ward:                  MUNICIPALITY.wardNumber  || "",
  targetGroup:           "जेष्ठ नागरिक (दलित)",
  gender:                "पुरुष",
  fullName:              "",
  fatherName:            "",
  motherName:            "",
  address:               "",
  nagariktaNo:           "",
  jariJilla:             "",
  birthDate:             "",
  mobileNo:              "",
  patiMrituNo:           "",
  patiMrituMiti:         "",
  allowanceType:         "",
  parichayaNo:           "",
  allowanceStartDate:    "",
  allowanceStartQuarter: "",
  applicantName:         "",
  applicantAddress:      "",
  applicantNagarikta:    "",   // matches forms.json column name
  applicantPhone:        "",
};

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
/* ================= MAIN LAYOUT ================= */
.af-wrapper {
  min-height: 100vh;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.af-printable-page {
  max-width: 950px;
  width: 100%;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  min-height: 1123px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  position: relative;
  margin: 0 auto;
}

.af-form-container {
  font-family: "Times New Roman", serif;
  color: #000;
  padding: 40px;
  height: 100%;
  box-sizing: border-box;
}

/* ================= HEADER ================= */
.af-header-section {
  margin-bottom: 25px;
}

.af-header-meta {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.4;
}

.af-left-text, .af-right-text {
  font-size: 0.95rem;
}

.af-municipality-line {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px dotted #000;
  padding-bottom: 8px;
  margin-bottom: 25px;
  font-size: 0.88rem;
  flex-wrap: wrap;
  width: 100%;
}

.af-municipality-label {
  flex: 1;
  max-width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.86rem;
}

.af-municipality-line span:nth-child(2) {
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 0.88rem;
}

.af-ward-input {
  font-size: 0.9rem;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  min-width: 70px;
  max-width: 120px;
  flex-shrink: 0;
}

/* ================= CONTENT ================= */
.af-subject {
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  margin: 30px 0 20px 0;
  font-size: 1.1rem;
}

.af-paragraph {
  text-align: justify;
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 30px;
}

.af-form-section {
  margin-top: 25px;
}

.af-form-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 0.95rem;
}

.af-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 45px;
  margin-bottom: 20px;
}

.af-form-group {
  display: flex;
  align-items: baseline;
  border-bottom: 1px dotted #000;
  padding-bottom: 5px;
}

.af-form-group label {
  flex-shrink: 0;
  margin-right: 12px;
  font-size: 0.9rem;
  min-width: 130px;
  white-space: nowrap;
}

.af-form-group input,
.af-form-group select {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
  font-family: inherit;
  padding: 2px 0;
}

.af-form-group.full {
  grid-column: 1 / -1;
}

.af-sub-heading {
  font-weight: bold;
  margin: 25px 0 12px 0;
  border-bottom: 1px dotted #000;
  padding-bottom: 6px;
  font-size: 1rem;
}

/* ================= OFFICE BOX ================= */
.af-bordered-box {
  border: 2px solid #000;
  padding: 22px;
  margin: 35px 0;
  background: rgba(255,255,255,0.92);
}

.af-bordered-box h4 {
  text-align: center;
  font-weight: bold;
  margin: 0 0 22px 0;
  font-size: 1.12rem;
}

/* ================= BUTTON ================= */
.af-button-container {
  text-align: center;
  margin-top: 45px;
  padding-top: 25px;
  border-top: 1px solid #ddd;
}

.af-button-container button {
  background: #4a5a9c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 14px 35px;
  font-weight: bold;
  font-size: 1.02rem;
  cursor: pointer;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.af-button-container button:hover:not(:disabled) {
  background: #3f4f8a;
  transform: translateY(-1px);
}

.af-button-container button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

/* ================= PRINT ================= */
@media print {
  body * {
    visibility: hidden;
  }

  .af-printable-page,
  .af-printable-page * {
    visibility: visible;
  }

  .af-printable-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    box-shadow: none !important;
    background: white !important;
    background-image: none !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    min-height: auto !important;
  }

  .af-form-container {
    padding: 40px !important;
    border: none !important;
  }

  .af-button-container {
    display: none !important;
  }

  .af-bordered-box {
    border-color: #000 !important;
    background: white !important;
    box-shadow: none !important;
  }

  .af-form-group input,
  .af-ward-input {
    border: 1px solid transparent !important;
    background: transparent !important;
  }

  .af-municipality-line {
    font-size: 0.85rem !important;
    gap: 4px !important;
  }

  .af-municipality-label {
    max-width: 280px !important;
    font-size: 0.83rem !important;
  }

  .af-two-col {
    gap: 15px 35px !important;
  }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .af-printable-page {
    margin: 0 10px;
    max-width: calc(100vw - 20px);
  }

  .af-two-col {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .af-form-group label {
    min-width: auto;
    margin-right: 8px;
  }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const AllowanceForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.applicantName) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस् (नाम र निवेदकको नाम)।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post("/api/forms/allowance-form", formData);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो! ID: " + (res.data.id || ""));

        // Print first, then reset after print dialog closes
        window.print();
        setTimeout(() => setFormData(INITIAL_STATE), 1000);
      }
    } catch (err) {
      console.error(err);
      alert("सेभ हुन सकेन: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Inject scoped styles once */}
      <style>{styles}</style>

      <div className="af-wrapper">
        <div className="af-printable-page">
          <form className="af-form-container" onSubmit={handleSubmit}>

            {/* ── Header ── */}
            <div className="af-header-section">
              <MunicipalityHeader showLogo />

              <div className="af-header-meta">
                <div className="af-left-text">श्री अध्यक्ष ज्यु,</div>
                <div className="af-right-text">मिति: २०८२।०७।०५</div>
              </div>

              <div className="af-municipality-line">
                <span className="af-municipality-label">
                  {MUNICIPALITY.name || ""}
                </span>
                <span>वडा नं.</span>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  className="af-ward-input"
                />
              </div>
            </div>

            {/* ── Subject ── */}
            <h3 className="af-subject">विषय: नाम दर्ता सम्बन्धमा</h3>

            <p className="af-paragraph">
              महोदय,
              <br />
              उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता
              गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य
              कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा
              पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम
              सहुँला बुझाउँला।
            </p>

            {/* ── Applicant fields ── */}
            <div className="af-form-section">

              <div className="af-form-row">
                <label>लक्षित समूह:</label>
                <select
                  name="targetGroup"
                  value={formData.targetGroup}
                  onChange={handleChange}
                >
                  <option>जेष्ठ नागरिक (दलित)</option>
                  <option>अपांगता भएका व्यक्ति</option>
                  <option>एकल महिला</option>
                  <option>बालबालिका</option>
                </select>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>नाम, थर:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>लिङ्ग:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="पुरुष">पुरुष</option>
                    <option value="महिला">महिला</option>
                    <option value="अन्य">अन्य</option>
                  </select>
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>बाबुको नाम:</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>आमाको नाम:</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group full">
                  <label>ठेगाना:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>ना.प्र.नं.:</label>
                  <input
                    type="text"
                    name="nagariktaNo"
                    value={formData.nagariktaNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>जारी जिल्ला:</label>
                  <input
                    type="text"
                    name="jariJilla"
                    value={formData.jariJilla}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>जन्म मिति:</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>सम्पर्क मोबाइल नं.:</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="af-sub-heading">विधवाको हकमा</div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>पतिको मृत्यु दर्ता नं.:</label>
                  <input
                    type="text"
                    name="patiMrituNo"
                    value={formData.patiMrituNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>पतिको मृत्यु मिति:</label>
                  <input
                    type="date"
                    name="patiMrituMiti"
                    value={formData.patiMrituMiti}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ── Office use box ── */}
            <div className="af-bordered-box">
              <h4>कार्यालय प्रयोजनको लागि</h4>

              <div className="af-form-group">
                <label>नाम दर्ता निर्णय मिति: २०८२।०७।०५</label>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>भत्ताको किसिम:</label>
                  <input
                    type="text"
                    name="allowanceType"
                    value={formData.allowanceType}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>परिचय पत्र नं.:</label>
                  <input
                    type="text"
                    name="parichayaNo"
                    value={formData.parichayaNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>भत्ता पाउने सुरु मिति (आ.व.):</label>
                  <input
                    type="text"
                    name="allowanceStartDate"
                    value={formData.allowanceStartDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>को (पहिलो) चौमासिकदेखि:</label>
                  <input
                    type="text"
                    name="allowanceStartQuarter"
                    value={formData.allowanceStartQuarter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ── Applicant details footer ── */}
            <ApplicantDetailsNp
              formData={formData}
              handleChange={handleChange}
            />

            {/* ── Submit button ── */}
            <div className="af-button-container">
              <button type="submit" disabled={submitting}>
                {submitting
                  ? "पठाइँ हुँदैछ..."
                  : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AllowanceForm;