import React from 'react';

const PlaceholderPage = ({ activeLink }) => {
    return (
        <div className="p-8">
            <div className="text-3xl font-bold text-gray-700 mb-6">
                {activeLink}
            </div>
            <p className="text-gray-500">
                हालको सक्रिय लिंकको सामग्री यहाँ प्रदर्शित हुनेछ।
            </p>
            <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">सक्रिय लिंकको विवरण:</h3>
                <p className="text-indigo-600 font-medium">{activeLink}</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;