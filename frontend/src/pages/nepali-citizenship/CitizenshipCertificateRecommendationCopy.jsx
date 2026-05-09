//नागरिकता प्रतिलिपि सिफारिस
import React, { useState, useEffect } from "react";
import "./CitizenshipCertificateRecommendationCopy.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "citizenship-certificate-copy";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipCertificateRecommendationCopy() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    // Header
    recipient_office_type: "जिल्ला",
    recipient_district: "काठमाडौँ",
    
    // Intro Para
    issue_office_district: "काठमाडौँ",
    copy_reason: "झुत्रो भएको",

    // Detail Grid (Nepali & English)
    prpn_no: "",
    issue_date: "",
    certificate_type: "नागरिकताको किसिम",
    
    full_name_np: "",
    full_name_en: "",
    
    sex_np: "पुरुष",
    sex_en: "Male",
    
    birth_place_np: "",
    birth_place_en: "",
    
    perm_district_np: "काठमाडौँ",
    perm_local_np: MUNICIPALITY?.name?.replace(" नगरपालिका", "") || "नागार्जुन",
    perm_ward_np: "१",
    perm_district_en: "Kathmandu",
    perm_local_en: MUNICIPALITY?.englishMunicipality || "Nagarjun Municipality",
    perm_ward_en: "1",
    
    dob_bs: "२०८२-१२-२८",
    dob_ad: "",
    
    father_name: "",
    father_address: "",
    father_cit_type: "नागरिकताको किसिम",
    
    mother_name: "",
    mother_address: "",
    mother_cit_type: "नागरिकताको किसिम",
    
    spouse_name: "",
    spouse_address: "",
    spouse_cit_type: "नागरिकताको किसिम",

    // Post-Grid Para
    issued_office: "",
    issued_no: "",

    // Signatures (Applicant)
    applicant_sign_name: "",
    applicant_sign_date: new Date().toISOString().slice(0, 10),

    // Recommendation Box
    rec_birth_local: "",
    rec_birth_ward: "१",
    rec_birth_date: "",
    rec_current_local: "",
    rec_current_ward: "१",
    rec_guardian_title: "श्रीमान्",
    rec_guardian_name: "",
    rec_relation_type: "छोरा",
    rec_applicant_title: "श्री",
    rec_applicant_name: "",
    rec_cit_no: "",
    rec_cit_date: "",
    rec_cit_reason: "झुत्रो भएको",
    
    rec_signatory_name: "",
    rec_signatory_position: "वडा अध्यक्ष",

    // Bottom Section
    bottom_date: new Date().toISOString().slice(0, 10),
    bottom_applicant_name: "",
    bottom_applicant_relation: "",
    bottom_sanakhat_name: "",

    // Footer Details (ApplicantDetailsNp)
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ 
        ...prev, 
        perm_ward_np: user.ward, 
        perm_ward_en: user.ward,
        rec_birth_ward: user.ward,
        rec_current_ward: user.ward
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.full_name_np.trim()) return "पूरा नाम आवश्यक छ।";
    if (!form.applicant_name) return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? body.message || JSON.stringify(body) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो` });
      window.print();
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ हुन सकेन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="cit-cert-rec-copy-container" onSubmit={handleSubmit}>
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
        <span className="top-right-bread">
          नेपाली नागरिकता &gt; नागरिकता प्रतिलिपि सिफारिस
        </span>
      </div>

      {/* HEADER */}
      <div className="form-header-simple">
        <p>श्री प्रमुख जिल्ला अधिकारी ज्यु</p>
        <p>
          <select name="recipient_office_type" className="inline-select" value={form.recipient_office_type} onChange={handleChange}>
            <option value="जिल्ला">जिल्ला</option>
            <option value="इलाका">इलाका</option>
          </select> प्रशासन कार्यालय
        </p>
        <p>
          <input name="recipient_district" className="dotted-input medium-input bold-text" value={form.recipient_district} onChange={handleChange} /> ।
        </p>
      </div>

      <div className="subject-section">
        <p>विषय: <u>नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।</u></p>
      </div>

      <div className="form-body">
        <p>महोदय,</p>
        <p className="body-paragraph indent-text">
          मैले जिल्ला <input name="issue_office_district" className="dotted-input small-input" value={form.issue_office_district} onChange={handleChange} /> प्रशासन कार्यालय काठमाडौँ बाट देहायको विवरण भएको नेपाली नागरिकता प्रमाणपत्र लिएकोमा सो प्रमाणपत्रको सक्कल 
          <select name="copy_reason" className="inline-select" value={form.copy_reason} onChange={handleChange}>
            <option value="झुत्रो भएको">झुत्रो भएको</option>
            <option value="हराएको">हराएको</option>
          </select> हुँदा सोको प्रतिलिपि पाउनको लागि यो नागरिकता प्रमाणपत्रको प्रति संलग्न राखि रु. १० (दश) को टिकट टाँसी सिफारिस सहित यो निवेदन पेश गरेको छु।
        </p>

        <p className="center-text bold-text mt-20 mb-10">मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ ।</p>

        {/* DETAILS GRID */}
        <div className="details-border-box">
          <div className="detail-grid-row">
            <div className="col-4">
              <label>१. ना.प्र.प.नं. :-</label>
              <input name="prpn_no" className="dotted-input" value={form.prpn_no} onChange={handleChange} />
            </div>
            <div className="col-4">
              <label>नागरिकता जारी मिति :-</label>
              <input type="date" name="issue_date" className="dotted-input" value={form.issue_date} onChange={handleChange} />
            </div>
            <div className="col-4 text-right">
              <label>किसिम :-</label>
              <select name="certificate_type" className="inline-select" value={form.certificate_type} onChange={handleChange}>
                <option value="नागरिकताको किसिम">नागरिकताको किसिम</option>
                <option value="वंशज">वंशज</option>
                <option value="अंगीकृत">अंगीकृत</option>
                <option value="जन्म">जन्म</option>
              </select>
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-6">
              <label>२. नाम थर : <span className="red">*</span></label>
              <input name="full_name_np" className="dotted-input long-input" value={form.full_name_np} onChange={handleChange} />
            </div>
          </div>
          <div className="detail-grid-row">
            <div className="col-12">
              <label className="en-label">FULL NAME (IN BLOCK) :- <span className="red">*</span></label>
              <input name="full_name_en" className="dotted-input extra-long-input uppercase" value={form.full_name_en} onChange={handleChange} />
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-6">
              <label>३. लिङ्ग :-</label>
              <select name="sex_np" className="inline-select" value={form.sex_np} onChange={handleChange}>
                <option value="पुरुष">पुरुष</option>
                <option value="महिला">महिला</option>
                <option value="अन्य">अन्य</option>
              </select>
            </div>
            <div className="col-6">
              <label className="en-label">Sex :-</label>
              <input name="sex_en" className="dotted-input small-input" value={form.sex_en} onChange={handleChange} />
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-6">
              <label>४. जन्म स्थान :- <span className="red">*</span></label>
              <input name="birth_place_np" className="dotted-input long-input" value={form.birth_place_np} onChange={handleChange} />
            </div>
          </div>
          <div className="detail-grid-row">
            <div className="col-12">
              <label className="en-label">PLACE OF BIRTH (IN BLOCK) :- <span className="red">*</span></label>
              <input name="birth_place_en" className="dotted-input extra-long-input uppercase" value={form.birth_place_en} onChange={handleChange} />
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-12">
              <label>५. स्थायी बासस्थान :</label>
            </div>
          </div>
          <div className="detail-grid-row">
            <div className="col-4">
              <label>जिल्ला : <span className="red">*</span></label>
              <input name="perm_district_np" className="dotted-input medium-input" value={form.perm_district_np} onChange={handleChange} />
            </div>
            <div className="col-4">
              <span className="red">*</span>
              <input name="perm_local_np" className="dotted-input medium-input" value={form.perm_local_np} onChange={handleChange} />
            </div>
            <div className="col-4 text-right">
              <label>वडा नं -</label>
              <input name="perm_ward_np" className="dotted-input tiny-input" value={form.perm_ward_np} onChange={handleChange} />
            </div>
          </div>
          <div className="detail-grid-row">
            <div className="col-4">
              <label className="en-label">Permanent Address:</label>
              <br/>
              <label className="en-label">District :</label>
              <input name="perm_district_en" className="dotted-input medium-input uppercase" value={form.perm_district_en} onChange={handleChange} />
            </div>
            <div className="col-4" style={{display: 'flex', alignItems: 'flex-end'}}>
              <input name="perm_local_en" className="dotted-input medium-input uppercase" value={form.perm_local_en} onChange={handleChange} />
            </div>
            <div className="col-4 text-right" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <label className="en-label">Ward no :-</label>
              <input name="perm_ward_en" className="dotted-input tiny-input" value={form.perm_ward_en} onChange={handleChange} />
            </div>
          </div>
          <div className="detail-grid-row">
             <div className="col-12">
                <span className="red" style={{fontSize: '0.85rem'}}>☐ (कानुनलाई जन्म मिति अघि दाबी गर्नु छ ?)</span>
             </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-6">
              <label>६. जन्म मिति (वि.सं.) : <span className="red">*</span></label>
              <input name="dob_bs" className="dotted-input medium-input" value={form.dob_bs} onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="en-label">Date of birth (A.D) : <span className="red">*</span></label>
              <input type="date" name="dob_ad" className="dotted-input" value={form.dob_ad} onChange={handleChange} />
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-4">
              <label>७. बाबुको नाम, थर : <span className="red">*</span></label>
              <input name="father_name" className="dotted-input full-width-input" value={form.father_name} onChange={handleChange} />
            </div>
            <div className="col-4">
              <label>बाबुको वतन : <span className="red">*</span></label>
              <input name="father_address" className="dotted-input full-width-input" value={form.father_address} onChange={handleChange} />
            </div>
            <div className="col-4 text-right">
              <label>नागरिकताको किसिम :</label>
              <select name="father_cit_type" className="inline-select" value={form.father_cit_type} onChange={handleChange}>
                <option value="नागरिकताको किसिम">नागरिकताको किसिम</option>
                <option value="वंशज">वंशज</option>
                <option value="अंगीकृत">अंगीकृत</option>
                <option value="जन्म">जन्म</option>
              </select>
            </div>
          </div>

          <div className="detail-grid-row mt-10">
            <div className="col-4">
              <label>८. आमाको नाम थर :</label>
              <input name="mother_name" className="dotted-input full-width-input" value={form.mother_name} onChange={handleChange} />
            </div>
            <div className="col-4">
              <label>आमाको वतन :</label>
              <input name="mother_address" className="dotted-input full-width-input" value={form.mother_address} onChange={handleChange} />
            </div>
            <div className="col-4 text-right">
              <label>नागरिकताको किसिम :</label>
              <select name="mother_cit_type" className="inline-select" value={form.mother_cit_type} onChange={handleChange}>
                <option value="नागरिकताको किसिम">नागरिकताको किसिम</option>
                <option value="वंशज">वंशज</option>
                <option value="अंगीकृत">अंगीकृत</option>
                <option value="जन्म">जन्म</option>
              </select>
            </div>
          </div>

          <div className="detail-grid-row mt-10 mb-10">
            <div className="col-4">
              <label>९. पति/पत्नीको नाम थर :</label>
              <input name="spouse_name" className="dotted-input full-width-input" value={form.spouse_name} onChange={handleChange} />
            </div>
            <div className="col-4">
              <label>पतिको वतन :</label>
              <input name="spouse_address" className="dotted-input full-width-input" value={form.spouse_address} onChange={handleChange} />
            </div>
            <div className="col-4 text-right">
              <label>नागरिकताको किसिम :</label>
              <select name="spouse_cit_type" className="inline-select" value={form.spouse_cit_type} onChange={handleChange}>
                <option value="नागरिकताको किसिम">नागरिकताको किसिम</option>
                <option value="वंशज">वंशज</option>
                <option value="अंगीकृत">अंगीकृत</option>
                <option value="जन्म">जन्म</option>
              </select>
            </div>
          </div>
        </div>
        {/* END DETAILS GRID */}

        <p className="body-paragraph mt-20">
          माथि उल्लेखित विवरण मेरो <span className="red">*</span> 
          <input name="issued_office" className="dotted-input medium-input" value={form.issued_office} onChange={handleChange} /> 
          कार्यालयबाट लिएको नं <span className="red">*</span> 
          <input name="issued_no" className="dotted-input small-input" value={form.issued_no} onChange={handleChange} /> 
          को ना.प्र.प. को व्यहोरा संग दुरुस्त छ फरक छैन। लेखिएको व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउँला ।
        </p>

        {/* THUMBPRINT & SIGNATURE */}
        <div className="signature-flex-container">
          <div className="thumbprint-container">
            <p className="thumbprint-title">औंठा छाप</p>
            <div className="thumbprint-boxes">
              <div className="thumb-box">दायाँ</div>
              <div className="thumb-box">बायाँ</div>
            </div>
          </div>
          <div className="signature-block">
            <p className="bold-text">भवदीय,</p>
            <p className="mt-10">निवेदकको दस्तखत: ................................</p>
            <p className="sig-row mt-10">नाम थर: <span className="red">*</span> <input name="applicant_sign_name" className="dotted-input medium-input" value={form.applicant_sign_name} onChange={handleChange} /></p>
            <p className="sig-row mt-10">मिति: <input type="date" name="applicant_sign_date" className="dotted-input medium-input" value={form.applicant_sign_date} onChange={handleChange} /></p>
          </div>
        </div>

        {/* RECOMMENDATION BOX */}
        <div className="recommendation-border-box">
          <h4 className="center-text bold-text underline-text mb-20">यो प्रतिलिपि ना.प्र.प. को लागि सिफारिस</h4>
          <p className="body-paragraph">
            <span className="red">*</span> <input name="rec_birth_local" className="dotted-input medium-input" value={form.rec_birth_local} onChange={handleChange} /> 
            वडा नं. <input name="rec_birth_ward" className="dotted-input tiny-input" value={form.rec_birth_ward} onChange={handleChange} /> 
            मा मिति <span className="red">*</span> <input type="date" name="rec_birth_date" className="dotted-input" value={form.rec_birth_date} onChange={handleChange} /> 
            मा जन्म भई हाल <span className="red">*</span> <input name="rec_current_local" className="dotted-input medium-input" value={form.rec_current_local} onChange={handleChange} /> 
            वडा नं. <span className="red">*</span> <input name="rec_current_ward" className="dotted-input tiny-input" value={form.rec_current_ward} onChange={handleChange} /> 
            मा स्थायी रुपमा बसोबास गरी आएका यसमा लेखिएका 
            <select name="rec_guardian_title" className="inline-select" value={form.rec_guardian_title} onChange={handleChange}>
              <option value="श्रीमान्">श्रीमान्</option>
              <option value="श्रीमती">श्रीमती</option>
            </select> 
            <span className="red">*</span> <input name="rec_guardian_name" className="dotted-input long-input" value={form.rec_guardian_name} onChange={handleChange} /> 
            को 
            <select name="rec_relation_type" className="inline-select" value={form.rec_relation_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="पत्नी">पत्नी</option>
            </select> 
            को 
            <select name="rec_applicant_title" className="inline-select" value={form.rec_applicant_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select> 
            <span className="red">*</span> <input name="rec_applicant_name" className="dotted-input long-input" value={form.rec_applicant_name} onChange={handleChange} /> 
            लाई म चिन्दछु । निजको माग बमोजिम उपयुक्त विवरण भएको नं <span className="red">*</span> 
            <input name="rec_cit_no" className="dotted-input small-input" value={form.rec_cit_no} onChange={handleChange} /> 
            मिति <input type="date" name="rec_cit_date" className="dotted-input" value={form.rec_cit_date} onChange={handleChange} /> 
            को नागरिकता प्रमाणपत्रको सक्कल प्रति 
            <select name="rec_cit_reason" className="inline-select" value={form.rec_cit_reason} onChange={handleChange}>
              <option value="झुत्रो भएको">झुत्रो भएको</option>
              <option value="हराएको">हराएको</option>
            </select> 
            व्यहोरा साँचो हुँदा प्रतिलिपि दिएमा फरक नपर्ने व्यहोरा सिफारिस गर्दछु । उक्त विवरण झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला ।
          </p>

          <div className="rec-footer-flex mt-20">
            <div className="photo-box-container">
              <div className="photo-box">
                दुवै कान देखिने हाल<br/>खिचिएको २.५ x ३<br/>से.मी. फोटो
              </div>
            </div>
            <div className="office-stamp-container center-text">
              <p>कार्यालयको नाम र छाप</p>
              <p className="bold-text">{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</p>
            </div>
            <div className="rec-signatory-container">
              <p>सिफारिस गर्नेको :</p>
              <p className="mt-10">दस्तखत: ........................</p>
              <p className="sig-row mt-10">नाम थर <span className="red">*</span> <input name="rec_signatory_name" className="dotted-input medium-input" value={form.rec_signatory_name} onChange={handleChange} /></p>
              <p className="sig-row mt-10">पद 
                <select name="rec_signatory_position" className="inline-select medium-input" value={form.rec_signatory_position} onChange={handleChange}>
                  <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                  <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
                </select>
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ADMIN SECTION */}
        <div className="bottom-admin-section center-text mt-30">
          <p>मिति <input type="date" name="bottom_date" className="dotted-input" value={form.bottom_date} onChange={handleChange} /></p>
          <p>जिल्ला प्रशासन कार्यालय, काठमाडौँ</p>
          <p>बाट</p>
        </div>
        <p className="body-paragraph mt-20">
          निवेदक श्री <input name="bottom_applicant_name" className="dotted-input medium-input" value={form.bottom_applicant_name} onChange={handleChange} /> नाता भएकोले निजले मागअनुसार पतिको नाम थर वतन समावेश गरि नागरिकता प्रमाणपत्रको प्रतिलिपि दिएको कुनै फरक पर्दैन। व्यहोरा साँचो हो, झुठो ठहरे ऐन-कानुनअनुसारको सजाय भोग्न तयार छु भनि सहिछाप गर्ने निवेदकको <input name="bottom_applicant_relation" className="dotted-input small-input" value={form.bottom_applicant_relation} onChange={handleChange} /> नाता पर्ने म <input name="bottom_sanakhat_name" className="dotted-input medium-input" value={form.bottom_sanakhat_name} onChange={handleChange} />
        </p>
      </div>

      {/* APPLICANT DETAILS FOOTER */}
      <div className="hide-print mt-30">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      <div className="form-footer hide-print">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
        {message && <div style={{ marginTop: 15, color: message.type === "error" ? "crimson" : "green", fontWeight: "bold" }}>{message.text}</div>}
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}