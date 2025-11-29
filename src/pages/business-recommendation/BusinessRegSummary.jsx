// BusinessRegSummary.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessRegSummary.css";

const initialState = {
  date: "२०८२.०७.१५",
  refLetterNo: "",
  chalaniNo: "",
  addressee: "",
  municipality: "नागार्जुन",
  mailTo: "",
  introText: "",
  description: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  positionTitle: ""
};

export default function BusinessRegSummary() {
  const [form, setForm] = useState(initialState);
  const [businessList, setBusinessList] = useState([
    { regNo: "", regDate: "", businessName: "", address: "", proprietor: "" }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onBusinessChange = (index, e) => {
    const { name, value } = e.target;
    setBusinessList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addBusinessRow = () => {
    setBusinessList((prev) => [
      ...prev,
      { regNo: "", regDate: "", businessName: "", address: "", proprietor: "" }
    ]);
  };

  const removeBusinessRow = (index) => {
    setBusinessList((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (!form.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    // ensure at least one filled business row or allow empty — here require at least one with regNo or name
    const hasBusiness = businessList.some(
      (b) => (b.regNo && b.regNo.trim()) || (b.businessName && b.businessName.trim())
    );
    if (!hasBusiness) return "कम्तिमा एउटा व्यवसायको विवरण दिनुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form };
      // attach businessList as JSON string (server can parse)
      payload.businessList = JSON.stringify(businessList);
      // normalize empty to null
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const url = "/api/forms/business-reg-summary";
      const res = await axios.post(url, payload);

      if (res.status === 200 || res.status === 201) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setForm(initialState);
        setBusinessList([{ regNo: "", regDate: "", businessName: "", address: "", proprietor: "" }]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="brs-page">
      <form className="brs-paper" onSubmit={handleSubmit}>
        {/* header */}
        <div className="brs-letterhead">
          <div className="brs-logo"><img alt="Emblem" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png" /></div>
          <div className="brs-head-text">
            <div className="brs-head-main">नागार्जुन नगरपालिका</div>
            <div className="brs-head-ward">१ नं. वडा कार्यालय</div>
          </div>
          <div className="brs-head-meta">
            <div>मिति : <input name="date" value={form.date} onChange={onChange} className="brs-small-input" /></div>
            <div className="brs-meta-line">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
          </div>
        </div>

        {/* reference */}
        <div className="brs-ref-row">
          <div className="brs-ref-block"><label>पत्र संख्या :</label><input name="refLetterNo" value={form.refLetterNo} onChange={onChange} /></div>
          <div className="brs-ref-block"><label>चलानी नं. :</label><input name="chalaniNo" value={form.chalaniNo} onChange={onChange} /></div>
        </div>

        {/* addressee */}
        <div className="brs-to-block">
          <label>श्री</label>
          <input name="addressee" value={form.addressee} onChange={onChange} className="brs-long-input" />
          <br />
          <span>नागार्जुन नगरपालिका</span>
          <input name="municipality" value={form.municipality} onChange={onChange} className="brs-medium-input" />
          <span>, काठमाडौं</span>
        </div>

        {/* subject */}
        <div className="brs-subject-row">
          <span className="brs-subject-label">विषयः</span>
          <span className="brs-subject-text">व्यवसाय दर्ताको विवरण पठाईदिनु बारे ।</span>
        </div>

        {/* intro + mail to */}
        <p className="brs-body-para">
          प्रस्तुत विषयमा नागार्जुन <input name="municipality" value={form.municipality} onChange={onChange} className="brs-under-input" />
          को उद्योग, व्यवसाय, दर्ता, नविकरण, संचालन र नियमन सम्बन्धी ... कार्यालयले मेल
          <input name="mailTo" value={form.mailTo} onChange={onChange} className="brs-under-input" /> मा पठाईदिन अनुरोध गरेको छ ।
        </p>

        {/* business list table */}
        <div className="brs-table-wrapper">
          <table className="brs-table">
            <thead>
              <tr><th>क्र.स.</th><th>दर्ता नं.</th><th>दर्ता मिति</th><th>व्यवसायको नाम</th><th>ठेगाना</th><th>प्रोप्राइटर</th><th></th></tr>
            </thead>
            <tbody>
              {businessList.map((b, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="regNo" value={b.regNo} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="regDate" value={b.regDate} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="businessName" value={b.businessName} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="address" value={b.address} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="proprietor" value={b.proprietor} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td>
                    {businessList.length > 1 && <button type="button" onClick={() => removeBusinessRow(i)}>−</button>}
                    {i === businessList.length - 1 && <button type="button" onClick={addBusinessRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* detailed description */}
        <div className="brs-desc-block">
          <label>बिस्तृतः</label>
          <textarea name="description" rows="6" value={form.description} onChange={onChange} />
        </div>

        {/* applicant */}
        <h3 className="brs-section-title">निवेदकको विवरण</h3>
        <div className="brs-applicant-box">
          <div className="brs-field"><label>निवेदकको नाम *</label><input name="applicantName" value={form.applicantName} onChange={onChange} required /></div>
          <div className="brs-field"><label>निवेदकको ठेगाना *</label><input name="applicantAddress" value={form.applicantAddress} onChange={onChange} /></div>
          <div className="brs-field"><label>निवेदकको नागरिकता नं. *</label><input name="applicantCitizenship" value={form.applicantCitizenship} onChange={onChange} required /></div>
          <div className="brs-field"><label>निवेदकको फोन नं. *</label><input name="applicantPhone" value={form.applicantPhone} onChange={onChange} /></div>
        </div>

        {/* bottom */}
        <div className="brs-bottom-row">
          <div className="brs-post-select">
            <input name="positionTitle" value={form.positionTitle} onChange={onChange} className="brs-post-input" placeholder="पद" />
          </div>
          <div className="brs-submit-row">
            <button className="brs-submit-btn" type="submit" disabled={submitting}>{submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
          </div>
        </div>
      </form>

      <footer className="brs-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
