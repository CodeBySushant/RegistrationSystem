import React, { useState } from 'react';
import './DisabilityIdentityCardList.css';
// 3
const initialData = [
  { 
    id: 1, 
    date: '२०८२-०१-२५', 
    name: 'श्री हिमांशु महतो', 
    invoice: '२५९', 
    type: 'आँखा नदेख्ने किसिमको', 
    officer: 'मन्जिल आचार्य', 
    citizenship: '', 
    phone: '', 
    remarks: 'dfgbn d',
    status: 'Pending Card' 
  },
  { 
    id: 2, 
    date: '२०८१-१२-१४', 
    name: 'श्री सुजन श्रेष्ठ', 
    invoice: '२९१', 
    type: 'पुर्ण', 
    officer: 'मन्जिल आचार्य', 
    citizenship: '12345', 
    phone: '9812345672', 
    remarks: '',
    status: 'Pending' 
  },
  { 
    id: 3, 
    date: '२०८१-०४-२०', 
    name: 'श्रीमती Seth Potts', 
    invoice: '५२', 
    type: 'Qui molestiae et per', 
    officer: 'मन्जिल आचार्य', 
    citizenship: 'Quisquam enim suscip', 
    phone: '+1 (168) 262-8463', 
    remarks: '',
    status: 'Pending' 
  },
];

const DisabilityIdentityCardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Add filtering logic here
  };

  const handleAdd = () => {
    console.log('Add button clicked');
  };

  return (
    <div className="disability-list-container">
      {/* --- Top Header Bar --- */}
      <div className="list-header-bar">
        <h2>अपांग परिचय पत्र</h2>
        <div className="breadcrumb">
          अपांग परिचय पत्र &gt; <span className="active-crumb">अपांग परिचय पत्र सूची</span>
        </div>
      </div>

      {/* --- Main Content Area (Gray Background) --- */}
      <div className="list-content-area">
        
        {/* --- Actions Row --- */}
        <div className="list-actions-row">
          <div className="search-group">
            <input 
              type="text" 
              placeholder="आवेदकको नाम" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              🔍 खोज्नुहोस्
            </button>
          </div>

          <button className="add-new-btn" onClick={handleAdd}>
            <span className="plus-icon">+</span> अपांगता भएका व्यक्तिको परिचयपत्र थप्नुहोस्
          </button>
        </div>

        {/* --- Table --- */}
        <div className="table-responsive">
          <table className="disability-table">
            <thead>
              <tr>
                <th>मिति</th>
                <th>आवेदकको नाम</th>
                <th>चलानी नम्बर</th>
                <th>अशक्तता प्रकार</th>
                <th>अधिकृत व्यक्ति</th>
                <th>आवेदक नागरिकता नम्बर</th>
                <th>आवेदक फोन नम्बर</th>
                <th>सिफारिस</th>
                <th>कैफियत</th>
                <th>Status</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.invoice}</td>
                  <td>{row.type}</td>
                  <td>{row.officer}</td>
                  <td>{row.citizenship}</td>
                  <td>{row.phone}</td>
                  <td className="text-center">
                    <span className="eye-icon">👁</span>
                  </td>
                  <td>{row.remarks}</td>
                  <td>
                    <span className="status-badge">{row.status}</span>
                  </td>
                  <td>{/* Action buttons would go here */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="list-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default DisabilityIdentityCardList;