// src/components/SeniorCitizenIdentityCardList.jsx
import React, { useEffect, useState } from "react";
import "./SeniorCitizenIdentityCardList.css";

const API_BASE = import.meta.env.VITE_API_BASE || ""; // If CRA, use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/senior/cards`;

const SeniorCitizenIdentityCardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);        // rows from DB
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [total, setTotal] = useState(0);

  const fetchData = async ({ q = searchTerm, p = page } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      params.append("page", p);
      params.append("pageSize", pageSize);

      const url = `${API_URL}?${params.toString()}`;
      const resp = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.message || json.error || "Server error");

      setData(Array.isArray(json.rows) ? json.rows : []);
      setTotal(typeof json.total === "number" ? json.total : (Array.isArray(json.rows) ? json.rows.length : 0));
      setPage(Number(p));
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to load data");
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setPage(1);
    fetchData({ q: searchTerm, p: 1 });
  };

  const handleAdd = () => {
    // placeholder to open add page/modal - keep layout unchanged
    console.log("Add Senior Citizen clicked");
    // e.g., navigate("/senior/add")
  };

  return (
    <div className="senior-list-container">
      {/* --- Top Header Bar --- */}
      <div className="list-header-bar">
        <h2>ज्येष्ठ नागरिक परिचय पत्र</h2>
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
              {loading ? (
                <tr><td colSpan="8" style={{ padding: 12 }}>लोड हुँदैछ...</td></tr>
              ) : error ? (
                <tr><td colSpan="8" style={{ padding: 12, color: "red" }}>{error}</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="8" style={{ padding: 12 }}>डाटा उपलब्ध छैन। खोज गर्नुहोस्।</td></tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.name}</td>
                    <td>{row.father_name}</td>
                    <td>{row.grandfather_name}</td>
                    <td>{row.officer}</td>
                    <td>{row.remarks}</td>
                    <td><span className="status-badge">{row.status}</span></td>
                    <td>
                      {/* keep actions empty to preserve layout */}
                      <button className="icon-btn" title="View" onClick={() => window.open(`${API_BASE}/senior/${row.id}`, "_blank")}>👁</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- Simple pagination --- */}
        {total > pageSize && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span>पृष्ठ {page} • जम्मा {total} आइटम</span>
            <div style={{ marginLeft: "auto" }}>
              <button onClick={() => fetchData({ p: Math.max(1, page - 1) })} disabled={page === 1}>Prev</button>
              <button onClick={() => fetchData({ p: page + 1 })} style={{ marginLeft: 8 }} disabled={page * pageSize >= total}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <div className="list-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default SeniorCitizenIdentityCardList;
