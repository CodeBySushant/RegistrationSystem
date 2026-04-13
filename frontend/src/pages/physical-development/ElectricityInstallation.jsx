// ElectricityInstallation.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ElectricityInstallation.css';
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

const FORM_KEY = 'electricity-installation';
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no: '',
  reference_no: '',
  date_bs: '',
  date_ad: todayIso(),
  recipient_office: '',
  // FIX: initialised to MUNICIPALITY.name so input is always controlled
  municipality_name: MUNICIPALITY.name,
  salutation: 'श्री',
  applicant_full_name: '',
  father_husband_relation: 'पति',
  father_husband_name: '',
  father_husband_hometown: '',
  grandfather_relation: 'ससुरा',
  grandfather_name: '',
  grandfather_hometown: '',
  land_old_type: 'गा.वि.स.',
  land_old_name: '',
  land_ward_no: '',
  land_ki_no: '',
  land_area: '',
  tole: '',
  east: '',
  west: '',
  north: '',
  south: '',
  house_material: '',
  house_floors: '',
  house_owner_name: '',
  signatory_name: '',
  signatory_designation: 'वडा अध्यक्ष',
  // ApplicantDetailsNp fields
  applicant_name: '',
  applicant_address: '',
  applicant_citizenship_no: '',
  applicant_phone: '',
};

const ElectricityInstallation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // readyToPrint is STATE so setting it triggers a re-render;
  // useEffect fires after React commits filled DOM → safe to window.print()
  const [readyToPrint, setReadyToPrint] = useState(false);
  // Snapshot of form at submit time — print view reads from here,
  // so a mid-print state reset never blanks the printout
  const printDataRef = useRef(null);

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

  const handle = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  // FIX: ApplicantDetailsNp expects handleChange(e) with e.target.name / e.target.value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.applicant_full_name.trim()) err.applicant_full_name = 'आवश्यक छ';
    if (!form.father_husband_name.trim()) err.father_husband_name = 'आवश्यक छ';
    if (!form.east.trim()) err.east = 'आवश्यक छ';
    if (!form.west.trim()) err.west = 'आवश्यक छ';
    if (!form.north.trim()) err.north = 'आवश्यक छ';
    if (!form.south.trim()) err.south = 'आवश्यक छ';
    if (!form.applicant_name.trim()) err.applicant_name = 'आवश्यक छ';
    return err;
  };

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
        // FIX: ward_no in payload comes from user context, not form state
        // (form no longer has a ward_no field to avoid collision)
        ward_no: user?.ward || null,
      };

      const res = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || 'unknown';

      setMessage({ type: 'success', text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });

      // Snapshot filled data; trigger print via state → useEffect after DOM commit
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
  // Data source: snapshot during print, live form otherwise
  const d = readyToPrint && printDataRef.current ? printDataRef.current : form;

  // Renders <span> during print (text always visible) and <input> while editing.
  // Browser reliably prints span text; inputs with transparent bg print blank.
  const Field = ({ name, className = '', placeholder = '', readOnly = false, type = 'text' }) =>
    readyToPrint ? (
      <span className={`print-field ${className}`}>{d[name] || ''}</span>
    ) : (
      <input
        type={type}
        className={`dotted-input ${className}${errors[name] ? ' input-error' : ''}`}
        value={form[name]}
        onChange={handle(name)}
        placeholder={placeholder}
        readOnly={readOnly}
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

  return (
    <div className="electricity-application-container">

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

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          {/* FIX: was hardcoded "बुटवल पावर कम्पनी", now uses MUNICIPALITY.city */}
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

        {/* --- Main Body Paragraph --- */}
        <div className="form-body">
          <p className="body-paragraph">
            त्यहाँ विद्युत शक्ति सप्लाई गर्ने आवेदन दिने&nbsp;
            {/* FIX: always controlled — initialised to MUNICIPALITY.name */}
            <InlineField name="municipality_name" className="medium-box" />
            &nbsp;वडा नं.&nbsp;
            {/* FIX: ward display comes from user context, not editable form field */}
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
          {errors.applicant_full_name && <span className="error">{errors.applicant_full_name}</span>}
        </div>

        {/* --- Family Details --- */}
        <div className="family-details-section">
          <div className="form-row">
            {readyToPrint ? (
              <span className="print-field">{d.father_husband_relation}</span>
            ) : (
              <select className="inline-select" value={form.father_husband_relation} onChange={handle('father_husband_relation')}>
                <option>पति</option>
                <option>पिता</option>
              </select>
            )}
            <label>को नाम, थर, वतन :-</label>
            <Field name="father_husband_name" className={`medium-input${errors.father_husband_name ? ' input-error' : ''}`} placeholder="नाम थर" />
            <span>,</span>
            <Field name="father_husband_hometown" className="medium-input" placeholder="वतन" />
          </div>
          {errors.father_husband_name && <span className="error">{errors.father_husband_name}</span>}

          <div className="form-row">
            {readyToPrint ? (
              <span className="print-field">{d.grandfather_relation}</span>
            ) : (
              <select className="inline-select" value={form.grandfather_relation} onChange={handle('grandfather_relation')}>
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

        {/* --- Property Details --- */}
        <div className="property-details-section mt-20">
          <span className="section-label">घर रहेको जग्गाको विवरण :-</span>
          <div className="form-row">
            <label>साविक</label>
            {readyToPrint ? (
              <span className="print-field">{d.land_old_type}</span>
            ) : (
              <select className="inline-select medium-select" value={form.land_old_type} onChange={handle('land_old_type')}>
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

        {/* --- Current Address --- */}
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

        {/* --- Four Boundaries --- */}
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

        {/* --- House Description --- */}
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

        {/* --- Declarations --- */}
        <div className="declarations-section mt-10">
          <p>विद्युत शक्ति दिन यस {MUNICIPALITY.name}लाई कुनै आपत्ति छैन।</p>
          <p className="underline-text">निजले आवेदन दिएको घरमा :</p>
          <ul className="dashed-list">
            <li>- पहिले विद्युत सप्लाई थिएन तसर्थ निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
            <li>- विद्युत सप्लाई भएको हो छुट्टै भित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
          </ul>
        </div>

        {/* --- Signature Section --- */}
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

        {/* --- Applicant Details via ApplicantDetailsNp --- */}
        {/* FIX: correct props — formData + handleChange (not values + onChange) */}
        <ApplicantDetailsNp
          formData={readyToPrint ? d : form}
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

export default ElectricityInstallation;