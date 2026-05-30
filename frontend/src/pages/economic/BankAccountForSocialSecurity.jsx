import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────
   STYLES — scoped under .social-security-container
───────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .social-security-container {
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

  /* --- Top Bar --- */
  .social-security-container .top-bar-title {
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

  .social-security-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .social-security-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .social-security-container .meta-left p,
  .social-security-container .meta-right p { margin: 5px 0; }

  .social-security-container .bold-text { font-weight: bold; }

  /* Meta inputs — was transparent; now white bg + border */
  .social-security-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .social-security-container .small-input  { width: 120px; }
  .social-security-container .date-input   { width: 170px; }

  /* --- Subject --- */
  .social-security-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .social-security-container .underline-text { text-decoration: underline; }

  /* --- Addressee Section --- */
  .social-security-container .addressee-section {
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .social-security-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Addressee inputs — was transparent; now white bg + border */
  .social-security-container .line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    margin: 0 6px;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .social-security-container .medium-input { width: 250px; }

  /* --- Body Paragraph & Inputs --- */
  .social-security-container .form-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }

  .social-security-container .inline-box-input {
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

  .social-security-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .social-security-container .tiny-box   { width: 60px; text-align: center; }
  .social-security-container .medium-box { width: 160px; }

  /* --- Signature Section --- */
  .social-security-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .social-security-container .signature-block {
    width: 240px;
    text-align: center;
  }

  .social-security-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    width: 100%;
  }

  /* Signer name — was transparent; now white bg + border + margin */
  .social-security-container .sig-name-input {
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

  .social-security-container .designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  /* --- Red * wrapper — inline by default, block modifier for full-width --- */
  .social-security-container .bas-req-wrap {
    position: relative;
    display: inline-block;
  }
  .social-security-container .bas-req-wrap.bas-req-block {
    display: block;
    width: 100%;
  }
  .social-security-container .bas-req-star {
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
  .social-security-container .bas-req-wrap input {
    padding-left: 18px;
  }

  /* --- Footer --- */
  .social-security-container .form-footer { text-align: center; margin-top: 40px; }

  .social-security-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .social-security-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .social-security-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .social-security-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .social-security-container { padding: 20px 16px; }

    .social-security-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .social-security-container .inline-box-input,
    .social-security-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .social-security-container .tiny-box,
    .social-security-container .medium-box,
    .social-security-container .medium-input,
    .social-security-container .small-input,
    .social-security-container .date-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .social-security-container .bas-req-wrap {
      display: block;
      width: 100%;
    }

    .social-security-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .social-security-container .signature-section { justify-content: center; }
    .social-security-container .meta-data-row { flex-direction: column; }
    .social-security-container .form-footer { display: flex; flex-direction: column; gap: 10px; }
    .social-security-container .form-footer button { width: 100%; margin: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
   - patra_sankhya, issue_date, ne_sa added (were hardcoded)
   - body_municipality_name, body_ward_no added (were hardcoded from MUNICIPALITY config)
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
  old_place: "",
  old_place_type: "",
  old_ward_no: "",
  body_municipality_name: MUNICIPALITY?.name || "",
  body_ward_no: MUNICIPALITY?.wardNumber || "",
  person_name: "",
  relation: "",
  relative_name: "",
  allowance_type: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const BankAccountForSocialSecurity = () => {
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
    if (!form.relative_name?.trim()) {
      alert("नातेदारको नाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/forms/bank-account-social-security",
        form,
      );
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

  /* ── Clean print — isolated window, no surrounding UI ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    // Map old_place_type code to label for print
    const placeTypeLabel =
      form.old_place_type === "vdc"
        ? "गा.वि.स."
        : form.old_place_type === "mun"
          ? "नगरपालिका"
          : "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सामाजिक सुरक्षाको बैंक खाता खोलिदिने</title>
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

        <div class="subject">विषय: सामाजिक सुरक्षाको बैंक खाता खोलिदिने सिफारिस।</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_name || ""}</span><br/>
          <span class="value">${form.addressee_address || ""}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत बिषयमा साविक
          <span class="value">${form.old_place || ""}</span>
          <span class="value">${placeTypeLabel}</span>
          वडा नं <span class="value">${form.old_ward_no || ""}</span>
          भई हाल <span class="value">${form.body_municipality_name || ""}</span>
          वडा नं <span class="value">${form.body_ward_no || ""}</span>
          बस्ने <span class="value">${form.person_name || ""}</span> को
          <span class="value">${form.relation || ""}</span>
          <span class="value">${form.relative_name || ""}</span>
          ले नेपाल सरकारबाट प्राप्त हुने सामाजिक सुरक्षा
          <span class="value">${form.allowance_type || ""}</span>
          भत्ता बैंक बाट पाउनका लागी ताहाँको बैंकमा बैंक खाता खोल्नु पर्ने भएकाले
          निजलाई बैंक खाता खोली दिनु हुन सिफारीशका साथ अनुरोध गरिन्छ ।
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
        className="social-security-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          सामाजिक सुरक्षाको बैंक खाता खोलिदिने
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षाको बैंक खाता खोलिदिने
          </span>
        </div>

        {/* --- Header (shared component replaces inline block) --- */}
        <MunicipalityHeader />

        {/* --- Meta — all hardcoded values now editable --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="bas-req-wrap">
                <span className="bas-req-star">*</span>
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
              <span className="bas-req-wrap">
                <span className="bas-req-star">*</span>
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
              <span className="bas-req-wrap">
                <span className="bas-req-star">*</span>
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
              <span className="bas-req-wrap">
                <span className="bas-req-star">*</span>
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
            <span className="underline-text">
              सामाजिक सुरक्षाको बैंक खाता खोलिदिने सिफारिस।
            </span>
          </p>
        </div>

        {/* --- Addressee --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="addressee_name"
                type="text"
                className="line-input medium-input"
                value={form.addressee_name}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="addressee-row">
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="addressee_address"
                type="text"
                className="line-input medium-input"
                value={form.addressee_address}
                onChange={handleChange}
                required
              />
            </span>
            <span>।</span>
          </div>
        </div>

        {/* --- Main Body — previously hardcoded MUNICIPALITY values now editable --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा साविक{" "}
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="old_place"
                type="text"
                className="inline-box-input medium-box"
                placeholder="साविक VDC/नगरपालिका"
                value={form.old_place}
                onChange={handleChange}
              />
            </span>
            <select
              name="old_place_type"
              className="inline-select"
              value={form.old_place_type}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="vdc">गा.वि.स.</option>
              <option value="mun">नगरपालिका</option>
            </select>
            वडा नं{" "}
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="old_ward_no"
                type="text"
                className="inline-box-input tiny-box"
                value={form.old_ward_no}
                onChange={handleChange}
                required
              />
            </span>{" "}
            भई हाल{" "}
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="body_municipality_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.body_municipality_name}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं{" "}
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="body_ward_no"
                type="text"
                className="inline-box-input tiny-box"
                value={form.body_ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            बस्ने{" "}
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="person_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.person_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            को
            <select
              name="relation"
              className="inline-select"
              value={form.relation}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="श्रीमान">श्रीमान</option>
              <option value="श्रीमती">श्रीमती</option>
              <option value="बुबा">बुबा</option>
              <option value="आमा">आमा</option>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <span className="bas-req-wrap">
              <span className="bas-req-star">*</span>
              <input
                name="relative_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.relative_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ले नेपाल सरकारबाट प्राप्त हुने सामाजिक सुरक्षा
            <select
              name="allowance_type"
              className="inline-select"
              value={form.allowance_type}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="ज्येष्ठ नागरिक">ज्येष्ठ नागरिक</option>
              <option value="एकल महिला">एकल महिला</option>
              <option value="अपाङ्गता">अपाङ्गता</option>
              <option value="बाल पोषण">बाल पोषण</option>
            </select>
            भत्ता बैंक बाट पाउनका लागी ताहाँको बैंकमा बैंक खाता खोल्नु पर्ने
            भएकाले निजलाई बैंक खाता खोली दिनु हुन सिफारीशका साथ अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* --- Signature Section — signer_name now white bg + border + margin --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="bas-req-wrap bas-req-block">
              <span className="bas-req-star">*</span>
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
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
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

export default BankAccountForSocialSecurity;
