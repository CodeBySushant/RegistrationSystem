// HouseRoadVerification.jsx
import React, { useState } from "react";
import "./HouseRoadVerification.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyRow = () => ({
  ward_no: "",
  seat_no: "",
  plot_no: "",
  area: "",
  road_name: "",
  has_house: "घरभएको", // or 'घरनभएको'
  road_type: "",
  remarks: "",
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  addressee_office: "मालपोत कार्यालय",
  addressee_location: "",
  municipality: "नागार्जुन",
  ward_no: "1",
  owner_prefix: "श्री",
  owner_name: "",
  notes: "",
};

export default function HouseRoadVerification() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/house-road-verification", form);
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
      const res = await axios.post("/api/forms/house-road-verification", form);
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
    <div className="house-road-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          घरबाटो प्रमाणित ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; घरबाटो प्रमाणित
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
            <span>श्री {form.addressee_office}</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_location"
              value={form.addressee_location}
              onChange={handleChange}
              type="text"
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय: <span className="underline-text">घर बाटो प्रमाणित।</span>
          </p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा जिल्ला काठमाडौँ{" "}
            <span className="bg-gray-text">{form.municipality}</span> वडा नं.{" "}
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
            />{" "}
            (साविकको ठेगाना{" "}
            <select
              className="inline-select medium-select"
              name="previous_type"
              onChange={(e) =>
                setForm((p) => ({ ...p, previous_type: e.target.value }))
              }
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            , वडा नं.{" "}
            <input
              name="prev_ward_no"
              onChange={(e) =>
                setForm((p) => ({ ...p, prev_ward_no: e.target.value }))
              }
              className="inline-box-input tiny-box"
            />
            ) बस्ने{" "}
            <select
              name="owner_prefix"
              value={form.owner_prefix}
              onChange={handleChange}
              className="inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>{" "}
            <input
              name="owner_name"
              value={form.owner_name}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            को नाममा ... उक्त जग्गाको घरबाटो तलको तपशिल बमोजिम भएको व्यहोरा
            प्रमाणित गरिन्छ।
          </p>
        </div>

        {/* Table of roads */}
        <div className="table-section">
          <h4 className="table-title">घर बाटो विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>क्र.स.</th>
                  <th style={{ width: "8%" }}>वडा नं.</th>
                  <th style={{ width: "8%" }}>सिट नं.</th>
                  <th style={{ width: "8%" }}>कित्ता नं.</th>
                  <th style={{ width: "20%" }}>क्षेत्रफल</th>
                  <th style={{ width: "15%" }}>बाटोको नाम</th>
                  <th style={{ width: "10%" }}>घरभएको/नभएको</th>
                  <th style={{ width: "10%" }}>बाटोको प्रकार</th>
                  <th style={{ width: "10%" }}>कैफियत</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.ward_no}
                        onChange={(e) => setRow(i, "ward_no", e.target.value)}
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={r.seat_no}
                        onChange={(e) => setRow(i, "seat_no", e.target.value)}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.plot_no}
                        onChange={(e) => setRow(i, "plot_no", e.target.value)}
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={r.area}
                        onChange={(e) => setRow(i, "area", e.target.value)}
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={r.road_name}
                        onChange={(e) => setRow(i, "road_name", e.target.value)}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <select
                        value={r.has_house}
                        onChange={(e) => setRow(i, "has_house", e.target.value)}
                        className="table-select"
                      >
                        <option>घरभएको</option>
                        <option>घरनभएको</option>
                      </select>
                    </td>
                    <td>
                      <input
                        value={r.road_type}
                        onChange={(e) => setRow(i, "road_type", e.target.value)}
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={r.remarks}
                        onChange={(e) => setRow(i, "remarks", e.target.value)}
                        className="table-input"
                      />
                    </td>
                    <td className="action-cell">
                      {rows.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeRow(i)}
                          className="add-btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={addRow}
                          className="add-btn"
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow} className="add-btn">
              कतार थप्नुहोस्
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="note-section">
          <label>नोट</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="note-textarea"
            rows="2"
          />
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signer_name"
              value={form.signer_name || ""}
              onChange={handleChange}
              className="line-input full-width-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation || ""}
              onChange={handleChange}
              className="designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
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
