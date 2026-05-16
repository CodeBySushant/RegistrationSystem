// ElectricityInstallationRecommendation.jsx — merged (JSX + CSS, no external .css needed)
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

/* ─────────────────────────────────────────────
   INLINE STYLES  (replaces ElectricityInstallationRecommendation.css — unchanged)
   ───────────────────────────────────────────── */
const STYLES = `
/* --- Main Container --- */
.electricity-installation-container {
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
.red-asterisk { color: red; font-size: 1.2rem; vertical-align: middle; }
.in-cell { font-size: 0.8rem; margin-left: 2px; }

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
.medium-input { width: 200px; }

/* --- Subject --- */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* --- Addressee --- */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row { margin-bottom: 8px; }
.line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  margin: 0 10px;
}

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
.medium-box { width: 160px; }
.long-box { width: 250px; }

/* --- Table Section --- */
.table-section { margin-top: 20px; margin-bottom: 40px; }
.table-title { text-align: center; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
.table-responsive { overflow-x: auto; }

.details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}
.details-table th {
  background-color: #eee;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
}
.details-table td {
  border: 1px solid #555;
  padding: 5px;
  text-align: center;
}

.table-input {
  width: 90%;
  border: none;
  background-color: #ffffff;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  font-family: inherit;
  color: #000;
  text-align: center;
}
.table-input.input-error { border-bottom: 1px solid crimson; }

/* --- Error --- */
.error { color: crimson; font-size: 0.82rem; margin-top: 2px; display: block; }

/* --- Signature Section --- */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block { width: 220px; text-align: center; }
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
  .electricity-installation-container,
  .electricity-installation-container * { visibility: visible; }
  .electricity-installation-container {
    position: absolute; left: 0; top: 0;
    width: 100%; max-width: 100%;
    padding: 20px 40px;
    background: white;
  }
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  .inline-box-input, .dotted-input, .line-input, .detail-input, .table-input {
    background: transparent !important;
    border-color: #999;
  }
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const FORM_KEY = 'electricity-installation-recommendation';
const API_URL  = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no:                '',
  reference_no:             '',
  date_bs:                  '',
  date_ad:                  todayIso(),
  // FIX: was two inputs both bound to sabik_ward_no —
  // split into sabik_place (place name text) and sabik_ward_no (ward number)
  sabik_place:              '',
  sabik_ward_no:            '',
  salutation:               'श्री',
  applicant_full_name:      '',
  // tapashil table
  land_vatan:               '',
  table_ward_no:            '',
  seat_no:                  '',
  ki_no:                    '',
  area:                     '',
  east:                     '',
  west:                     '',
  north:                    '',
  // signature
  signatory_name:           '',
  signatory_designation:    'वडा अध्यक्ष',
  // ApplicantDetailsNp fields
  applicant_name:           '',
  applicant_address:        '',
  applicant_citizenship_no: '',
  applicant_phone:          '',
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
const ElectricityInstallationRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm]             = useState(initialForm);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage]       = useState(null);

  // FIX: printDataRef snapshot pattern replaces setTimeout+immediate reset
  // — old code reset the form before window.print() finished, blanking the printout
  const [readyToPrint, setReadyToPrint] = useState(false);
  const printDataRef = useRef(null);

  /* Inject styles once on mount */
  useEffect(() => {
    const id = 'electricity-installation-recommendation-styles';
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

  // FIX: ApplicantDetailsNp expects handleChange(e) with e.target.name/value
  // — old code used onChange(fields) object pattern which didn't match the component
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.applicant_full_name.trim()) err.applicant_full_name = 'आवश्यक छ';
    if (!form.sabik_ward_no.trim())       err.sabik_ward_no       = 'आवश्यक छ';
    if (!form.land_vatan.trim())          err.land_vatan          = 'आवश्यक छ';
    if (!form.ki_no.trim())               err.ki_no               = 'आवश्यक छ';
    if (!form.east.trim())                err.east                = 'आवश्यक छ';
    if (!form.west.trim())                err.west                = 'आवश्यक छ';
    if (!form.north.trim())               err.north               = 'आवश्यक छ';
    if (!form.applicant_name.trim())      err.applicant_name      = 'आवश्यक छ';
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
        ward_no: user?.ward || null,
      };
      const res     = await axiosInstance.post(API_URL, payload);
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

  const wardDisplay = user?.ward || '—';

  return (
    <div className="electricity-installation-container">

      {/* Top bar — hidden on print */}
      <div className="top-bar-title no-print">
        <span>बिजुली जडान सिफारिस</span>
        <span className="top-right-bread">
          {MUNICIPALITY.name} &gt; बिजुली जडान सिफारिस
        </span>
      </div>

      <form onSubmit={handleSubmit}>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === 'SUPERADMIN' ? 'सबै वडा कार्यालय' : `${wardDisplay} नं. वडा कार्यालय`}
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
          <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span className="bold-text underline-text">श्री बुटवल पावर कम्पनी लिमिटेड</span>
          </div>
          <div className="addressee-row">
            <span className="bold-text">{MUNICIPALITY.name}</span>
            <span className="bold-text" style={{ marginLeft: '100px' }}>, {MUNICIPALITY.city}</span>
          </div>
        </div>

        {/* --- Main Body Paragraph --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला {MUNICIPALITY.englishDistrict} साविक&nbsp;
            {/* FIX: sabik_place for place name — was incorrectly reusing sabik_ward_no */}
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.sabik_place}
              onChange={handle('sabik_place')}
              placeholder="साविक ठाउँ"
            />
            &nbsp;वडा नं.&nbsp;
            {/* FIX: sabik_ward_no now only bound to the ward number input */}
            <input
              type="text"
              className={`inline-box-input tiny-box${errors.sabik_ward_no ? ' input-error' : ''}`}
              value={form.sabik_ward_no}
              onChange={handle('sabik_ward_no')}
            />
            &nbsp;भई हाल {MUNICIPALITY.englishDistrict} जिल्ला {MUNICIPALITY.name} वडा नं. {wardDisplay} मा बस्ने&nbsp;
            <select
              className="inline-select"
              value={form.salutation}
              onChange={handle('salutation')}
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            &nbsp;
            <input
              type="text"
              className={`inline-box-input long-box${errors.applicant_full_name ? ' input-error' : ''}`}
              value={form.applicant_full_name}
              onChange={handle('applicant_full_name')}
              placeholder="पूरा नाम"
            />
            &nbsp;को नाममा नम्बरी दर्ता रहेको तपसिल बमोजिम जग्गा र सोही भित्र बनेको काठ/पक्की घरमा विद्युत सम्बन्धि वायरिङ्ग कार्य पुरा भइसकेकोले निजको घरमा नियम अनुसार विद्युत मिटर जडानको लागि सिफारिस साथ अनुरोध गरिन्छ।
          </p>
          {errors.applicant_full_name && <span className="error">{errors.applicant_full_name}</span>}
          {errors.sabik_ward_no && <span className="error">{errors.sabik_ward_no}</span>}
        </div>

        {/* --- Tapashil Table --- */}
        <div className="table-section">
          <h4 className="table-title">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>क्र.सं.</th>
                  <th style={{ width: '20%' }}>जग्गा वतन</th>
                  <th style={{ width: '8%' }}>वडा नं.</th>
                  <th style={{ width: '8%' }}>सिट नं.</th>
                  <th style={{ width: '8%' }}>कि. नं.</th>
                  <th style={{ width: '10%' }}>क्षेत्रफल</th>
                  <th style={{ width: '13%' }}>पूर्व</th>
                  <th style={{ width: '13%' }}>पश्चिम</th>
                  <th style={{ width: '13%' }}>उत्तर</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td>
                    <input
                      type="text"
                      className={`table-input${errors.land_vatan ? ' input-error' : ''}`}
                      value={form.land_vatan}
                      onChange={handle('land_vatan')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="table-input"
                      value={form.table_ward_no}
                      onChange={handle('table_ward_no')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="table-input"
                      value={form.seat_no}
                      onChange={handle('seat_no')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`table-input${errors.ki_no ? ' input-error' : ''}`}
                      value={form.ki_no}
                      onChange={handle('ki_no')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="table-input"
                      value={form.area}
                      onChange={handle('area')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`table-input${errors.east ? ' input-error' : ''}`}
                      value={form.east}
                      onChange={handle('east')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`table-input${errors.west ? ' input-error' : ''}`}
                      value={form.west}
                      onChange={handle('west')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`table-input${errors.north ? ' input-error' : ''}`}
                      value={form.north}
                      onChange={handle('north')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
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

export default ElectricityInstallationRecommendation;