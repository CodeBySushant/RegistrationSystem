// src/pages/application/BusinessRegistrationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessRegistrationApplicationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig.js";

const initialState = {
  headerMunicipality: MUNICIPALITY?.name || "",
  headerOffice: MUNICIPALITY?.englishDistrict || "",
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
  applicantPhone: "", // defaults
  municipality: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const BusinessRegistrationApplicationForm = () => {
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
    setProprietors((p) => [
      ...p,
      { id: p.length + 1, name: "", address: "", ward: "" },
    ]);
  };

  const validate = (data) => {
    if (!data.businessName || data.businessName.trim() === "")
      return "businessName is required";
    if (!data.applicantName || data.applicantName.trim() === "")
      return "applicantName is required";
    const anyProp = proprietors.some(
      (pr) => pr.name?.trim() || pr.address?.trim() || pr.ward?.trim()
    );
    if (!anyProp) return "At least one proprietor is required"; // optional phone check
    if (
      data.applicantPhone &&
      !/^[0-9+\-\s]{6,20}$/.test(String(data.applicantPhone))
    ) {
      return "applicantPhone (invalid format)";
    }
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
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      }); // attach proprietors as JSON string (backend expects stringified)

      payload.proprietors = JSON.stringify(proprietors);

      const url = "/api/forms/business-registration";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        setProprietors([{ id: 1, name: "", address: "", ward: "" }]);
        setTimeout(() => window.print(), 150);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="business-reg-container">
           {" "}
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          व्यवसाय दर्ता गर्ने दरखास्त।
          <span className="top-right-bread">
            व्यापार / व्यवसाय &gt; व्यवसाय दर्ता गर्ने दरखास्त
          </span>
        </div>
                                {/* Header (श्री... ज्यू) */}       {" "}
        <div className="shree-block">
          {/* First row */}
          <div className="shree-row">
            <span>श्री</span>
            <span className="required">*</span>
            <input type="text" className="inline-input name-input" />
            <span>ज्यू,</span>
          </div>

          {/* Below stacked inputs */}
          <div className="shree-stack">
            <div className="stack-row">
              <span className="required">*</span>
              <input type="text" className="stack-input" />
            </div>

            <div className="stack-row">
              <span className="required">*</span>
              <input type="text" className="stack-input" />
            </div>

            <div className="stack-row">
              <span className="required">*</span>
              <input type="text" className="stack-input" />
            </div>
          </div>
        </div>
        <div className="subject-line">
                   {" "}
          <strong>
            विषय: <u>व्यवसाय दर्ता गर्ने बारे।</u>
          </strong>
        </div>
        <p className="certificate-body">
          <br />
          महोदय,
          <br />
          तल लेखिए बमोजिमको व्यहोरा जनाइ म / हामी निम्न लिखित फर्म/कम्पनि
          व्यवसाय दर्ता गरी पाउन रीतपूर्वक निवेदन पेस गरेको छु। निवेदन साथ
          सक्कली कागजातहरु यसै साथ संलग्न छ। सो को जाँचबुझ गरी कानुन बमोजिम
          दर्ता गरिदिनुहुन अनुरोध छ।        {" "}
        </p>
                {/* main fields - using form-group-flex for alignment */}       {" "}
        <div className="form-section">
                    {/* 1. व्यवसायको पूरा नाम: & Pan */}         {" "}
          <div className="form-group-flex">
                        <label>१. व्यवसायको पूरा नाम (नेपालीमा):</label>       
               {" "}
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>
                    {/* Phone & Email */}         {" "}
          <div className="form-group-flex">
                       {" "}
            <label>२. व्यवसायको पुरा नाम (अंग्रेजिको ठुलो अक्षरमा):</label>     
                 {" "}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
                    {/* 2. व्यवसायको ठेगाना: टोल: बाटो: घर नं: */}         {" "}
          <div className="form-group-flex">
                        <label>३. व्यवसायको पुरा ठेगाना:</label>           {" "}
            <input
              type="text"
              name="businessTole"
              value={formData.businessTole}
              onChange={handleChange}
            />
                        <label>जिल्ला</label>           {" "}
            <input
              type="text"
              name="businessRoad"
              value={formData.businessRoad}
              onChange={handleChange}
            />
                        <label>वडा नं</label>           {" "}
            <input
              type="text"
              name="businessRoad"
              value={formData.businessRoad}
              onChange={handleChange}
            />
                        <label>टोल</label>           {" "}
            <input
              type="text"
              name="businessRoad"
              value={formData.businessRoad}
              onChange={handleChange}
            />
                        <label>फोन नं</label>           {" "}
            <input
              type="text"
              name="businessHouseNo"
              value={formData.businessHouseNo}
              onChange={handleChange}
            />
                     {" "}
          </div>
                    {/* 3. व्यवसाय रहेको घरको मुख्य ब्यक्ति/घरधनीको: */}       
           {" "}
          <div className="form-group-flex">
                        <label>४. व्यवसायमा लगाउने पूँजी रु:</label>           {" "}
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            (<label> अक्षरेपी रु</label>           {" "}
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            )          {" "}
          </div>
                    {/* 4. फर्म दर्ताको प्रकृति: */}         {" "}
          <div className="form-group-flex">
            <label>५. व्यवसायको उद्देश्य:</label>

            <select
              name="regNature"
              value={formData.regNature}
              onChange={handleChange}
              className="biz-select"
            >
              <option value="">-- उद्देश्य छनोट गर्नुहोस् --</option>
              <option value="व्यापार">स्थानीय व्यापार</option>
              <option value="सेवा">सेवामुलक व्यवसाय</option>
            </select>
          </div>
          <div className="kinship-row">
            <div className="form-group-flex">
                           {" "}
              <label>६. व्यवसायले कारोवार गर्ने मुख्य वस्तुको विवरण:</label>
              <input
                type="text"
                name="fatherInLawName"
                value={formData.fatherInLawName}
                onChange={handleChange}
              />
            </div>
                     {" "}
          </div>
          <div className="form-group-flex">
                        <label>७. प्रोप्राइटरको पुरा नाम:</label>           {" "}
            <input
              type="text"
              name="citizenAddress"
              value={formData.citizenAddress}
              onChange={handleChange}
            />
                     {" "}
          </div>
                   
          <div className="form-group-flex">
                        <label>स्थायी ठेगाना ,नागरिकता अनुसार:- जिल्ला</label> 
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
            />
            <label> वडा नं</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> टोलको नाम</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> फोन नं</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> नागरिकता नं</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> जिल्ला</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> ना.प्र. जारी मिती</label> 
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <label> हालको ठेगाना</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> जिल्ला</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label> वडा नं</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label>टोलको नाम</label> 
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-flex">
                          <label>८.प्रोप्राइटरको तिन पुस्तेनाम,ठेगाना:</label> 
                       {" "}
          </div>
          <div className="form-group-flex">
                          <label>(क) प्रोप्राइटरको बाजेको नाम:</label>         
               {" "}
            <input
              type="text"
              name="propGrandfatherName"
              value={formData.propGrandfatherName}
              onChange={handleChange}
            />
                          <label>ठेगाना:</label>             {" "}
            <input
              type="text"
              name="propGrandfatherAddress"
              value={formData.propGrandfatherAddress}
              onChange={handleChange}
            />
                       {" "}
          </div>
          <div className="form-group-flex">
                          <label>(ख) प्रोप्राइटरको बाबुको नाम:</label>         
               {" "}
            <input
              type="text"
              name="propGrandfatherName"
              value={formData.propGrandfatherName}
              onChange={handleChange}
            />
                          <label>ठेगाना:</label>             {" "}
            <input
              type="text"
              name="propGrandfatherAddress"
              value={formData.propGrandfatherAddress}
              onChange={handleChange}
            />
                       {" "}
          </div>
          <div className="form-group-flex">
                         {" "}
            <label>(ग) प्रोप्राइटरको विवाहित महिला भएमा पतिको नाम:</label>     
                   {" "}
            <input
              type="text"
              name="propGrandfatherName"
              value={formData.propGrandfatherName}
              onChange={handleChange}
            />
                          <label>ठेगाना:</label>             {" "}
            <input
              type="text"
              name="propGrandfatherAddress"
              value={formData.propGrandfatherAddress}
              onChange={handleChange}
            />
                       {" "}
          </div>
                 {" "}
        </div>
        <div className="right-row-wrapper">
          <div className="right-row-title">निवेदक</div>

          <div className="right-row">
            <label className="right-label">
              प्रोप्राइटरको नाम :<span className="required-star">*</span>
            </label>

            <input
              type="text"
              name="proprietorName"
              value={formData.proprietorName || ""}
              onChange={handleChange}
              className="right-row-input"
            />
          </div>
        </div>
        <div className="right-signature-wrapper">
          {/* Signature row */}
          <div className="signature-row">
            <label>सही :</label>
            <input
              type="text"
              name="signature"
              value={formData.signature || ""}
              onChange={handleChange}
              className="signature-input"
            />
          </div>

          {/* Thumb box */}
          <div className="thumb-box-wrapper">
            <div className="thumb-header">
              <span>दायाँ</span>
              <span>बायाँ</span>
            </div>

            <div className="thumb-body">
              <div className="thumb-cell"></div>
              <div className="thumb-cell"></div>
            </div>
          </div>
        </div>
        {/* kabuliyatnama*/}
        <div className="kabuliyat-wrapper">
          <div className="kabuliyat-title">कबुलियतनामा</div>

          {/* Paragraph */}
          <p className="kabuliyat-text">
            लिखितम्
            <span className="required">*</span>
            <input className="inline-input long" />
            को नातो
            <select className="inline-select">
              <option>नाति</option>
              <option>नातिनी</option>
            </select>
            <span className="required">*</span>
            <input className="inline-input medium" />
            को छोरा
            <select className="inline-select">
              <option value="">छनोट</option>
              <option>छोरा</option>
              <option>छोरी</option>
            </select>
            <span className="required">*</span>
            <input className="inline-input medium" />
            बसे वर्ष
            <span className="required">*</span>
            <input className="inline-input small" />
            को
            <span className="required">*</span>
            <input className="inline-input medium" />
            अगाडि
            <span className="required">*</span>
            <input className="inline-input medium" />
            को नामले व्यवसाय दर्ता गर्न निले यस वडा कार्यालयमा दरखास्त दिएकोमा
            उक्त व्यवसाय सम्बन्धमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा
            नियम समेत पालना गरी काम गर्नेछु। सो पालना गर्ने कुरामा कबुलियत समेत
            गर्ने तपाईको मंजुर छ / छैन भनी वडा कार्यालयबाट सोधनी भएकोमा मेरो
            चित्त बुझ्यो। यसमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा नियम
            उल्लंघन गरेको देखिएमा ऐन कानुन बमोजिम सहुँला, बुझाउँला पनि मेरो
            मनोमानी राजी खुशी संग यो कबुलियत नामको कागज लेखी
            <span className="required">*</span>
            <input className="inline-input medium" />
            वडा नं
            <span className="required">*</span>
            <input className="inline-input small" />
            को कार्यालयमा चढाएँ।
          </p>
        </div>
        <div className="date-center-row">
          <span>ईतिसंवत</span>
          <span className="required">*</span>
          <input className="date-input small" />
          <span>साल</span>
          <span className="required">*</span>
          <input className="date-input small" />
          <span>महिना</span>
          <span className="required">*</span>
          <input className="date-input small" />
          <span>गतेरोज</span>
          <span className="required">*</span>
          <input className="date-input small" />
          <span>शुभम्</span>{" "}
        </div>
        <div className="sanakhat-title">(सनाखत सम्बन्धी कागजात)</div>
        <div className="sanakhat-paragraph">
          यसमा लेखिएको फारम तथा कबुलियतनामा म आफै स्वयं
          <span className="required">*</span>
          <input type="text" name="self_name" className="inline-input long" />
          को
          <span className="required">*</span>
          <input type="text" name="ward_no" className="inline-input small" />
          नं वडा कार्यालयमा उपस्थित भई दर्ता गरिएको हुँ । निवेदन संग संलग्न
          नागरिकता प्रमाणपत्रको प्रतिलिपी फोटो तथा अन्य कागजातहरु मेरा आफ्नै
          हुन् । माथि उल्लिखित सम्पूर्ण व्यहोरा समेत साँचो हो । कुनै कुरा फरक
          परेमा कानून बमोजिम सहुँला बुझाउँला पनि सनाखत गर्ने ।
        </div>
        <div className="right-signature-wrapper">
          {/* Signature row */}
          <div className="signature-row">
            <label>सही :</label>
            <input
              type="text"
              name="signature"
              value={formData.signature || ""}
              onChange={handleChange}
              className="signature-input"
            />
          </div>

          {/* Thumb box */}
          <div className="thumb-box-wrapper">
            <div className="thumb-header">
              <span>दायाँ</span>
              <span>बायाँ</span>
            </div>

            <div className="thumb-body">
              <div className="thumb-cell"></div>
              <div className="thumb-cell"></div>
            </div>
          </div>
        </div>
        <div className="tippani-section">
          {/* Heading */}
          <div className="tippani-heading">
            <h3>टिप्पणी</h3>
            <p>(वडा कार्यालयले मात्र भर्ने)</p>
          </div>

          {/* Paragraph */}
          <div className="tippani-paragraph">
            श्रीमान्
            <span className="required">*</span>
            <input className="inline-input medium" />
            नामक व्यवसाय
            <span className="required">*</span>
            <input className="inline-input long" />
            को नाममा दर्ता गरी पाउन आवश्यक सबै कागजातहरु रितपूर्वक पेश हुन आएको
            माग बमोजिम दर्ता गरिदिन मनासिव र<span className="required">*</span>
            अख्तेयी र<span className="required">*</span>
            <input className="inline-input medium" />
            राजश्व लिई निजको नाममा व्यवसाय दर्ता गरी प्रमाणपत्र दिनको निमित्त
            निर्णयार्थ पेश गरेको छु ।
          </div>

          {/* Bottom signature row */}
          <div className="tippani-footer">
            <div className="tippani-sign">
              <span className="required">*</span>
              <input className="line-input" />
              <label>पेश गर्ने</label>
            </div>

            <div className="tippani-sign">
              <span className="required">*</span>
              <input className="line-input" />
              <label>सदर गर्ने</label>
            </div>
          </div>
        </div>
                {/* Applicant Details (For backend data submission) */}       {" "}
        
                {/* Submit Area */}       {" "}
        <div className="submit-area">
                   {" "}
          <button type="submit" className="submit-btn" disabled={submitting}>
                       {" "}
            {submitting ? "पठाइँ हुँदैछ..." : "निवेदन दर्ता गर्नुहोस्"}         {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </form>
         {" "}
    </div>
  );
};

export default BusinessRegistrationApplicationForm;
