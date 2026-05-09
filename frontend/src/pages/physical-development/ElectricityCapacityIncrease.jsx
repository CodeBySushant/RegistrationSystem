// ElectricityCapacityIncrease.jsx
import React, { useState } from 'react';
import './ElectricityCapacityIncrease.css';
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';

const FORM_KEY = 'electricity-capacity-increase';
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no: '',
  reference_no: '',
  date_bs: '',
  date_ad: todayIso(),
  recipient_name: '',
  recipient_address: '',
  ward_no: '',
  location: '',
  business_name: '',
  business_owner: '',
  reason: '',
  applicant_name: '',
  applicant_address: '',
  applicant_citizenship_no: '',
  applicant_phone: '',
};

const ElectricityCapacityIncrease = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.recipient_name.trim()) err.recipient_name = 'आवश्यक छ';
    if (!form.location.trim()) err.location = 'आवश्यक छ';
    if (!form.business_name.trim()) err.business_name = 'आवश्यक छ';
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
        letter_no: form.letter_no || null,
        reference_no: form.reference_no || null,
        date_bs: form.date_bs || null,
        date_ad: form.date_ad || null,
        recipient_name: form.recipient_name,
        recipient_address: form.recipient_address,
        municipality: MUNICIPALITY.name,
        ward_no: user?.ward || form.ward_no || null,
        location: form.location,
        business_name: form.business_name,
        business_owner: form.business_owner,
        reason: form.reason,
        applicant_name: form.applicant_name,
        applicant_address: form.applicant_address,
        applicant_citizenship_no: form.applicant_citizenship_no,
        applicant_phone: form.applicant_phone,
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

  return (
    <div className="capacity-increase-container">
      {/* Top bar — hidden on print */}
      <div className="top-bar-title no-print">
        <span>विद्युत क्षमता बढाउन</span>
        <span className="top-right-bread">
          {MUNICIPALITY.name} &gt; विद्युत क्षमता बढाउन
        </span>
      </div>

      {/* Print-only municipality header */}
      <div className="print-only">
        <MunicipalityHeader showLogo={true} />
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>विद्युत क्षमता बढाउन</h2>
      </div>

      <form className="form-main" onSubmit={handleSubmit}>
        {/* Meta row */}
        <div className="form-row meta-row">
          <label>पत्र संख्या :</label>
          <input
            name="letter_no"
            value={form.letter_no}
            onChange={handleChange}
            className="form-input"
            placeholder="पत्र संख्या"
          />
          <label>चलानी नं. :</label>
          <input
            name="reference_no"
            value={form.reference_no}
            onChange={handleChange}
            className="form-input"
            placeholder="चलानी नं."
          />
          <label>मिति (बीएस) :</label>
          <input
            name="date_bs"
            value={form.date_bs}
            onChange={handleChange}
            className="form-input"
            placeholder="२०८२-०८-०६"
          />
        </div>

        {/* Recipient */}
        <div className="form-row">
          <label>प्राप्त गर्ने : <span className="red">*</span></label>
          <input
            name="recipient_name"
            value={form.recipient_name}
            onChange={handleChange}
            className={`form-input${errors.recipient_name ? ' input-error' : ''}`}
            placeholder="प्राप्त गर्नेको नाम"
          />
          {errors.recipient_name && <span className="error">{errors.recipient_name}</span>}
        </div>

        {/* Recipient address */}
        <div className="form-row">
          <label>ठेगाना :</label>
          <input
            name="recipient_address"
            value={form.recipient_address}
            onChange={handleChange}
            className="form-input"
            placeholder="ठेगाना"
          />
        </div>

        {/* Ward */}
        <div className="form-row">
          <label>वडा नं. :</label>
          <input
            name="ward_no"
            value={user?.ward || form.ward_no}
            onChange={handleChange}
            className="form-input"
            placeholder="वडा नं."
            readOnly={!!user?.ward}
          />
        </div>

        {/* Location */}
        <div className="form-row">
          <label>स्थान (ठाउँ) : <span className="red">*</span></label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className={`form-input${errors.location ? ' input-error' : ''}`}
            placeholder="स्थानको नाम"
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        {/* Business */}
        <div className="form-row">
          <label>व्यवसाय/संचालक : <span className="red">*</span></label>
          <input
            placeholder="व्यवसायको नाम"
            name="business_name"
            value={form.business_name}
            onChange={handleChange}
            className={`form-input${errors.business_name ? ' input-error' : ''}`}
          />
          <input
            placeholder="संचालक"
            name="business_owner"
            value={form.business_owner}
            onChange={handleChange}
            className="form-input"
          />
          {errors.business_name && <span className="error">{errors.business_name}</span>}
        </div>

        {/* Reason */}
        <div className="form-row">
          <label>कारण / विवरण :</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="कारण वा विवरण लेख्नुहोस्"
          />
        </div>

        {/* Applicant details */}
        <div className="form-row applicant-section">
          <h4>निवेदकको विवरण</h4>

          <div className="applicant-grid">
            <div className="applicant-field">
              <label>नाम : <span className="red">*</span></label>
              <input
                name="applicant_name"
                value={form.applicant_name}
                onChange={handleChange}
                className={`form-input${errors.applicant_name ? ' input-error' : ''}`}
                placeholder="निवेदकको नाम"
              />
              {errors.applicant_name && <span className="error">{errors.applicant_name}</span>}
            </div>

            <div className="applicant-field">
              <label>ठेगाना :</label>
              <input
                name="applicant_address"
                value={form.applicant_address}
                onChange={handleChange}
                className="form-input"
                placeholder="ठेगाना"
              />
            </div>

            <div className="applicant-field">
              <label>नागरिकता नं. :</label>
              <input
                name="applicant_citizenship_no"
                value={form.applicant_citizenship_no}
                onChange={handleChange}
                className="form-input"
                placeholder="नागरिकता नं."
              />
            </div>

            <div className="applicant-field">
              <label>फोन :</label>
              <input
                name="applicant_phone"
                value={form.applicant_phone}
                onChange={handleChange}
                className="form-input"
                placeholder="फोन नम्बर"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="form-row actions no-print">
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

export default ElectricityCapacityIncrease;