import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  province:          MUNICIPALITY.provinceLine || "",
  district:          MUNICIPALITY.city         || "",
  municipality:      MUNICIPALITY.name         || "",
  ward:              MUNICIPALITY.wardNumber   || "",
  sabik:             "",
  sabik_no:          "",
  sabik_ward_no:     "",
  owner_age:         "",
  owner_name:        "",
  on_behalf_of:      "",
  location_name:     "",
  land_location:     "",
  shop_name:         "",
  registration_no:   "",
  operation_from:    "",
  operation_to:      "",
  period_year:       "",
  period_month:      "",
  boundary_east:     "",
  boundary_west:     "",
  boundary_north:    "",
  boundary_south:    "",
  rohabar_ward_no:   "",
  rohabar_post:      "",
  rohabar_person:    "",
  applicant_name:    "",
  applicant_address: "",
  applicant_citizenship: "",
  applicant_phone:   "",
  notes:             "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: saf-)
───────────────────────────────────────────── */
const styles = `
.saf-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  background: #d6d7da;
}

.saf-topbar {
  background-color: #111827;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  font-size: 14px;
}
.saf-top-left  { font-weight: 600; }
.saf-top-right { opacity: 0.9; }

.saf-paper {
  max-width: 950px;
  margin: 24px auto;
  padding: 26px 40px 40px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

.saf-letterhead {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}
.saf-logo img { width: 80px; height: 80px; }
.saf-head-text { text-align: center; }
.saf-head-main { font-size: 20px; font-weight: 600; }
.saf-head-ward { font-size: 26px; font-weight: 700; color: #e60000; }
.saf-head-sub  { margin-top: 4px; font-size: 14px; }

.saf-paper input,
.saf-paper select,
.saf-paper textarea { background-color: #fff; font-family: inherit; }

.saf-main-title {
  text-align: center;
  margin-top: 8px;
  margin-bottom: 20px;
  font-size: 22px;
}

.saf-inline-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  margin-top: 10px;
}
.saf-inline-row select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  background: #fff;
  font-family: inherit;
  outline: none;
}
.saf-inline-row input {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  background: #fff;
  font-family: inherit;
  outline: none;
}

.saf-tiny   { width: 50px; }
.saf-small  { width: 80px; }
.saf-medium { width: 160px; }

.saf-body { margin-top: 16px; font-size: 14px; line-height: 1.7; }

.saf-subtitle { margin-top: 26px; margin-bottom: 8px; font-size: 16px; font-weight: 600; }

.saf-field-row {
  display: flex; align-items: center;
  gap: 8px; font-size: 14px; margin-top: 6px;
}
.saf-field-row input {
  flex: 1; max-width: 320px;
  padding: 5px 6px; border: 1px solid #c1c1c1;
  background: #fff; font-family: inherit; outline: none;
}

.saf-footer { text-align: center; margin-top: 40px; }
.saf-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.saf-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.saf-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.saf-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .saf-paper, .saf-paper * { visibility: visible; }
  .saf-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .saf-topbar, .saf-footer, .saf-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .saf-paper { padding: 15px; margin: 10px; }
  .saf-letterhead { flex-direction: column; }
  .saf-inline-row { gap: 4px; }
  .saf-medium { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function ShopAgriculturalForm() {
  const { user } = useAuth();
  const [form, setForm]   = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  // Pre-fill ward from logged-in user
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.ward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.owner_name?.trim())    return "धनीको नाम आवश्यक छ";
    if (!form.shop_name?.trim())     return "पसलको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert(err); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axiosInstance.post("/api/forms/shop-agricultural", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => setForm(INITIAL_STATE), 500);
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

  // Adapter for ApplicantDetailsNp (camelCase keys)
  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name",
      applicantAddress:     "applicant_address",
      applicantCitizenship: "applicant_citizenship",
      applicantPhone:       "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="saf-page">
        <header className="saf-topbar">
          <div className="saf-top-left">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</div>
          <div className="saf-top-right">
            अवलोकन पृष्ठ / पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी
          </div>
        </header>

        <form className="saf-paper" onSubmit={handleSubmit}>

          {/* ── Letterhead ── */}
          <div className="saf-letterhead">
            <div className="saf-logo">
              <img alt="Emblem" src={MUNICIPALITY.logoSrc || "/nepallogo.svg"} />
            </div>
            <div className="saf-head-text">
              <div className="saf-head-main">{MUNICIPALITY.name}</div>
              <div className="saf-head-ward">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || ""} वडा कार्यालय`}
              </div>
              <div className="saf-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
          </div>

          <h2 className="saf-main-title">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</h2>

          {/* ── Row 1: province / district / municipality / ward ── */}
          <div className="saf-inline-row">
            <span>लिखित</span>
            <select name="province" value={form.province} onChange={handleChange}>
              <option value={MUNICIPALITY.provinceLine}>{MUNICIPALITY.provinceLine}</option>
            </select>
            <span>जिल्ला</span>
            <select name="district" value={form.district} onChange={handleChange}>
              <option value={MUNICIPALITY.city}>{MUNICIPALITY.city}</option>
            </select>
            <span>स्थानीय तह</span>
            <select name="municipality" value={form.municipality} onChange={handleChange}>
              <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
            </select>
            <span>वडा नं.</span>
            <input type="text" name="ward" className="saf-small" value={form.ward} onChange={handleChange} />
          </div>

          {/* ── Row 2: sabik / age / owner / behalf ── */}
          <div className="saf-inline-row">
            <span>साबिक</span>
            <input type="text" name="sabik" className="saf-medium" value={form.sabik} onChange={handleChange} />
            <span>का</span>
            <input type="text" name="sabik_no" className="saf-small" value={form.sabik_no} onChange={handleChange} />
            <span>वर्ष</span>
            <input type="text" name="owner_age" className="saf-tiny" value={form.owner_age} onChange={handleChange} />
            <span>का श्री</span>
            <input type="text" name="owner_name" className="saf-medium" value={form.owner_name} onChange={handleChange} />
            <span>को तर्फबाट</span>
            <input type="text" name="on_behalf_of" className="saf-medium" value={form.on_behalf_of} onChange={handleChange} />
          </div>

          {/* ── Row 3: location / reg no / ward ── */}
          <div className="saf-inline-row">
            <span>उक्त</span>
            <input type="text" name="location_name" className="saf-medium" value={form.location_name} onChange={handleChange} />
            <span>को नाममा पासल / कृषि फार्म दर्ता मन्जुर भएको पूर्व</span>
            <input type="text" name="registration_no" className="saf-medium" value={form.registration_no} onChange={handleChange} />
            <span>नं. {MUNICIPALITY.name} वडा नं.</span>
            <input type="text" name="ward" className="saf-tiny" value={form.ward} onChange={handleChange} />
            <span>साबिक वडा नं.</span>
            <input type="text" name="sabik_ward_no" className="saf-tiny" value={form.sabik_ward_no} onChange={handleChange} />
          </div>

          {/* ── Row 4: land / shop / operation dates ── */}
          <div className="saf-inline-row">
            <span>जमिन</span>
            <input type="text" name="land_location" className="saf-medium" value={form.land_location} onChange={handleChange} />
            <span>को स्थानमा रहेको</span>
            <input type="text" name="shop_name" className="saf-medium" value={form.shop_name} onChange={handleChange} />
            <span>किराना / कृषि / पशुपंक्षी फार्मको मिति</span>
            <input type="text" name="operation_from" className="saf-small" value={form.operation_from} onChange={handleChange} />
            <span>देखि</span>
            <input type="text" name="operation_to" className="saf-small" value={form.operation_to} onChange={handleChange} />
            <span>सम्म संचालन गर्न मन्जुरी दिएको छ ।</span>
          </div>

          <p className="saf-body">
            सोही अनुसार उल्लेखित स्थानीय तहमा पर्ने आयु क्षेत्र भित्र उल्लेखित
            स्थानमा पसल, कृषि, पशुपंक्षी फार्म सञ्चालन गर्न अनुमति दिईयो ।
          </p>

          {/* ── Period ── */}
          <div className="saf-inline-row">
            <span>यी शब्दमा, साल</span>
            <input type="text" name="period_year"  className="saf-small" value={form.period_year}  onChange={handleChange} />
            <span>महिना</span>
            <input type="text" name="period_month" className="saf-small" value={form.period_month} onChange={handleChange} />
          </div>

          {/* ── Tapsil (boundaries) ── */}
          <h3 className="saf-subtitle">तपशिल</h3>
          <div className="saf-field-row">
            <span>१) पूर्व दिशाको सीमाना</span>
            <input type="text" name="boundary_east"  value={form.boundary_east}  onChange={handleChange} />
          </div>
          <div className="saf-field-row">
            <span>२) पश्चिम दिशाको सीमाना</span>
            <input type="text" name="boundary_west"  value={form.boundary_west}  onChange={handleChange} />
          </div>
          <div className="saf-field-row">
            <span>३) उत्तर दिशाको सीमाना</span>
            <input type="text" name="boundary_north" value={form.boundary_north} onChange={handleChange} />
          </div>
          <div className="saf-field-row">
            <span>४) दक्षिण दिशाको सीमाना</span>
            <input type="text" name="boundary_south" value={form.boundary_south} onChange={handleChange} />
          </div>

          {/* ── Rohabar ── */}
          <h3 className="saf-subtitle">रोहबर</h3>
          <div className="saf-inline-row">
            <span>{MUNICIPALITY.name}</span>
            <input type="text" name="rohabar_ward_no" className="saf-tiny" value={form.rohabar_ward_no} onChange={handleChange} />
            <span>नं. वडा का पदधारी</span>
            <select name="rohabar_post" value={form.rohabar_post} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
            <span>श्री</span>
            <input type="text" name="rohabar_person" className="saf-medium" value={form.rohabar_person} onChange={handleChange} />
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={footerForm} handleChange={handleFooterChange} />

          {/* ── Submit ── */}
          <div className="saf-footer">
            <button className="saf-save-print-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="saf-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}