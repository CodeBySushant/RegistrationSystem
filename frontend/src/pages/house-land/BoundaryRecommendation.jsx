// BoundaryRecommendation.jsx
import React, { useState } from "react";
import "./BoundaryRecommendation.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  municipality: "नागार्जुन",
  ward_no: "1",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  old_district: "काठमाडौँ",
  old_municipality: "नागार्जुन",
  old_ward_no: "1",
  plot_number: "",
  area: "",
  east_boundary: "",
  west_boundary: "",
  north_boundary: "",
  south_boundary: "",
  signer_name: "",
  signer_designation: "",
  notes: ""
};

const BoundaryRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/boundary-recommendation", form);
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
      const res = await axios.post("/api/forms/boundary-recommendation", form);
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
    <div className="boundary-recommendation-container">
      <form onSubmit={handleSubmit}>
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          चौहद्दी सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; चौहद्दी सिफारिस</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">{form.letter_no}</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                type="text"
                className="dotted-input small-input"
                placeholder="चलानी नं."
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">{form.date_nep}</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय: <span className="underline-text">चौहद्दी सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Salutation --- */}
        <div className="salutation-section">
          <p className="bold-text">श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा जिल्ला काठमाडौँ{" "}
            <input
              name="old_district"
              className="inline-box-input medium-box"
              value={form.old_district}
              onChange={handleChange}
            />{" "}
            <input
              name="old_municipality"
              className="inline-box-input medium-box"
              value={form.old_municipality}
              onChange={handleChange}
            />{" "}
            वडा नं. <span className="bg-gray-text">{form.ward_no}</span> बस्ने{" "}
            <input
              name="applicant_name"
              className="inline-box-input long-box"
              value={form.applicant_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="red">*</span> नाममा नम्बरी दर्ता कायम रहेको साविक जिल्ला काठमाडौँ{" "}
            <select
              name="municipality"
              className="inline-select"
              value={form.municipality}
              onChange={handleChange}
            >
              <option value="">-- छान्नुहोस् --</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>{" "}
            वडा नं.{" "}
            <input
              name="old_ward_no"
              className="inline-box-input tiny-box"
              value={form.old_ward_no}
              onChange={handleChange}
            />{" "}
            <span className="red">*</span> हाल जिल्ला{" "}
            <input
              name="municipality"
              className="inline-box-input medium-box"
              value={form.municipality}
              onChange={handleChange}
            />{" "}
            <span className="red">*</span>{" "}
            <input
              name="old_municipality"
              className="inline-box-input medium-box"
              value={form.old_municipality}
              onChange={handleChange}
            />{" "}
            <span className="red">*</span> , वडा नं.{" "}
            <input
              name="ward_no"
              className="inline-box-input tiny-box"
              value={form.ward_no}
              onChange={handleChange}
            />{" "}
            <span className="red">*</span> को कित्ता नम्बर{" "}
            <input
              name="plot_number"
              className="inline-box-input small-box"
              value={form.plot_number}
              onChange={handleChange}
              required
            />{" "}
            <span className="red">*</span> को क्षेत्रफल{" "}
            <input
              name="area"
              className="inline-box-input small-box"
              value={form.area}
              onChange={handleChange}
            />{" "}
            <span className="red">*</span> जमिनको निजको निवेदन अनुसार हालसम्मको चौहद्दी तपशिल अनुसार रहेको व्यहोरा अनुरोध छ।
          </p>
        </div>

        {/* --- Four Boundaries (Chauhaddi) --- */}
        <div className="chauhaddi-section">
          <div className="chauhaddi-item">
            <label>पूर्व:</label>
            <span className="red">*</span>
            <input
              name="east_boundary"
              type="text"
              className="line-input long-input"
              value={form.east_boundary}
              onChange={handleChange}
            />
          </div>
          <div className="chauhaddi-item">
            <label>पश्चिम:</label>
            <span className="red">*</span>
            <input
              name="west_boundary"
              type="text"
              className="line-input long-input"
              value={form.west_boundary}
              onChange={handleChange}
            />
          </div>
          <div className="chauhaddi-item">
            <label>उत्तर:</label>
            <span className="red">*</span>
            <input
              name="north_boundary"
              type="text"
              className="line-input long-input"
              value={form.north_boundary}
              onChange={handleChange}
            />
          </div>
          <div className="chauhaddi-item">
            <label>दक्षिण:</label>
            <span className="red">*</span>
            <input
              name="south_boundary"
              type="text"
              className="line-input long-input"
              value={form.south_boundary}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signer_name"
              type="text"
              className="line-input full-width-input"
              value={form.signer_name}
              onChange={handleChange}
              required
            />
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

        {/* optional notes */}
        <div style={{ marginTop: 12 }}>
          <label>Notes / टिप्पणी</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%" }}
            placeholder="थप टिप्पणी..."
          />
        </div>

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
    </div>
  );
};

export default BoundaryRecommendation;
