// IndustryChange.jsx
import React, { useState, useEffect } from "react";
import "./IndustryChange.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const toNepaliDigits = (str) => {
  const map = { 0: "०", 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const makeEmptyRow = () => ({ current_work: "", change_required: "", reason: "" });

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  to_line1: MUNICIPALITY.officeLine,
  to_line2: MUNICIPALITY.name,
  district: MUNICIPALITY.englishDistrict || "",
  municipality: MUNICIPALITY.name,
  ward: "",
  industry_name: "",
  industry_other_info: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizen_no: "",
  applicant_phone: "",
  applicant_email: "",
  signature: "",
};

export default function IndustryChange() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [tableRows, setTableRows] = useState([makeEmptyRow()]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
  }, [user]);

  const updateField = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const updateTableRow = (index, key, value) => {
    setTableRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const addRow = () => setTableRows((prev) => [...prev, makeEmptyRow()]);

  const removeRow = (index) => setTableRows((prev) => prev.filter((_, i) => i !== index));

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.table_rows = JSON.stringify(tableRows);
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-change", buildPayload());
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialForm);
        setTableRows([makeEmptyRow()]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-change", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialForm);
        setTableRows([makeEmptyRow()]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usc-page">
      <header className="usc-topbar">
        <div className="usc-top-left">उद्योगको दर्ता हेरफेर ।</div>
        <div className="usc-top-right">उद्योग &gt; उद्योगको स्थिर पुँजी परिवर्तन</div>
      </header>

      <form className="usc-paper" onSubmit={handleSubmit}>

        {/* --- Title Block --- */}
        <div className="usc-title-block">
          <div>अनुसूची–३२</div>
          <div>(नियम १२ को उपनियम (३) संग सम्बन्धित)</div>
          <div className="usc-title-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेरको लागि दिइने निवेदन
          </div>
        </div>

        {/* --- Date --- */}
        <div className="usc-date-row">
          मिति :{" "}
          <input
            readOnly
            className="usc-date-input"
            value={toNepaliDigits(form.date)}
          />
        </div>

        {/* --- To Row --- */}
        <div className="usc-to-row">
          <span>श्री</span>
          <input
            type="text"
            className="usc-long"
            value={form.to_line1}
            onChange={(e) => updateField("to_line1", e.target.value)}
          />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="usc-long margin-top"
            value={form.to_line2}
            onChange={(e) => updateField("to_line2", e.target.value)}
          />
        </div>

        {/* --- Subject --- */}
        <div className="usc-subject-row">
          <span className="usc-sub-label">विषयः</span>
          <span className="usc-subject-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेर सम्बन्धमा ।
          </span>
        </div>

        {/* --- Body --- */}
        <p className="usc-body">
          महोदय,
          <br /><br />
          <span>{MUNICIPALITY.provinceLine}</span>{" "}
          <input
            className="usc-small"
            value={form.district}
            onChange={(e) => updateField("district", e.target.value)}
          />
          <span> जिल्ला </span>
          <span>{MUNICIPALITY.name}</span>
          {" "}वडा नं.{" "}
          <input
            className="usc-tiny"
            value={form.ward}
            onChange={(e) => updateField("ward", e.target.value)}
          />{" "}
          मा दर्ता भई{" "}
          <input
            className="usc-medium"
            value={form.industry_name}
            onChange={(e) => updateField("industry_name", e.target.value)}
          />{" "}
          नामक उद्योग{" "}
          <input
            className="usc-small"
            value={form.industry_other_info}
            onChange={(e) => updateField("industry_other_info", e.target.value)}
          />{" "}
          देखि संचालन भई आएको छ।
          <br /><br />
          स्थिर पुँजी तथा क्षमता विवरण अनुसार परिवर्तन वा हेरफेर गर्न आवश्यक
          भएकाले विवरण साथमा निवेदन गरेको छु ।
        </p>

        {/* --- Table --- */}
        <table className="usc-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>हालको कायम रहेको</th>
              <th>परिवर्तन वा हेरफेर गर्नुपर्ने</th>
              <th>कारण</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    type="text"
                    value={r.current_work}
                    onChange={(e) => updateTableRow(i, "current_work", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={r.change_required}
                    onChange={(e) => updateTableRow(i, "change_required", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={r.reason}
                    onChange={(e) => updateTableRow(i, "reason", e.target.value)}
                  />
                </td>
                <td className="usc-action-cell">
                  <button type="button" className="usc-add-btn" onClick={addRow}>+</button>
                  {tableRows.length > 1 && (
                    <button type="button" className="usc-remove-btn" onClick={() => removeRow(i)}>−</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- Signature Section --- */}
        <div className="usc-sign-section">
          <div className="usc-sign-box">
            <div className="usc-sign-label">निवेदकको</div>
            <div className="usc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" value={form.signature} onChange={(e) => updateField("signature", e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" value={form.applicant_name} onChange={(e) => updateField("applicant_name", e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>फोन नम्बर :</span>
              <input type="text" value={form.applicant_phone} onChange={(e) => updateField("applicant_phone", e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>ईमेल :</span>
              <input type="text" value={form.applicant_email} onChange={(e) => updateField("applicant_email", e.target.value)} />
            </div>
          </div>
        </div>

        {/* --- Documents List --- */}
        <h3 className="usc-subheader">संलग्न कागजात</h3>
        <ul className="usc-doc-list">
          <li>अघिल्लो आ. व. को विवरणपत्र प्रतिवेदन</li>
          <li>कर बुझाएको प्रमाण</li>
          <li>अनुज्ञप्ति–२६ क्षमताको अद्यावधिक विवरण</li>
          <li>नागरिक प्रमाणपत्रको प्रमाणित प्रति</li>
          <li>पंजीकरण, नवीकरण र कम्पनी दर्ता प्रमाणपत्र (कम्पनी भए)</li>
          <li>संचालक समिति/साझेदारको विवरण (बोधार्थ फर्मभित्र)</li>
          <li>क्षमताको निवेदनको फायल</li>
          <li>अन्य कागजात</li>
        </ul>

        {/* --- Applicant Details Box --- */}
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
    </div>
  );
}