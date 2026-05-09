// FreeElectricityConnectionRecommendation.jsx
import React, { useState } from "react";
import "./FreeElectricityConnectionRecommendation.css";
import axiosInstance from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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

const FreeElectricityConnectionRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // handle() helper — returns an onChange handler for the given field name
  const handle = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplicantChange = (fields) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const validate = () => {
    const err = {};
    if (!form.sabik_ward_no.trim()) err.sabik_ward_no = "आवश्यक छ";
    if (!form.applicant_role_in_plot.trim())
      err.applicant_role_in_plot = "आवश्यक छ";
    if (!form.applicant_name_body.trim()) err.applicant_name_body = "आवश्यक छ";
    if (!form.kitta_no.trim()) err.kitta_no = "आवश्यक छ";
    if (!form.new_kitta_no.trim()) err.new_kitta_no = "आवश्यक छ";
    if (!form.neighbors_east.trim()) err.neighbors_east = "आवश्यक छ";
    if (!form.neighbors_west.trim()) err.neighbors_west = "आवश्यक छ";
    if (!form.neighbors_north.trim()) err.neighbors_north = "आवश्यक छ";
    if (!form.neighbors_south.trim()) err.neighbors_south = "आवश्यक छ";
    if (!form.applicant_child_name.trim())
      err.applicant_child_name = "आवश्यक छ";
    if (!form.applicant_name.trim()) err.applicant_name = "आवश्यक छ";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    console.log("Validation errors:", err);
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

      // ✅ DIRECT PRINT (like working form)
      window.print();

      setTimeout(() => {
        setForm({ ...initialForm, date_ad: todayIso() });
      }, 500);
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
              <input
                type="text"
                className="dotted-input small-input"
                value={form.letter_no}
                name="letter_no"
                onChange={handleChange}
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
