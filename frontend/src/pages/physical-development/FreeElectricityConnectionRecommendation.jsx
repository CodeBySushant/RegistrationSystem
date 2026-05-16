// FreeElectricityConnectionRecommendation.jsx — merged (JSX + CSS, no external .css needed)
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INLINE STYLES  (replaces FreeElectricityConnectionRecommendation.css — unchanged)
   ───────────────────────────────────────────── */
const STYLES = `
/* --- Main Container --- */
.free-electricity-container {
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

/* --- Utility Classes --- */
.bold-text { font-weight: bold; }
.underline-text { text-decoration: underline; }
.red { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.red-mark { color: red; position: absolute; top: 0; left: 0; }
.bg-gray-text { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

/* --- Top Bar --- */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* --- Header Section --- */
.form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.header-text { display: flex; flex-direction: column; align-items: center; }
.municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ward-title { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.address-text, .province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

/* --- Meta Data --- */
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.meta-left p, .meta-right p { margin: 5px 0; }

.dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.small-input { width: 120px; }
.medium-input { width: 200px; }

/* --- Subject --- */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* --- Addressee --- */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row { margin-bottom: 8px; }

.line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  margin: 0 10px;
}

/* --- Body --- */
.form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.inline-box-input {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  display: inline-block;
  vertical-align: middle;
}
.inline-box-input.input-error { border-color: crimson; }

.inline-select {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
}

.tiny-box { width: 40px; text-align: center; }
.small-box { width: 100px; }
.medium-box { width: 160px; }
.long-box { width: 250px; }

/* --- Print field span — shown only in print mode --- */
.print-field {
  display: inline-block;
  vertical-align: middle;
  border-bottom: 1px solid #555;
  min-width: 80px;
  padding: 2px 4px;
  margin: 0 4px;
  font-family: inherit;
  font-size: 1rem;
  color: #000;
}
.print-field.dotted-field {
  border-bottom: 1px dotted #000;
  min-width: 120px;
}

/* --- Error --- */
.error { color: crimson; font-size: 0.82rem; margin-top: 2px; display: block; }

/* --- Signature Section --- */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block { width: 220px; text-align: center; position: relative; }
.signature-block .line-input { width: 100%; margin-bottom: 5px; }
.signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.full-width-input { width: 100%; }
.designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background-color: #ffffff; font-family: inherit; }

/* --- Applicant Details Box --- */
.applicant-details-box { border: 1px solid #ddd; padding: 20px; background-color: #ffffff; margin-top: 20px; border-radius: 4px; }
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.details-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
.detail-group { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
}

/* --- Footer --- */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
.save-print-btn:hover { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* --- Print Utilities --- */
.print-only { display: none; }

@media print {
  body * { visibility: hidden; }

  .free-electricity-container,
  .free-electricity-container * {
    visibility: visible;
  }

  .free-electricity-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: 100%;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .no-print { display: none !important; }
  .print-only { display: block !important; }

  /* Inputs/selects hidden on print — replaced by .print-field spans */
  .inline-box-input,
  .dotted-input,
  .line-input,
  .detail-input,
  .inline-select,
  .designation-select {
    display: none !important;
  }

  /* print-field spans are always visible and show actual data */
  .print-field {
    display: inline-block !important;
    visibility: visible !important;
    color: #000 !important;
    border-bottom: 1px solid #555;
  }

  /* Ensure text and structure render in color */
  .municipality-name,
  .ward-title,
  .address-text,
  .province-text {
    color: #e74c3c !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const FORM_KEY = "free-electricity-connection-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no: "",
  reference_no: "",
  date_bs: "",
  date_ad: todayIso(),
  sabik_local_body_name: "",
  sabik_local_body_type: "",
  sabik_ward_no: "",
  applicant_role_in_plot: "",
  applicant_name_body: "",
  kitta_no: "",
  new_kitta_no: "",
  neighbors_east: "",
  neighbors_west: "",
  neighbors_north: "",
  neighbors_south: "",
  applicant_child_name: "",
  signatory_name: "",
  signatory_designation: "वडा अध्यक्ष",
  // ApplicantDetailsNp fields
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
const FreeElectricityConnectionRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // FIX: printDataRef snapshot pattern — replaces window.print() + setTimeout reset
  // which blanked the form before print finished rendering
  const [readyToPrint, setReadyToPrint] = useState(false);
  const printDataRef = useRef(null);

  /* Inject styles once on mount */
  useEffect(() => {
    const id = "free-electricity-connection-recommendation-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /* Trigger print after snapshot DOM commit */
  useEffect(() => {
    if (!readyToPrint) return;
    const onAfterPrint = () => {
      setReadyToPrint(false);
      printDataRef.current = null;
      setForm({ ...initialForm, date_ad: todayIso() });
    };
    window.addEventListener("afterprint", onAfterPrint);
    window.print();
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [readyToPrint]);

  /* ── Handlers ── */

  // FIX: single unified handler used everywhere — functional updater prevents
  // stale state on rapid input; also clears the error for that field.
  // Old code had two handlers (handle/handleChange) used inconsistently:
  // handleChange used setForm({...form, ...}) which is stale-state-prone,
  // and handle() never cleared errors.
  const handle = (name) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // FIX: handleChange for ApplicantDetailsNp — uses functional updater,
  // reads name from e.target.name, clears errors.
  // Old handleApplicantChange(fields) was defined but never actually used
  // (ApplicantDetailsNp was already receiving formData/handleChange correctly).
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.sabik_ward_no.trim()) err.sabik_ward_no = "आवश्यक छ";
    if (!form.applicant_role_in_plot.trim()) err.applicant_role_in_plot = "आवश्यक छ";
    if (!form.applicant_name_body.trim()) err.applicant_name_body = "आवश्यक छ";
    if (!form.kitta_no.trim()) err.kitta_no = "आवश्यक छ";
    if (!form.new_kitta_no.trim()) err.new_kitta_no = "आवश्यक छ";
    if (!form.neighbors_east.trim()) err.neighbors_east = "आवश्यक छ";
    if (!form.neighbors_west.trim()) err.neighbors_west = "आवश्यक छ";
    if (!form.neighbors_north.trim()) err.neighbors_north = "आवश्यक छ";
    if (!form.neighbors_south.trim()) err.neighbors_south = "आवश्यक छ";
    if (!form.applicant_child_name.trim()) err.applicant_child_name = "आवश्यक छ";
    if (!form.applicant_name.trim()) err.applicant_name = "आवश्यक छ";
    return err;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        municipality: MUNICIPALITY.name,
        ward_no: user?.ward || null,
      };

      const res = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || "unknown";

      setMessage({
        type: "success",
        text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})`,
      });

      // FIX: freeze snapshot then trigger print — form resets only after afterprint fires
      printDataRef.current = { ...form };
      setReadyToPrint(true);
    } catch (error) {
      const info =
        error.response?.data?.message || error.message || "Failed to save";
      setMessage({ type: "error", text: `Error: ${info}` });
    } finally {
      setSubmitting(false);
    }
  };

  const wardDisplay = user?.ward || "—";

  return (
    <div className="free-electricity-container">
      {/* Top bar — hidden on print */}
      <div className="top-bar-title no-print">
        <span>निशुल्क विद्युत जडान सिफारिस</span>
        <span className="top-right-bread">
          {MUNICIPALITY.name} &gt; निशुल्क विद्युत जडान सिफारिस
        </span>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${wardDisplay} नं. वडा कार्यालय`}
            </h2>
            <p className="address-text">{MUNICIPALITY.city}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* --- Meta Data --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :&nbsp;
              {/* FIX: was using handleChange with name="letter_no" — unified to handle() */}
              <input
                type="text"
                className="dotted-input small-input"
                value={form.letter_no}
                onChange={handle("letter_no")}
                placeholder="पत्र संख्या"
              />
            </p>
            <p>
              चलानी नं. :&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.reference_no}
                onChange={handle("reference_no")}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति (बीएस) :&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.date_bs}
                onChange={handle("date_bs")}
                placeholder="२०८२-०८-०६"
              />
            </p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              निशुल्क विद्युत जडान सिफारिस।
            </span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span className="bold-text">श्री नेपाल विद्युत प्राधिकरण</span>
          </div>
          <div className="addressee-row">
            <span className="bold-text underline-text">
              {MUNICIPALITY.city}
            </span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा&nbsp;
            <span className="bg-gray-text">जिल्ला {MUNICIPALITY.name}</span>
            &nbsp;वडा नं. {wardDisplay} साविक&nbsp;
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.sabik_local_body_name}
              onChange={handle("sabik_local_body_name")}
              placeholder="ठाउँको नाम"
            />
            &nbsp;
            <select
              className="inline-select"
              value={form.sabik_local_body_type}
              onChange={handle("sabik_local_body_type")}
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            &nbsp;वडा नं.&nbsp;
            <input
              type="text"
              className={`inline-box-input tiny-box${errors.sabik_ward_no ? " input-error" : ""}`}
              value={form.sabik_ward_no}
              onChange={handle("sabik_ward_no")}
            />
            &nbsp;मा रहेका&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.applicant_role_in_plot ? " input-error" : ""}`}
              value={form.applicant_role_in_plot}
              onChange={handle("applicant_role_in_plot")}
              placeholder="भूमिका"
            />
            &nbsp;को निवेदन अनुसार&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.applicant_name_body ? " input-error" : ""}`}
              value={form.applicant_name_body}
              onChange={handle("applicant_name_body")}
              placeholder="नाम"
            />
            &nbsp;नाममा रहेको कि नं&nbsp;
            <input
              type="text"
              className={`inline-box-input small-box${errors.kitta_no ? " input-error" : ""}`}
              value={form.kitta_no}
              onChange={handle("kitta_no")}
            />
            &nbsp;जग्गामा नयाँ निर्माण भई सकेको र उक्त भवनमा मिटर जडान गर्न
            आवश्यक परेको उक्त कि.नं.&nbsp;
            <input
              type="text"
              className={`inline-box-input small-box${errors.new_kitta_no ? " input-error" : ""}`}
              value={form.new_kitta_no}
              onChange={handle("new_kitta_no")}
            />
            &nbsp;मा बनेको भवन देखी पूर्व तर्फ&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.neighbors_east ? " input-error" : ""}`}
              value={form.neighbors_east}
              onChange={handle("neighbors_east")}
              placeholder="पूर्व"
            />
            &nbsp;को जग्गा पश्चिममा&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.neighbors_west ? " input-error" : ""}`}
              value={form.neighbors_west}
              onChange={handle("neighbors_west")}
              placeholder="पश्चिम"
            />
            &nbsp;को जग्गा उत्तरमा&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.neighbors_north ? " input-error" : ""}`}
              value={form.neighbors_north}
              onChange={handle("neighbors_north")}
              placeholder="उत्तर"
            />
            &nbsp;को जग्गा र दक्षिण&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.neighbors_south ? " input-error" : ""}`}
              value={form.neighbors_south}
              onChange={handle("neighbors_south")}
              placeholder="दक्षिण"
            />
            &nbsp;को जग्गा यति चार किल्ला भित्र माथी उल्लेखित कित्तामा निजको
            छोरा&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.applicant_child_name ? " input-error" : ""}`}
              value={form.applicant_child_name}
              onChange={handle("applicant_child_name")}
              placeholder="छोराको नाम"
            />
            &nbsp;ले घर बनाई बसोवास गर्दै आएको निज जुद्ध विपन्न दलित परिवारको
            भएकोले निजलाई यस घरमा निशुल्क विद्युत मिटर उपलब्ध गराई जडानका लागी
            आवश्यक सहयोग गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              type="text"
              className="line-input full-width-input"
              value={form.signatory_name}
              onChange={handle("signatory_name")}
              placeholder="हस्ताक्षरकर्ताको नाम"
            />
            <select
              className="designation-select"
              value={form.signatory_designation}
              onChange={handle("signatory_designation")}
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

        {/* --- Applicant Details via ApplicantDetailsNp --- */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer no-print">
          <button
            type="submit"
            className="save-print-btn"
            disabled={submitting}
          >
            {submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div
            className="no-print"
            style={{
              textAlign: "center",
              marginTop: 12,
              color: message.type === "error" ? "crimson" : "green",
              fontWeight: "bold",
            }}
          >
            {message.text}
          </div>
        )}
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default FreeElectricityConnectionRecommendation;