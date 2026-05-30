// src/pages/business-reg/BusinessRegistrationRenewLeft.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import { buildBusinessCertHtml, openCertPrint, exportRowsCsv } from "./businessCertPrint";

/* ── Endpoint + field mapping — adjust to your real renewal source ──
   Point ENDPOINT at whatever holds "renewal pending" businesses, then map
   the returned fields below. The print reuses the shared certificate. */
const ENDPOINT = "/api/forms/business-registration-renew-left";

const normalizeRow = (r, idx) => ({
  id: r.id ?? idx,
  sn: r.sn ?? idx + 1,
  regDate: (r.regDate ?? r.certificate_date ?? "").slice?.(0, 10) ?? "",
  regNo: r.regNo ?? r.registration_no ?? "",
  businessOwner: r.businessOwner ?? r.full_name ?? r.ownerName ?? "",
  businessName: r.businessName ?? r.business_name ?? "",
  address: r.address ?? r.business_address_line ?? "",
  renewalLastDate: r.renewalLastDate ?? r.renewal_last_date ?? "",
  status: r.status ?? "active",
  // fields the shared print needs (best-effort; fill from your source)
  fullName: r.full_name ?? r.businessOwner ?? r.ownerName ?? "",
  fiscalYear: r.fiscal_year ?? r.fiscalYear ?? "",
  wardNo: r.ward_no ?? r.wardNo ?? "",
  totalCapital: r.total_capital ?? r.totalCapital ?? "",
  applicantName: r.applicantName ?? r.applicant_name ?? "",
  raw: r,
});

const STYLES = `
  .brrl-page *, .brrl-page *::before, .brrl-page *::after { box-sizing:border-box; }
  .brrl-page { min-height:100vh; padding:30px 0 40px; display:flex; flex-direction:column; align-items:center; background-color:#d9dde3; font-family:"Roboto","Segoe UI",sans-serif; }
  .brrl-card { width:95%; max-width:1150px; background:#f7f7f7; box-shadow:0 0 6px rgba(0,0,0,.25); }

  .brrl-filter-bar { background-color:#152238; display:flex; align-items:flex-end; padding:14px 18px; gap:16px; flex-wrap:wrap; }
  .brrl-excel-btn { background-color:#28a745; color:#fff; border:none; padding:8px 18px; font-size:14px; border-radius:3px; cursor:pointer; white-space:nowrap; font-family:inherit; align-self:center; }
  .brrl-excel-btn:hover { background-color:#218838; }
  .brrl-filter-inputs { display:flex; flex:1; gap:18px; align-items:flex-end; flex-wrap:wrap; }
  .brrl-filter-group { display:flex; flex-direction:column; gap:4px; }
  .brrl-filter-group label { font-size:12px; color:#e2e6ef; }
  .brrl-filter-group input { width:180px; padding:7px 8px; border-radius:3px; border:1px solid #ced4da; font-size:13px; font-family:inherit; }
  .brrl-search-btn { border:none; background-color:#007bff; color:#fff; font-size:16px; padding:8px 14px; border-radius:3px; cursor:pointer; align-self:center; }
  .brrl-search-btn:hover { background-color:#0061c4; }

  .brrl-table-wrapper { overflow-x:auto; background-color:#fff; }
  .brrl-table { width:100%; border-collapse:collapse; font-size:13px; }
  .brrl-table thead { background-color:#2d3136; color:#fff; }
  .brrl-table th, .brrl-table td { padding:10px 8px; border-bottom:1px solid #dee2e6; text-align:left; white-space:nowrap; }
  .brrl-table th:first-child, .brrl-table td:first-child { text-align:center; width:50px; }
  .brrl-table tbody tr:nth-child(even) { background-color:#f3f3f3; }
  .brrl-table tbody tr:hover { background-color:#eef2f7; }
  .brrl-closed-row { opacity:.55; }

  .brrl-cell-info { padding:14px; color:#666; text-align:center; }
  .brrl-cell-error { padding:14px; color:red; text-align:center; }

  .brrl-act-group { display:flex; gap:6px; }
  .brrl-icon-btn { width:32px; height:32px; border-radius:5px; border:none; cursor:pointer; font-size:15px; display:inline-flex; align-items:center; justify-content:center; color:#fff; }
  .brrl-icon-btn:hover { filter:brightness(.9); }
  .brrl-view-btn { background:#6f42c1; }
  .brrl-card-btn { background:#0a7d5a; }
  .brrl-delete-btn { background:#dc3545; }

  .brrl-footer { margin-top:18px; font-size:12px; color:#555; }
`;

function BusinessRegistrationRenewLeft() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterBizName, setFilterBizName] = useState("");

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(ENDPOINT);
      const arr = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setRows(arr.map(normalizeRow));
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || e.message || "Fetch error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); /* eslint-disable-next-line */ }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("के यो रेकर्ड पक्का मेटाउने हो?")) return;
    try {
      await axios.delete(`${ENDPOINT}/${id}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert("मेटाउन असफल भयो: " + (e.response?.data?.message || e.message));
    }
  };

  const filtered = rows.filter((r) => {
    if (filterFrom && (!r.regDate || r.regDate < filterFrom)) return false;
    if (filterTo && (!r.regDate || r.regDate > filterTo)) return false;
    if (filterBizName.trim()) {
      const q = filterBizName.trim().toLowerCase();
      if (!(r.businessName?.toLowerCase().includes(q) || r.businessOwner?.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const handlePrint = (row) => openCertPrint(buildBusinessCertHtml(row, user));

  const handleExport = () => {
    exportRowsCsv(
      filtered,
      [
        ["sn", (r, i) => i + 1],
        ["regDate", (r) => r.regDate],
        ["regNo", (r) => r.regNo],
        ["businessOwner", (r) => r.businessOwner],
        ["businessName", (r) => r.businessName],
        ["address", (r) => r.address],
        ["renewalLastDate", (r) => r.renewalLastDate],
        ["status", (r) => r.status],
      ],
      `renew_pending_${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  return (
    <div className="brrl-page">
      <style>{STYLES}</style>
      <div className="brrl-card">
        <div className="brrl-filter-bar">
          <button className="brrl-excel-btn" onClick={handleExport}>📥 एक्सेल निर्यात</button>
          <div className="brrl-filter-inputs">
            <div className="brrl-filter-group"><label>मिति देखि</label><input type="date" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} /></div>
            <div className="brrl-filter-group"><label>मिति सम्म</label><input type="date" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} /></div>
            <div className="brrl-filter-group"><label>व्यवसायको नाम</label><input type="text" value={filterBizName} onChange={(e) => setFilterBizName(e.target.value)} /></div>
          </div>
          <button className="brrl-search-btn" onClick={fetchRows} aria-label="Search">🔍</button>
        </div>

        <div className="brrl-table-wrapper">
          <table className="brrl-table">
            <thead>
              <tr>
                <th>क्र.स.</th><th>दर्ता मिति</th><th>दर्ता नं</th><th>व्यवसायीको नाम</th>
                <th>व्यवसायको नाम</th><th>व्यवसायको ठेगाना</th><th>नविकरण अन्तिम मिति</th>
                <th>अवस्था</th><th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="brrl-cell-info">लोड हुँदैछ...</td></tr>
              ) : error ? (
                <tr><td colSpan={9} className="brrl-cell-error">त्रुटि: {error}</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="brrl-cell-info">डेटा उपलब्ध छैन</td></tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={row.id ?? idx} className={row.status === "closed" ? "brrl-closed-row" : ""}>
                    <td>{idx + 1}</td>
                    <td>{row.regDate || "-"}</td>
                    <td>{row.regNo || "-"}</td>
                    <td>{row.businessOwner || "-"}</td>
                    <td>{row.businessName || "-"}</td>
                    <td>{row.address || "-"}</td>
                    <td>{row.renewalLastDate || "-"}</td>
                    <td>{row.status === "closed" ? "बन्द" : "बाँकी"}</td>
                    <td>
                      <div className="brrl-act-group">
                        <button className="brrl-icon-btn brrl-view-btn" title="पूर्वावलोकन" onClick={() => handlePrint(row)}>👁</button>
                        <button className="brrl-icon-btn brrl-card-btn" title="प्रमाणपत्र प्रिन्ट" onClick={() => handlePrint(row)}>🖨</button>
                        <button className="brrl-icon-btn brrl-delete-btn" title="मेटाउनुहोस्" onClick={() => handleDelete(row.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="brrl-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}

export default BusinessRegistrationRenewLeft;