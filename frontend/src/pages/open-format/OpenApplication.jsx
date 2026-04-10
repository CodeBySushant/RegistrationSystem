import React, { useState } from "react";
import axios from "../../utils/axiosInstance"; // ✅ Fixed
import { useWardForm } from "../../hooks/useWardForm"; // ✅ Added
import "./OpenApplication.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext"; // ✅ Added
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: "",
  subject: "",
  recipient_name: "",
  rel_subject: "",
  district: "",
  municipality: "गाउँपालिका",
  ward_no: "",
  savik_address: "",
  savik_vdc: "",
  savik_ward: "",
  body_text: "",
  // ✅ ApplicantDetailsNp fields
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_cit_issued_date: "",
  applicant_nid_no: "",
  applicant_phone: "",
};

const OpenApplication = () => {
  const { form, setForm, handleChange } = useWardForm(initialState); // ✅ Hook
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // ✅ Dynamic ward

  const handlePrint = async () => {
    // ✅ Skip date validation - send as text
    const submitData = {
      ...form,
      date: form.date || null, // ✅ Send as-is
    };

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-application", submitData);
      if (res.status === 201) {
        alert("सफल! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      alert("त्रुटि: " + (err.response?.data?.message || "पठाउन सकिएन"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="khulla-nivedan-container">
      <div className="top-bar-title">
        खुल्ला निवेदन
        <span className="top-right-bread">खुला ढाँचा &gt; खुल्ला निवेदन</span>
      </div>

      <form>
        {/* ✅ DYNAMIC MUNICIPALITY HEADER */}
        <header className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : user?.ward
                  ? `वडा नं. ${user.ward} वडा कार्यालय`
                  : "वडा कार्यालय"}
            </h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </header>

        <div className="date-row">
          मिति :
          <input
            name="date"
            type="text"
            className="dotted-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="recipient-section">
          श्रीमान्
          <input
            name="recipient_name"
            type="text"
            className="dotted-input"
            value={form.recipient_name}
            onChange={handleChange}
          />{" "}
          ज्यू,
          <br />
          <input
            type="text"
            className="dotted-input"
            style={{ width: "200px" }}
            placeholder="पद"
          />
          <br />
          <input
            type="text"
            className="dotted-input"
            style={{ width: "200px" }}
            placeholder="कार्यालय"
          />
        </div>

        <div className="subject-row">
          विषय:-
          <input
            name="subject"
            type="text"
            className="dotted-input"
            style={{ width: "300px" }}
            value={form.subject}
            onChange={handleChange}
          />{" "}
          ।
        </div>

        <div className="salutation">महोदय,</div>

        <div className="inline-meta-fields">
          उपरोक्त सम्बन्धमा
          <input
            name="rel_subject"
            type="text"
            className="dotted-input inline-input"
            value={form.rel_subject}
            onChange={handleChange}
          />
          जिल्ला
          <input
            name="district"
            type="text"
            className="dotted-input inline-input"
            value={form.district}
            onChange={handleChange}
          />
          <select
            name="municipality"
            className="inline-select"
            value={form.municipality}
            onChange={handleChange}
          >
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>
          वडा नं.
          <input
            name="ward_no"
            type="text"
            className="dotted-input tiny-input"
            value={form.ward_no}
            onChange={handleChange}
          />
          साविक
          <input
            name="savik_address"
            type="text"
            className="dotted-input inline-input"
            value={form.savik_address}
            onChange={handleChange}
          />
          गाविस
          <input
            name="savik_vdc"
            type="text"
            className="dotted-input inline-input"
            value={form.savik_vdc}
            onChange={handleChange}
          />
          वडा नं.
          <input
            name="savik_ward"
            type="text"
            className="dotted-input tiny-input"
            value={form.savik_ward}
            onChange={handleChange}
          />{" "}
          मा बस्ने ।
        </div>

        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <span>File Edit View Insert Format Tools Table Help</span>
            </div>
            <textarea
              name="body_text"
              className="editor-textarea"
              value={form.body_text}
              onChange={handleChange}
              placeholder="यहाँ पत्रको व्यहोरा लेख्नुहोस्..."
            />
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        <div className="form-footer">
          <button
            type="button"
            className="save-print-btn"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default OpenApplication;
