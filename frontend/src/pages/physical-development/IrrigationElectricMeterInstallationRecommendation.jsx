// IrrigationElectricMeterInstallationRecommendation.jsx — merged (JSX + CSS, no external .css needed)
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

/* ─────────────────────────────────────────────
   INLINE STYLES  (replaces IrrigationElectricMeterInstallationRecommendation.css — unchanged)
   ───────────────────────────────────────────── */
const STYLES = `
/* --- Main Container --- */
.irrigation-meter-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #000;
  position: relative;
}

/* --- Utility Classes --- */
.bold-text { font-weight: bold; }
.underline-text { text-decoration: underline; }
.red { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.red-mark { color: red; position: absolute; top: 0; left: 0; }
.bg-gray-text { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

/* --- Top Bar --- */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* --- Header Section --- */
.form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.header-text { display: flex; flex-direction: column; align-items: center; }
.municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ward-title { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.address-text, .province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

/* --- Meta Data --- */
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.meta-left p, .meta-right p { margin: 5px 0; }

.dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.small-input { width: 120px; }

/* --- Subject --- */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* --- Addressee --- */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.line-input.input-error { border-bottom-color: crimson; }
.medium-input { width: 200px; }

/* --- Body --- */
.form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.inline-box-input {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  display: inline-block;
  vertical-align: middle;
}
.inline-box-input.input-error { border-color: crimson; }

.inline-select {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
}

.tiny-box { width: 40px; text-align: center; }
.small-box { width: 100px; }
.medium-box { width: 160px; }
.long-box { width: 250px; }

/* --- Tapashil (Boundaries) Section --- */
.tapashil-section { margin-bottom: 30px; }
.tapashil-section h4 { margin-bottom: 10px; }
.boundary-list { display: flex; flex-direction: column; gap: 10px; }
.boundary-item { display: flex; align-items: center; gap: 8px; }
.boundary-item label { min-width: 70px; font-weight: bold; }
.long-input { width: 300px; }

/* --- Error --- */
.error { color: crimson; font-size: 0.82rem; margin-top: 2px; display: block; }

/* --- Signature Section --- */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block { width: 220px; text-align: center; position: relative; }
.signature-block .line-input { width: 100%; margin-bottom: 5px; }
.signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.full-width-input { width: 100%; }
.designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background-color: #ffffff; font-family: inherit; }

/* --- Applicant Details Box --- */
.applicant-details-box { border: 1px solid #ddd; padding: 20px; background-color: #ffffff; margin-top: 20px; border-radius: 4px; }
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.details-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
.detail-group { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
}

/* --- Footer --- */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn { background-color: #2c3e50; color: white; padding: 10px 25px; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }
.save-print-btn:hover { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

/* --- Print Utilities --- */
.print-only { display: none; }

@media print {
  body * { visibility: hidden; }
  .irrigation-meter-container,
  .irrigation-meter-container * { visibility: visible; }
  .irrigation-meter-container {
    position: absolute; left: 0; top: 0;
    width: 100%; max-width: 100%;
    padding: 20px 40px;
    background: white;
  }
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  .inline-box-input, .dotted-input, .line-input, .detail-input {
    background: transparent !important;
    border-color: #999;
  }
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const FORM_KEY = 'irrigation-electric-meter-installation-recommendation';
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no: '',
  reference_no: '',
  date_bs: '',
  date_ad: todayIso(),
  recipient_location: '',
  sabik_local_body_name: '',
  sabik_local_body_type: '',
  sabik_ward_no: '',
  ward_no: '',          // only used when user?.ward is absent (non-auth fallback)
  applicant_name_body: '',
  district_type: '',
  current_sabik_ward_no: '',
  kitta_no: '',
  area_size: '',
  purpose_of_meter: '',
  meter_capacity: '',
  neighbors_east: '',
  neighbors_west: '',
  neighbors_north: '',
  neighbors_south: '',
  signatory_name: '',
  signatory_designation: 'वडा अध्यक्ष',
  // ApplicantDetailsNp fields
  applicant_name: '',
  applicant_address: '',
  applicant_citizenship_no: '',
  applicant_phone: '',
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
const IrrigationElectricMeterInstallationRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // FIX: printDataRef snapshot pattern — replaces setTimeout + immediate reset
  // which blanked the form before window.print() finished rendering
  const [readyToPrint, setReadyToPrint] = useState(false);
  const printDataRef = useRef(null);

  /* Inject styles once on mount */
  useEffect(() => {
    const id = 'irrigation-electric-meter-installation-recommendation-styles';
    if (document.getElementById(id)) return;
    const tag = document.createElement('style');
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /* Trigger print after snapshot DOM commit */
  useEffect(() => {
    if (!readyToPrint) return;
    const onAfterPrint = () => {
      setReadyToPrint(false);
      printDataRef.current = null;
      setForm({ ...initialForm, date_ad: todayIso() });
    };
    window.addEventListener('afterprint', onAfterPrint);
    window.print();
    return () => window.removeEventListener('afterprint', onAfterPrint);
  }, [readyToPrint]);

  /* ── Handlers ── */
  const handle = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  // FIX: ApplicantDetailsNp expects handleChange(e) with e.target.name/value —
  // old code passed values/onChange(fields) which didn't match the component's API.
  // handleApplicantChange(fields) was defined but unreachable with that prop signature.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.sabik_ward_no.trim()) err.sabik_ward_no = 'आवश्यक छ';
    if (!form.applicant_name_body.trim()) err.applicant_name_body = 'आवश्यक छ';
    if (!form.kitta_no.trim()) err.kitta_no = 'आवश्यक छ';
    if (!form.area_size.trim()) err.area_size = 'आवश्यक छ';
    if (!form.purpose_of_meter.trim()) err.purpose_of_meter = 'आवश्यक छ';
    if (!form.meter_capacity.trim()) err.meter_capacity = 'आवश्यक छ';
    if (!form.neighbors_east.trim()) err.neighbors_east = 'आवश्यक छ';
    if (!form.neighbors_west.trim()) err.neighbors_west = 'आवश्यक छ';
    if (!form.neighbors_north.trim()) err.neighbors_north = 'आवश्यक छ';
    if (!form.neighbors_south.trim()) err.neighbors_south = 'आवश्यक छ';
    if (!form.applicant_name.trim()) err.applicant_name = 'आवश्यक छ';
    return err;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        municipality: MUNICIPALITY.name,
        ward_no: user?.ward || form.ward_no || null,
      };

      const res = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || 'unknown';
      setMessage({ type: 'success', text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });

      // FIX: freeze snapshot then trigger print — form resets only after afterprint fires
      printDataRef.current = { ...form };
      setReadyToPrint(true);
    } catch (error) {
      const info = error.response?.data?.message || error.message || 'Failed to save';
      setMessage({ type: 'error', text: `Error: ${info}` });
      console.error('Submit error', error);
    } finally {
      setSubmitting(false);
    }
  };

  // ward_no: auth context takes priority; falls back to manual form.ward_no entry
  const wardDisplay = user?.ward || form.ward_no || '—';

  return (
    <div className="irrigation-meter-container">

      {/* Top bar — hidden on print */}
      <div className="top-bar-title no-print">
        <span>सिचाई विद्युत मिटर जडान सिफारिस</span>
        <span className="top-right-bread">
          {MUNICIPALITY.name} &gt; सिचाई विद्युत मिटर जडान सिफारिस
        </span>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === 'SUPERADMIN'
                ? 'सबै वडा कार्यालय'
                : `${wardDisplay} नं. वडा कार्यालय`}
            </h2>
            <p className="address-text">{MUNICIPALITY.city}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* --- Meta Data --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.letter_no}
                onChange={handle('letter_no')}
                placeholder="पत्र संख्या"
              />
            </p>
            <p>
              चलानी नं. :&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.reference_no}
                onChange={handle('reference_no')}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति (बीएस) :&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.date_bs}
                onChange={handle('date_bs')}
                placeholder="२०८२-०८-०६"
              />
            </p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:&nbsp;
            <span className="underline-text">सिचाई विद्युत मिटर जडान सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री नेपाल विद्युत प्राधिकरण कार्यालय</span>
          </div>
          <div className="addressee-row">
            <input
              type="text"
              className={`line-input medium-input${errors.recipient_location ? ' input-error' : ''}`}
              value={form.recipient_location}
              onChange={handle('recipient_location')}
              placeholder="ठेगाना/शाखा"
            />
            <span>, {MUNICIPALITY.city}</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा साविक जिल्ला {MUNICIPALITY.englishDistrict}&nbsp;
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.sabik_local_body_name}
              onChange={handle('sabik_local_body_name')}
              placeholder="ठाउँको नाम"
            />
            <select
              className="inline-select"
              value={form.sabik_local_body_type}
              onChange={handle('sabik_local_body_type')}
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            &nbsp;वडा नं.&nbsp;
            <input
              type="text"
              className={`inline-box-input tiny-box${errors.sabik_ward_no ? ' input-error' : ''}`}
              value={form.sabik_ward_no}
              onChange={handle('sabik_ward_no')}
            />
            &nbsp;भै हाल&nbsp;
            <span className="bg-gray-text">{MUNICIPALITY.name}</span>
            &nbsp;वडा नं.&nbsp;
            {/* ward_no input: read-only when auth provides it; editable as fallback */}
            <input
              type="text"
              className="inline-box-input tiny-box"
              value={wardDisplay}
              onChange={handle('ward_no')}
              readOnly={!!user?.ward}
            />
            &nbsp;मा बस्ने&nbsp;
            <input
              type="text"
              className={`inline-box-input long-box${errors.applicant_name_body ? ' input-error' : ''}`}
              value={form.applicant_name_body}
              onChange={handle('applicant_name_body')}
              placeholder="निवेदकको नाम"
            />
            &nbsp;को नाउँमा नम्बरी दर्ता रहेको जग्गा जिल्ला&nbsp;
            <span className="bg-gray-text">{MUNICIPALITY.city}</span>
            <select
              className="inline-select"
              value={form.district_type}
              onChange={handle('district_type')}
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            &nbsp;वडा नं.&nbsp;
            <input
              type="text"
              className="inline-box-input tiny-box"
              value={form.current_sabik_ward_no}
              onChange={handle('current_sabik_ward_no')}
            />
            &nbsp;हाल&nbsp;
            <span className="bg-gray-text">{MUNICIPALITY.name}</span>
            &nbsp;वडा नं. {wardDisplay} कित्ता नं.&nbsp;
            <input
              type="text"
              className={`inline-box-input small-box${errors.kitta_no ? ' input-error' : ''}`}
              value={form.kitta_no}
              onChange={handle('kitta_no')}
            />
            &nbsp;क्षेत्रफल&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.area_size ? ' input-error' : ''}`}
              value={form.area_size}
              onChange={handle('area_size')}
              placeholder="क्षेत्रफल"
            />
            &nbsp;भित्र चौहदी रहेको जग्गामा&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.purpose_of_meter ? ' input-error' : ''}`}
              value={form.purpose_of_meter}
              onChange={handle('purpose_of_meter')}
              placeholder="प्रयोजन"
            />
            &nbsp;लागि&nbsp;
            <input
              type="text"
              className={`inline-box-input medium-box${errors.meter_capacity ? ' input-error' : ''}`}
              value={form.meter_capacity}
              onChange={handle('meter_capacity')}
              placeholder="क्षमता"
            />
            &nbsp;जडान गर्न ताहाँ कार्यालयको नियमानुसार आवश्यक कारवाहीका लागि सिफारिस साथ सादर अनुरोध गरिन्छ।
          </p>
        </div>

        {/* --- Tapashil (Boundaries) --- */}
        <div className="tapashil-section">
          <h4 className="bold-text underline-text">तपसिल</h4>
          <div className="boundary-list">
            <div className="boundary-item">
              <label>पूर्व :-</label>
              <input
                type="text"
                className={`line-input long-input${errors.neighbors_east ? ' input-error' : ''}`}
                value={form.neighbors_east}
                onChange={handle('neighbors_east')}
              />
            </div>
            <div className="boundary-item">
              <label>पश्चिम:-</label>
              <input
                type="text"
                className={`line-input long-input${errors.neighbors_west ? ' input-error' : ''}`}
                value={form.neighbors_west}
                onChange={handle('neighbors_west')}
              />
            </div>
            <div className="boundary-item">
              <label>उत्तर :-</label>
              <input
                type="text"
                className={`line-input long-input${errors.neighbors_north ? ' input-error' : ''}`}
                value={form.neighbors_north}
                onChange={handle('neighbors_north')}
              />
            </div>
            <div className="boundary-item">
              <label>दक्षिण:-</label>
              <input
                type="text"
                className={`line-input long-input${errors.neighbors_south ? ' input-error' : ''}`}
                value={form.neighbors_south}
                onChange={handle('neighbors_south')}
              />
            </div>
          </div>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input
              type="text"
              className="line-input full-width-input"
              value={form.signatory_name}
              onChange={handle('signatory_name')}
              placeholder="हस्ताक्षरकर्ताको नाम"
            />
            <select
              className="designation-select"
              value={form.signatory_designation}
              onChange={handle('signatory_designation')}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* --- Applicant Details via ApplicantDetailsNp --- */}
        {/* FIX: correct props — formData + handleChange(e) not values + onChange(fields) */}
        <ApplicantDetailsNp
          formData={form}
          handleChange={handleChange}
        />

        {/* --- Footer Action --- */}
        <div className="form-footer no-print">
          <button type="submit" className="save-print-btn" disabled={submitting}>
            {submitting ? 'सेभ हुँदै...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}
          </button>
        </div>

        {message && (
          <div
            className="no-print"
            style={{
              textAlign: 'center',
              marginTop: 12,
              color: message.type === 'error' ? 'crimson' : 'green',
              fontWeight: 'bold',
            }}
          >
            {message.text}
          </div>
        )}
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default IrrigationElectricMeterInstallationRecommendation;