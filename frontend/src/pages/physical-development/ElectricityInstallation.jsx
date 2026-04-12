// ElectricityInstallation.jsx
import React, { useState } from 'react';
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
  municipality_name: '',
  ward_no: '',
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
  // applicant fields — managed by ApplicantDetailsNp
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

  const handle = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  // Used by ApplicantDetailsNp to update applicant fields
  const handleApplicantChange = (fields) => {
    setForm((prev) => ({ ...prev, ...fields }));
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
        ward_no: user?.ward || form.ward_no || null,
      };

      const res = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || 'unknown';
      setMessage({ type: 'success', text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });

      setTimeout(() => window.print(), 300);
      setForm({ ...initialForm, date_ad: todayIso() });
    } catch (error) {
      const info = error.response?.data?.message || error.message || 'Failed to save';
      setMessage({ type: 'error', text: `Error: ${info}` });
      console.error('Submit error', error);
    } finally {
      setSubmitting(false);
    }
  };

  const wardDisplay = user?.ward || form.ward_no;

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

        {/* --- Header Section (print + screen) --- */}
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
                placeholder="२०८२/८३"
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
          <p className="bold-text">श्री बुटवल पावर कम्पनी लिमिटेड</p>
          <div className="addressee-row">
            <input
              type="text"
              className="line-input medium-input"
              value={form.recipient_office}
              onChange={handle('recipient_office')}
              placeholder="कार्यालयको नाम"
            />
            <span className="bold-text">, {MUNICIPALITY.city}</span>
          </div>
        </div>

        {/* --- Main Body Paragraph --- */}
        <div className="form-body">
          <p className="body-paragraph">
            त्यहाँ विद्युत शक्ति सप्लाई गर्ने आवेदन दिने&nbsp;
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.municipality_name || MUNICIPALITY.englishMunicipality}
              onChange={handle('municipality_name')}
            />
            &nbsp;वडा नं.&nbsp;
            <input
              type="text"
              className="inline-box-input tiny-box"
              value={wardDisplay}
              onChange={handle('ward_no')}
              readOnly={!!user?.ward}
            />
            &nbsp;बस्ने&nbsp;
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
            &nbsp;तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको लागि सिफारिस गरिएको छ ।
          </p>
          {errors.applicant_full_name && <span className="error">{errors.applicant_full_name}</span>}
        </div>

        {/* --- Family Details --- */}
        <div className="family-details-section">
          <div className="form-row">
            <select
              className="inline-select"
              value={form.father_husband_relation}
              onChange={handle('father_husband_relation')}
            >
              <option>पति</option>
              <option>पिता</option>
            </select>
            <label>को नाम, थर, वतन :-</label>
            <input
              type="text"
              className={`dotted-input medium-input${errors.father_husband_name ? ' input-error' : ''}`}
              value={form.father_husband_name}
              onChange={handle('father_husband_name')}
              placeholder="नाम थर"
            />
            <span>,</span>
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.father_husband_hometown}
              onChange={handle('father_husband_hometown')}
              placeholder="वतन"
            />
          </div>
          {errors.father_husband_name && <span className="error">{errors.father_husband_name}</span>}

          <div className="form-row">
            <select
              className="inline-select"
              value={form.grandfather_relation}
              onChange={handle('grandfather_relation')}
            >
              <option>ससुरा</option>
              <option>बाजे</option>
            </select>
            <label>को नाम, थर, वतन :-</label>
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.grandfather_name}
              onChange={handle('grandfather_name')}
              placeholder="नाम थर"
            />
            <span>,</span>
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.grandfather_hometown}
              onChange={handle('grandfather_hometown')}
              placeholder="वतन"
            />
          </div>
        </div>

        {/* --- Property Details --- */}
        <div className="property-details-section mt-20">
          <span className="section-label">घर रहेको जग्गाको विवरण :-</span>
          <div className="form-row">
            <label>साविक</label>
            <select
              className="inline-select medium-select"
              value={form.land_old_type}
              onChange={handle('land_old_type')}
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.land_old_name}
              onChange={handle('land_old_name')}
              placeholder="नाम"
            />
            <label>वडा नं.</label>
            <input
              type="text"
              className="dotted-input tiny-input"
              value={form.land_ward_no}
              onChange={handle('land_ward_no')}
            />
            <label>कि.नं.</label>
            <input
              type="text"
              className="dotted-input small-input"
              value={form.land_ki_no}
              onChange={handle('land_ki_no')}
            />
            <label>क्षेत्रफल</label>
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.land_area}
              onChange={handle('land_area')}
            />
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
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.tole}
              onChange={handle('tole')}
              placeholder="टोलको नाम"
            />
          </div>
        </div>

        {/* --- Four Boundaries --- */}
        <div className="killa-section mt-20">
          <span className="section-label underline-text">जग्गाको चार किल्ला:-</span>
          <div className="killa-grid">
            <div className="killa-item">
              <label>पूर्वमा:-</label>
              <input
                type="text"
                className={`dotted-input full-killa-input${errors.east ? ' input-error' : ''}`}
                value={form.east}
                onChange={handle('east')}
              />
            </div>
            <div className="killa-item">
              <label>पश्चिममा:-</label>
              <input
                type="text"
                className={`dotted-input full-killa-input${errors.west ? ' input-error' : ''}`}
                value={form.west}
                onChange={handle('west')}
              />
            </div>
            <div className="killa-item">
              <label>उत्तरमा:-</label>
              <input
                type="text"
                className={`dotted-input full-killa-input${errors.north ? ' input-error' : ''}`}
                value={form.north}
                onChange={handle('north')}
              />
            </div>
            <div className="killa-item">
              <label>दक्षिणमा:-</label>
              <input
                type="text"
                className={`dotted-input full-killa-input${errors.south ? ' input-error' : ''}`}
                value={form.south}
                onChange={handle('south')}
              />
            </div>
          </div>
        </div>

        {/* --- House Description --- */}
        <div className="house-desc-section mt-20">
          <div className="form-body">
            <p className="body-paragraph">
              घरको विवरण :&nbsp;
              <input
                type="text"
                className="dotted-input medium-input"
                value={form.house_material}
                onChange={handle('house_material')}
                placeholder="सामग्री"
              />
              &nbsp;ले बनेको&nbsp;
              <input
                type="text"
                className="dotted-input small-input"
                value={form.house_floors}
                onChange={handle('house_floors')}
                placeholder="तल्ला"
              />
              &nbsp;तल्ले घर -१ निजले विद्युत सप्लाईको लागि आवेदन घर&nbsp;
              <input
                type="text"
                className="dotted-input medium-input"
                value={form.house_owner_name}
                onChange={handle('house_owner_name')}
                placeholder="नाम"
              />
              &nbsp;को नाममा छ।
            </p>
          </div>
        </div>

        {/* --- Declarations --- */}
        <div className="declarations-section mt-10">
          <p>विद्युत शक्ति दिन यस नगरपालिकालाई कुनै आपत्ति छैन।</p>
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
        <ApplicantDetailsNp
          values={{
            applicant_name: form.applicant_name,
            applicant_address: form.applicant_address,
            applicant_citizenship_no: form.applicant_citizenship_no,
            applicant_phone: form.applicant_phone,
          }}
          onChange={handleApplicantChange}
          errors={{
            applicant_name: errors.applicant_name,
          }}
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