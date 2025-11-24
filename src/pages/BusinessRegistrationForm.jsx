import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import FormInput from '../components/FormInput.jsx';
import FormSelect from '../components/FormSelect.jsx';
import FormSection from '../components/FormSection.jsx';

const BusinessRegistrationForm = ({ setActiveLink }) => {
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({});
        setActiveLink('गृहपृष्ठ');
    };

    return (
        <div className="p-4 sm:p-8 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4">
                व्यवसाय दर्ता दरखास्त फारम (Business Registration Application Form)
            </h1>

            <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="text-lg font-semibold text-gray-800 mb-4">
                    श्री <span className="font-bold text-indigo-600">अध्यक्ष / प्रशासकीय अधिकृत</span> ज्यू,
                </div>
                <div className="mb-6">
                    <FormInput
                        label="विषय"
                        name="subject"
                        value="व्यवसाय दर्ता गर्ने बारे ।"
                        placeholder=""
                        required={true}
                        onChange={handleChange}
                    />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic border-l-4 border-gray-200 pl-4 py-2">
                    महोदय,
                    तल लेखिए बमोजिमको व्यापार व्यवसाय गर्न निम्ति लिखित नामको व्यवसाय दर्ता गराउन ईच्छुक भएकोले दर्ताको लागि आवश्यक पर्ने कागजातहरू सहित निवेदनसंगै संलग्न गरी यो निवेदन पेश गरेको छु। लेखिएको विवरणमा कुनै कुरा झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला।
                </p>
            </div>

            <FormSection title="व्यवसायको विवरण" sectionNumber={1}>
                {/* ... Form fields ... */}
                <FormInput label="व्यवसायको पूरा नाम (नेपालीमा)" name="businessNameNp" required={true} onChange={handleChange} />
                <FormInput label="व्यवसायको पूरा नाम (अंग्रेजीमा)" name="businessNameEn" required={true} onChange={handleChange} />
                <FormSelect label="व्यवसायको उद्देश्य" name="businessObjective" options={['सामान्य व्यापार', 'उद्योग', 'सेवा']} required={true} onChange={handleChange} value={formData.businessObjective} />
                <FormInput label="व्यवसायमा लगाउने पूँजी (रुपैयाँमा)" name="capital" type="number" required={true} onChange={handleChange} />
                <FormInput label="पूँजी (अक्षरेपी)" name="capitalInWords" required={true} onChange={handleChange} />
                <FormInput label="व्यवसायले कारोबार गर्ने मुख्य वस्तु" name="mainProduct" required={true} onChange={handleChange} />
            </FormSection>

            <FormSection title="व्यवसायको ठेगाना" sectionNumber={2}>
                <FormInput label="जिल्ला" name="bizDistrict" required={true} onChange={handleChange} />
                <FormInput label="वडा नं." name="bizWard" required={true} type="number" onChange={handleChange} />
                <FormInput label="टोल" name="bizTole" required={true} onChange={handleChange} />
                <FormInput label="फोन नं." name="bizPhone" required={true} type="tel" onChange={handleChange} />
            </FormSection>
            
            <FormSection title="प्रोप्राइटरको व्यक्तिगत विवरण" sectionNumber={3}>
                <FormInput label="प्रोप्राइटरको पूरा नाम" name="proprietorName" required={true} onChange={handleChange} />
                <FormInput label="नागरिकता नं." name="citizenNo" required={true} onChange={handleChange} />
                <FormInput label="नागरिकता जारी मिति (वि.सं.)" name="issueDate" placeholder="YYYY-MM-DD" required={true} onChange={handleChange} />
                <FormInput label="स्थायी ठेगाना (जिल्ला)" name="permDistrict" required={true} onChange={handleChange} />
                <FormInput label="स्थायी ठेगाना (वडा नं.)" name="permWard" required={true} type="number" onChange={handleChange} />
                <FormInput label="स्थायी ठेगाना (टोलको नाम)" name="permTole" required={true} onChange={handleChange} />
            </FormSection>

            <FormSection title="पारिवारिक विवरण" sectionNumber={4}>
                <FormInput label="प्रोप्राइटरको बाजेको नाम" name="gFatherName" required={true} onChange={handleChange} />
                <FormInput label="प्रोप्राइटरको बाबुको नाम" name="fatherName" required={true} onChange={handleChange} />
                <FormInput label="विवाहित महिला भए पतिको नाम" name="husbandName" required={false} onChange={handleChange} />
            </FormSection>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
                >
                    पेश गर्ने (Submit)
                </button>
                <button
                    type="button"
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition duration-150"
                >
                    रेकर्ड हेर्नुहोस् र प्रिन्ट गर्नुहोस्
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
                        <Zap className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">निवेदन सफलतापूर्वक पेश भयो!</h3>
                        <p className="text-gray-600 mb-6">तपाईंको व्यवसाय दर्ताको निवेदन प्रणालीमा दर्ता गरिएको छ।</p>
                        <button
                            onClick={closeModal}
                            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
                            गृहपृष्ठमा फर्कनुहोस्
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BusinessRegistrationForm;