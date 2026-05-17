import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────
   STYLES  (prefix: ssm-)
───────────────────────────────────────────── */
const styles = `
.ssm-container {
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

.ssm-bold-text  { font-weight: bold; }
.ssm-red        { color: red; font-weight: bold; margin: 0 2px; }
.ssm-center-text{ text-align: center; }

.ssm-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ssm-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ssm-form-header-details { text-align: center; margin-bottom: 30px; }
.ssm-schedule-title  { font-size: 1.2rem; margin: 0; color: #000; font-weight: bold; }
.ssm-rule-text       { font-size: 1rem; margin: 5px 0; color: #333; }
.ssm-form-type-title { font-size: 1.4rem; margin: 10px 0; color: #333; font-weight: bold; }
.ssm-sub-type-text   { font-size: 1.1rem; margin: 5px 0 0 0; color: #333; }

.ssm-intro-paragraph { margin-bottom: 30px; font-size: 1.05rem; }
.ssm-body-paragraph  { line-height: 2.4; text-align: justify; margin: 0; }

.ssm-dotted-input {
  border: none;
  border-bottom: 1px solid #555;
  background: #fff;
  outline: none;
  padding: 1px 4px;
  margin: 0 2px;
  font-family: inherit;
  font-size: 0.92rem;
  text-align: center;
  height: 24px;
  line-height: 1;
  vertical-align: middle;
  border-radius: 2px;
  box-sizing: border-box;
}
.ssm-dotted-input:focus { border-bottom-color: #3b7dd8; background: #f0f7ff; }

.ssm-tiny-input   { width: 44px; }
.ssm-small-input  { width: 100px; }
.ssm-medium-input { width: 150px; }
.ssm-long-input   { width: 240px; }

input[type="date"].ssm-dotted-input { width: 150px; padding: 1px 4px; }

.ssm-inline-select {
  border: 1px solid #ccc;
  background: #fff;
  padding: 1px 4px;
  margin: 0 2px;
  font-size: 0.92rem;
  font-family: inherit;
  height: 24px;
  vertical-align: middle;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
}
.ssm-inline-select:focus { border-color: #3b7dd8; }

.ssm-table-section    { margin-top: 20px; margin-bottom: 30px; }
.ssm-table-responsive { overflow-x: auto; }

.ssm-details-table { width: 100%; border-collapse: collapse; background-color: transparent; }
.ssm-details-table th {
  border: 1px solid #000;
  padding: 8px 10px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
}
.ssm-details-table td {
  border: 1px solid #000;
  padding: 4px 6px;
  vertical-align: middle;
}

.ssm-table-input {
  width: 90%;
  border: none;
  border-bottom: 1px dotted #888;
  background: #fff;
  outline: none;
  padding: 3px 4px;
  font-size: 0.9rem;
  font-family: inherit;
  height: 26px;
  box-sizing: border-box;
}
input[type="date"].ssm-table-input { width: 140px; }

.ssm-action-cell { text-align: center; vertical-align: middle; width: 50px; }
.ssm-add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ssm-remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ssm-signature-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 40px;
}
.ssm-signature-section { width: 320px; text-align: right; }
.ssm-sig-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 6px;
}
.ssm-sig-row label { font-size: 1.05rem; white-space: nowrap; }
.ssm-medium-select {
  width: 150px;
  padding: 3px 6px;
  height: 28px;
  font-size: 0.92rem;
  font-family: inherit;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
}

.ssm-footer { text-align: center; margin-top: 40px; }
.ssm-save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.ssm-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ssm-save-print-btn:disabled { opacity: 0.65; cursor: not-allowed; }

.ssm-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Print ── */
@media print {
  .ssm-hide-print { display: none !important; }

  body * { visibility: hidden; }

  .ssm-container,
  .ssm-container * { visibility: visible; }

  .ssm-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .ssm-dotted-input,
  .ssm-inline-select,
  .ssm-table-input,
  .ssm-medium-select {
    border: none;
    border-bottom: 1px solid #333;
    background: transparent !important;
    box-shadow: none;
  }

  .ssm-details-table th,
  .ssm-details-table td { border: 1px solid #000; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ssm-container { padding: 15px; }
  .ssm-long-input { width: 160px; }
  .ssm-medium-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function SthalagatSarjiminMujulka() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    district_office_1:      "",
    team_no_1:              "",
    municipality:           MUNICIPALITY?.name || "",
    ward_no:                "१",
    person_title:           "श्री",
    person_name:            "",
    relation_type_1:        "छोरा",
    applicant_name_1:       "",
    applicant_title:        "श्री",
    applicant_name_2:       "",
    relation_type_2:        "छोरा",
    district_office_2:      "",
    team_no_2:              "",
    tapsil: [
      {
        name:       "",
        watan:      "",
        prpn_no:    "",
        issue_date: new Date().toISOString().slice(0, 10),
      },
    ],
    signatory_name:         "",
    signatory_position:     "",
    signatory_date:         new Date().toISOString().slice(0, 10),
    applicant_name:         "",
    applicant_address:      "",
    applicant_citizenship_no: "",
    applicant_phone:        "",
    notes:                  "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateTapsilRow = (idx, key) => (e) => {
    setForm((s) => {
      const rows = s.tapsil.slice();
      rows[idx] = { ...rows[idx], [key]: e.target.value };
      return { ...s, tapsil: rows };
    });
  };

  const addTapsilRow = () => {
    setForm((s) => ({
      ...s,
      tapsil: s.tapsil.concat({
        name: "", watan: "", prpn_no: "",
        issue_date: new Date().toISOString().slice(0, 10),
      }),
    }));
  };

  const removeTapsilRow = (idx) => {
    if (form.tapsil.length > 1) {
      setForm((s) => ({
        ...s,
        tapsil: s.tapsil.filter((_, i) => i !== idx),
      }));
    }
  };

  const validate = () => {
    if (!form.applicant_name?.trim())          return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no?.trim()) return "नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMessage(null);

    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        tapsil: JSON.stringify(form.tapsil),
      };

      const res = await axios.post(
        "/api/forms/sthalagat-sarjimin-mujulka",
        payload,
      );

      setMessage({
        type: "success",
        text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${res.data?.id || ""})`,
      });
      window.print();
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "सेभ गर्न सम्भव भएन",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="ssm-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top bar ── */}
        <div className="ssm-top-bar-title ssm-hide-print">
          स्थलगत सर्जमिन मुचुल्का ।
          <span className="ssm-top-right-bread">
            नेपाली नागरिकता &gt; स्थलगत सर्जमिन मुचुल्का
          </span>
        </div>

        {/* ── Header ── */}
        <div className="ssm-form-header-details">
          <h3 className="ssm-schedule-title">अनुसूची-३</h3>
          <p className="ssm-rule-text">
            नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित
          </p>
          <h2 className="ssm-form-type-title">स्थलगत सर्जमिन मुचुल्काको ढाँचा</h2>
          <h3 className="ssm-sub-type-text">वंशजको नाताले</h3>
        </div>

        {/* ── Body paragraph ── */}
        <div className="ssm-intro-paragraph">
          <p className="ssm-body-paragraph">
            लिखितम तपशिल बमोजिमका हामीहरु आगे जिल्ला प्रशासन कार्यालय, काठमाडौँ{" "}
            <input name="district_office_1" className="ssm-dotted-input ssm-medium-input" value={form.district_office_1} onChange={handleChange} autoComplete="off" />{" "}
            समक्षबाट नागरिकता वितरण कार्यको खटिइ आएको टोली नम्बर{" "}
            <input name="team_no_1" className="ssm-dotted-input ssm-small-input" value={form.team_no_1} onChange={handleChange} />{" "}
            समक्ष यस जिल्लाको{" "}
            <input name="municipality" className="ssm-dotted-input ssm-medium-input" value={form.municipality} onChange={handleChange} />{" "}
            वडा नं{" "}
            <input name="ward_no" className="ssm-dotted-input ssm-tiny-input" value={form.ward_no} onChange={handleChange} />{" "}
            मा बसोबास गर्ने{" "}
            <select name="person_title" className="ssm-inline-select" value={form.person_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="person_name" className="ssm-dotted-input ssm-long-input" value={form.person_name} onChange={handleChange} />{" "}
            को{" "}
            <select name="relation_type_1" className="ssm-inline-select" value={form.relation_type_1} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="applicant_name_1" className="ssm-dotted-input ssm-long-input" value={form.applicant_name_1} onChange={handleChange} />{" "}
            ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि निवेदन दिनु भएको
            सम्बन्धमा हामीहरुलाई सोधनी हुँदा हाम्रो चित्त बुझ्यो निज निवेदक{" "}
            <select name="applicant_title" className="ssm-inline-select" value={form.applicant_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="applicant_name_2" className="ssm-dotted-input ssm-long-input" value={form.applicant_name_2} onChange={handleChange} />{" "}
            का{" "}
            <select name="relation_type_2" className="ssm-inline-select" value={form.relation_type_2} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            हुन् निज निवेदक वंशजको नाताले नेपाली नागरिक हुन् निजलाई वंशजको
            नाताले नेपाली नागरिकता प्रमाण पत्र दिएमा फरक पर्ने छैन व्यहोरा
            फरक परेमा प्रचलित कानून बमोजिम हुने सजाय सहुँला बुझाउँला भनी हामी
            तपशिलका व्यक्तिहरु सही छाप गरी यो सर्जमिन मुचुल्का जिल्ला
            प्रशासन कार्यालय काठमाडौँ{" "}
            <input name="district_office_2" className="ssm-dotted-input ssm-medium-input" value={form.district_office_2} onChange={handleChange} />{" "}
            को नागरिकता वितरण टोली नम्बर{" "}
            <input name="team_no_2" className="ssm-dotted-input ssm-medium-input" value={form.team_no_2} onChange={handleChange} />{" "}
            मार्फत नेपाल सरकारमा चढायौं ।
          </p>
        </div>

        {/* ── Tapsil table ── */}
        <div className="ssm-table-section">
          <div className="ssm-table-responsive">
            <table className="ssm-details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>नाम थर</th>
                  <th>वतन</th>
                  <th>ना.प्र.प.नं</th>
                  <th>नागरिकता जारी मिति</th>
                  <th className="ssm-hide-print">थप</th>
                </tr>
              </thead>
              <tbody>
                {form.tapsil.map((row, idx) => (
                  <tr key={idx}>
                    <td className="ssm-center-text">{idx + 1}</td>
                    <td>
                      <input className="ssm-table-input" value={row.name} onChange={updateTapsilRow(idx, "name")} />
                    </td>
                    <td>
                      <input className="ssm-table-input" value={row.watan} onChange={updateTapsilRow(idx, "watan")} />
                    </td>
                    <td>
                      <input className="ssm-table-input" value={row.prpn_no} onChange={updateTapsilRow(idx, "prpn_no")} />
                    </td>
                    <td>
                      <input type="date" className="ssm-table-input" value={row.issue_date} onChange={updateTapsilRow(idx, "issue_date")} />
                    </td>
                    <td className="ssm-action-cell ssm-hide-print">
                      {idx === 0 ? (
                        <button type="button" className="ssm-add-btn" onClick={addTapsilRow}>+</button>
                      ) : (
                        <button type="button" className="ssm-remove-btn" onClick={() => removeTapsilRow(idx)}>×</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="ssm-signature-container">
          <div className="ssm-signature-section">
            <div className="ssm-sig-row">
              <label>नाम:</label>
              <input name="signatory_name" className="ssm-dotted-input ssm-medium-input" value={form.signatory_name} onChange={handleChange} />
            </div>
            <div className="ssm-sig-row">
              <label>पद:</label>
              <select name="signatory_position" className="ssm-medium-select" value={form.signatory_position} onChange={handleChange}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
            </div>
            <div className="ssm-sig-row">
              <label>मिति:</label>
              <input type="date" name="signatory_date" className="ssm-dotted-input ssm-medium-input" value={form.signatory_date} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* ── Applicant details ── */}
        <div className="ssm-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Submit ── */}
        <div className="ssm-footer ssm-hide-print">
          <button type="submit" className="ssm-save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
          {message && (
            <div style={{
              marginTop: 15,
              color: message.type === "error" ? "crimson" : "green",
              fontWeight: "bold",
            }}>
              {message.text}
            </div>
          )}
        </div>

        <div className="ssm-copyright-footer ssm-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>

      </form>
    </>
  );
}