// OrganizationRegistrationRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./OrganizationRegistrationRecommendation.css";

function OrganizationRegistrationRecommendation() {
  const [form, setForm] = useState({
    date: "२०८२.०७.१५",
    refLetterNo: "",
    chalaniNo: "",
    toOffice: "",
    toOfficeLine2: "",
    toOfficeLine3: "",
    wardNo: "",
    sabikWardNo: "",
    sabikWardNo2: "",
    residentName: "",
    applicantName: "",        // person name in paragraph
    industryName: "",        // industry / business name
    industryAddress: "",     // place / location field
    locationMunicipality: "",
    locationWard: "",
    locationTole: "",
    kittaNo: "",
    area: "",
    boundaryEast: "",
    boundaryWest: "",
    boundarySouth: "",
    boundaryNorth: "",
    signerName: "",
    signerDesignation: "",
    applicantNameFooter: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // normalize empty strings to null (optional)
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/organization-registration-recommendation", payload);
      if (res.status === 200 || res.status === 201) {
        alert("Saved: " + JSON.stringify(res.data));
        setForm((_) => ({ ..._ })); // optionally reset or set defaults
      } else {
        alert("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error(err);
      alert("Submit error: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="orr-page">
      <header className="orr-topbar">
        <div className="orr-top-left">घरेलु तथा साना उद्योग दर्ता सिफारिस</div>
        <div className="orr-top-right">अवलोकन पृष्ठ / संस्था दर्ता सिफारिस सम्बन्धमा</div>
      </header>

      <form className="orr-paper" onSubmit={handleSubmit}>
        <div className="orr-letterhead">
          {/* ... keep logo and header layout ... */}
          <div className="orr-head-meta">
            <div>मिति : <input type="text" name="date" value={form.date} onChange={onChange} className="orr-small-input" /></div>
            <div className="orr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <div className="orr-ref-row">
          <div className="orr-ref-block"><label>पत्र संख्या :</label><input name="refLetterNo" value={form.refLetterNo} onChange={onChange} /></div>
          <div className="orr-ref-block"><label>चलानी नं. :</label><input name="chalaniNo" value={form.chalaniNo} onChange={onChange} /></div>
        </div>

        <div className="orr-to-block">
          <span>श्री</span>
          <input name="toOffice" className="orr-long-input" value={form.toOffice} onChange={onChange} />
          <span>ज्यु,</span>
          <br />
          <input name="toOfficeLine2" className="orr-long-input orr-to-second" placeholder="उद्योग शाखा," value={form.toOfficeLine2} onChange={onChange} />
          <br />
          <input name="toOfficeLine3" className="orr-long-input orr-to-second" placeholder="नागार्जुन नगरपालिका, काठमाडौं" value={form.toOfficeLine3} onChange={onChange} />
        </div>

        <div className="orr-subject-row">
          <span className="orr-sub-label">विषयः</span>
          <span className="orr-subject-text">सिफारिस सम्बन्धमा ।</span>
        </div>

        <p className="orr-body">
          उपर्युक्त सम्बन्धमा जिल्ला काठमाडौं <span className="orr-bold">नागार्जुन नगरपालिका</span> वडा नं.
          <input className="orr-tiny-input" name="wardNo" value={form.wardNo} onChange={onChange} /> साबिक
          <input className="orr-small-inline" name="sabikWardNo" value={form.sabikWardNo} onChange={onChange} /> वडा नं.
          <input className="orr-tiny-input" name="sabikWardNo2" value={form.sabikWardNo2} onChange={onChange} /> मा बस्ने
          <input className="orr-medium-input" name="applicantName" value={form.applicantName} onChange={onChange} /> ले हाल
          <input className="orr-medium-input" name="industryName" value={form.industryName} onChange={onChange} /> वडा नं.
          <input className="orr-tiny-input" name="locationWard" value={form.locationWard} onChange={onChange} /> मा बसेर
          <input className="orr-medium-input" name="industryAddress" value={form.industryAddress} onChange={onChange} /> नामक उद्योग / व्यवसाय स्थापना गर्न चाहेकोले ...
        </p>

        <div className="orr-location-row">
          <span>उद्योग स्थापना हुने स्थान :</span>
          <span>गाउँपालिका / नगरपालिका :</span>
          <input className="orr-small-inline" name="locationMunicipality" value={form.locationMunicipality} onChange={onChange} />
          <span>वडा नं. :</span>
          <input className="orr-tiny-input" name="locationWard" value={form.locationWard} onChange={onChange} />
          <span>टोल/स्थान :</span>
          <input className="orr-medium-input" name="locationTole" value={form.locationTole} onChange={onChange} />
        </div>

        <div className="orr-location-row">
          <span>कित्ता नं. :</span><input className="orr-small-inline" name="kittaNo" value={form.kittaNo} onChange={onChange} />
          <span>क्षेत्रफल :</span><input className="orr-small-inline" name="area" value={form.area} onChange={onChange} />
          <span>सीमा पूर्व :</span><input className="orr-medium-input" name="boundaryEast" value={form.boundaryEast} onChange={onChange} />
          <span>पश्चिम :</span><input className="orr-medium-input" name="boundaryWest" value={form.boundaryWest} onChange={onChange} />
        </div>

        <div className="orr-location-row">
          <span>दक्षिण :</span><input className="orr-medium-input" name="boundarySouth" value={form.boundarySouth} onChange={onChange} />
          <span>उत्तर :</span><input className="orr-medium-input" name="boundaryNorth" value={form.boundaryNorth} onChange={onChange} />
        </div>

        <div className="orr-divider" />

        <div className="orr-sign-top">
          <input className="orr-sign-name" name="signerName" value={form.signerName} onChange={onChange} placeholder="नाम, थर" />
          <select className="orr-post-select" name="signerDesignation" value={form.signerDesignation} onChange={onChange}>
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option><option>सचिव</option><option>अधिकृत</option>
          </select>
        </div>

        <h3 className="orr-section-title">निवेदकको विवरण</h3>
        <div className="orr-applicant-box">
          <div className="orr-field"><label>निवेदकको नाम *</label><input name="applicantNameFooter" value={form.applicantNameFooter} onChange={onChange} /></div>
          <div className="orr-field"><label>निवेदकको ठेगाना *</label><input name="applicantAddress" value={form.applicantAddress} onChange={onChange} /></div>
          <div className="orr-field"><label>निवेदकको नागरिकता नं. *</label><input name="applicantCitizenship" value={form.applicantCitizenship} onChange={onChange} /></div>
          <div className="orr-field"><label>निवेदकको फोन नं. *</label><input name="applicantPhone" value={form.applicantPhone} onChange={onChange} /></div>
        </div>

        <div className="orr-submit-row">
          <button className="orr-submit-btn" type="submit" disabled={submitting}>{submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>
      </form>

      <footer className="orr-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}

export default OrganizationRegistrationRecommendation;
