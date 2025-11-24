import React from 'react';

const FormSelect = ({ label, name, options, required = false, value, onChange }) => (
    <div className="flex flex-col space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            className="p-2 border border-gray-300 bg-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        >
            <option value="" disabled>छान्नुहोस्</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default FormSelect;