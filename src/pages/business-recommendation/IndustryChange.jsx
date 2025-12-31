import React, { useState } from "react";
import "./IndustryChange.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

function IndustryChange() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    to_line1: MUNICIPALITY.officeLine, // e.g. "नगर कार्यपालिकाको कार्यालय, काठमाडौं"
    to_line2: MUNICIPALITY.name,
    province: MUNICIPALITY.provinceLine, // e.g. "बागमती प्रदेश, नेपाल"
    district: MUNICIPALITY.englishDistrict || "", // optional short district
    municipality: MUNICIPALITY.name,
    ward: MUNICIPALITY.wardNumber,
    industry_name: "",
    industry_other_info: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizen_no: "",
    applicant_phone: "",
    applicant_email: "",
    table_rows: [
      { current_work: "", change_required: "", reason: "", action: "" },
    ],
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const updateField = (key, value) => {
    setForm((s) => ({ ...s, [key]: value }));
  };

  const updateTableRow = (index, key, value) => {
    setForm((s) => {
      const rows = s.table_rows.map((r, i) =>
        i === index ? { ...r, [key]: value } : r
      );
      return { ...s, table_rows: rows };
    });
  };

  const addRow = () =>
    setForm((s) => ({
      ...s,
      table_rows: [
        ...s.table_rows,
        { current_work: "", change_required: "", reason: "", action: "" },
      ],
    }));

  const removeRow = (index) =>
    setForm((s) => ({
      ...s,
      table_rows: s.table_rows.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/forms/industry-change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server returned ${res.status}`);
      }
      const data = await res.json();
      setMessage({ type: "success", text: `Record created (id: ${data.id})` });
      // Optional: reset form or navigate
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="usc-page">
      <header className="usc-topbar">
        <div className="usc-top-left">उद्योगको दर्ता हेरफेर।</div>
        <div className="usc-top-right">
          डाउनलोड / उद्योगको स्थिर पुँजी परिवर्तन
        </div>
      </header>

      <form className="usc-paper" onSubmit={handleSubmit}>
        <div className="usc-title-block">
          <div>अनुसूची–३२</div>
          <div>(नियम १२ को उपनियम (३) संग सम्बन्धित)</div>
          <div className="usc-title-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेरको लागि दिइने निवेदन
          </div>
        </div>

        <div className="usc-date-row">
          मिति :
          <input
            type="text"
            className="usc-date-input"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>

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

        <div className="usc-subject-row">
          <span className="usc-sub-label">विषयः</span>
          <span className="usc-subject-bold">
            {" "}
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेर सम्बन्धमा ।{" "}
          </span>
        </div>

        <p className="usc-body">
          महोदय,
          <br />
          <br />
          <span>{form.province}</span>
          <input
            className="usc-small"
            value={form.district}
            onChange={(e) => updateField("district", e.target.value)}
          />
          <span>जिल्ला</span>
          <span>{MUNICIPALITY.name}</span>
          <input
            className="usc-medium"
            value={form.municipality}
            onChange={(e) => updateField("municipality", e.target.value)}
          />
          वडा नं.
          <input
            className="usc-tiny"
            value={form.ward}
            onChange={(e) => updateField("ward", e.target.value)}
          />{" "}
          मा दर्ता भई
          <input
            className="usc-medium"
            value={form.industry_name}
            onChange={(e) => updateField("industry_name", e.target.value)}
          />{" "}
          नामक उद्योग
          <input
            className="usc-small"
            value={form.industry_other_info}
            onChange={(e) => updateField("industry_other_info", e.target.value)}
          />{" "}
          मिति
          <input
            className="usc-small"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />{" "}
          देखि संचालन भई आएको छ।
          <br />
          <br />
          स्थिर पुँजी तथा क्षमता विवरण अनुसार परिवर्तन वा हेरफेर गर्न आवश्यक
          भएकाले विवरण साथमा निवेदन गरेको छु ।
        </p>

        <table className="usc-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>हालको कामय रहको</th>
              <th>परिवर्तन वा हेरफेर गर्नुपर्ने</th>
              <th>कारण</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {form.table_rows.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    type="text"
                    value={r.current_work}
                    onChange={(e) =>
                      updateTableRow(i, "current_work", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={r.change_required}
                    onChange={(e) =>
                      updateTableRow(i, "change_required", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={r.reason}
                    onChange={(e) =>
                      updateTableRow(i, "reason", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="usc-add-btn"
                    onClick={() => addRow()}
                  >
                    +
                  </button>
                  {form.table_rows.length > 1 && (
                    <button
                      type="button"
                      className="usc-remove-btn"
                      onClick={() => removeRow(i)}
                    >
                      -
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="usc-sign-section">
          <div className="usc-sign-box">
            <div className="usc-sign-label">निवेदकको</div>

            <div className="usc-sign-field">
              <span>हस्ताक्षर :</span>
              <input
                type="text"
                value={form.signature || ""}
                onChange={(e) => updateField("signature", e.target.value)}
              />
            </div>

            <div className="usc-sign-field">
              <span>नाम, थर :</span>
              <input
                type="text"
                value={form.applicant_name}
                onChange={(e) => updateField("applicant_name", e.target.value)}
              />
            </div>

            <div className="usc-sign-field">
              <span>फोन नम्बर :</span>
              <input
                type="text"
                value={form.applicant_phone}
                onChange={(e) => updateField("applicant_phone", e.target.value)}
              />
            </div>

            <div className="usc-sign-field">
              <span>ईमेल :</span>
              <input
                type="text"
                value={form.applicant_email}
                onChange={(e) => updateField("applicant_email", e.target.value)}
              />
            </div>
          </div>
        </div>

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

        <h3 className="usc-subheader">निवेदकको विवरण</h3>
        <div className="usc-applicant-box">
          <div className="usc-field">
            <label>निवेदकको नाम *</label>
            <input
              type="text"
              value={form.applicant_name}
              onChange={(e) => updateField("applicant_name", e.target.value)}
            />
          </div>
          <div className="usc-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              type="text"
              value={form.applicant_address}
              onChange={(e) => updateField("applicant_address", e.target.value)}
            />
          </div>
          <div className="usc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              type="text"
              value={form.applicant_citizen_no}
              onChange={(e) =>
                updateField("applicant_citizen_no", e.target.value)
              }
            />
          </div>
          <div className="usc-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              type="text"
              value={form.applicant_phone}
              onChange={(e) => updateField("applicant_phone", e.target.value)}
            />
          </div>
        </div>

        <div className="usc-submit-row">
          <button
            type="submit"
            className="usc-submit-btn"
            disabled={submitting}
          >
            {submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div
            className={`usc-message ${
              message.type === "error" ? "error" : "success"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <footer className="usc-footer">
              <footer className="usc-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}

export default IndustryChange;
