// src/pages/application/AllowanceForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import { useWardForm } from "../../hooks/useWardForm";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────── Initial state ─────────────────────────── */
const initialState = {
  nagarpalika: MUNICIPALITY.name || "",
  date: new Date().toISOString().split("T")[0],
  // addressee
  addresseeMunicipality: MUNICIPALITY.name || "",
  addresseeWardNo: MUNICIPALITY.wardNumber || "",
  // main fields
  targetGroup: "जेष्ठ नागरिक (दलित)",
  gender: "पुरुष",
  fullName: "",
  fatherName: "",
  motherName: "",
  address: "",
  nagariktaNo: "",
  jariJilla: "",
  birthDate: "",
  mobileNo: "",
  patiMrituNo: "",
  patiMrituMiti: "",
  // office use
  allowanceType: "",
  parichayaNo: "",
  allowanceStartDate: "",
  allowanceStartQuarter: "",
  // applicant details
  applicantName: "",
  applicantAddress: "",
  applicantNagarikta: "",
  applicantPhone: "",
};

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
/* ── Wrapper ── */
.af-wrapper {
  min-height: 100vh;
  padding: 20px;
  background: #f0f0f0;
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
  box-shadow: 0 0 20px rgba(0,0,0,0.12);
  margin: 0 auto;
}

.af-form-container {
  font-family: 'Kalimati', 'Kokila', 'Times New Roman', serif;
  color: #000;
  padding: 40px;
  box-sizing: border-box;
}

/* ── All inputs/selects white ── */
.af-form-container input[type="text"],
.af-form-container input[type="date"],
.af-form-container select {
  background-color: #fff;
  font-family: inherit;
}
.af-form-container input[type="text"]:focus,
.af-form-container input[type="date"]:focus,
.af-form-container select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
}

/* ── Header area ── */
.af-header-section { margin-bottom: 20px; }

.af-header-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 16px 0 12px;
  font-size: 1rem;
  flex-wrap: wrap;
  gap: 8px;
}

/* Addressee block under header */
.af-addressee-block { display: flex; flex-direction: column; gap: 6px; font-size: 1rem; }
.af-addr-line       { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.af-addr-label      { font-weight: bold; white-space: nowrap; }

.af-input {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  background-color: #fff;
  outline: none;
}
.af-select {
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  background-color: #fff;
  outline: none;
  cursor: pointer;
}
.af-w-xs   { width: 60px; }
.af-w-sm   { width: 100px; }
.af-w-md   { width: 200px; }
.af-w-lg   { width: 280px; }
.af-w-date { width: 150px; }
.af-w-full { width: 100%; box-sizing: border-box; }

.af-date-block { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; }
.af-date-block label { white-space: nowrap; }

/* ── Subject ── */
.af-subject {
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  margin: 24px 0 16px;
  font-size: 1.05rem;
}

/* ── Paragraph ── */
.af-paragraph {
  text-align: justify;
  font-size: 0.95rem;
  line-height: 1.9;
  margin-bottom: 24px;
}

/* ── Form section ── */
.af-form-section { margin-top: 20px; }

.af-form-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  flex-wrap: wrap;
}
.af-form-row label { font-weight: bold; white-space: nowrap; }

/* Two-column grid */
.af-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 40px;
  margin-bottom: 16px;
}
.af-form-group {
  display: flex;
  align-items: baseline;
  padding-bottom: 5px;
  gap: 8px;
}
.af-form-group label {
  flex-shrink: 0;
  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
  min-width: 130px;
  color: #333;
}
.af-form-group input[type="text"],
.af-form-group input[type="date"],
.af-form-group select {
  border: none;
  border-bottom: none;
  background: #fff;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
  font-family: inherit;
  padding: 2px 4px;
  border-radius: 5px;
}
.af-form-group.full { grid-column: 1 / -1; }

/* Sub-heading */
.af-sub-heading {
  font-weight: bold;
  margin: 22px 0 10px;
  font-size: 0.95rem;
  border-bottom: 1px solid #bbb;
  padding-bottom: 6px;
  color: #222;
}

/* ── Office use section — gov form style ── */
.af-office-section {
  margin: 28px 0 20px;
  border: 1px solid #bbb;
  border-radius: 4px;
  overflow: hidden;
}
.af-office-title {
  background-color: #e8e8e8;
  font-weight: bold;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-bottom: 1px solid #bbb;
  text-align: center;
  letter-spacing: 0.02em;
}
.af-office-body {
  padding: 16px;
  background-color: rgba(255,255,255,0.55);
}
.af-office-body .af-two-col { margin-bottom: 12px; }
.af-office-body .af-form-group { border-bottom: none; }
.af-office-note {
  font-size: 0.88rem;
  color: #555;
  margin-bottom: 14px;
  font-style: italic;
}

/* ── Applicant details overrides ── */
.af-form-container .applicant-details-box {
  border: 1px solid #ddd !important;
  padding: 20px !important;
  background-color: rgba(255,255,255,0.4) !important;
  margin-top: 20px !important;
  border-radius: 4px !important;
}
.af-form-container .applicant-details-box h3 {
  color: #777 !important; font-size: 1.1rem !important;
  margin: 0 0 15px 0 !important;
  border-bottom: 1px solid #eee !important; padding-bottom: 8px !important;
}
.af-form-container .applicant-details-box .details-grid {
  display: flex !important; flex-direction: column !important; gap: 18px !important;
}
.af-form-container .applicant-details-box .detail-input {
  max-width: 400px !important; width: 100% !important;
  border: 1px solid #ddd !important; padding: 8px !important;
  border-radius: 4px !important; box-sizing: border-box !important;
  background-color: #fff !important; font-family: inherit !important;
}
.af-form-container .applicant-details-box .detail-input:focus {
  border-color: #2563eb !important; outline: none !important;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12) !important;
}
.af-form-container .applicant-details-box .bg-gray { background-color: #eef2f5 !important; }

/* ── Footer buttons ── */
.af-button-container {
  text-align: center;
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.af-btn {
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 32px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  min-width: 180px;
  font-family: inherit;
  transition: filter 0.15s, transform 0.1s;
}
.af-btn-save  { background: #2c3e50; }
.af-btn-print { background: #1a6b3a; }
.af-btn:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-1px); }
.af-btn:disabled { background: #aaa; cursor: not-allowed; transform: none; }

/* ── Required star ── */
.af-req { color: red; margin-left: 3px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .af-form-container  { padding: 20px 14px; }
  .af-two-col         { grid-template-columns: 1fr; gap: 12px; }
  .af-form-group.full { grid-column: 1; }
  .af-button-container { flex-direction: column; align-items: center; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .af-printable-page, .af-printable-page * { visibility: visible; }
  .af-printable-page {
    position: absolute; left: 0; top: 0;
    width: 100%; max-width: none;
    box-shadow: none; background: white !important;
    background-image: none !important;
    margin: 0; padding: 0; min-height: auto;
  }
  .af-form-container { padding: 12mm 16mm !important; }
  .af-button-container,
  .applicant-details-box { display: none !important; }
  input, select {
    border: none !important; background: transparent !important;
    color: #000 !important; -webkit-text-fill-color: #000 !important;
  }
  input::placeholder { color: transparent !important; }
  .af-office-section { border: 1px solid #000 !important; }
  .af-office-title   { background-color: #e0e0e0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

/* ─────────────────────────── Component ─────────────────────────── */
const AllowanceForm = () => {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  /* ── Clean isolated print window ── */
  const handleCleanPrint = () => {
    const v = (val) => `<span class="value">${val || ""}</span>`;

    const content = `
      <!DOCTYPE html><html>
      <head>
        <meta charset="utf-8"/>
        <title>सामाजिक सुरक्षा भत्ता नाम दर्ता</title>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:'Kalimati','Noto Sans Devanagari',sans-serif;color:#000;background:white;padding:15mm 20mm;font-size:11pt;line-height:1.8}
          .header{text-align:center;margin-bottom:20px;position:relative;min-height:90px}
          .logo{position:absolute;left:0;top:0;width:70px}
          .mun-name{color:#c0392b;font-size:22pt;font-weight:700}
          .ward-title{color:#c0392b;font-size:16pt;font-weight:700;margin:4px 0}
          .addr{color:#c0392b;font-size:10pt}
          .top-meta{display:flex;justify-content:space-between;margin:14px 0 8px;font-size:10pt}
          .addr-block{font-size:10pt;margin-bottom:16px; padding-bottom:8px}
          .subject{text-align:center;font-weight:bold;font-size:12pt;margin:18px 0;text-decoration:underline}
          .paragraph{font-size:10pt;line-height:1.9;text-align:justify;margin-bottom:18px}
          .two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px 36px;margin-bottom:14px}
          .form-group{display:flex;align-items:baseline; padding-bottom:4px;font-size:10pt;gap:6px}
          .form-group label{flex-shrink:0;min-width:120px;font-weight:bold;font-size:10pt;white-space:nowrap}
          .value{font-weight:600;flex:1}
          .full{grid-column:1/-1}
          .sub-heading{font-weight:bold;margin:18px 0 8px;border-bottom:1px solid #bbb;padding-bottom:5px;font-size:10pt}
          .office-section{margin:24px 0 16px;border:1px solid #000;border-radius:3px;overflow:hidden}
          .office-title{background:#e0e0e0;font-weight:bold;font-size:11pt;padding:6px 14px;border-bottom:1px solid #000;text-align:center}
          .office-body{padding:14px}
          .applicant-box{border:1px solid #999;padding:12px;margin-top:18px;border-radius:3px}
          .ap-title{font-weight:bold;border-bottom:1px solid #ddd;padding-bottom:6px;margin-bottom:10px;font-size:10pt}
          .ap-row{display:flex;margin-bottom:7px;font-size:10pt}
          .ap-label{min-width:150px;font-weight:600}
          .ap-val{flex:1}
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="${MUNICIPALITY.logoSrc}" alt="Nepal"/>
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardLabel}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="top-meta">
          <strong>श्री अध्यक्ष ज्यु,</strong>
          <span>मिति: ${form.date || ""}</span>
        </div>
        <div class="addr-block">
          ${v(form.addresseeMunicipality)} वडा नं. ${v(form.addresseeWardNo)}
        </div>

        <div class="subject">विषय: नाम दर्ता सम्बन्धमा</div>

        <div class="paragraph">
          महोदय,<br/>
          उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता
          गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य
          कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा
          पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम
          सहुँला बुझाउँला।
        </div>

        <div style="margin-bottom:12px;font-size:10pt"><strong>लक्षित समूह:</strong> ${v(form.targetGroup)}</div>

        <div class="two-col">
          <div class="form-group"><label>नाम, थर:</label><span class="value">${form.fullName || ""}</span></div>
          <div class="form-group"><label>लिङ्ग:</label><span class="value">${form.gender || ""}</span></div>
        </div>
        <div class="two-col">
          <div class="form-group"><label>बाबुको नाम:</label><span class="value">${form.fatherName || ""}</span></div>
          <div class="form-group"><label>आमाको नाम:</label><span class="value">${form.motherName || ""}</span></div>
        </div>
        <div class="two-col">
          <div class="form-group full"><label>ठेगाना:</label><span class="value">${form.address || ""}</span></div>
        </div>
        <div class="two-col">
          <div class="form-group"><label>ना.प्र.नं.:</label><span class="value">${form.nagariktaNo || ""}</span></div>
          <div class="form-group"><label>जारी जिल्ला:</label><span class="value">${form.jariJilla || ""}</span></div>
        </div>
        <div class="two-col">
          <div class="form-group"><label>जन्म मिति:</label><span class="value">${form.birthDate || ""}</span></div>
          <div class="form-group"><label>सम्पर्क मोबाइल नं.:</label><span class="value">${form.mobileNo || ""}</span></div>
        </div>

        <div class="sub-heading">विधवाको हकमा</div>
        <div class="two-col">
          <div class="form-group"><label>पतिको मृत्यु दर्ता नं.:</label><span class="value">${form.patiMrituNo || ""}</span></div>
          <div class="form-group"><label>पतिको मृत्यु मिति:</label><span class="value">${form.patiMrituMiti || ""}</span></div>
        </div>

        <div class="office-section">
          <div class="office-title">कार्यालय प्रयोजनको लागि</div>
          <div class="office-body">
            <div style="font-size:10pt;margin-bottom:12px;font-style:italic;color:#555">नाम दर्ता निर्णय मिति: २०८२।०७।०५</div>
            <div class="two-col">
              <div class="form-group"><label>भत्ताको किसिम:</label><span class="value">${form.allowanceType || ""}</span></div>
              <div class="form-group"><label>परिचय पत्र नं.:</label><span class="value">${form.parichayaNo || ""}</span></div>
            </div>
            <div class="two-col">
              <div class="form-group"><label>भत्ता सुरु मिति (आ.व.):</label><span class="value">${form.allowanceStartDate || ""}</span></div>
              <div class="form-group"><label>(पहिलो) चौमासिकदेखि:</label><span class="value">${form.allowanceStartQuarter || ""}</span></div>
            </div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="ap-title">निवेदकको विवरण</div>
          <div class="ap-row"><span class="ap-label">नाम:</span><span class="ap-val">${form.applicantName || ""}</span></div>
          <div class="ap-row"><span class="ap-label">ठेगाना:</span><span class="ap-val">${form.applicantAddress || ""}</span></div>
          <div class="ap-row"><span class="ap-label">नागरिकता नं.:</span><span class="ap-val">${form.applicantNagarikta || ""}</span></div>
          <div class="ap-row"><span class="ap-label">फोन:</span><span class="ap-val">${form.applicantPhone || ""}</span></div>
        </div>
      </body></html>
    `;

    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(content);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
      w.close();
    }, 500);
  };

  /* ── Single save ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.fullName?.trim()) {
      alert("कृपया नाम, थर भर्नुहोस्।");
      return;
    }
    if (!form.applicantName?.trim()) {
      alert("कृपया निवेदकको नाम भर्नुहोस्।");
      return;
    }

    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v]),
      );
      const res = await axios.post("/api/forms/allowance-form", payload);
      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        }
        setForm(initialState);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="af-wrapper">
        <div className="af-printable-page">
          <form
            className="af-form-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(false);
            }}
          >
            {/* ── Header ── */}
            <div className="af-header-section">
              <MunicipalityHeader showLogo />

              {/* Addressee row — municipality input below श्री अध्यक्ष ज्यु */}
              <div className="af-header-meta">
                <div className="af-addressee-block">
                  {/* Line 1: श्री अध्यक्ष ज्यु, hardcoded */}
                  <div className="af-addr-line">
                    <span className="af-addr-label">श्री अध्यक्ष ज्यु,</span>
                  </div>
                  {/* Line 2: editable municipality + ward */}
                  <div className="af-addr-line">
                    <input
                      type="text"
                      name="addresseeMunicipality"
                      value={form.addresseeMunicipality}
                      onChange={handleChange}
                      className="af-input af-w-lg"
                      placeholder="नगरपालिका / गाउँपालिका"
                    />
                    <span>वडा नं.</span>
                    <input
                      type="text"
                      name="addresseeWardNo"
                      value={form.addresseeWardNo}
                      onChange={handleChange}
                      className="af-input af-w-xs"
                    />
                  </div>
                </div>

                <div className="af-date-block">
                  <label>मिति:</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="af-input af-w-date"
                  />
                </div>
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

            {/* ── Main fields ── */}
            <div className="af-form-section">
              <div className="af-form-row">
                <label>
                  लक्षित समूह:<span className="af-req">*</span>
                </label>
                <select
                  name="targetGroup"
                  value={form.targetGroup}
                  onChange={handleChange}
                  className="af-select"
                >
                  <option>जेष्ठ नागरिक (दलित)</option>
                  <option>अपांगता भएका व्यक्ति</option>
                  <option>एकल महिला</option>
                  <option>बालबालिका</option>
                </select>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>
                    नाम, थर:<span className="af-req">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>लिङ्ग:</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option>पुरुष</option>
                    <option>महिला</option>
                    <option>अन्य</option>
                  </select>
                </div>
              </div>

              <div className="af-two-col">
                <div className="af-form-group">
                  <label>बाबुको नाम:</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>आमाको नाम:</label>
                  <input
                    type="text"
                    name="motherName"
                    value={form.motherName}
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
                    value={form.address}
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
                    value={form.nagariktaNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>जारी जिल्ला:</label>
                  <input
                    type="text"
                    name="jariJilla"
                    value={form.jariJilla}
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
                    value={form.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>सम्पर्क मोबाइल नं.:</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={form.mobileNo}
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
                    value={form.patiMrituNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="af-form-group">
                  <label>पतिको मृत्यु मिति:</label>
                  <input
                    type="date"
                    name="patiMrituMiti"
                    value={form.patiMrituMiti}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ── Office use section — gov form styled ── */}
            <div className="af-office-section">
              <div className="af-office-title">कार्यालय प्रयोजनको लागि</div>
              <div className="af-office-body">
                <p className="af-office-note">
                  नाम दर्ता निर्णय मिति: २०८२।०७।०५
                </p>
                <div className="af-two-col">
                  <div className="af-form-group">
                    <label>भत्ताको किसिम:</label>
                    <input
                      type="text"
                      name="allowanceType"
                      value={form.allowanceType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="af-form-group">
                    <label>परिचय पत्र नं.:</label>
                    <input
                      type="text"
                      name="parichayaNo"
                      value={form.parichayaNo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="af-two-col">
                  <div className="af-form-group">
                    <label>भत्ता सुरु मिति (आ.व.):</label>
                    <input
                      type="text"
                      name="allowanceStartDate"
                      value={form.allowanceStartDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="af-form-group">
                    <label>(पहिलो) चौमासिकदेखि:</label>
                    <input
                      type="text"
                      name="allowanceStartQuarter"
                      value={form.allowanceStartQuarter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Applicant details ── */}
            <ApplicantDetailsNp formData={form} handleChange={handleChange} />

            {/* ── Two footer buttons ── */}
            <div className="af-button-container">
              <button
                type="submit"
                className="af-btn af-btn-save"
                disabled={loading}
              >
                {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
              </button>
              <button
                type="button"
                className="af-btn af-btn-print"
                disabled={loading}
                onClick={() => handleSave(true)}
              >
                {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllowanceForm;
