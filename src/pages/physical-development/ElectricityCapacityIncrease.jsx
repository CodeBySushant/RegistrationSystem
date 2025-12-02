// ElectricityCapacityIncrease.jsx
import React, { useState } from 'react';
import './ElectricityCapacityIncrease.css';

const ElectricityCapacityIncrease = () => {
  const [form, setForm] = useState({
    letter_no: '२०८२/८३',
    reference_no: '',
    date_bs: '२०८२-०८-०६',      // Nepali BS date (string). Backend must accept strings.
    date_ad: '',                // optional AD date if you convert on frontend
    recipient_name: '',
    recipient_address: '',
    municipality: 'नागार्जुन नगरपालिका',
    ward_no: '१',
    location: '',               // place where electric capacity increase requested
    business_name: '',
    business_owner: '',
    reason: '',
    applicant_name: '',
    applicant_address: '',
    applicant_citizenship_no: '',
    applicant_phone: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.recipient_name) err.recipient_name = 'Required';
    if (!form.location) err.location = 'Required';
    if (!form.business_name) err.business_name = 'Required';
    if (!form.applicant_name) err.applicant_name = 'Required';
    // (add other validations you need)
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);

    // Build payload — IMPORTANT: do NOT include created_at
    const payload = {
      letter_no: form.letter_no,
      reference_no: form.reference_no || null,
      // send BS date as string to avoid MySQL DATE parsing issue
      date_bs: form.date_bs || null,
      // optional AD date (ISO) if you convert it client-side; otherwise backend converts BS->AD
      date_ad: form.date_ad || null,
      recipient_name: form.recipient_name,
      recipient_address: form.recipient_address,
      municipality: form.municipality,
      ward_no: form.ward_no,
      location: form.location,
      business_name: form.business_name,
      business_owner: form.business_owner,
      reason: form.reason,
      applicant_name: form.applicant_name,
      applicant_address: form.applicant_address,
      applicant_citizenship_no: form.applicant_citizenship_no,
      applicant_phone: form.applicant_phone
    };

    try {
      const res = await fetch('/api/electricity-capacity-increase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const data = await res.json();
      alert('Saved successfully.');
      // reset or navigate as needed
    } catch (error) {
      console.error('Submit error', error);
      alert('Submission failed. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="capacity-increase-container">
      <div className="top-bar-title">
        विद्युत क्षमता बढाउन
        <span className="top-right-bread">भौतिक निर्माण &gt; विद्युत क्षमता बढाउन</span>
      </div>

      <form className="form-main" onSubmit={handleSubmit}>
        <div className="form-row meta-row">
          <label>पत्र संख्या :</label>
          <input name="letter_no" value={form.letter_no} onChange={handleChange} />
          <label>चलानी नं. :</label>
          <input name="reference_no" value={form.reference_no} onChange={handleChange} />
          <label>मिति (बीएस) :</label>
          <input name="date_bs" value={form.date_bs} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>प्राप्त गर्ने :</label>
          <input name="recipient_name" value={form.recipient_name} onChange={handleChange} />
          {errors.recipient_name && <span className="error">{errors.recipient_name}</span>}
        </div>

        <div className="form-row">
          <label>ठेगाना :</label>
          <input name="recipient_address" value={form.recipient_address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>स्थान (ठाउँ):</label>
          <input name="location" value={form.location} onChange={handleChange} />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-row">
          <label>व्यवसाय/संचालक :</label>
          <input placeholder="व्यवसायको नाम" name="business_name" value={form.business_name} onChange={handleChange} />
          <input placeholder="संचालक" name="business_owner" value={form.business_owner} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>कारण / विवरण :</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} />
        </div>

        <div className="form-row">
          <h4>निवेदकको विवरण</h4>
          <label>नाम :</label>
          <input name="applicant_name" value={form.applicant_name} onChange={handleChange} />
          {errors.applicant_name && <span className="error">{errors.applicant_name}</span>}
          <label>ठेगाना :</label>
          <input name="applicant_address" value={form.applicant_address} onChange={handleChange} />
          <label>नागरिकता नं. :</label>
          <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={handleChange} />
          <label>फोन :</label>
          <input name="applicant_phone" value={form.applicant_phone} onChange={handleChange} />
        </div>

        <div className="form-row actions">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}
          </button>
        </div>
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default ElectricityCapacityIncrease;
