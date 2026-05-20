import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const emptyTapashilRow = () => ({
  local_body: "",
  ward_no:    "",
  plot_no:    "",
  area:       "",
});

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:                  "२०८२/८३",
  chalani_no:                 "",
  date_nep:                   new Date().toISOString().slice(0, 10),
  prev_district:              "",
  prev_type:                  "",
  prev_ward_no:               "",
  resident_local:             MUNICIPALITY.name       || "",
  resident_ward_no:           MUNICIPALITY.wardNumber || "1",
  applicant_relation_name:    "",
  applicant_relation_prefix:  "श्री",
  applicant_child_name:       "",
  applicant_child_prefix:     "श्री",
  house_present:              "भएको",
  house_type:                 "घरको किसिम छान्नुहोस्",
  length:                     "",
  length_unit:                "फिट",
  width:                      "",
  width_unit:                 "फिट",
  additional_measure_1:       "",
  additional_measure_2:       "",
  road_included:              "बाटो बाटो समेत",
  signature_name:             "",
  signature_designation:      "",
  applicant_name:             "",
  applicant_address:          "",
  applicant_citizenship_no:   "",
  applicant_phone:            "",
};

const INITIAL_TAPASHIL = [emptyTapashilRow()];

/* ─────────────────────────────────────────────
   STYLES  (prefix: pvr-)
───────────────────────────────────────────── */
const styles = `
.pvr-container {
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

.pvr-bold-text      { font-weight: bold; }
.pvr-underline-text { text-decoration: underline; }
.pvr-center-text    { text-align: center; }
.pvr-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.pvr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.pvr-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.pvr-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.pvr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.pvr-header-text       { display: flex; flex-direction: column; align-items: center; }
.pvr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.pvr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.pvr-address-text,
.pvr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.pvr-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.pvr-meta-left p, .pvr-meta-right p { margin: 5px 0; }

.pvr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.pvr-small-input { width: 120px; }

.pvr-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.pvr-inline-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.pvr-inline-input:focus { border-color: #3b7dd8; }

.pvr-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}
.pvr-tiny-box   { width: 40px; text-align: center; }
.pvr-small-box  { width: 80px; }
.pvr-medium-box { width: 150px; }

/* Table */
.pvr-table-section    { margin-top: 20px; margin-bottom: 40px; }
.pvr-table-title      { margin-bottom: 10px; }
.pvr-table-responsive { overflow-x: auto; }
.pvr-details-table { width: 100%; border-collapse: collapse; background-color: rgba(255,255,255,0.6); }
.pvr-details-table th {
  background-color: #e0e0e0; border: 1px solid #555;
  padding: 8px; text-align: left; font-size: 0.9rem; font-weight: bold; color: #333;
}
.pvr-details-table td { border: 1px solid #555; padding: 5px; }
.pvr-table-input {
  width: 80%; border: none; background: transparent;
  outline: none; padding: 4px; font-size: 1rem; font-family: inherit;
}
.pvr-action-cell { text-align: center; width: 55px; }
.pvr-add-btn {
  background-color: #2563eb; color: white; border: none;
  width: 22px; height: 22px; border-radius: 3px;
  cursor: pointer; font-size: 1.1rem; line-height: 1;
}
.pvr-remove-btn {
  background-color: #e74c3c; color: white; border: none;
  width: 22px; height: 22px; border-radius: 3px;
  cursor: pointer; font-size: 1.1rem; line-height: 1; margin-left: 4px;
}

.pvr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.pvr-signature-block { width: 220px; text-align: center; position: relative; }
.pvr-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.pvr-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.pvr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; font-size: 1rem; }

.pvr-footer { text-align: center; margin-top: 40px; }
.pvr-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.pvr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.pvr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.pvr-copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

@media print {
  body * { visibility: hidden; }
  .pvr-container, .pvr-container * { visibility: visible; }
  .pvr-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .pvr-footer, .pvr-top-right-bread, .pvr-copyright-footer,
  .pvr-add-btn, .pvr-remove-btn { display: none !important; }
  .pvr-details-table th, .pvr-details-table td { border: 1px solid #000 !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .pvr-container { padding: 15px; }
  .pvr-meta-data-row { flex-direction: column; gap: 8px; }
  .pvr-inline-input { width: 100px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function PropertyVerificationRecommendation() {
  const [form, setForm]         = useState(INITIAL_STATE);
  const [tapashil, setTapashil] = useState(INITIAL_TAPASHIL);
  const [loading, setLoading]   = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateTapashil = (idx, key, value) => {
    setTapashil((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };
  const addTapashil    = () => setTapashil((t) => [...t, emptyTapashilRow()]);
  const removeTapashil = (idx) => {
    if (tapashil.length > 1)
      setTapashil((t) => t.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!form.applicant_name?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        tapashil: JSON.stringify(tapashil),
      };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post(
        "/api/forms/property-verification-recommendation",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => { setForm(INITIAL_STATE); setTapashil(INITIAL_TAPASHIL); }, 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship_no,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = { applicantName: "applicant_name", applicantAddress: "applicant_address", applicantCitizenship: "applicant_citizenship_no", applicantPhone: "applicant_phone" };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="pvr-container">
        <form onSubmit={handleSubmit}>

          <div className="pvr-top-bar-title">
            सम्पत्ति प्रमाणीकरण सिफारिस ।
            <span className="pvr-top-right-bread">
              घर / जग्गा जमिन &gt; सम्पत्ति प्रमाणीकरण सिफारिस
            </span>
          </div>

          <div className="pvr-form-header-section">
            <div className="pvr-header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
            <div className="pvr-header-text">
              <h1 className="pvr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="pvr-ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
              <p className="pvr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="pvr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="pvr-meta-data-row">
            <div className="pvr-meta-left">
              <p>पत्र संख्या : <span className="pvr-bold-text">{form.letter_no}</span></p>
              <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="pvr-dotted-input pvr-small-input" /></p>
            </div>
            <div className="pvr-meta-right">
              <p>मिति : <span className="pvr-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="pvr-form-body">
            <p>
              उपरोक्त सम्बन्धमा साविक जिल्ला
              <input name="prev_district" value={form.prev_district} onChange={handleChange} className="pvr-inline-input pvr-medium-box" />
              <select name="prev_type" value={form.prev_type} onChange={handleChange} className="pvr-inline-select">
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>
              वडा नं.
              <input name="prev_ward_no" value={form.prev_ward_no} onChange={handleChange} className="pvr-inline-input pvr-tiny-box" />
              भै हाल यस{" "}
              <span className="pvr-bg-gray-text">{MUNICIPALITY.name}</span>{" "}
              वडा नं. {MUNICIPALITY.wardNumber} मा बस्ने
              <input name="applicant_relation_name" value={form.applicant_relation_name} onChange={handleChange} className="pvr-inline-input pvr-medium-box" />
              को नाति
              <select name="applicant_relation_prefix" value={form.applicant_relation_prefix} onChange={handleChange} className="pvr-inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>
              <input name="applicant_child_name" value={form.applicant_child_name} onChange={handleChange} className="pvr-inline-input pvr-medium-box" />
              को छोरा
              <select name="applicant_child_prefix" value={form.applicant_child_prefix} onChange={handleChange} className="pvr-inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>
              को नाममा नम्बरी दर्ता रहेको तपसिलको जग्गामा घर{" "}
              <select name="house_present" value={form.house_present} onChange={handleChange} className="pvr-inline-select">
                <option value="भएको">भएको</option>
                <option value="नभएको">नभएको</option>
              </select>
              भए घरको किसिम
              <select name="house_type" value={form.house_type} onChange={handleChange} className="pvr-inline-select">
                <option value="घरको किसिम छान्नुहोस्">घरको किसिम छान्नुहोस्</option>
                <option value="पक्की">पक्की</option>
                <option value="कच्ची">कच्ची</option>
              </select>
              लम्बाई
              <input name="length" value={form.length} onChange={handleChange} className="pvr-inline-input pvr-small-box" />
              <select name="length_unit" value={form.length_unit} onChange={handleChange} className="pvr-inline-select">
                <option value="फिट">फिट</option>
                <option value="मिटर">मिटर</option>
              </select>
              चौडाई
              <input name="width" value={form.width} onChange={handleChange} className="pvr-inline-input pvr-small-box" />
              <select name="width_unit" value={form.width_unit} onChange={handleChange} className="pvr-inline-select">
                <option value="फिट">फिट</option>
                <option value="मिटर">मिटर</option>
              </select>
              र उक्त घर जग्गामा
              <input name="additional_measure_1" value={form.additional_measure_1} onChange={handleChange} className="pvr-inline-input pvr-medium-box" />
              <input name="additional_measure_2" value={form.additional_measure_2} onChange={handleChange} className="pvr-inline-input pvr-small-box" />
              फिट
              <select name="road_included" value={form.road_included} onChange={handleChange} className="pvr-inline-select">
                <option value="बाटो बाटो समेत">बाटो बाटो समेत</option>
                <option value="बाटो बाहेक">बाटो बाहेक</option>
              </select>
              पर्ने भएकोले सिफारिस साथ सादर अनुरोध गरिन्छ।
            </p>
          </div>

          {/* Tapashil table */}
          <div className="pvr-table-section">
            <h4 className="pvr-table-title pvr-underline-text pvr-bold-text pvr-center-text">
              तपसिल
            </h4>
            <div className="pvr-table-responsive">
              <table className="pvr-details-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>स्थानीय तह</th>
                    <th>वडा नं.</th>
                    <th>कित्ता नं.</th>
                    <th>क्षेत्रफल</th>
                    <th style={{ width: 55 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {tapashil.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><input value={r.local_body} onChange={(e) => updateTapashil(i, "local_body", e.target.value)} className="pvr-table-input" /></td>
                      <td><input value={r.ward_no}    onChange={(e) => updateTapashil(i, "ward_no",    e.target.value)} className="pvr-table-input" /></td>
                      <td><input value={r.plot_no}    onChange={(e) => updateTapashil(i, "plot_no",    e.target.value)} className="pvr-table-input" /></td>
                      <td><input value={r.area}       onChange={(e) => updateTapashil(i, "area",       e.target.value)} className="pvr-table-input" /></td>
                      <td className="pvr-action-cell">
                        <button type="button" onClick={addTapashil} className="pvr-add-btn">+</button>
                        {tapashil.length > 1 && (
                          <button type="button" onClick={() => removeTapashil(i)} className="pvr-remove-btn">-</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pvr-signature-section">
            <div className="pvr-signature-block">
              <div className="pvr-signature-line"></div>
              <input name="signature_name" value={form.signature_name} onChange={handleChange} className="pvr-sig-input" />
              <select name="signature_designation" value={form.signature_designation} onChange={handleChange} className="pvr-designation-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={footerForm} handleChange={handleFooterChange} />

          <div className="pvr-footer">
            <button type="submit" className="pvr-save-print-btn" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="pvr-copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>

        </form>
      </div>
    </>
  );
}