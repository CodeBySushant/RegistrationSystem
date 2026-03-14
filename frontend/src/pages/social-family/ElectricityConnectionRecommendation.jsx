// src/pages/physical-construction/ElectricityConnectionRecommendation.jsx
import React, { useState } from 'react';
import './ElectricityConnectionRecommendation.css';

const FORM_KEY = "electricity-connection-recommendation";

/** Safe API base resolver (Vite / CRA / runtime global) */
function getApiBase() {
  try {
    // Vite
    if (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {}
  try {
    if (typeof process !== "undefined" && process.env) {
      const v = process.env.REACT_APP_API_BASE || process.env.API_BASE;
      if (v) return v;
    }
  } catch (e) {}
  try {
    if (typeof globalThis !== "undefined" && globalThis.__API_BASE__) return globalThis.__API_BASE__;
  } catch (e) {}
  return "";
}

const API_BASE = getApiBase();
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const ElectricityConnectionRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const fd = new FormData(e.target);
      const flat = {};
      for (const [k, v] of fd.entries()) flat[k] = v;

      // Build logical payload (backend will stringify objects if needed)
      const addressee = {
        company: flat.addressee_company || "बुटवल पावर कम्पनी लिमिटेड",
        location: flat.addressee_location || null,
        city: flat.addressee_city || null
      };

      const family = {
        husband_or_father: flat.family_husband_father || null,
        sasura: flat.family_sasura || null
      };

      const land = {
        old_unit_type: flat.land_old_unit_type || null,
        old_unit_ward: flat.land_old_unit_ward || null,
        kitta_no: flat.land_kitta_no || null,
        area: flat.land_area || null,
        tol: flat.land_tol || null
      };

      const boundaries = {
        east: flat.bound_east || null,
        west: flat.bound_west || null,
        north: flat.bound_north || null,
        south: flat.bound_south || null
      };

      const house = {
        house_type: flat.house_type || null,
        floors: flat.house_floors || null,
        owner_name: flat.house_owner_name || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      const payload = {
        chalani_no: flat.chalani_no || null,
        addressee,
        subject: flat.subject || null,
        applicant,
        family,
        land,
        boundaries,
        house,
        signatory_name: flat.signatory_name || null,
        signatory_designation: flat.signatory_designation || null,
        municipality_display: flat.municipality_display || null
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved — id: ${data.id}` });
      // optionally e.target.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="electricity-connection-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        बिजुली जडान सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; बिजुली जडान सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>चलानी नं. : <input name="chalani_no" type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्री 
          <input name="addressee_company" type="text" className="inline-box-input long-box" defaultValue="बुटवल पावर कम्पनी लिमिटेड" />
        </p>
        <div className="addressee-location">
          <input name="addressee_location" type="text" className="line-input medium-input" />
          <span>, काठमाडौँ</span>
          <input name="addressee_city" type="hidden" value="काठमाडौँ" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p>
          त्यहाँ विद्युत शक्ति सप्लाई गर्न आवेदन दिने 
          <input name="municipality_display" type="text" className="inline-box-input long-box" defaultValue="नागार्जुन" />
          वडा नं. <input name="applicant_ward" type="text" className="inline-box-input tiny-box" defaultValue="१" /> बस्ने श्री 
          <input name="applicant_person" type="text" className="inline-box-input long-box" />
          तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको लागि सिफारिस गरिएको छ ।
        </p>

        <div className="family-details">
          <div className="detail-row">
            <label>पति/पिता को नाम, थर, वतन :</label>
            <input name="family_husband_father" type="text" className="line-input long-input" />
            <span className="red">*</span>
          </div>
          <div className="detail-row">
            <label>ससुरा को नाम, थर, वतन :</label>
            <input name="family_sasura" type="text" className="line-input long-input" />
            <span className="red">*</span>
          </div>
        </div>

        <p className="section-title">घर रहेको जग्गाको विवरण :-</p>
        <p>
          साविक <select name="land_old_unit_type" className="inline-select"><option value=""></option><option value="गा.वि.स.">गा.वि.स.</option><option value="न.पा.">न.पा.</option></select> 
          वडा नं. <input name="land_old_unit_ward" type="text" className="inline-box-input tiny-box" /> 
          कि.नं. <input name="land_kitta_no" type="text" className="inline-box-input small-box" /> 
          क्षेत्रफल <input name="land_area" type="text" className="inline-box-input small-box" />
        </p>

        <p className="section-title">घर रहेको टोल,वस्ती,गाउँ:-</p>
        <p>
          नागार्जुन नगरपालिका वडा नं. १ टोल <input name="land_tol" type="text" className="line-input medium-input" />
        </p>

        <p className="section-title underline-text">जग्गाको चार किल्ला:</p>
        <div className="boundaries-section">
          <div className="boundary-row">
            <div className="boundary-item">
              <label>पूर्वमा:-</label>
              <input name="bound_east" type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
            <div className="boundary-item">
              <label>पश्चिममा:-</label>
              <input name="bound_west" type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
          </div>
          <div className="boundary-row">
            <div className="boundary-item">
              <label>उत्तरमा:-</label>
              <input name="bound_north" type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
            <div className="boundary-item">
              <label>दक्षिणमा:-</label>
              <input name="bound_south" type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
          </div>
        </div>

        <p className="section-title">घरको विवरण :</p>
        <p>
          लागि आवेदन घर <input name="house_type" type="text" className="inline-box-input medium-box" /> ले बनेको <input name="house_floors" type="text" className="inline-box-input small-box" /> तले <input name="house_owner_name" type="text" className="inline-box-input medium-box" /> को नाममा छ।
        </p>

        <p>विद्युत शक्ति दिन यस नगरपालिकालाई कुनै आपत्ति छैन।</p>
        <p>निजले आवेदन दिएको घरमा:</p>
        <ul className="declarations-list">
          <li>- पहिले विद्युत सप्लाई पिएन तथापि निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
          <li>- विद्युत सप्लाई भएको हो छुट्टै मित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
        </ul>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input name="signatory_name" type="text" className="line-input full-width-input" required />
          <select name="signatory_designation" className="designation-select">
             <option value="">पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input name="applicant_name" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input name="applicant_address" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input name="applicant_phone" type="text" className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && (
        <div style={{ marginTop: 8, color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default ElectricityConnectionRecommendation;
