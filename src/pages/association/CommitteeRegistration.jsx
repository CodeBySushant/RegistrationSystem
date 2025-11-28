// CommitteeRegistration.jsx
import React, { useState } from "react";
import axios from "axios";
import "./CommitteeRegistration.css";

const initialState = {
  date: "२०८२.०७.१५",
  patraSankhya: "",   // पत्र संख्या
  chalanNo: "",       // चलानी नं.
  toName: "",         // श्री ... (office name)
  toPlace: "काठमाडौं", // second line (city)
  district: "",       // जिल्ला (if you want)
  municipalityType: "नगरपालिका", // गाउँपालिका / नगरपालिका
  municipalityWardNo: "", // वडा नं. (main)
  prevWardNo: "",     // साबिक वडा नं.
  locationName: "",   // place / location (medium input)
  signerName: "",     // हस्ताक्षर गर्ने व्यक्ति
  signerDesignation: "", // पद
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function ComitteeRegistration() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!f.locationName?.trim()) return "समिति/ठेगाना आवश्यक छ";
    if (!f.signerName?.trim()) return "साइनेरको नाम आवश्यक छ";
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
      const payload = { ...form };
      // convert empty strings to null for backend
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const url = "/api/forms/committee-registration";
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
    <div className="cr-page">
      <header className="cr-topbar">
        <div className="cr-top-left">समिति दर्ता सिफारिस</div>
        <div className="cr-top-right">अवलोकन पृष्ठ / समिति दर्ता सिफारिस</div>
      </header>

      <div className="cr-paper">
        <div className="cr-letterhead">
          <div className="cr-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png" alt="Emblem" />
          </div>

          <div className="cr-head-text">
            <div className="cr-head-main">नागार्जुन नगरपालिका</div>
            <div className="cr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="cr-head-sub">नागार्जुन, काठमाडौं <br/> बागमती प्रदेश, नेपाल</div>
          </div>

          <div className="cr-head-meta">
            <div className="cr-meta-line">
              मिति : <input type="text" name="date" value={form.date} onChange={handleChange} className="cr-small-input" />
            </div>
            <div className="cr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cr-ref-row">
            <div className="cr-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="patraSankhya" value={form.patraSankhya} onChange={handleChange} />
            </div>
            <div className="cr-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          <div className="cr-to-block">
            <span>श्री</span>
            <input type="text" name="toName" className="cr-long-input" value={form.toName} onChange={handleChange} />
            <span>जिल्ला प्रशासन कार्यालय,</span>
            <br/>
            <input type="text" name="toPlace" className="cr-long-input cr-to-second" value={form.toPlace} onChange={handleChange} />
          </div>

          <div className="cr-subject-row">
            <span className="cr-sub-label">विषयः</span>
            <span className="cr-subject-text">सिफारिस गरिएको बारेमा ।</span>
          </div>

          <p className="cr-body">
            प्रस्तुत विषयमा <span className="cr-bold">यस नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <input type="text" name="municipalityWardNo" className="cr-tiny-input" value={form.municipalityWardNo} onChange={handleChange} />{" "}
            (साबिक <input type="text" name="prevWardNo" className="cr-small-inline" value={form.prevWardNo} onChange={handleChange} /> वडा नं.{" "}
            <input type="text" name="prevWardNo" className="cr-tiny-input" />), जिल्ला{" "}
            <input type="text" name="district" className="cr-small-inline" value={form.district} onChange={handleChange} /> स्थित{" "}
            <select className="cr-select" name="municipalityType" value={form.municipalityType} onChange={handleChange}>
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>{" "}
            वडा नं. <input type="text" className="cr-tiny-input" name="municipalityWardNo" value={form.municipalityWardNo} onChange={handleChange}/> स्थित{" "}
            <input type="text" className="cr-medium-input" name="locationName" placeholder="समिति / ठेगाना" value={form.locationName} onChange={handleChange} /> नामक समिति दर्ता गर्नुपर्ने भएकोले सो को लागि "सिफारिस गरी पाउँ" भनी यस कार्यालयमा दर्ता निवेदन बमोजिम दर्ता सिफारिस गरिएको छ ।
          </p>

          <div className="cr-blank-area" />

          <div className="cr-sign-top">
            <input type="text" name="signerName" className="cr-sign-name" placeholder="नाम, थर" value={form.signerName} onChange={handleChange} />
            <select className="cr-post-select" name="signerDesignation" value={form.signerDesignation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="cr-section-title">निवेदकको विवरण</h3>
          <div className="cr-applicant-box">
            <div className="cr-field">
              <label>निवेदकको नाम *</label>
              <input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} />
            </div>
            <div className="cr-field">
              <label>निवेदकको ठेगाना *</label>
              <input type="text" name="applicantAddress" value={form.applicantAddress} onChange={handleChange} />
            </div>
            <div className="cr-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input type="text" name="applicantCitizenship" value={form.applicantCitizenship} onChange={handleChange} />
            </div>
            <div className="cr-field">
              <label>निवेदकको फोन नं. *</label>
              <input type="text" name="applicantPhone" value={form.applicantPhone} onChange={handleChange} />
            </div>
          </div>

          <div className="cr-submit-row">
            <button className="cr-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="cr-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
