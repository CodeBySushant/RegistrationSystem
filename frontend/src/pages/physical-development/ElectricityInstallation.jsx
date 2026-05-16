// ElectricityInstallation.jsx — merged (JSX + CSS, no external .css file needed)
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

/* ─────────────────────────────────────────────
   INLINE STYLES  (replaces ElectricityInstallation.css)
   ───────────────────────────────────────────── */
const STYLES = `
/* --- Main Container --- */
.electricity-application-container {
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
.red { color: red; font-weight: bold; margin: 0 2px; }
.mt-20 { margin-top: 20px; }
.mt-10 { margin-top: 10px; }
.bg-gray-text {
  background-color: #eee;
  padding: 2px 5px;
  border-radius: 3px;
  margin: 0 5px;
}

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
.form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.header-text { display: flex; flex-direction: column; align-items: center; }
.municipality-name {
  color: #e74c3c;
  font-size: 2.2rem;
  margin: 0;
  font-weight: bold;
  line-height: 1.2;
}
.ward-title {
  color: #e74c3c;
  font-size: 2.5rem;
  margin: 5px 0;
  font-weight: bold;
}
.address-text,
.province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

/* --- Meta Data --- */
.meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.meta-left p,
.meta-right p { margin: 5px 0; }

/* --- Inputs --- */
.dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.small-input  { width: 120px; }
.medium-input { width: 180px; }
.tiny-input   { width: 50px; text-align: center; }

/* --- Subject --- */
.subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

/* --- Addressee --- */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row { margin-top: 5px; }
.line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #ffffff;
  outline: none;
  margin: 0 10px;
}

/* --- Body Paragraph --- */
.form-body {
  font-size: 1.05rem;
  line-height: 2.4;
  text-align: justify;
  margin-bottom: 10px;
}

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
  padding: 3px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
}
.medium-select { width: 150px; }

.tiny-box   { width: 40px; text-align: center; }
.medium-box { width: 160px; }
.long-box   { width: 250px; }

/* --- Print field spans --- */
.print-field {
  display: inline-block;
  vertical-align: middle;
  border-bottom: 1px solid #555;
  min-width: 80px;
  padding: 2px 4px;
  margin: 0 4px;
  font-family: inherit;
  font-size: 1rem;
  color: #000;
}
.print-field.dotted-field { border-bottom: 1px dotted #000; }

/* --- Form Rows --- */
.form-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
.form-row label { margin-right: 3px; }
.section-label { font-weight: bold; margin-bottom: 5px; display: block; }

/* --- Four Boundaries Grid --- */
.killa-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 5px;
}
.killa-item { display: flex; align-items: center; gap: 4px; }
.full-killa-input { flex-grow: 1; }

/* --- Declarations --- */
.declarations-section { font-size: 1rem; line-height: 1.6; }
.dashed-list { list-style-type: none; padding-left: 0; }
.dashed-list li { margin-bottom: 5px; }

/* --- Signature --- */
.signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 30px;
}
.signature-block { width: 220px; text-align: center; }
.signature-block .line-input { width: 100%; margin-bottom: 5px; }
.signature-line {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
}
.full-width-input { width: 100%; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  font-family: inherit;
}

/* --- Applicant Details Box --- */
.applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 {
  color: #777;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.details-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
.detail-group { display: flex; flex-direction: column; }
.detail-group label {
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}
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

/* --- Error --- */
.error { color: crimson; font-size: 0.82rem; margin-top: 2px; display: block; }
.dotted-input.input-error  { border-bottom-color: crimson; }

/* --- Footer --- */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
.save-print-btn:hover    { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* --- Print Utilities --- */
.print-only { display: none; }

/* ================= PRINT STYLES ================= */
@media print {
  body * { visibility: hidden; }

  .electricity-application-container,
  .electricity-application-container * { visibility: visible; }

  .electricity-application-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%; max-width: 100%;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .no-print { display: none !important; }
  .print-only { display: block !important; }

  /* Hide interactive elements — replaced by .print-field spans */
  .inline-box-input,
  .dotted-input,
  .line-input,
  .detail-input,
  .inline-select,
  .designation-select { display: none !important; }

  /* print-field spans always visible */
  .print-field {
    display: inline-block !important;
    visibility: visible !important;
    color: #000 !important;
    border-bottom: 1px solid #555;
  }

  .municipality-name,
  .ward-title,
  .address-text,
  .province-text {
    color: #e74c3c !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const FORM_KEY = 'electricity-installation';
const API_URL  = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no:                '',
  reference_no:             '',
  date_bs:                  '',
  date_ad:                  todayIso(),
  recipient_office:         '',
  municipality_name:        MUNICIPALITY.name,   // controlled from the start
  salutation:               'श्री',
  applicant_full_name:      '',
  father_husband_relation:  'पति',
  father_husband_name:      '',
  father_husband_hometown:  '',
  grandfather_relation:     'ससुरा',
  grandfather_name:         '',
  grandfather_hometown:     '',
  land_old_type:            'गा.वि.स.',
  land_old_name:            '',
  land_ward_no:             '',
  land_ki_no:               '',
  land_area:                '',
  tole:                     '',
  east:                     '',
  west:                     '',
  north:                    '',
  south:                    '',
  house_material:           '',
  house_floors:             '',
  house_owner_name:         '',
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
const ElectricityInstallation = () => {
  const { user } = useAuth();
  const [form, setForm]             = useState(initialForm);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage]       = useState(null);

  // readyToPrint triggers print after React commits the snapshot to the DOM
  const [readyToPrint, setReadyToPrint] = useState(false);
  // Frozen copy of form data used during printing — prevents blank printout
  // if state resets before window.print() finishes rendering
  const printDataRef = useRef(null);

  /* Inject styles once on mount */
  useEffect(() => {
    const id  = 'electricity-installation-styles';
    if (document.getElementById(id)) return;            // avoid duplicate injection
    const tag = document.createElement('style');
    tag.id        = id;
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

  // Used by named inline inputs (handle('field_name'))
  const handle = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  // Used by ApplicantDetailsNp which calls handleChange(e) with e.target.name / value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.applicant_full_name.trim()) err.applicant_full_name = 'आवश्यक छ';
    if (!form.father_husband_name.trim()) err.father_husband_name = 'आवश्यक छ';
    if (!form.east.trim())                err.east                = 'आवश्यक छ';
    if (!form.west.trim())                err.west                = 'आवश्यक छ';
    if (!form.north.trim())               err.north               = 'आवश्यक छ';
    if (!form.south.trim())               err.south               = 'आवश्यक छ';
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
        ward_no: user?.ward || null,   // ward comes from auth context, not form
      };

      const res     = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || 'unknown';

      setMessage({ type: 'success', text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });

      // Freeze current data for printout, then trigger print via state
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

  /* ── Derived values ── */
  const wardDisplay = user?.ward || '—';
  // During print: use frozen snapshot; otherwise use live form state
  const d = readyToPrint && printDataRef.current ? printDataRef.current : form;

  /* ── Render helpers ──
     Field  → dotted underline input (or print span)
     InlineField → boxed inline input (or print span)
     Both hide the input and show the span during print so browser renders text
  */
  const Field = ({ name, className = '', placeholder = '', type = 'text' }) =>
    readyToPrint ? (
      <span className={`print-field ${className}`}>{d[name] || ''}</span>
    ) : (
      <input
        type={type}
        className={`dotted-input ${className}${errors[name] ? ' input-error' : ''}`}
        value={form[name]}
        onChange={handle(name)}
        placeholder={placeholder}
      />
    );

  const InlineField = ({ name, className = '', placeholder = '' }) =>
    readyToPrint ? (
      <span className={`print-field ${className}`}>{d[name] || ''}</span>
    ) : (
      <input
        type="text"
        className={`inline-box-input ${className}${errors[name] ? ' input-error' : ''}`}
        value={form[name]}
        onChange={handle(name)}
        placeholder={placeholder}
      />
    );

  /* ── JSX ── */
  return (
    <div className="electricity-application-container">

      {/* Top navigation bar — hidden when printing */}
      <div className="top-bar-title no-print">
        <span>बिजुली जडान सिफारिस</span>
        <span className="top-right-bread">
          {MUNICIPALITY.name} &gt; बिजुली जडान सिफारिस
        </span>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── Header ── */}
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

        {/* ── Meta (letter no, date) ── */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :&nbsp;
              <Field name="letter_no" className="small-input" placeholder="२०८२/८३" />
            </p>
            <p>
              चलानी नं. :&nbsp;
              <Field name="reference_no" className="small-input" />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति (बीएस) :&nbsp;
              <Field name="date_bs" className="small-input" placeholder="२०८२-०८-०६" />
            </p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
        </div>

        {/* ── Addressee ── */}
        <div className="addressee-section">
          <p className="bold-text">श्री नेपाल विद्युत प्राधिकरण</p>
          <div className="addressee-row">
            {readyToPrint ? (
              <span className="print-field medium-input">{d.recipient_office}</span>
            ) : (
              <input
                type="text"
                className="line-input medium-input"
                value={form.recipient_office}
                onChange={handle('recipient_office')}
                placeholder="कार्यालयको नाम"
              />
            )}
            <span className="bold-text">, {MUNICIPALITY.city}</span>
          </div>
        </div>

        {/* ── Main Body ── */}
        <div className="form-body">
          <p className="body-paragraph">
            त्यहाँ विद्युत शक्ति सप्लाई गर्ने आवेदन दिने&nbsp;
            <InlineField name="municipality_name" className="medium-box" />
            &nbsp;वडा नं.&nbsp;
            {/* Ward is read-only — sourced from auth context */}
            <span className="inline-box-input tiny-box">{wardDisplay}</span>
            &nbsp;बस्ने&nbsp;
            {readyToPrint ? (
              <span className="print-field">{d.salutation}</span>
            ) : (
              <select className="inline-select" value={form.salutation} onChange={handle('salutation')}>
                <option>श्री</option>
                <option>सुश्री</option>
                <option>श्रीमती</option>
              </select>
            )}
            &nbsp;
            <InlineField name="applicant_full_name" className="long-box" placeholder="पूरा नाम" />
            &nbsp;तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको लागि सिफारिस गरिएको छ ।
          </p>
          {errors.applicant_full_name && (
            <span className="error">{errors.applicant_full_name}</span>
          )}
        </div>

        {/* ── Family Details ── */}
        <div className="family-details-section">
          <div className="form-row">
            {readyToPrint ? (
              <span className="print-field">{d.father_husband_relation}</span>
            ) : (
              <select
                className="inline-select"
                value={form.father_husband_relation}
                onChange={handle('father_husband_relation')}
              >
                <option>पति</option>
                <option>पिता</option>
              </select>
            )}
            <label>को नाम, थर, वतन :-</label>
            <Field
              name="father_husband_name"
              className={`medium-input${errors.father_husband_name ? ' input-error' : ''}`}
              placeholder="नाम थर"
            />
            <span>,</span>
            <Field name="father_husband_hometown" className="medium-input" placeholder="वतन" />
          </div>
          {errors.father_husband_name && (
            <span className="error">{errors.father_husband_name}</span>
          )}

          <div className="form-row">
            {readyToPrint ? (
              <span className="print-field">{d.grandfather_relation}</span>
            ) : (
              <select
                className="inline-select"
                value={form.grandfather_relation}
                onChange={handle('grandfather_relation')}
              >
                <option>ससुरा</option>
                <option>बाजे</option>
              </select>
            )}
            <label>को नाम, थर, वतन :-</label>
            <Field name="grandfather_name" className="medium-input" placeholder="नाम थर" />
            <span>,</span>
            <Field name="grandfather_hometown" className="medium-input" placeholder="वतन" />
          </div>
        </div>

        {/* ── Property Details ── */}
        <div className="property-details-section mt-20">
          <span className="section-label">घर रहेको जग्गाको विवरण :-</span>
          <div className="form-row">
            <label>साविक</label>
            {readyToPrint ? (
              <span className="print-field">{d.land_old_type}</span>
            ) : (
              <select
                className="inline-select medium-select"
                value={form.land_old_type}
                onChange={handle('land_old_type')}
              >
                <option></option>
                <option>गा.वि.स.</option>
                <option>नगरपालिका</option>
              </select>
            )}
            <Field name="land_old_name" className="medium-input" placeholder="नाम" />
            <label>वडा नं.</label>
            <Field name="land_ward_no" className="tiny-input" />
            <label>कि.नं.</label>
            <Field name="land_ki_no" className="small-input" />
            <label>क्षेत्रफल</label>
            <Field name="land_area" className="medium-input" />
          </div>
        </div>

        {/* ── Current Address ── */}
        <div className="current-address-section mt-20">
          <span className="section-label">घर रहेको ठेगाना :-</span>
          <div className="form-row">
            <label>घर रहेको टोल, बस्ती, गाउँ:-</label>
            <span className="bg-gray-text">{MUNICIPALITY.name}</span>
            <span className="bg-gray-text">वडा नं. {wardDisplay}</span>
            <label>टोल</label>
            <Field name="tole" className="medium-input" placeholder="टोलको नाम" />
          </div>
        </div>

        {/* ── Four Boundaries ── */}
        <div className="killa-section mt-20">
          <span className="section-label underline-text">जग्गाको चार किल्ला:-</span>
          <div className="killa-grid">
            <div className="killa-item">
              <label>पूर्वमा:-</label>
              <Field name="east" className={`full-killa-input${errors.east ? ' input-error' : ''}`} />
            </div>
            <div className="killa-item">
              <label>पश्चिममा:-</label>
              <Field name="west" className={`full-killa-input${errors.west ? ' input-error' : ''}`} />
            </div>
            <div className="killa-item">
              <label>उत्तरमा:-</label>
              <Field name="north" className={`full-killa-input${errors.north ? ' input-error' : ''}`} />
            </div>
            <div className="killa-item">
              <label>दक्षिणमा:-</label>
              <Field name="south" className={`full-killa-input${errors.south ? ' input-error' : ''}`} />
            </div>
          </div>
        </div>

        {/* ── House Description ── */}
        <div className="house-desc-section mt-20">
          <div className="form-body">
            <p className="body-paragraph">
              घरको विवरण :&nbsp;
              <Field name="house_material" className="medium-input" placeholder="सामग्री" />
              &nbsp;ले बनेको&nbsp;
              <Field name="house_floors" className="small-input" placeholder="तल्ला" />
              &nbsp;तल्ले घर -१ निजले विद्युत सप्लाईको लागि आवेदन घर&nbsp;
              <Field name="house_owner_name" className="medium-input" placeholder="नाम" />
              &nbsp;को नाममा छ।
            </p>
          </div>
        </div>

        {/* ── Declarations ── */}
        <div className="declarations-section mt-10">
          <p>विद्युत शक्ति दिन यस {MUNICIPALITY.name}लाई कुनै आपत्ति छैन।</p>
          <p className="underline-text">निजले आवेदन दिएको घरमा :</p>
          <ul className="dashed-list">
            <li>- पहिले विद्युत सप्लाई थिएन तसर्थ निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
            <li>- विद्युत सप्लाई भएको हो छुट्टै भित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
          </ul>
        </div>

        {/* ── Signature ── */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            {readyToPrint ? (
              <span className="print-field full-width-input">{d.signatory_name}</span>
            ) : (
              <input
                type="text"
                className="line-input full-width-input"
                value={form.signatory_name}
                onChange={handle('signatory_name')}
                placeholder="हस्ताक्षरकर्ताको नाम"
              />
            )}
            {readyToPrint ? (
              <span className="print-field">{d.signatory_designation}</span>
            ) : (
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
            )}
          </div>
        </div>

        {/* ── Applicant Details (shared component) ── */}
        {/* Props: formData (object) + handleChange(e) with e.target.name / value */}
        <ApplicantDetailsNp
          formData={readyToPrint ? d : form}
          handleChange={handleChange}
        />

        {/* ── Footer Actions ── */}
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

export default ElectricityInstallation;