import React, { useState } from "react";
import "./RelationshipVerification.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* Safe API base resolver for CRA / Vite / window.__API_BASE */
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

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/relationship-verification_form`;

const emptyRelationRow = () => ({
  name: "",
  relation: "",
  id_no: "",
  alive: true,
});

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const RelationshipVerification = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/relationship-verification_form", form);
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
      const res = await axios.post("/api/forms/relationship-verification_form", form);
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
    <form
      className="relationship-verification-container"
      onSubmit={handleSubmit}
    >
      {/* Top bar */}
      <div className="top-bar-title">
        नाता प्रमाणित ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; नाता प्रमाणित
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

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            value={form.addressee_line1}
            onChange={(e) => setField("addressee_line1", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
          <input
            value={form.addressee_line2}
            onChange={(e) => setField("addressee_line2", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">नाता प्रमाणित प्रमाणपत्र ।</span>
        </p>
      </div>

      {/* Main paragraph */}
      <div className="form-body">
        <p className="body-paragraph">
          देहायका व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध रहेको सो नाता सम्बन्ध
          प्रमाणित गरी पाउँ भनि &nbsp;
          <span className="bold-text">{form.municipality_name}</span>{" "}
          <input
            value={form.ward_no}
            onChange={(e) => setField("ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />
          नं. वडा कार्यालयमा मिति{" "}
          <input
            value={form.date_bs}
            onChange={(e) => setField("date_bs", e.target.value)}
            className="inline-box-input medium-box"
          />
          मा{" "}
          <select
            value={form.applicant_prefix}
            onChange={(e) => setField("applicant_prefix", e.target.value)}
            className="inline-select"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            value={form.applicant_name}
            onChange={(e) => setField("applicant_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> का नाति
          <select
            value={form.subject_prefix}
            onChange={(e) => setField("subject_prefix", e.target.value)}
            className="inline-select"
          >
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input
            value={form.subject_name}
            onChange={(e) => setField("subject_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को
          <select
            value={form.subject_role}
            onChange={(e) => setField("subject_role", e.target.value)}
            className="inline-select"
          >
            <option>छोरा</option>
            <option>छोरी</option>
          </select>
          {/* rest of the paragraph left as static text */}
          ले दिनुभएको दरखास्त बमोजिम यस कार्यालयबाट आवश्यक जाँचबुझ गरी बुझ्दा
          तपाईको देहाय बमोजिमको व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध कायम
          रहेको देखिएकोले स्थानीय सरकार संचालन ऐन २०७४ को दफा १२ उपदफा २ को खण्ड
          (ङ) १ बमोजिम नाता प्रमाणित गरी यो प्रमाण पत्र प्रदान गरीएको छ ।
        </p>
      </div>

      {/* Table of relations */}
      <div className="table-section">
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.स.</th>
                <th style={{ width: "35%" }}>
                  नाता सम्बन्ध कायम गरेको व्यक्तिको नाम
                </th>
                <th style={{ width: "20%" }}>नाता</th>
                <th style={{ width: "30%" }}>नागरिकता नं. / जन्म दर्ता नं.</th>
                <th style={{ width: "5%" }}>जीवित/मृत्यु</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {relations.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={r.name}
                      onChange={(e) =>
                        onRelationChange(i, "name", e.target.value)
                      }
                      className="table-input"
                      required
                    />
                  </td>
                  <td>
                    <input
                      value={r.relation}
                      onChange={(e) =>
                        onRelationChange(i, "relation", e.target.value)
                      }
                      className="table-input"
                      required
                    />
                  </td>
                  <td>
                    <input
                      value={r.id_no}
                      onChange={(e) =>
                        onRelationChange(i, "id_no", e.target.value)
                      }
                      className="table-input"
                      required
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={!!r.alive}
                      onChange={(e) =>
                        onRelationChange(i, "alive", e.target.checked)
                      }
                    />
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => addRelation()}
                    >
                      +
                    </button>
                    {relations.length > 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => removeRelation(i)}
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

export default RelationshipVerification;
