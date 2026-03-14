// GharKayamNewFormat.jsx
import React, { useState } from "react";
import "./GharKayamNewFormat.css";

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
  notes: ""
};

export default function GharKayamNewFormat() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.owner_name) return "कृपया निवेदकको नाम भर्नुहोस्";
    if (!form.plot_seat_no || !form.plot_plot_no || !form.plot_area)
      return "कृपया तालिकाका अनिवार्य क्षेत्र (सिट, कित्ता, क्षेत्रफल) भर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const payload = { ...form };
      // send as JSON; backend will stringify objects if needed
      const res = await fetch("/api/forms/ghar-kayam-new-format", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि");
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
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घर कायम नयाँ फर्म्याट</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
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
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row"><span>श्री मालपोत कार्यालय</span></div>
          <div className="addressee-row">
            <input name="malpot_office_place" value={form.malpot_office_place} onChange={handleChange} type="text" className="line-input medium-input" />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">घर कायम सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा जिल्ला <input name="district" value={form.district} onChange={handleChange} type="text" className="inline-box-input medium-box" /> वडा नं. <input name="ward_no" value={form.ward_no} onChange={handleChange} type="text" className="inline-box-input tiny-box" /> बस्ने <input name="owner_name" value={form.owner_name} onChange={handleChange} type="text" className="inline-box-input long-box" required /> <span className="red">*</span> निवेदन अनुसार निजको नाममा दर्ता प्रमाणित रहेको तपसिलमा उल्लेखित कित्ता जग्गामा बनेको घरको मिति <span className="bg-gray-text">{form.registration_date}</span> मा निर्माण इजाजत लिई मिति <input name="registration_date" value={form.registration_date} onChange={handleChange} type="text" className="inline-box-input medium-box" /> मा <input name="certificate_taken_from" value={form.certificate_taken_from} onChange={handleChange} type="text" className="inline-box-input long-box" required /> <span className="red">*</span> प्रमाण पत्र लिई सकेकोले...
          </p>
        </div>

        {/* Tapashil table (single-row editable) */}
        <div className="table-section">
          <h4 className="table-title underline-text bold-text">तपसिल:</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>क्र.स.</th>
                  <th style={{width: '20%'}}>गा.बि.स./नगरपालिका</th>
                  <th style={{width: '15%'}}>वडा नं</th>
                  <th style={{width: '20%'}}>सिट नं</th>
                  <th style={{width: '20%'}}>कित्ता नं</th>
                  <th style={{width: '20%'}}>क्षेत्रफल</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><input name="plot_gb_np" value={form.plot_gb_np} onChange={handleChange} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input name="plot_ward_no" value={form.plot_ward_no} onChange={handleChange} className="table-input" /></td>
                  <td><input name="plot_seat_no" value={form.plot_seat_no} onChange={handleChange} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input name="plot_plot_no" value={form.plot_plot_no} onChange={handleChange} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input name="plot_area" value={form.plot_area} onChange={handleChange} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fake-scrollbar"><div className="scroll-thumb"></div></div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} type="text" className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="owner_name" type="text" className="detail-input bg-gray" value={form.owner_name} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" value={form.applicant_address} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" value={form.applicant_phone} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>{loading ? 'सेभ हुँदैछ...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
