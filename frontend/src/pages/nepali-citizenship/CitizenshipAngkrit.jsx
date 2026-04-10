import React, { useState, useEffect, useRef } from "react";
import "./CitizenshipAngkrit.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axios from "../../utils/axiosInstance";

const FORM_KEY = "citizenship-angkrit";
const API_URL = `/api/forms/${FORM_KEY}`;

const emptyFamilyRow = () => ({ name: "", relation: "", age: "" });

const buildInitialState = (ward) => ({
  dao_district: "काठमाडौँ",
  applicant_name_body: "",
  application_fee: "",
  main_applicant_name: "",
  birth_place: "",
  dob: "",
  perm_district: "काठमाडौँ",
  perm_municipality: MUNICIPALITY?.name || "",
  perm_ward: ward ? String(ward) : "१",
  perm_tole: "",
  father_name: "",
  father_nationality: "",
  mother_name: "",
  mother_nationality: "",
  husband_name: "",
  husband_nationality: "",
  religion: "",
  education: "",
  occupation: "",
  marriage_date: "",
  residence_years: "",
  language_spoken: "नेपाली",
  foreign_citizenship_renounced: "",
  other_country_citizenship: "नलिएको",
  nepal_business: "",
  family_members: [emptyFamilyRow()],
  sign_date: new Date().toISOString().slice(0, 10),

  rec_municipality: MUNICIPALITY?.name || "",
  rec_ward: ward ? String(ward) : "१",
  rec_father_name: "",
  rec_relation_type: "छोरा",
  rec_name: "",
  rec_signatory_name: "",
  rec_signatory_position: "",
  rec_date: new Date().toISOString().slice(0, 10),

  cert_dao_district: "",
  cert_no: "",
  cert_name: "",
  cert_birth_place: "",
  cert_dob: "",
  cert_perm_district: "",
  cert_perm_municipality: MUNICIPALITY?.name || "",
  cert_perm_ward: ward ? String(ward) : "१",
  cert_perm_tole: "",
  cert_father_name: "",
  cert_father_address: "",
  cert_father_citizenship: "",
  cert_mother_name: "",
  cert_mother_address: "",
  cert_mother_citizenship: "",
  cert_husband_name: "",
  cert_husband_address: "",
  cert_husband_citizenship: "",
  cert_officer_name: "",
  cert_officer_position: "",
  cert_date: new Date().toISOString().slice(0, 10),

  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",

  status: "pending",
});

export default function CitizenshipAngkrit() {
  const { user } = useAuth();

  const [form, setForm] = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const pendingPrintRef = useRef(false);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({
        ...prev,
        perm_ward: String(user.ward),
        rec_ward: String(user.ward),
        cert_perm_ward: String(user.ward),
      }));
    }
  }, [user]);

  useEffect(() => {
    if (pendingPrintRef.current) {
      pendingPrintRef.current = false;
      const t = setTimeout(() => window.print(), 200);
      return () => clearTimeout(t);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateFamilyRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addFamilyRow = () =>
    setForm((prev) => ({
      ...prev,
      family_members: [...prev.family_members, emptyFamilyRow()],
    }));

  const removeFamilyRow = (idx) => {
    if (form.family_members.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    if (!form.main_applicant_name.trim())
      return "निवेदकको नाम (फारम भित्र) आवश्यक छ।";
    if (!form.cert_name.trim()) return "प्रमाणपत्रमा नाम आवश्यक छ।";
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
      const payload = {
        ...form,
        family_members: JSON.stringify(form.family_members),
        perm_ward: String(form.perm_ward),
        rec_ward: String(form.rec_ward),
        cert_perm_ward: String(form.cert_perm_ward),
      };

      const res = await axios.post(API_URL, payload);

      if (res.status === 200 || res.status === 201) {
        setMessage({
          type: "success",
          text: "रेकर्ड सफलतापूर्वक सेभ भयो । ID: " + (res.data?.id ?? ""),
        });
        pendingPrintRef.current = true;
        setForm(buildInitialState(user?.ward));
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "सेभ गर्न सकिएन",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="angkrit-citizenship-container"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र ।
        <span className="top-right-bread">
          नेपाली नागरिकता &gt; अंगीकृत नेपाली नागरिकता
        </span>
      </div>

      {/* ANUSUCHI - 7 */}
      <div className="schedule-section">
        <div className="schedule-header">
          <h3 className="schedule-title">अनुसूची-७</h3>
          <p className="rule-text">
            (नियम ९ को उपनियम (१), नियम १४ को उपनियम (१) र नियम १५ सँग
            सम्बन्धित)
          </p>
          <h2 className="form-type-title">
            अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि दिइने निवेदन
          </h2>
        </div>

        <div className="addressee-section">
          <p>श्रीमान् प्रमुख जिल्ला अधिकारी ज्यू,</p>
          <p>
            जिल्ला प्रशासन कार्यालय,{" "}
            <input
              name="dao_district"
              className="f-input medium-input"
              value={form.dao_district}
              onChange={handleChange}
            />{" "}
            ।
          </p>
        </div>

        <div className="subject-section">
          <p>विषय : <u>नेपाली नागरिकताको प्रमाण-पत्र पाऊँ ।</u></p>
        </div>

        <div className="form-body">
          <p>महोदय,</p>
          <p className="body-paragraph indent-text">
            मेरो जन्म नेपालमा भई नेपालमा नै स्थायी बसोबास गर्दै आएको /{" "}
            <input
              name="applicant_name_body"
              className="f-input long-input"
              value={form.applicant_name_body}
              onChange={handleChange}
              placeholder="नाम"
            />{" "}
            ले जन्मको नाताले नेपाली नागरिकताको प्रमाण-पत्र पाएको हुँदा
            नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि तोकिएको दस्तुर रु.{" "}
            <input
              name="application_fee"
              className="f-input small-input"
              value={form.application_fee}
              onChange={handleChange}
            />{" "}
            यसै साथ राखी यो निवेदन पत्र चढाएको छु ।
          </p>

          <div className="details-list">
            <p className="bold-text">१. मेरो विवरण :</p>
            <div className="details-indent">

              <div className="detail-row">
                <label>(क) नाम, थर : <span className="red">*</span></label>
                <input name="main_applicant_name" className="f-input long-input" value={form.main_applicant_name} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ख) जन्म स्थान : <span className="red">*</span></label>
                <input name="birth_place" className="f-input long-input" value={form.birth_place} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ग) जन्म मिति : <span className="red">*</span></label>
                <input type="date" name="dob" className="f-input date-input" value={form.dob} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(घ) स्थायी ठेगाना : <span className="red">*</span></label>
                <span className="sep-label">जिल्ला</span>
                <input name="perm_district" className="f-input small-input" value={form.perm_district} onChange={handleChange} />
                <span className="sep-label">गा.पा./न.पा.</span>
                <input name="perm_municipality" className="f-input medium-input" value={form.perm_municipality} onChange={handleChange} />
                <span className="sep-label">वडा नं.</span>
                <input name="perm_ward" className="f-input tiny-input" value={form.perm_ward} onChange={handleChange} />
                <span className="sep-label">गाउँ/टोल</span>
                <input name="perm_tole" className="f-input medium-input" value={form.perm_tole} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ङ) बाबुको नाम, थर : <span className="red">*</span></label>
                <input name="father_name" className="f-input medium-input" value={form.father_name} onChange={handleChange} />
                <span className="sep-label">राष्ट्रियता :</span>
                <input name="father_nationality" className="f-input small-input" value={form.father_nationality} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(च) आमाको नाम, थर : <span className="red">*</span></label>
                <input name="mother_name" className="f-input medium-input" value={form.mother_name} onChange={handleChange} />
                <span className="sep-label">राष्ट्रियता :</span>
                <input name="mother_nationality" className="f-input small-input" value={form.mother_nationality} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(छ) पतिको नाम, थर :</label>
                <input name="husband_name" className="f-input medium-input" value={form.husband_name} onChange={handleChange} />
                <span className="sep-label">राष्ट्रियता :</span>
                <input name="husband_nationality" className="f-input small-input" value={form.husband_nationality} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ज) धर्म :</label>
                <input name="religion" className="f-input medium-input" value={form.religion} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(झ) शैक्षिक योग्यता :</label>
                <input name="education" className="f-input medium-input" value={form.education} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ञ) पेशा :</label>
                <input name="occupation" className="f-input medium-input" value={form.occupation} onChange={handleChange} />
              </div>

              <div className="detail-row">
                <label>(ट) विवाह भएको मिति (विवाहितको हकमा) :</label>
                <input type="date" name="marriage_date" className="f-input date-input" value={form.marriage_date} onChange={handleChange} />
              </div>
            </div>

            <div className="detail-row mt-10">
              <label>२. नेपालमा बसोबास गरेको वर्ष : <span className="red">*</span></label>
              <input name="residence_years" className="f-input small-input" value={form.residence_years} onChange={handleChange} />
            </div>

            <div className="detail-row">
              <label>३. नेपाली भाषा वा अन्य कुन भाषा बोल्न र लेख्न जानेको छ : <span className="red">*</span></label>
              <input name="language_spoken" className="f-input medium-input" value={form.language_spoken} onChange={handleChange} />
            </div>

            <div className="detail-row">
              <label>४. विदेशी नागरिकता त्यागेको वा त्याग्न कारवाही चलाएको निस्सा : <span className="red">*</span></label>
              <input name="foreign_citizenship_renounced" className="f-input long-input" value={form.foreign_citizenship_renounced} onChange={handleChange} />
            </div>

            <div className="detail-row">
              <label>५. अन्य देशको नागरिकता लिए/नलिएको : <span className="red">*</span></label>
              <input name="other_country_citizenship" className="f-input small-input" value={form.other_country_citizenship} onChange={handleChange} />
            </div>

            <div className="detail-row">
              <label>६. नेपालमा कुनै पेशा वा व्यवसाय गरी बसेको भए सो को विवरण :</label>
              <input name="nepal_business" className="f-input long-input" value={form.nepal_business} onChange={handleChange} />
            </div>

            <div className="detail-row mt-10">
              <label className="bold-text">
                ७. सगोलका परिवारका सदस्यहरुको विवरण : <span className="red">*</span>
              </label>
            </div>

            <table className="details-table mb-20">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>क्र.स.</th>
                  <th>नाम, थर</th>
                  <th style={{ width: "22%" }}>नाता</th>
                  <th style={{ width: "15%" }}>उमेर</th>
                  <th className="hide-print" style={{ width: "7%" }}></th>
                </tr>
              </thead>
              <tbody>
                {form.family_members.map((row, idx) => (
                  <tr key={idx}>
                    <td className="center-text">{idx + 1}</td>
                    <td><input className="table-input" value={row.name} onChange={updateFamilyRow(idx, "name")} /></td>
                    <td><input className="table-input" value={row.relation} onChange={updateFamilyRow(idx, "relation")} /></td>
                    <td><input className="table-input" value={row.age} onChange={updateFamilyRow(idx, "age")} /></td>
                    <td className="action-cell hide-print">
                      {idx === 0 ? (
                        <button type="button" className="add-btn" onClick={addFamilyRow}>+</button>
                      ) : (
                        <button type="button" className="remove-btn" onClick={() => removeFamilyRow(idx)}>×</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="detail-row bold-text">
              <label>
                ८. मैले नेपाली नागरिकताको प्रमाण-पत्र पाएमा नेपाल राज्य र नेपाल
                सरकारप्रति बफादार रही नेपालको संविधान र प्रचलित कानुनको पूर्ण
                रुपले पालना गर्नेछु ।
              </label>
            </div>
          </div>

          <div className="signature-flex-container">
            <div className="thumbprint-container">
              <p className="thumbprint-title">औंठा छाप</p>
              <div className="thumbprint-boxes">
                <div className="thumb-box">
                  <span className="thumb-label">दायाँ</span>
                  <div className="thumb-inner" />
                </div>
                <div className="thumb-box">
                  <span className="thumb-label">बायाँ</span>
                  <div className="thumb-inner" />
                </div>
              </div>
            </div>
            <div className="signature-block">
              <p>निवेदकको सही: ................................</p>
              <p>
                मिति:{" "}
                <input type="date" name="sign_date" className="f-input date-input" value={form.sign_date} onChange={handleChange} />
              </p>
            </div>
          </div>
        </div>

        {/* WARD RECOMMENDATION */}
        <div className="recommendation-section">
          <h3 className="section-title center-text underline-text">सिफारिस</h3>
          <p className="body-paragraph indent-text">
            यसमा लेखिएको व्यहोरा ठिक साँचो हो, झुठा ठहरे कानुन बमोजिम सहुँला
            बुझाउँला भनी यस{" "}
            <input name="rec_municipality" className="f-input medium-input" value={form.rec_municipality} onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input name="rec_ward" className="f-input tiny-input" value={form.rec_ward} onChange={handleChange} />{" "}
            मा बस्ने श्री{" "}
            <input name="rec_father_name" className="f-input medium-input" value={form.rec_father_name} onChange={handleChange} />{" "}
            को{" "}
            <select name="rec_relation_type" className="f-select" value={form.rec_relation_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="पत्नी">पत्नी</option>
            </select>{" "}
            श्री{" "}
            <input name="rec_name" className="f-input medium-input" value={form.rec_name} onChange={handleChange} />{" "}
            ले मेरो रोहवरमा सहीछाप गरेको साँचो हो । निजलाई अंगीकृत नेपाली
            नागरिकताको प्रमाण-पत्र दिएमा फरक पर्दैन भनी सिफारिस गर्दछु ।
          </p>
          <div className="rec-signature-block">
            <p>सिफारिस गर्नेको सही: ........................</p>
            <div className="sig-row">
              <span className="sep-label">नाम:</span>
              <input name="rec_signatory_name" className="f-input medium-input" value={form.rec_signatory_name} onChange={handleChange} />
            </div>
            <div className="sig-row">
              <span className="sep-label">पद:</span>
              <select name="rec_signatory_position" className="f-select" value={form.rec_signatory_position} onChange={handleChange}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
            </div>
            <p>
              मिति:{" "}
              <input type="date" name="rec_date" className="f-input date-input" value={form.rec_date} onChange={handleChange} />
            </p>
          </div>
        </div>
      </div>

      {/* ANUSUCHI - 8 */}
      <div className="anusuchi-8-section">
        <div className="schedule-header">
          <h3 className="schedule-title">अनुसूची-८</h3>
          <p className="rule-text">(नियम ९ को उपनियम (२) सँग सम्बन्धित)</p>
          <h2 className="form-type-title">अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र</h2>
        </div>

        <div className="gov-header center-text">
          <p className="bold-text">नेपाल सरकार</p>
          <p className="bold-text">गृह मन्त्रालय</p>
          <p className="bold-text">
            जिल्ला प्रशासन कार्यालय{" "}
            <input name="cert_dao_district" className="f-input medium-input" value={form.cert_dao_district} onChange={handleChange} />
          </p>
        </div>

        <div className="certificate-body">
          <div className="cert-row right-align">
            <label>प्रमाणपत्र नं. :</label>
            <input name="cert_no" className="f-input medium-input" value={form.cert_no} onChange={handleChange} />
          </div>

          <div className="cert-row mt-10">
            <label>१. नाम, थर : <span className="red">*</span></label>
            <input name="cert_name" className="f-input long-input" value={form.cert_name} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>२. जन्म स्थान : <span className="red">*</span></label>
            <input name="cert_birth_place" className="f-input long-input" value={form.cert_birth_place} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>३. जन्म मिति वा उमेर : <span className="red">*</span></label>
            <input type="date" name="cert_dob" className="f-input date-input" value={form.cert_dob} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>४. स्थायी ठेगाना : <span className="red">*</span></label>
            <span className="sep-label">जिल्ला</span>
            <input name="cert_perm_district" className="f-input small-input" value={form.cert_perm_district} onChange={handleChange} />
            <span className="sep-label">गा.पा./न.पा.</span>
            <input name="cert_perm_municipality" className="f-input medium-input" value={form.cert_perm_municipality} onChange={handleChange} />
            <span className="sep-label">वडा नं.</span>
            <input name="cert_perm_ward" className="f-input tiny-input" value={form.cert_perm_ward} onChange={handleChange} />
            <span className="sep-label">टोल</span>
            <input name="cert_perm_tole" className="f-input medium-input" value={form.cert_perm_tole} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>५. बाबुको नाम, थर : <span className="red">*</span></label>
            <input name="cert_father_name" className="f-input medium-input" value={form.cert_father_name} onChange={handleChange} />
            <span className="sep-label">ठेगाना :</span>
            <input name="cert_father_address" className="f-input medium-input" value={form.cert_father_address} onChange={handleChange} />
            <span className="sep-label">नागरिकता :</span>
            <input name="cert_father_citizenship" className="f-input small-input" value={form.cert_father_citizenship} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>६. आमाको नाम, थर : <span className="red">*</span></label>
            <input name="cert_mother_name" className="f-input medium-input" value={form.cert_mother_name} onChange={handleChange} />
            <span className="sep-label">ठेगाना :</span>
            <input name="cert_mother_address" className="f-input medium-input" value={form.cert_mother_address} onChange={handleChange} />
            <span className="sep-label">नागरिकता :</span>
            <input name="cert_mother_citizenship" className="f-input small-input" value={form.cert_mother_citizenship} onChange={handleChange} />
          </div>

          <div className="cert-row">
            <label>७. पतिको नाम, थर :</label>
            <input name="cert_husband_name" className="f-input medium-input" value={form.cert_husband_name} onChange={handleChange} />
            <span className="sep-label">ठेगाना :</span>
            <input name="cert_husband_address" className="f-input medium-input" value={form.cert_husband_address} onChange={handleChange} />
            <span className="sep-label">नागरिकता :</span>
            <input name="cert_husband_citizenship" className="f-input small-input" value={form.cert_husband_citizenship} onChange={handleChange} />
          </div>

          <p className="body-paragraph indent-text mt-20">
            निजले नेपालको संविधान बमोजिम अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाएको छ ।
          </p>

          <div className="cert-signature-block">
            <p className="bold-text">प्रमाणपत्र दिने अधिकारीको :</p>
            <p>सही : ........................</p>
            <div className="sig-row">
              <span className="sep-label">नाम, थर :</span>
              <input name="cert_officer_name" className="f-input medium-input" value={form.cert_officer_name} onChange={handleChange} />
            </div>
            <div className="sig-row">
              <span className="sep-label">पद :</span>
              <input name="cert_officer_position" className="f-input medium-input" value={form.cert_officer_position} onChange={handleChange} />
            </div>
            <p>मिति : <input type="date" name="cert_date" className="f-input date-input" value={form.cert_date} onChange={handleChange} /></p>
          </div>
        </div>
      </div>

      {/* APPLICANT DETAILS FOOTER */}
      <div className="hide-print mt-20">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      <div className="form-footer hide-print">
        {message && (
          <div className={`submit-msg ${message.type === "error" ? "msg-error" : "msg-success"}`}>
            {message.text}
          </div>
        )}
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}