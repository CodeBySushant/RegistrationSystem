import React, { useState } from 'react';
import './SeniorCitizenIdentityCardList.css';

// 4
const initialData = [
  { 
    id: 1, 
    date: '२०८२-०५-१८', 
    name: 'जगत कुमारी कार्की', 
    fatherName: '', 
    grandfatherName: '', 
    officer: 'मन्जिल आचार्य', 
    remarks: '',
    status: 'Pending' 
  },
  { 
    id: 2, 
    date: '२०८१-१०-१२', 
    name: '32', 
    fatherName: '', 
    grandfatherName: '', 
    officer: 'मन्जिल आचार्य', 
    remarks: '',
    status: 'Pending Card' 
  },
  { 
    id: 3, 
    date: '2082-07-16', 
    name: 'Liberty Christian', 
    fatherName: '', 
    grandfatherName: '', 
    officer: 'मन्जिल आचार्य', 
    remarks: '',
    status: 'Pending' 
  },
  { 
    id: 4, 
    date: '2082-07-15', 
    name: 'Lionel Nixon', 
    fatherName: '', 
    grandfatherName: '', 
    officer: 'मन बहादुर श्रेष्ठ', 
    remarks: '',
    status: 'Pending' 
  },
];

const SeniorCitizenIdentityCardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement search logic here
  };

  const handleAdd = () => {
    console.log('Add Senior Citizen button clicked');
  };

  return (
    <div className="senior-list-container">
      {/* --- Top Header Bar --- */}
      <div className="list-header-bar">
        {/* Note: The image shows "अपांग परिचय पत्र" here, but based on context it should likely be "ज्येष्ठ नागरिक परिचय पत्र" */}
        <h2>अपांग परिचय पत्र</h2> 
        <div className="breadcrumb">
          ज्येष्ठ नागरिक परिचय पत्र &gt; <span className="active-crumb">ज्येष्ठ नागरिक परिचय पत्र सूची</span>
        </div>
      </div>

      {/* --- Main Content Area (Gray Background) --- */}
      <div className="list-content-area">
        
        {/* --- Actions Row --- */}
        <div className="list-actions-row">
          <div className="search-group">
            <input 
              type="text" 
              placeholder="ज्येष्ठ नागरिकको नाम" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              🔍 खोज्नुहोस्
            </button>
          </div>

          <button className="add-new-btn" onClick={handleAdd}>
            <span className="plus-icon">+</span> ज्येष्ठ नागरिकको परिचयपत्र थप्नुहोस्
          </button>
        </div>

        {/* --- Table --- */}
        <div className="table-responsive">
          <table className="senior-table">
            <thead>
              <tr>
                <th>मिति</th>
                <th>नाम</th>
                <th>आवेदक पिताको नाम</th>
                <th>आवेदक हजुरबुवा नाम</th>
                <th>अधिकृत व्यक्ति</th>
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
                  <td>{row.fatherName}</td>
                  <td>{row.grandfatherName}</td>
                  <td>{row.officer}</td>
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

export default SeniorCitizenIdentityCardList;