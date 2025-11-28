// NewBankAccountRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./NewBankAccountRecommendation.css";

const initialOfficials = [
  { title: "श्री", name: "", designation: "अध्यक्ष" },
  { title: "श्री", name: "", designation: "कोषाध्यक्ष" },
  { title: "श्री", name: "", designation: "सचिव" },
];

const initialState = {
  date: "२०८२.०७.१५",
  patraSankhya: "",
  chalanNo: "",
  toName: "",
  toPlace: "काठमाडौं",
  district: "काठमाण्डौ",
  municipalityWardNo: "",
  groupName: "",
  groupWardNo: "",
  groupRefPatraNo: "",
  groupRefChalanNo: "",
  officials: initialOfficials,
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function NewBankAccountRecommendation() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleOfficialChange = (index, field, value) => {
    setForm((p) => {
      const copy = { ...p };
      const offs = [...copy.officials];
      offs[index] = { ...offs[index], [field]: value };
      copy.officials = offs;
      return copy;
    });
  };

  const validate = (f) => {
    if (!f.groupName?.trim()) return "समूह / समिति / संस्था नाम आवश्यक छ";
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(form);
    if (err) {
      alert(err);
      return;
    }

    setSubmitting(true);
    try {
      // build payload and convert empty strings -> null
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      // send officials as JSON string (backend can parse JSON)
      payload.officials = JSON.stringify(payload.officials);

      const url = "/api/forms/new-bank-account-recommendation";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
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
    <div className="nbcr-page">
      <header className="nbcr-topbar">
        <div className="nbcr-top-left">खाता खोली दिने ।</div>
        <div className="nbcr-top-right">अवलोकन पृष्ठ / खाता खोली दिने</div>
      </header>

      <div className="nbcr-paper">
        <div className="nbcr-letterhead">
          <div className="nbcr-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png" alt="Emblem" />
          </div>

          <div className="nbcr-head-text">
            <div className="nbcr-head-main">नागार्जुन नगरपालिका</div>
            <div className="nbcr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nbcr-head-sub">नागार्जुन, काठमाडौं <br /> बागमती प्रदेश, नेपाल</div>
          </div>

          <div className="nbcr-head-meta">
            <div className="nbcr-meta-line">
              मिति : <input type="text" name="date" value={form.date} onChange={handleChange} className="nbcr-small-input" />
            </div>
            <div className="nbcr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nbcr-ref-row">
            <div className="nbcr-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="patraSankhya" value={form.patraSankhya} onChange={handleChange} />
            </div>
            <div className="nbcr-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          <div className="nbcr-to-block">
            <span>श्री</span>
            <input type="text" name="toName" className="nbcr-long-input" value={form.toName} onChange={handleChange} />
            <span>ज्यु,</span>
            <br />
            <input type="text" name="toPlace" className="nbcr-long-input nbcr-to-second" value={form.toPlace} onChange={handleChange} />
          </div>

          <div className="nbcr-subject-row">
            <span className="nbcr-sub-label">विषयः</span>
            <span className="nbcr-subject-text">खाता खोली दिने बारे ।</span>
          </div>

          <p className="nbcr-body">
            जिल्ला <input type="text" name="district" className="nbcr-small-inline" value={form.district} onChange={handleChange} /> -{" "}
            <span className="nbcr-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <input type="text" name="municipalityWardNo" className="nbcr-tiny-input" value={form.municipalityWardNo} onChange={handleChange} />{" "}
            अन्तर्गत रहने <input type="text" name="groupName" className="nbcr-medium-input" placeholder="समूह / समिति / संस्था नाम" value={form.groupName} onChange={handleChange} />{" "}
            ले { /* keep the wording similar to your original */ }
            पत्र संख्या <input type="text" name="groupRefPatraNo" className="nbcr-small-inline" value={form.groupRefPatraNo} onChange={handleChange} /> च.न.{" "}
            <input type="text" name="groupRefChalanNo" className="nbcr-small-inline" value={form.groupRefChalanNo} onChange={handleChange} /> को प्राप्त पत्र अनुसार सो समूहको खाता खोल्न बैंकको नियमानुसार निम्न पदाधिकारीको संयुक्त दस्तखतबाट संचालन हुने गरी खाता खोलिदिन सिफारिस साथ आग्रह गरेको छ ।
          </p>

          <div className="nbcr-table-title">तपशिल :</div>
          <div className="nbcr-table-wrapper">
            <table className="nbcr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>श्री / सुश्री</th>
                  <th>नाम, थर</th>
                  <th>पद</th>
                </tr>
              </thead>
              <tbody>
                {form.officials.map((o, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>
                      <select value={o.title} onChange={(e) => handleOfficialChange(i, "title", e.target.value)}>
                        <option>श्री</option>
                        <option>सुश्री</option>
                      </select>
                    </td>
                    <td><input type="text" value={o.name} onChange={(e) => handleOfficialChange(i, "name", e.target.value)} /></td>
                    <td>
                      <select value={o.designation} onChange={(e) => handleOfficialChange(i, "designation", e.target.value)}>
                        <option>अध्यक्ष</option>
                        <option>कोषाध्यक्ष</option>
                        <option>सचिव</option>
                        <option>अन्य</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="nbcr-sign-top">
            <input type="text" name="signerName" className="nbcr-sign-name" placeholder="नाम, थर" value={form.signerName} onChange={handleChange} />
            <select className="nbcr-post-select" name="signerDesignation" value={form.signerDesignation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="nbcr-section-title">निवेदकको विवरण</h3>
          <div className="nbcr-applicant-box">
            <div className="nbcr-field"><label>निवेदकको नाम *</label><input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} /></div>
            <div className="nbcr-field"><label>निवेदकको ठेगाना *</label><input type="text" name="applicantAddress" value={form.applicantAddress} onChange={handleChange} /></div>
            <div className="nbcr-field"><label>निवेदकको नागरिकता नं. *</label><input type="text" name="applicantCitizenship" value={form.applicantCitizenship} onChange={handleChange} /></div>
            <div className="nbcr-field"><label>निवेदकको फोन नं. *</label><input type="text" name="applicantPhone" value={form.applicantPhone} onChange={handleChange} /></div>
          </div>

          <div className="nbcr-submit-row">
            <button className="nbcr-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="nbcr-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
