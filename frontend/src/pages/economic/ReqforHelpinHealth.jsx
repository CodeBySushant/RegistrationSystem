import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────
   STYLES — scoped under .health-aid-container
───────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .health-aid-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* --- Top Bar --- */
  .health-aid-container .top-bar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .health-aid-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .health-aid-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    font-size: 1.1rem;
  }

  .health-aid-container .meta-left p,
  .health-aid-container .meta-right p { margin: 5px 0; }

  .health-aid-container .bold-text { font-weight: bold; }

  /* Meta inputs — was transparent; now white bg + border */
  .health-aid-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .health-aid-container .small-input { width: 120px; }
  .health-aid-container .date-input  { width: 170px; }

  /* --- Subject --- */
  .health-aid-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .health-aid-container .underline-text { text-decoration: underline; }

  /* --- Form Body --- */
  .health-aid-container .form-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
  }

  .health-aid-container .addressee-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Addressee inputs — was transparent; now white bg + border */
  .health-aid-container .line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    margin: 0 6px;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .health-aid-container .large-input { width: 300px; }

  /* Inline inputs inside paragraph */
  .health-aid-container .inline-box-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .tiny-box   { width: 60px;  text-align: center; }
  .health-aid-container .small-box  { width: 80px; }
  .health-aid-container .medium-box { width: 160px; }

  /* --- Signature Section --- */
  .health-aid-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .health-aid-container .signature-block {
    text-align: center;
    width: 250px;
  }

  .health-aid-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    width: 100%;
  }

  /* Signer name — was transparent; now white bg + border + margin */
  .health-aid-container .sig-name-input {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 6px 10px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .health-aid-container .designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  /* --- Red * wrapper --- */
  .health-aid-container .ha-req-wrap {
    position: relative;
    display: inline-block;
  }
  .health-aid-container .ha-req-wrap.ha-req-block {
    display: block;
    width: 100%;
  }
  .health-aid-container .ha-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
    z-index: 1;
  }
  .health-aid-container .ha-req-wrap input { padding-left: 18px; }

  /* --- Footer --- */
  .health-aid-container .form-footer { text-align: center; margin-top: 40px; }

  .health-aid-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .health-aid-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .health-aid-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .health-aid-container { padding: 20px 16px; }

    .health-aid-container .form-body {
      font-size: 0.95rem;
      line-height: 2.0;
    }

    .health-aid-container .inline-box-input,
    .health-aid-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .health-aid-container .tiny-box,
    .health-aid-container .small-box,
    .health-aid-container .medium-box,
    .health-aid-container .large-input,
    .health-aid-container .small-input,
    .health-aid-container .date-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .health-aid-container .ha-req-wrap {
      display: block;
      width: 100%;
    }

    .health-aid-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .health-aid-container .signature-section { justify-content: center; }
    .health-aid-container .meta-data-row { flex-direction: column; }
    .health-aid-container .form-footer { display: flex; flex-direction: column; gap: 10px; }
    .health-aid-container .form-footer button { width: 100%; margin: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
   - patra_sankhya, issue_date, ne_sa added (were hardcoded)
   - body_municipality_name, body_ward_no added (were hardcoded MUNICIPALITY refs)
───────────────────────────────────────────── */
const initialState = {
  // Meta
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  ne_sa: "",

  // Addressee
  addressee_name: "",
  addressee_address: "",

  // Body
  body_municipality_name: MUNICIPALITY?.name || "",
  body_ward_no: MUNICIPALITY?.wardNumber || "",
  ward_old: "",
  ward_new: "",
  title: "श्री",
  person_name: "",
  annual_income: "",
  disease: "",
  hospital: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // ApplicantDetailsNp
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ReqforHelpinHealth = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee_name?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.person_name?.trim()) {
      alert("व्यक्तिको नाम आवश्यक छ");
      return;
    }
    if (!form.disease?.trim()) {
      alert("रोगको नाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/health-aid", form);
      if (res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + res.data.id);
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

  /* ── Clean print — isolated window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>स्वास्थ्य उपचारमा सहयोगको लागि सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .addressee { margin-bottom: 16px; font-size: 11pt; line-height: 2; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 24px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="meta">
          <div>
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="subject">विषय: सिफारिस सम्बन्धमा।</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_name || ""}</span><br/>
          <span class="value">${form.addressee_address || ""}</span> ।
        </div>

        <div class="body-text">
          उपरोक्त विषयमा <span class="value">${form.body_municipality_name || ""}</span>
          वडा नं. <span class="value">${form.body_ward_no || ""}</span>
          (साविक <span class="value">${form.ward_old || ""}</span>,
          वडा नं. <span class="value">${form.ward_new || ""}</span>)
          बस्ने <span class="value">${form.title || ""}</span>
          <span class="value">${form.person_name || ""}</span>
          को वार्षिक आम्दानी रु. <span class="value">${form.annual_income || ""}</span>
          । भन्दा कम भएको र निज
          <span class="value">${form.disease || ""}</span>
          बाट पीडित भई <span class="value">${form.hospital || ""}</span>
          अस्पतालमा उपचार गराउँदै आइरहेको र हाल थप उपचारको लागि लाग्ने लागत
          जुटाउन मेरो आर्थिक अवस्था कमजोर भएको कारणले निःशुल्क उपचार गर्न
          सिफारिस पाऊँ, भनी निवेदन दिनु भएको हुँदा निज निवेदक विपन्न परिवार
          अन्तर्गत पर्ने भएकोले त्यहाँको नियमानुसार आर्थिक सहायता उपलब्ध गराई
          दिनुहुन सिफारिस गरिन्छ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signer_name || ""}</div>
            <div>${form.signer_designation || ""}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicant_name || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicant_address || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicant_citizenship_no || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicant_phone || ""}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* ─────────────────────────────────────────────
     Render — root now <form> so onSubmit fires
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="health-aid-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          स्वास्थ्य उपचारमा सहयोगको लागि सिफारिस
          <span className="top-right-bread">
            आर्थिक &gt; स्वास्थ्य उपचारमा सहयोगको लागि सिफारिस
          </span>
        </div>

        {/* --- Header (shared component replaces inline block) --- */}
        <MunicipalityHeader />

        {/* --- Meta — all hardcoded values now editable --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="ha-req-wrap">
                <span className="ha-req-star">*</span>
                <input
                  name="patra_sankhya"
                  type="text"
                  className="dotted-input small-input"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="ha-req-wrap">
                <span className="ha-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="dotted-input small-input"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <span className="ha-req-wrap">
                <span className="ha-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="dotted-input date-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="ha-req-wrap">
                <span className="ha-req-star">*</span>
                <input
                  name="ne_sa"
                  type="text"
                  className="dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* --- Subject (hardcoded) --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Form Body --- */}
        <div className="form-body">
          {/* Addressee */}
          <div className="addressee-row">
            <span>श्री</span>
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="addressee_name"
                type="text"
                className="line-input large-input"
                value={form.addressee_name}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="addressee-row">
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="addressee_address"
                type="text"
                className="line-input large-input"
                value={form.addressee_address}
                onChange={handleChange}
              />
            </span>
            <span>।</span>
          </div>

          {/* Body paragraph — every input wrapped, hardcoded municipality refs editable */}
          <p className="body-paragraph">
            उपरोक्त विषयमा{" "}
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="body_municipality_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.body_municipality_name}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं.{" "}
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="body_ward_no"
                type="text"
                className="inline-box-input tiny-box"
                value={form.body_ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            (साविक{" "}
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="ward_old"
                type="text"
                className="inline-box-input medium-box"
                value={form.ward_old}
                onChange={handleChange}
              />
            </span>{" "}
            , वडा नं.{" "}
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="ward_new"
                type="text"
                className="inline-box-input small-box"
                value={form.ward_new}
                onChange={handleChange}
              />
            </span>
            ) बस्ने{" "}
            <select
              name="title"
              className="inline-select"
              value={form.title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="person_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.person_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            को वार्षिक आम्दानी रु.
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="annual_income"
                type="text"
                className="inline-box-input medium-box"
                value={form.annual_income}
                onChange={handleChange}
              />
            </span>
            । भन्दा कम भएको र निज
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="disease"
                type="text"
                className="inline-box-input medium-box"
                value={form.disease}
                onChange={handleChange}
                required
              />
            </span>{" "}
            बाट पीडित भई
            <span className="ha-req-wrap">
              <span className="ha-req-star">*</span>
              <input
                name="hospital"
                type="text"
                className="inline-box-input medium-box"
                value={form.hospital}
                onChange={handleChange}
              />
            </span>{" "}
            अस्पतालमा उपचार गराउँदै आइरहेको र हाल थप उपचारको लागि लाग्ने
            लागत जुटाउन मेरो आर्थिक अवस्था कमजोर भएको कारणले निःशुल्क उपचार
            गर्न सिफारिस पाऊँ, भनी निवेदन दिनु भएको हुँदा निज निवेदक विपन्न
            परिवार अन्तर्गत पर्ने भएकोले त्यहाँको नियमानुसार आर्थिक सहायता
            उपलब्ध गराई दिनुहुन सिफारिस गरिन्छ।
          </p>
        </div>

        {/* --- Signature Section — signer_name now white bg + border + margin --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="ha-req-wrap ha-req-block">
              <span className="ha-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="sig-name-input"
                required
                value={form.signer_name}
                onChange={handleChange}
              />
            </span>
            <select
              name="signer_designation"
              className="designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer buttons — Save (submit) + Save & Print (button) --- */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default ReqforHelpinHealth;