// IrrigationElectricMeterInstallationRecommendation.jsx
import React, { useState } from 'react';
import './IrrigationElectricMeterInstallationRecommendation.css';
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import ApplicantDetailsNp from '../../components/ApplicantDetailsNp';

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
  ward_no: '',
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

const IrrigationElectricMeterInstallationRecommendation = () => {
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

export default IrrigationElectricMeterInstallationRecommendation;