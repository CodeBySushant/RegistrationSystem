import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const toNepaliDigits = (str) => {
  const map = { 0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const makeEmptyBusiness = () => ({
  regNo: "", regDate: "", businessName: "", address: "", proprietor: "",
});

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_FORM = {
  date:                new Date().toISOString().slice(0, 10),
  refLetterNo:         "",
  chalaniNo:           "",
  addressee:           "",
  mailTo:              "",
  introText:           "",
  description:         "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
  positionTitle:       "",
};

const INITIAL_BUSINESSES = [makeEmptyBusiness()];

/* ─────────────────────────────────────────────
   STYLES  (prefix: brs-)
───────────────────────────────────────────── */
const styles = `
.brs-page {
  max-width: 950px;
  margin: 0 auto;
  font-family: "Kalimati", "Kokila", "Mangal", sans-serif;
  background: #d6d7da;
  min-height: 100vh;
}

.brs-paper {
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  color: #000;
  position: relative;
}

.brs-topbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.brs-topbar-right { font-size: 0.9rem; color: #777; font-weight: normal; }

.brs-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.brs-logo img { width: 80px; height: 80px; }
.brs-head-text  { flex: 1; text-align: center; }
.brs-head-main  { color: #e74c3c; font-size: 2.2rem; font-weight: bold; line-height: 1.2; margin: 0; }
.brs-head-ward  { color: #e74c3c; font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.brs-head-sub   { color: #e74c3c; font-size: 1rem; margin: 0; }
.brs-head-meta  { text-align: right; font-size: 1rem; }
.brs-meta-line  { margin-top: 4px; font-size: 0.9rem; color: #555; }
.brs-small-input {
  width: 120px; padding: 2px 5px;
  border: none; border-bottom: 1px dotted #000;
  background: #fff; outline: none;
  font-family: inherit; font-size: 1rem;
}

.brs-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 1rem; }
.brs-ref-block { display: flex; align-items: center; gap: 6px; }
.brs-ref-block input {
  width: 160px; padding: 4px 6px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; font-family: inherit; font-size: 1rem; outline: none;
}

.brs-to-block { margin-top: 18px; font-size: 1.05rem; line-height: 2; }
.brs-long-input {
  width: 260px; padding: 4px 6px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; margin-left: 6px;
  font-family: inherit; font-size: 1rem; outline: none;
}

.brs-subject-row {
  display: flex; align-items: center; justify-content: center;
  margin-top: 25px; font-size: 1.1rem; font-weight: bold;
}
.brs-subject-label { margin-right: 6px; }
.brs-subject-text  { text-decoration: underline; }

.brs-body-para {
  margin-top: 20px; font-size: 1.05rem;
  line-height: 2.4; text-align: justify;
}
.brs-under-input {
  border: none; border-bottom: 1px dotted #000;
  background: #fff; outline: none;
  padding: 2px 5px; font-family: inherit; font-size: 1rem;
  width: 200px; margin: 0 4px;
}

.brs-table-wrapper { margin-top: 20px; overflow-x: auto; }
.brs-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
.brs-table th,
.brs-table td { border: 1px solid #c2c2c2; padding: 6px 4px; text-align: left; }
.brs-table th { background-color: #f0f0f0; text-align: center; font-weight: bold; }
.brs-table td input {
  width: 100%; border: none; padding: 4px; outline: none;
  background: #fff; font-family: inherit; font-size: 0.95rem;
}
.brs-row-btn {
  padding: 2px 8px; border: 1px solid #ccc; background: #fff;
  cursor: pointer; font-size: 1rem; border-radius: 3px; margin: 1px;
}
.brs-row-btn:hover { background: #f5f5f5; }

.brs-desc-block { margin-top: 20px; font-size: 1.05rem; }
.brs-desc-block label { display: block; font-weight: bold; margin-bottom: 6px; }
.brs-desc-block textarea {
  width: 100%; box-sizing: border-box; padding: 8px;
  border: 1px solid #ccc; background: #fff; border-radius: 3px;
  font-family: inherit; font-size: 1rem; outline: none; resize: vertical;
}

.brs-bottom-row {
  display: flex; justify-content: space-between;
  align-items: center; margin-top: 40px;
}
.brs-post-input {
  width: 200px; padding: 6px 8px;
  border: 1px solid #ccc; background: #fff;
  border-radius: 3px; font-family: inherit; font-size: 1rem; outline: none;
}

.brs-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.brs-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.brs-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.brs-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
  padding-right: 50px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .brs-paper, .brs-paper * { visibility: visible; }
  .brs-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .brs-bottom-row .brs-save-print-btn,
  .brs-topbar-right,
  .brs-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .brs-table td,
  .brs-table th { border: 1px solid #000 !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .brs-paper { padding: 15px; }
  .brs-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .brs-ref-row { flex-direction: column; gap: 8px; }
  .brs-long-input { width: 180px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function BusinessRegSummary() {
  const { user } = useAuth();
  const [form, setForm]               = useState(INITIAL_FORM);
  const [businessList, setBusinessList] = useState(INITIAL_BUSINESSES);
  const [loading, setLoading]         = useState(false);

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

  const addBusinessRow    = () => setBusinessList((prev) => [...prev, makeEmptyBusiness()]);
  const removeBusinessRow = (index) =>
    setBusinessList((prev) => prev.filter((_, i) => i !== index));

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.businesses = JSON.stringify(
      businessList.filter((b) => b.regNo || b.businessName),
    );
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.applicantName?.trim()) { alert("निवेदकको नाम आवश्यक छ"); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/business-reg-summary",
        buildPayload(),
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => {
          setForm(INITIAL_FORM);
          setBusinessList(INITIAL_BUSINESSES);
        }, 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="brs-page">
        <form className="brs-paper" onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="brs-topbar">
            व्यवसाय दर्ता विवरण ।
            <span className="brs-topbar-right">
              व्यवसाय &gt; व्यवसाय दर्ता विवरण
            </span>
          </div>

          {/* ── Letterhead ── */}
          <div className="brs-letterhead">
            <div className="brs-logo">
              <img alt="Nepal Emblem" src={MUNICIPALITY.logoSrc || "/nepallogo.svg"} />
            </div>
            <div className="brs-head-text">
              <div className="brs-head-main">{MUNICIPALITY.name}</div>
              <div className="brs-head-ward">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`}
              </div>
              <div className="brs-head-sub">
                {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="brs-head-meta">
              <div>
                मिति :{" "}
                <input
                  readOnly
                  className="brs-small-input"
                  value={toNepaliDigits(form.date)}
                />
              </div>
              <div className="brs-meta-line">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
            </div>
          </div>

          {/* ── Ref numbers ── */}
          <div className="brs-ref-row">
            <div className="brs-ref-block">
              <label>पत्र संख्या :</label>
              <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
            </div>
            <div className="brs-ref-block">
              <label>चलानी नं. :</label>
              <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
            </div>
          </div>

          {/* ── Addressee ── */}
          <div className="brs-to-block">
            <label>श्री</label>
            <input
              name="addressee"
              value={form.addressee}
              onChange={onChange}
              className="brs-long-input"
            />
            <br />
            <span>{MUNICIPALITY.name}, {MUNICIPALITY.city}</span>
          </div>

          {/* ── Subject ── */}
          <div className="brs-subject-row">
            <span className="brs-subject-label">विषयः</span>
            <span className="brs-subject-text">
              व्यवसाय दर्ताको विवरण पठाईदिनु बारे ।
            </span>
          </div>

          {/* ── Body ── */}
          <p className="brs-body-para">
            प्रस्तुत विषयमा {MUNICIPALITY.name} को उद्योग, व्यवसाय, दर्ता,
            नविकरण, संचालन र नियमन सम्बन्धी ... कार्यालयले मेल{" "}
            <input
              name="mailTo"
              value={form.mailTo}
              onChange={onChange}
              className="brs-under-input"
            />{" "}
            मा पठाईदिन अनुरोध गरेको छ ।
          </p>

          {/* ── Business table ── */}
          <div className="brs-table-wrapper">
            <table className="brs-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>दर्ता नं.</th>
                  <th>दर्ता मिति</th>
                  <th>व्यवसायको नाम</th>
                  <th>ठेगाना</th>
                  <th>प्रोप्राइटर</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {businessList.map((b, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td><input name="regNo"        value={b.regNo}        onChange={(e) => onBusinessChange(i, e)} /></td>
                    <td><input name="regDate"       value={b.regDate}      onChange={(e) => onBusinessChange(i, e)} /></td>
                    <td><input name="businessName"  value={b.businessName} onChange={(e) => onBusinessChange(i, e)} /></td>
                    <td><input name="address"       value={b.address}      onChange={(e) => onBusinessChange(i, e)} /></td>
                    <td><input name="proprietor"    value={b.proprietor}   onChange={(e) => onBusinessChange(i, e)} /></td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {businessList.length > 1 && (
                        <button type="button" className="brs-row-btn" onClick={() => removeBusinessRow(i)}>−</button>
                      )}
                      {i === businessList.length - 1 && (
                        <button type="button" className="brs-row-btn" onClick={addBusinessRow}>+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Description ── */}
          <div className="brs-desc-block">
            <label>बिस्तृतः</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={onChange}
            />
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={form} handleChange={onChange} />

          {/* ── Bottom row ── */}
          <div className="brs-bottom-row">
            <input
              name="positionTitle"
              value={form.positionTitle}
              onChange={onChange}
              className="brs-post-input"
              placeholder="पद"
            />
            <button
              className="brs-save-print-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <div className="brs-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
}