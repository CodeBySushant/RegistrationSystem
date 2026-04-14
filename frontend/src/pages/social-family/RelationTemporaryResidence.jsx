import React, { useState } from "react";
import "./RelationTemporaryResidence.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* Safe API base resolver (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_API_BASE
    ) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) {
    /* ignore */
  }

  try {
    // avoid direct import.meta reference that can throw; evaluate safely
    const meta = Function("return import.meta")();
    if (meta && meta.env && meta.env.VITE_API_BASE)
      return meta.env.VITE_API_BASE;
  } catch (e) {
    /* ignore */
  }

  if (typeof window !== "undefined" && window.__API_BASE)
    return window.__API_BASE;
  return "";
};

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/relation-temporary-residence`;

const emptyFamilyRow = () => ({ name: "", relation: "आफै", remarks: "" });
const emptyLocationRow = () => ({ tol: "", road_name: "", house_no: "" });

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const RelationTemporaryResidence = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/relation-temporary-residence", form);
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
      const res = await axios.post("/api/forms/relation-temporary-residence", form);
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
    <form className="relation-residence-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        ज्येष्ठ नागरिक सिफारिस ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; ज्येष्ठ नागरिक सिफारिस
        </span>
      </div>

      {/* Header */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* Meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या :{" "}
            <span className="bold-text">
              <input
                value={form.reference_no}
                onChange={(e) => setField("reference_no", e.target.value)}
                className="line-input tiny-input"
              />
            </span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              value={form.chalani_no}
              onChange={(e) => setField("chalani_no", e.target.value)}
              type="text"
              className="dotted-input small-input"
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :{" "}
            <input
              value={form.date_bs}
              onChange={(e) => setField("date_bs", e.target.value)}
              className="line-input tiny-input"
            />
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            अस्थायी बसोबास प्रमाणित सम्बन्धमा ।
          </span>
        </p>
      </div>

      {/* Salutation */}
      <div className="salutation-section">
        <p>श्री जो जस संग सम्बन्ध राख्दछ । ,</p>
      </div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा जिल्ला{" "}
          <span className="bold-text">{form.permanent_district}</span> साविक
          <input
            value={form.permanent_prev_unit}
            onChange={(e) => setField("permanent_prev_unit", e.target.value)}
            className="inline-box-input medium-box"
          />
          <select
            value={form.permanent_prev_unit_type}
            onChange={(e) =>
              setField("permanent_prev_unit_type", e.target.value)
            }
            className="inline-select"
          >
            <option value="">--</option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          वडा नं. <span className="bold-text">{form.permanent_ward_no}</span>{" "}
          स्थायी घर भई हाल{" "}
          <span className="bg-gray-text">{form.current_municipality}</span> वडा
          नं. <span className="bg-gray-text">{form.current_ward_no}</span> बस्ने
          <input
            value={form.person_name}
            onChange={(e) => setField("person_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ले यस कार्यालयमा पेश गर्नुभएको निवेदनका
          आधारमा निज
          <input
            value={form.person_family_head}
            onChange={(e) => setField("person_family_head", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> आफ्नो परिवार सहित जिल्ला
          <input
            value={form.family_origin_district}
            onChange={(e) => setField("family_origin_district", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          <input
            value={form.family_origin_unit}
            onChange={(e) => setField("family_origin_unit", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> वडा नं.
          <input
            value={form.family_origin_ward_no}
            onChange={(e) => setField("family_origin_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          <span className="red">*</span> मा मिति
          <input
            value={form.residence_since_bs}
            onChange={(e) => setField("residence_since_bs", e.target.value)}
            className="inline-box-input medium-box"
            defaultValue="२०८२-०८-०६"
          />{" "}
          साल देखि बमोजिमका परिवार सहित अस्थायी बसोबास गर्दै आएको व्यहोरा
          प्रमाणित गरिन्छ।
        </p>
      </div>

      {/* Table 1: family details */}
      <div className="table-section">
        <h4 className="table-title center-text bold-text">तपसिल</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
                <th style={{ width: "35%" }}>नामथर</th>
                <th style={{ width: "20%" }}>नाता</th>
                <th style={{ width: "35%" }}>कैफियत</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {familyDetails.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={r.name}
                      onChange={(e) =>
                        onFamilyChange(i, "name", e.target.value)
                      }
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <select
                      value={r.relation}
                      onChange={(e) =>
                        onFamilyChange(i, "relation", e.target.value)
                      }
                      className="table-select"
                    >
                      <option>आफै</option>
                      <option>पति</option>
                      <option>पत्नी</option>
                      <option>छोरा</option>
                      <option>छोरी</option>
                    </select>
                  </td>
                  <td>
                    <input
                      value={r.remarks}
                      onChange={(e) =>
                        onFamilyChange(i, "remarks", e.target.value)
                      }
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => addFamilyRow()}
                    >
                      +
                    </button>
                    {familyDetails.length > 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => removeFamilyRow(i)}
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: residence locations */}
      <div className="table-section">
        <h4 className="table-title center-text bold-text">बसोबास स्थान</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
                <th style={{ width: "35%" }}>टोल</th>
                <th style={{ width: "40%" }}>बाटोको नाम</th>
                <th style={{ width: "15%" }}>घर नं</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {residenceLocations.map((l, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={l.tol}
                      onChange={(e) =>
                        onLocationChange(i, "tol", e.target.value)
                      }
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      value={l.road_name}
                      onChange={(e) =>
                        onLocationChange(i, "road_name", e.target.value)
                      }
                      className="table-input"
                      required
                    />{" "}
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      value={l.house_no}
                      onChange={(e) =>
                        onLocationChange(i, "house_no", e.target.value)
                      }
                      className="table-input"
                    />
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => addLocationRow()}
                    >
                      +
                    </button>
                    {residenceLocations.length > 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => removeLocationRow(i)}
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            className="line-input full-width-input"
            required
          />
          <select
            value={form.signatory_designation}
            onChange={(e) => setField("signatory_designation", e.target.value)}
            className="designation-select"
          >
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

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
  );
};

export default RelationTemporaryResidence;
