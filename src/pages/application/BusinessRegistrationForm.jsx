// BusinessRegistrationSignatureForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessRegistrationForm.css";

const initialState = {
  regNo: "",
  regDate: "",
  headerTo: "",
  businessName: "",
  pan: "",
  phone: "",
  email: "",
  businessTole: "",
  businessRoad: "",
  businessHouseNo: "",
  ownerName: "",
  regNature: "",
  fatherName: "",
  grandfatherName: "",
  husbandName: "",
  motherInLawName: "",
  fatherInLawName: "",
  citizenAddress: "",
  businessType: "",
  propFatherName: "",
  propFatherAddress: "",
  propGrandfatherName: "",
  propGrandfatherAddress: "",
  propWifeName: "",
  propWifeAddress: "",
  remarks: "",
  tippadiSignature: "",
  tippadiLevel: "",
  tippadiDate: "",
  tippadiName: "",
  tippadiPosition: "",
  approverSignature: "",
  approverName: "",
  approverPosition: "",
  applicantSignature: "",
  applicantNameSignature: "",
  voucherNo: "",
  voucherDate: "",
  voucherAmount: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const BusinessRegistrationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [proprietors, setProprietors] = useState([
    { id: 1, name: "", address: "", ward: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleProprietorChange = (index, e) => {
    const { name, value } = e.target;
    setProprietors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addProprietor = () => {
    setProprietors((p) => [...p, { id: p.length + 1, name: "", address: "", ward: "" }]);
  };

  const validate = (data) => {
    // basic required checks - adjust as needed
    if (!data.businessName || data.businessName.trim() === "") return "businessName is required";
    if (!data.applicantName || data.applicantName.trim() === "") return "applicantName is required";
    // require at least one proprietor filled
    const anyProp = proprietors.some((pr) => pr.name?.trim() || pr.address?.trim() || pr.ward?.trim());
    if (!anyProp) return "At least one proprietor is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      // prepare payload: convert empty strings -> null and proprietors -> JSON string
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      // attach proprietors as JSON string
      payload.proprietors = JSON.stringify(proprietors);

      const url = "http://localhost:5000/api/forms/business-registration";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        // reset
        setFormData(initialState);
        setProprietors([{ id: 1, name: "", address: "", ward: "" }]);
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
    <div className="business-reg-container">
      <form onSubmit={handleSubmit}>
        {/* top meta */}
        <div className="top-meta-row">
          <div className="form-group-inline">
            <label>निवेदन दर्ता नं.:</label>
            <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} />
          </div>
          <div className="form-group-inline">
            <label>दर्ता मिति:</label>
            <input type="text" name="regDate" value={formData.regDate} onChange={handleChange} />
          </div>
        </div>

        {/* header */}
        <div className="form-row biz-header">
          <span>श्री</span>
          <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
          <span>ज्यू,</span>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>व्यवसाय दर्ता गरि पाउँ</u></strong>
        </div>

        {/* message */}
        <p className="certificate-body">
          महोदय,<br />
          तल लेखिए बमोजिमको व्यहोरा जनाइ म / हामी निम्न लिखित फर्म/कम्पनि व्यवसाय दर्ता गरी पाउन रीतपूर्वक निवेदन पेस गरेको छु। निवेदन साथ सक्कली कागजातहरु यसै साथ संलग्न छ। सो को जाँचबुझ गरी कानुन बमोजिम दर्ता गरिदिनुहुन अनुरोध छ।
        </p>

        {/* main fields - condensed version (keeps your original inputs) */}
        <div className="form-section">
          <div className="form-grid">
            {/* you can keep the rest of your inputs as-is; for brevity I include a chunk */}
            <div className="form-group-column">
              <label>१. व्यवसायको पूरा नाम:</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>प्यान:</label>
              <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
            </div>

            {/* ... keep other inputs exactly as in your original form ... */}
            {/* I'll include the rest of fields so you can paste directly */}
            <div className="form-group-column">
              <label>फोन नं:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>इमेल:</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group-column">
              <label>२. व्यवसायको ठेगाना: टोल:</label>
              <input type="text" name="businessTole" value={formData.businessTole} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>बाटो:</label>
              <input type="text" name="businessRoad" value={formData.businessRoad} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>घर नं:</label>
              <input type="text" name="businessHouseNo" value={formData.businessHouseNo} onChange={handleChange} />
            </div>
            <div className="form-group-column full-width">
              <label>३. व्यवसाय रहेको घरको मुख्य ब्यक्ति/घरधनीको:</label>
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} />
            </div>

            <div className="form-group-column full-width">
              <label>४. फर्म दर्ताको प्रकृति:</label>
              <input type="text" name="regNature" value={formData.regNature} onChange={handleChange} />
            </div>

            <div className="form-group-column">
              <label>५. बाबुको नाम:</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>बाजेको नाम:</label>
              <input type="text" name="grandfatherName" value={formData.grandfatherName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>पतिको नाम:</label>
              <input type="text" name="husbandName" value={formData.husbandName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>सासुको नाम:</label>
              <input type="text" name="motherInLawName" value={formData.motherInLawName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>ससुराको नाम:</label>
              <input type="text" name="fatherInLawName" value={formData.fatherInLawName} onChange={handleChange} />
            </div>
            <div className="form-group-column full-width">
              <label>६. नेपाली नागरिकता अनुसार ठेगाना:</label>
              <input type="text" name="citizenAddress" value={formData.citizenAddress} onChange={handleChange} />
            </div>
            <div className="form-group-column full-width">
              <label>७. व्यवसायको किसिम:</label>
              <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} />
            </div>

            <div className="form-group-column">
              <label>८. प्रोप्राइटरको बाबुको नाम:</label>
              <input type="text" name="propFatherName" value={formData.propFatherName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>ठेगाना:</label>
              <input type="text" name="propFatherAddress" value={formData.propFatherAddress} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>९. प्रोप्राइटरको बाजेको नाम:</label>
              <input type="text" name="propGrandfatherName" value={formData.propGrandfatherName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>ठेगाना:</label>
              <input type="text" name="propGrandfatherAddress" value={formData.propGrandfatherAddress} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>१०. प्रोप्राइटरको विवाहित भएमा पत्नीको नाम:</label>
              <input type="text" name="propWifeName" value={formData.propWifeName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>ठेगाना:</label>
              <input type="text" name="propWifeAddress" value={formData.propWifeAddress} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* proprietors table */}
        <div className="table-wrapper">
          <table className="proprietor-table">
            <thead>
              <tr>
                <th>प्रोप्राइटरको नाम</th>
                <th>ठेगाना</th>
                <th>वडा</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {proprietors.map((prop, index) => (
                <tr key={prop.id}>
                  <td><input type="text" name="name" value={prop.name} onChange={(e) => handleProprietorChange(index, e)} required /></td>
                  <td><input type="text" name="address" value={prop.address} onChange={(e) => handleProprietorChange(index, e)} required /></td>
                  <td><input type="text" name="ward" value={prop.ward} onChange={(e) => handleProprietorChange(index, e)} required /></td>
                  <td>
                    {index === proprietors.length - 1 && (
                      <button type="button" onClick={addProprietor} className="add-btn">+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* remarks */}
        <div className="form-group-column">
          <label>कैफियत:</label>
          <textarea name="remarks" rows="3" value={formData.remarks} onChange={handleChange}></textarea>
        </div>

        {/* kabuliyatnama */}
        <fieldset className="kabuliyatnama">
          <legend>कबुलियतनामा</legend>
          <p>यसमा लेखिएको व्यहोरा सत्य साँचो छ...</p>
        </fieldset>

        {/* applicant signature */}
        <div className="applicant-signature-section">
          <div className="thumb-box">
            <label>बायाँ</label>
            <div className="thumb-area" />
          </div>
          <div className="thumb-box">
            <label>दायाँ</label>
            <div className="thumb-area" />
          </div>
          <div className="form-group-column signature-field">
            <label>निवेदकको दस्तखत:</label>
            <input type="text" name="applicantSignature" value={formData.applicantSignature} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group-column signature-name-field">
          <label>नाम:</label>
          <input type="text" name="applicantNameSignature" value={formData.applicantNameSignature} onChange={handleChange} />
        </div>

        {/* tippadi, approver, voucher sections (kept as your inputs) */}
        <fieldset className="tippadi-section">
          <legend>टिप्पणी</legend>
          <div className="tippadi-grid">
            <div className="form-group-column"><label>दस्तखत:</label><input type="text" name="tippadiSignature" value={formData.tippadiSignature} onChange={handleChange} /></div>
            <div className="form-group-column"><label>तह:</label><input type="text" name="tippadiLevel" value={formData.tippadiLevel} onChange={handleChange} /></div>
            <div className="form-group-column"><label>मिति:</label><input type="text" name="tippadiDate" value={formData.tippadiDate} onChange={handleChange} /></div>
            <div className="form-group-column"><label>नाम:</label><input type="text" name="tippadiName" value={formData.tippadiName} onChange={handleChange} /></div>
            <div className="form-group-column"><label>पद:</label><input type="text" name="tippadiPosition" value={formData.tippadiPosition} onChange={handleChange} /></div>
          </div>
        </fieldset>

        <fieldset className="approver-section">
          <legend>सदर गर्नेको दस्तखत</legend>
          <div className="approver-grid">
            <div className="form-group-column"><label>दस्तखत:</label><input type="text" name="approverSignature" value={formData.approverSignature} onChange={handleChange} /></div>
            <div className="form-group-column"><label>नाम:</label><input type="text" name="approverName" value={formData.approverName} onChange={handleChange} /></div>
            <div className="form-group-column"><label>पद:</label><input type="text" name="approverPosition" value={formData.approverPosition} onChange={handleChange} /></div>
          </div>
        </fieldset>

        <fieldset className="voucher-section">
          <legend>भौचर</legend>
          <div className="voucher-grid">
            <div className="form-group-column"><label>भौचर नं:</label><input type="text" name="voucherNo" value={formData.voucherNo} onChange={handleChange} /></div>
            <div className="form-group-column"><label>मिति:</label><input type="text" name="voucherDate" value={formData.voucherDate} onChange={handleChange} /></div>
            <div className="form-group-column"><label>रकम:</label><input type="text" name="voucherAmount" value={formData.voucherAmount} onChange={handleChange} /></div>
          </div>
        </fieldset>

        {/* applicant details */}
        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको नागरिकता नं *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको फोन नं *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "निवेदन दर्ता गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessRegistrationForm;
