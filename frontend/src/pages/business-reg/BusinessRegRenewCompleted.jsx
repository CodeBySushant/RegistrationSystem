// src/pages/business-reg/BusinessRegRenewCompleted.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import { buildBusinessCertHtml, openCertPrint, exportRowsCsv } from "./businessCertPrint";

/* ── Endpoint + field mapping — adjust to your real completed-renewal source ── */
const ENDPOINT = "/api/forms/business-reg-renew-completed";

const normalizeRow = (r, idx) => ({
  id: r.id ?? idx,
  sn: r.sn ?? idx + 1,
  regDate: (r.regDate ?? r.certificate_date ?? "").slice?.(0, 10) ?? "",
  regNo: r.regNo ?? r.registration_no ?? "",
  businessName: r.businessName ?? r.business_name ?? "",
  ownerName: r.ownerName ?? r.full_name ?? "",
  address: r.address ?? r.business_address_line ?? "",
  lastRenewalDate: r.lastRenewalDate ?? r.last_renewal_date ?? "",
  renewalPeriod: r.renewalPeriod ?? r.renewal_period ?? "",
  renewalRate: r.renewalRate ?? r.renewal_rate ?? "",
  renewalVoucher: r.renewalVoucher ?? r.renewal_voucher ?? "",
  // print fields
  fullName: r.full_name ?? r.ownerName ?? "",
  fiscalYear: r.fiscal_year ?? r.fiscalYear ?? "",
  wardNo: r.ward_no ?? r.wardNo ?? "",
  totalCapital: r.total_capital ?? r.totalCapital ?? "",
  applicantName: r.applicantName ?? r.applicant_name ?? "",
  raw: r,
});

const STYLES = `
  .brrc-page *, .brrc-page *::before, .brrc-page *::after { box-sizing:border-box; }
  .brrc-page { min-height:100vh; padding:30px 0 40px; display:flex; flex-direction:column; align-items:center; background-color:#d9dde3; font-family:"Roboto","Segoe UI",sans-serif; }
  .brrc-card { width:95%; max-width:1300px; background-color:transparent; }

  .brrc-excel-wrapper { display:flex; margin-bottom:6px; margin-left:4px; }
  .brrc-excel-btn { background-color:#28a745; color:#fff; border:none; padding:8px 18px; font-size:14px; border-radius:3px; cursor:pointer; white-space:nowrap; font-family:inherit; }
  .brrc-excel-btn:hover { background-color:#218838; }

  .brrc-filter-bar { background-color:#1f2937; display:flex; align-items:flex-end; padding:14px 18px; gap:16px; flex-wrap:wrap; }
  .brrc-filter-inputs { display:flex; flex:1; gap:30px; align-items:flex-end; flex-wrap:wrap; }
  .brrc-filter-group { display:flex; flex-direction:column; gap:4px; }
  .brrc-filter-group label { font-size:13px; color:#fff; }
  .brrc-filter-group input { width:210px; padding:8px 10px; border-radius:3px; border:1px solid #ced4da; font-size:14px; font-family:inherit; }
  .brrc-search-btn { border:none; background-color:#007bff; color:#fff; font-size:16px; padding:9px 14px; border-radius:3px; cursor:pointer; align-self:center; }
  .brrc-search-btn:hover { background-color:#0061c4; }

  .brrc-table-wrapper { overflow-x:auto; background-color:#fff; }
  .brrc-table { width:100%; border-collapse:collapse; font-size:14px; }
  .brrc-table thead { background-color:#222a38; color:#fff; }
  .brrc-table th, .brrc-table td { padding:10px 8px; border-bottom:1px solid #dee2e6; text-align:left; white-space:nowrap; }
  .brrc-table th:first-child, .brrc-table td:first-child { text-align:center; width:40px; }
  .brrc-table tbody tr:nth-child(odd) { background-color:#f3f3f3; }
  .brrc-table tbody tr:hover { background-color:#eef2f7; }

  .brrc-cell-info { padding:14px; color:#666; text-align:center; }
  .brrc-cell-error { padding:14px; color:red; text-align:center; }

  .brrc-act-group { display:flex; gap:6px; }
  .brrc-icon-btn { width:32px; height:32px; border-radius:5px; border:none; cursor:pointer; font-size:15px; display:inline-flex; align-items:center; justify-content:center; color:#fff; }
  .brrc-icon-btn:hover { filter:brightness(.9); }
  .brrc-view-btn { background:#6f42c1; }
  .brrc-card-btn { background:#0a7d5a; }
  .brrc-delete-btn { background:#dc3545; }

  .brrc-footer { margin-top:18px; font-size:12px; color:#555; }
`;

function BusinessRegRenewCompleted() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterBizName, setFilterBizName] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(ENDPOINT);
      const arr = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setRows(arr.map(normalizeRow));
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.response?.data?.message || err.message || "Fetch error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?")) return;
    try {
      await axios.delete(`${ENDPOINT}/${id}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("मेटाउन असफल भयो: " + (err.response?.data?.message || err.message));
    }
  };

  const filtered = rows.filter((r) => {
    if (filterFrom && (!r.regDate || r.regDate < filterFrom)) return false;
    if (filterTo && (!r.regDate || r.regDate > filterTo)) return false;
    if (filterBizName.trim()) {
      const q = filterBizName.trim().toLowerCase();
      if (!(r.businessName?.toLowerCase().includes(q) || r.ownerName?.toLowerCase().includes(q))) return false;
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
        ["businessName", (r) => r.businessName],
        ["ownerName", (r) => r.ownerName],
        ["address", (r) => r.address],
        ["lastRenewalDate", (r) => r.lastRenewalDate],
        ["renewalPeriod", (r) => r.renewalPeriod],
        ["renewalRate", (r) => r.renewalRate],
        ["renewalVoucher", (r) => r.renewalVoucher],
      ],
      `renew_completed_${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  return (
    <div className="brrc-page">
      <style>{STYLES}</style>
      <div className="brrc-card">
        <div className="brrc-excel-wrapper">
          <button className="brrc-excel-btn" onClick={handleExport}>📥 एक्सेल निर्यात गर्नुहोस्</button>
        </div>

        <div className="brrc-filter-bar">
          <div className="brrc-filter-inputs">
            <div className="brrc-filter-group"><label>मिति देखि</label><input type="date" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} /></div>
            <div className="brrc-filter-group"><label>मिति सम्म</label><input type="date" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} /></div>
            <div className="brrc-filter-group"><label>व्यवसायको नाम</label><input type="text" value={filterBizName} onChange={(e) => setFilterBizName(e.target.value)} /></div>
          </div>
          <button className="brrc-search-btn" onClick={fetchData} aria-label="Search">🔍</button>
        </div>

        <div className="brrc-table-wrapper">
          {loading ? (
            <div className="brrc-cell-info">लोड हुँदैछ...</div>
          ) : error ? (
            <div className="brrc-cell-error">त्रुटि: {error}</div>
          ) : (
            <table className="brrc-table">
              <thead>
                <tr>
                  <th>क्र.स.</th><th>दर्ता मिति</th><th>दर्ता नं</th><th>व्यवसायको नाम</th>
                  <th>व्यवसायीको नाम</th><th>व्यवसायको ठेगाना</th><th>नविकरण अन्तिम मिति</th>
                  <th>नविकरण अवधि</th><th>नविकरण दर</th><th>नविकरण भौचर</th><th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={11} className="brrc-cell-info">डेटा उपलब्ध छैन</td></tr>
                ) : (
                  filtered.map((row, idx) => (
                    <tr key={row.id ?? idx}>
                      <td>{idx + 1}</td>
                      <td>{row.regDate || "-"}</td>
                      <td>{row.regNo || "-"}</td>
                      <td>{row.businessName || "-"}</td>
                      <td>{row.ownerName || "-"}</td>
                      <td>{row.address || "-"}</td>
                      <td>{row.lastRenewalDate || "-"}</td>
                      <td>{row.renewalPeriod || "-"}</td>
                      <td>{row.renewalRate || "-"}</td>
                      <td>{row.renewalVoucher || "-"}</td>
                      <td>
                        <div className="brrc-act-group">
                          <button className="brrc-icon-btn brrc-view-btn" title="पूर्वावलोकन" onClick={() => handlePrint(row)}>👁</button>
                          <button className="brrc-icon-btn brrc-card-btn" title="प्रमाणपत्र प्रिन्ट" onClick={() => handlePrint(row)}>🖨</button>
                          <button className="brrc-icon-btn brrc-delete-btn" title="मेटाउनुहोस्" onClick={() => handleDelete(row.id)}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <footer className="brrc-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}

export default BusinessRegRenewCompleted;