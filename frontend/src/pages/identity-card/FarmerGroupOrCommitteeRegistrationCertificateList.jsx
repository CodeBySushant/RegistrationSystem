// src/pages/identity-card/FarmerGroupOrCommitteeRegistrationCertificateList.jsx
import React, { useEffect, useState } from "react";
import "./FarmerGroupOrCommitteeRegistrationCertificateList.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "farmer-group-committee-registration"; // must match forms.json
const API_URL = `/api/forms/${FORM_KEY}`;

const FarmerGroupOrCommitteeRegistrationCertificateList = () => {
  const [rows, setRows] = useState([]);       // raw rows from API
  const [filtered, setFiltered] = useState([]); // filtered view
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filters
  const [qName, setQName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setRows(arr);
      setFiltered(arr);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to safely extract fields with fallback to older initialData keys
  const mapRow = (r) => {
    return {
      id: r.id,
      sn: r.id ? String(r.id) : "-", // if you want Nepali numerals convert later
      groupName: r.group_name || r.groupName || "-",
      regNo: r.reg_no || r.regNo || "-",
      regDate: r.reg_date ? r.reg_date.split("T")[0] : (r.regDate || "-"),
      formedDate: r.signing_date ? r.signing_date.split("T")[0] : (r.signing_date || r.created_at ? (r.created_at ? r.created_at.split("T")[0] : "-") : (r.formedDate || "-")),
      type: r.type || r.group_type || "-",
      department: r.department || r.service_area || "-",
      address: r.address || r.applicant_address || "-",
      officer: r.authority_name || r.officer || "-",
      position: r.authority_position || r.position || "-"
    };
  };

  const handleSearch = () => {
    const q = qName.trim().toLowerCase();
    let out = rows.filter((r) => {
      const m = mapRow(r);
      // name/ regNo / officer match
      const matchQ =
        !q ||
        (m.groupName || "").toString().toLowerCase().includes(q) ||
        (m.regNo || "").toString().toLowerCase().includes(q) ||
        (m.officer || "").toString().toLowerCase().includes(q);

      // date filters against regDate (YYYY-MM-DD)
      const reg = m.regDate && m.regDate !== "-" ? m.regDate : null;
      const passFrom = !dateFrom || !reg || reg >= dateFrom;
      const passTo = !dateTo || !reg || reg <= dateTo;
      return matchQ && passFrom && passTo;
    });

    setFiltered(out);
  };

  const handleReset = () => {
    setQName("");
    setDateFrom("");
    setDateTo("");
    setFiltered(rows);
  };

  const handleView = (id) => {
    // adjust route to your app's detail page if exists
    window.location.href = `/forms/${FORM_KEY}/${id}`;
  };

  return (
    <div className="farmer-list-container">
      {/* --- Header --- */}
      <div className="list-header">
        <h2>कृषक समूह/समिति दर्ता प्रमाण-पत्रको सूची</h2>
        <button className="back-link-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input
          type="date"
          placeholder="मिति देखि"
          className="filter-input date-field"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          placeholder="मिति सम्म"
          className="filter-input date-field"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="समूह/समितिको नाम, दर्ता नं वा अधिकृत व्यक्ति खोज्नुहोस्"
          className="filter-input"
          value={qName}
          onChange={(e) => setQName(e.target.value)}
        />
        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
        <button className="search-icon-btn" onClick={handleReset}>⟲</button>
        <button className="search-icon-btn" onClick={fetchRows} title="Reload">⟳</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "crimson" }}>Error: {error}</div>
        ) : (
          <>
            <table className="farmer-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>समूह/समितिको नाम</th>
                  <th>दर्ता नं.</th>
                  <th>दर्ता मिति</th>
                  <th>गठन मिति</th>
                  <th>समूह/समिति दर्ता मिति</th>
                  <th>प्रकार</th>
                  <th>विभाग</th>
                  <th>ठेगाना,जिल्ला</th>
                  <th>अधिकृत व्यक्ति</th>
                  <th>पद</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="12" style={{ textAlign: "center" }}>No records found</td>
                  </tr>
                ) : (
                  filtered.map((r, index) => {
                    const m = mapRow(r);
                    return (
                      <tr key={r.id || index}>
                        <td>{m.sn}</td>
                        <td>{m.groupName}</td>
                        <td>{m.regNo}</td>
                        <td>{m.regDate}</td>
                        <td>{m.formedDate}</td>
                        <td>{m.formedDate}</td>
                        <td>{m.type}</td>
                        <td>{m.department}</td>
                        <td>{m.address}</td>
                        <td>{m.officer}</td>
                        <td>{m.position}</td>
                        <td className="text-center">
                          <button onClick={() => handleView(r.id)} title="View">👁</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div className="pagination-info">Total: {filtered.length} record(s)</div>
          </>
        )}
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default FarmerGroupOrCommitteeRegistrationCertificateList;
