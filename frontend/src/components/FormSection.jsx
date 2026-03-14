import React from 'react';

const FormSection = ({ title, children, sectionNumber }) => (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
        <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">
            {sectionNumber}. {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

export default FormSection;