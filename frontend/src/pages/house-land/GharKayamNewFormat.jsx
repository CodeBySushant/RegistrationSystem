// GharKayamNewFormat.jsx
import React, { useState } from "react";
import "./GharKayamNewFormat.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  malpot_office_place: "नागार्जुन, काठमाडौँ",
  district: "गुल्मी ग्वादा",
  ward_no: "1",
  owner_name: "",
  registration_date: "२०८२-०८-०६",
  certificate_taken_from: "",
  plot_gb_np: "",
  plot_ward_no: "",
  plot_seat_no: "",
  plot_plot_no: "",
  plot_area: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: "",
};

export default function GharKayamNewFormat() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/ghar-kayam-new-format", form);
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
      const res = await axios.post("/api/forms/ghar-kayam-new-format", form);
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
    <div className="ghar-kayam-new-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          घर कायम नयाँ फर्म्याट ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; घर कायम नयाँ फर्म्याट
          </span>
        </div>

        {/* Header */}
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

        {/* Meta */}
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

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री मालपोत कार्यालय</span>
          </div>
          <div className="addressee-row">
            <input
              name="malpot_office_place"
              value={form.malpot_office_place}
              onChange={handleChange}
              type="text"
              className="line-input medium-input"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">घर कायम सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा जिल्ला{" "}
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              type="text"
              className="inline-box-input medium-box"
            />{" "}
            वडा नं.{" "}
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              type="text"
              className="inline-box-input tiny-box"
            />{" "}
            बस्ने{" "}
            <input
              name="owner_name"
              value={form.owner_name}
              onChange={handleChange}
              type="text"
              className="inline-box-input long-box"
              required
            />{" "}
            <span className="red">*</span> निवेदन अनुसार निजको नाममा दर्ता
            प्रमाणित रहेको तपसिलमा उल्लेखित कित्ता जग्गामा बनेको घरको मिति{" "}
            <span className="bg-gray-text">{form.registration_date}</span> मा
            निर्माण इजाजत लिई मिति{" "}
            <input
              name="registration_date"
              value={form.registration_date}
              onChange={handleChange}
              type="text"
              className="inline-box-input medium-box"
            />{" "}
            मा{" "}
            <input
              name="certificate_taken_from"
              value={form.certificate_taken_from}
              onChange={handleChange}
              type="text"
              className="inline-box-input long-box"
              required
            />{" "}
            <span className="red">*</span> प्रमाण पत्र लिई सकेकोले...
          </p>
        </div>

        {/* Tapashil table (single-row editable) */}
        <div className="table-section">
          <h4 className="table-title underline-text bold-text">तपसिल:</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>गा.बि.स./नगरपालिका</th>
                  <th style={{ width: "15%" }}>वडा नं</th>
                  <th style={{ width: "20%" }}>सिट नं</th>
                  <th style={{ width: "20%" }}>कित्ता नं</th>
                  <th style={{ width: "20%" }}>क्षेत्रफल</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <input
                      name="plot_gb_np"
                      value={form.plot_gb_np}
                      onChange={handleChange}
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="plot_ward_no"
                      value={form.plot_ward_no}
                      onChange={handleChange}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      name="plot_seat_no"
                      value={form.plot_seat_no}
                      onChange={handleChange}
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="plot_plot_no"
                      value={form.plot_plot_no}
                      onChange={handleChange}
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="plot_area"
                      value={form.plot_area}
                      onChange={handleChange}
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              type="text"
              className="line-input full-width-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="designation-select"
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

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}
