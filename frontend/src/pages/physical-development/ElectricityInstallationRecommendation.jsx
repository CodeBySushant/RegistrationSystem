// ElectricityInstallationRecommendation.jsx
import React, { useState } from 'react';
import './ElectricityInstallationRecommendation.css';
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

const FORM_KEY = 'electricity-installation-recommendation';
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no: '',
  reference_no: '',
  date_bs: '',
  date_ad: todayIso(),
  sabik_ward_no: '',
  salutation: 'श्री',
  applicant_full_name: '',
  // tapashil table row
  land_vatan: '',
  table_ward_no: '',
  seat_no: '',
  ki_no: '',
  area: '',
  east: '',
  west: '',
  north: '',
  // signature
  signatory_name: '',
  signatory_designation: 'वडा अध्यक्ष',
  // applicant details (ApplicantDetailsNp)
  applicant_name: '',
  applicant_address: '',
  applicant_citizenship_no: '',
  applicant_phone: '',
};

const ElectricityInstallationRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handle = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  const handleApplicantChange = (fields) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const validate = () => {
    const err = {};
    if (!form.applicant_full_name.trim()) err.applicant_full_name = 'आवश्यक छ';
    if (!form.sabik_ward_no.trim()) err.sabik_ward_no = 'आवश्यक छ';
    if (!form.land_vatan.trim()) err.land_vatan = 'आवश्यक छ';
    if (!form.ki_no.trim()) err.ki_no = 'आवश्यक छ';
    if (!form.east.trim()) err.east = 'आवश्यक छ';
    if (!form.west.trim()) err.west = 'आवश्यक छ';
    if (!form.north.trim()) err.north = 'आवश्यक छ';
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
        ward_no: user?.ward || null,
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
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.sabik_ward_no}
              onChange={handle('sabik_ward_no')}
              placeholder="साविक ठाउँ"
            />
            &nbsp;वडा नं.&nbsp;
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
        <ApplicantDetailsNp
          values={{
            applicant_name: form.applicant_name,
            applicant_address: form.applicant_address,
            applicant_citizenship_no: form.applicant_citizenship_no,
            applicant_phone: form.applicant_phone,
          }}
          onChange={handleApplicantChange}
          errors={{ applicant_name: errors.applicant_name }}
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