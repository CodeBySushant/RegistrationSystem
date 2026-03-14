import React, { useState, useEffect } from 'react';
import './SuchanaDetailList.css';

const API_URL = "/api/forms/notice-details-list";

const NoticeDetailList = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    noticeNo: ""
  });

  const [loading, setLoading] = useState(false);

  // --- Fetch All Records ---
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Error loading notices:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // --- Handle Search ---
  const handleSearch = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      if (filters.fromDate) query.append("fromDate", filters.fromDate);
      if (filters.toDate) query.append("toDate", filters.toDate);
      if (filters.noticeNo) query.append("noticeNo", filters.noticeNo);

      const res = await fetch(`${API_URL}?${query.toString()}`);
      const json = await res.json();

      setData(json.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    }

    setLoading(false);
  };

  // --- Excel Export ---
  const handleExcelExport = () => {
    window.open(`${API_URL}/export/excel`, "_blank");
  };

  // --- Print Page ---
  const handlePrint = () => {
    window.print();
  };

  // --- Add New Record ---
  const handleAddRecord = () => {
    window.location.href = "/add-notice"; // Change to your route
  };

  return (
    <div className="notice-list-container">

      {/* --- Top Header --- */}
      <div className="list-header">
        <h2>सूचनाको सूची ।</h2>
        <button className="back-link-btn" onClick={() => window.history.back()}>← Back</button>
      </div>

      {/* --- Action Buttons --- */}
      <div className="action-buttons-row">
        <button className="action-btn excel-btn" onClick={handleExcelExport}>एक्सेल निर्यात गर्नुहोस्</button>
        <button className="action-btn print-btn" onClick={handlePrint}>प्रिन्ट गर्नुहोस्</button>
        <button className="add-record-btn" onClick={handleAddRecord}>+ नयाँ रेकर्ड थप्नुहोस</button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="search-filter-bar">

        <div className="filter-group date-group">
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
            className="filter-input date-field"
          />
          <label className="input-label">मिति देखि</label>
        </div>

        <div className="filter-group date-group">
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
            className="filter-input date-field"
          />
          <label className="input-label">मिति सम्म</label>
        </div>

        <div className="filter-group text-group">
          <input
            type="text"
            placeholder="सूचना नं."
            value={filters.noticeNo}
            onChange={(e) => setFilters({ ...filters, noticeNo: e.target.value })}
            className="filter-input text-field"
          />
          <label className="input-label">सूचना नं.</label>
        </div>

        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="notice-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>सूचना नं.</th>
              <th>सूचना मिति</th>
              <th>स्वीकृत मिति</th>
              <th>किसिम</th>
              <th>प्रयोजन</th>
              <th>विषय</th>
              <th>स्थान</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="loading-row">लोड भइरहेको छ…</td></tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-row">
                  कुनै सूचना फेला परेन।
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.notice_no}</td>
                  <td>{row.issue_date}</td>
                  <td>{row.approve_date}</td>
                  <td>{row.type}</td>
                  <td>{row.purpose}</td>
                  <td>{row.subject}</td>
                  <td>{row.location}</td>
                  <td className="text-center eye-btn" onClick={() => window.location.href = `/notice/${row.id}`}>
                    👁
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>

    </div>
  );
};

export default NoticeDetailList;
