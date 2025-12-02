// KittaKatRecommendation.jsx
import React, { useState } from "react";
import "./KittaKatRecommendation.css";

const emptyPlot = () => ({ seat_no: "", plot_no: "", area: "" });

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  addressee_type: "नापी कार्यालय",
  addressee_location: "",
  district: "काठमाडौँ",
  municipality: "नागार्जुन",
  ward_no: "1",
  previous_place_text: "",
  previous_ward_no: "",
  applicant_prefix: "श्री",
  applicant_name: "",
  requested_for: "", // e.g. which plot / parcel text in body
  split_area: "", // area to be split
  split_area_unit: "",

  // Field inspection report
  built_plot_area: "",
  total_house_area: "",
  ground_floor_area: "",
  paune_far: "",
  reason_for_recommendation: "",
  recommender: "",
  technician_name: "",
  technician_signature: "",

  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function KittaKatRecommendation() {
  const [form, setForm] = useState(initialState);
  const [plots, setPlots] = useState([emptyPlot()]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const setPlot = (i, key, value) =>
    setPlots((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));

  const addPlot = () => setPlots((p) => [...p, emptyPlot()]);
  const removePlot = (i) => setPlots((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.applicant_name) return "कृपया निवेदकको नाम भर्नुहोस्।";
    if (!plots.length) return "कम्तिमा एक सिट/कित्ता विवरण आवश्यक छ।";
    for (let i = 0; i < plots.length; i++) {
      const r = plots[i];
      if (!r.seat_no || !r.plot_no || !r.area) {
        return `तालिका पंक्ति ${i + 1} का अनिवार्य क्षेत्रहरू भर्नुहोस् (सिट, कित्ता, क्षेत्रफल)।`;
      }
    }
    if (!form.paune_far) return "कृपया 'पाउने फार' भर्नुहोस्।";
    if (!form.reason_for_recommendation) return "कृपया सिफारिस दिन मिल्ने कारण भर्नुहोस्।";
    if (!form.technician_name) return "कृपया प्राबिधिकको नाम भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        plots: JSON.stringify(plots)
      };

      const res = await fetch("/api/forms/kitta-kat-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optionally reset:
      // setForm(initialState); setPlots([emptyPlot()]);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kittakat-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          कित्ताकाट सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; कित्ताकाट सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* meta */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select name="addressee_type" value={form.addressee_type} onChange={handleChange} className="bold-select">
              <option>नापी कार्यालय</option>
              <option>मालपोत कार्यालय</option>
            </select>
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_location" value={form.addressee_location} onChange={handleChange} className="line-input medium-input" required />
            <span className="red">*</span>
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        {/* body */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">{form.district}</span>, <span className="bold-text ml-20">{form.municipality}</span> वडा नं. <span className="bold-text">{form.ward_no}</span> स्थायी बासिन्दा (साविकको ठेगाना{" "}
            <input name="previous_place_text" value={form.previous_place_text} onChange={handleChange} className="inline-box-input medium-box" /> वडा नं. <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box" /> ){" "}
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={handleChange} className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
            </select>{" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="inline-box-input medium-box" required />{" "}
            को नाममा श्रेस्ता दर्ता कायम रहेको तल उल्लेखित घर-जग्गा मध्ये <input name="requested_for" value={form.requested_for} onChange={handleChange} className="inline-box-input medium-box" required /> तर्फबाट <input name="split_area" value={form.split_area} onChange={handleChange} className="inline-box-input small-box" required /> {""}
            क्षेत्रफल जग्गा <select name="split_area_unit" value={form.split_area_unit} onChange={handleChange} className="inline-select"><option value="">एकाइ</option><option value="वर्गमिटर">वर्गमिटर</option><option value="रोपनी">रोपनी</option></select> कित्ताकाट गर्न प्राविधिक निरीक्षण गर्दा मापदण्ड अनुसार मिल्ने देखिएको हुनाले सोको लागि सिफारिस गरिन्छ।
          </p>
        </div>

        {/* plots table */}
        <div className="table-section">
          <h4 className="table-title">घर रहेको जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>सिट नं</th>
                  <th>कित्ता नं.</th>
                  <th>क्षेत्रफल</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plots.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input value={p.seat_no} onChange={(e) => setPlot(i, "seat_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={p.plot_no} onChange={(e) => setPlot(i, "plot_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={p.area} onChange={(e) => setPlot(i, "area", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td className="action-cell">
                      {plots.length > 1 ? (
                        <button type="button" onClick={() => removePlot(i)} className="add-btn">-</button>
                      ) : (
                        <button type="button" onClick={addPlot} className="add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addPlot} className="add-btn">कतार थप्नुहोस्</button>
          </div>
        </div>

        {/* field inspection report */}
        <div className="field-report-section">
          <h4 className="report-title underline-text">कित्ताकाट सिफारिस फिल्ड निरीक्षण प्रतिवेदन</h4>

          <div className="report-row">
            <label>घर बनेको जग्गाको क्षेत्रफल</label>
            <input name="built_plot_area" value={form.built_plot_area} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>घरको जम्मा क्षेत्रफल</label>
            <input name="total_house_area" value={form.total_house_area} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>घरको भुइँ तल्लाको क्षेत्रफल</label>
            <input name="ground_floor_area" value={form.ground_floor_area} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>पाउने फार</label><span className="red">*</span>
            <input name="paune_far" value={form.paune_far} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>सिफारिस दिन मिल्ने कारण</label><span className="red">*</span>
            <input name="reason_for_recommendation" value={form.reason_for_recommendation} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>सिफारिस गर्ने:</label>
            <input name="recommender" value={form.recommender} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>प्राबिधिकको नाम</label><span className="red">*</span>
            <input name="technician_name" value={form.technician_name} onChange={handleChange} className="line-input long-input" />
          </div>
          <div className="report-row">
            <label>प्राबिधिकको हस्ताक्षर</label>
            <input name="technician_signature" value={form.technician_signature} onChange={handleChange} className="line-input long-input" />
          </div>
        </div>

        {/* signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* applicant details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" value={form.applicant_name} onChange={handleChange} />
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

        {/* footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
