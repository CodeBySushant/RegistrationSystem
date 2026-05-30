// src/pages/business-reg/BusinessIndustryRegistrationList.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import { buildBusinessCertHtml, openCertPrint, exportRowsCsv } from "./businessCertPrint";

const STYLES = `
  .birl-container { width:100%; min-height:100vh; background-image:url("/papertexture1.jpg"); background-repeat:repeat; font-family:'Kalimati','Kokila',sans-serif; display:flex; flex-direction:column; padding-top:20px; }
  .birl-action-bar { padding:0 30px; margin-bottom:14px; }
  .birl-excel-btn { background-color:#28a745; color:#fff; border:none; padding:8px 16px; border-radius:4px; font-size:.95rem; cursor:pointer; font-weight:bold; font-family:inherit; }
  .birl-excel-btn:hover { background-color:#218838; }

  .birl-filter-bar { background-color:#1f2a38; padding:16px 30px; display:flex; align-items:flex-end; justify-content:space-between; gap:16px; margin:0 30px; border-radius:2px 2px 0 0; flex-wrap:wrap; }
  .birl-filters { display:flex; flex:1; gap:18px; align-items:flex-end; flex-wrap:wrap; }
  .birl-filter-group { display:flex; flex-direction:column; gap:4px; }
  .birl-filter-group label { color:#fff; font-size:12px; }
  .birl-filter-input { padding:8px 10px; border:1px solid #cfd4da; border-radius:3px; font-size:.9rem; font-family:inherit; }
  .birl-date-field { width:170px; }
  .birl-name-field { width:220px; }
  .birl-search-btn { background-color:#2980b9; color:#fff; border:none; border-radius:4px; width:42px; height:38px; font-size:1.1rem; cursor:pointer; }
  .birl-search-btn:hover { background-color:#20638f; }

  .birl-table-container { margin:0 30px 30px; overflow-x:auto; background-color:rgba(255,255,255,.85); padding-bottom:20px; }
  .birl-loading, .birl-error, .birl-empty { padding:20px; text-align:center; color:#555; }
  .birl-error { color:crimson; }

  .birl-table { width:100%; border-collapse:collapse; font-size:.85rem; min-width:1100px; }
  .birl-table th { background-color:#1f2a38; color:#fff; padding:12px 6px; text-align:center; font-weight:normal; border-right:1px solid #4a5a6a; vertical-align:top; }
  .birl-table th:last-child { border-right:none; }
  .birl-table td { padding:10px 6px; color:#333; vertical-align:middle; text-align:center; border-bottom:1px solid #ccc; background-color:#e8e8e8; }
  .birl-table tr:nth-child(even) td { background-color:#f3f3f3; }
  .birl-table tr:hover td { background-color:#dde6ee; }

  .birl-badge { display:inline-block; font-size:.72rem; padding:2px 8px; border-radius:10px; white-space:nowrap; }
  .birl-badge.new { background:#d1e7dd; color:#0f5132; }
  .birl-badge.old { background:#e2e3e5; color:#41464b; }
  .birl-badge.closed { background:#f8d7da; color:#842029; }

  .birl-action-cell { white-space:nowrap; display:flex; gap:6px; justify-content:center; align-items:center; }
  .birl-act-btn { width:30px; height:30px; border-radius:5px; border:none; cursor:pointer; font-size:15px; display:inline-flex; align-items:center; justify-content:center; color:#fff; transition:filter .15s; }
  .birl-act-btn:hover { filter:brightness(.9); }
  .birl-act-btn.view { background:#6f42c1; }
  .birl-act-btn.print { background:#0a7d5a; }
  .birl-act-btn.edit { background:#005f9e; }

  .birl-pagination { display:flex; justify-content:center; margin-top:20px; gap:5px; flex-wrap:wrap; }
  .birl-page-btn { padding:5px 12px; border:none; background-color:#999; color:#fff; cursor:pointer; font-size:.9rem; border-radius:2px; font-family:inherit; }
  .birl-page-btn.birl-active { background-color:#337ab7; }
  .birl-page-btn:disabled { opacity:.5; cursor:not-allowed; }
  .birl-page-btn:hover:not(:disabled) { background-color:#555; }

  .birl-copyright { margin-top:auto; text-align:right; padding:15px 30px; font-size:.85rem; color:#666; background-color:#fff; border-top:1px solid #eee; }
`;

const PAGE_SIZE = 10;

/* Normalize a record from EITHER form endpoint into one row shape.
   snake = BusinessIndustryRegistrationForm; camel = BusinessRegistrationCertificate */
const normalizeRow = (r, source) => ({
  id: r.id,
  source, // "industry" | "certificate"
  regDate: (r.certificate_date || r.certificateDate || r.issue_date_label || "").slice(0, 10),
  regNo: r.registration_no ?? r.registrationNo ?? "",
  fiscalYear: r.fiscal_year ?? r.fiscalYear ?? "",
  fullName: r.full_name ?? r.fullName ?? "",
  businessName: r.business_name ?? r.businessName ?? "",
  businessType: r.business_kind ?? r.business_type ?? r.businessType ?? "",
  businessNature: r.business_nature ?? r.businessNature ?? "",
  businessRoad: r.business_road ?? r.roadName ?? "",
  businessAddress: r.business_address_line ?? r.businessAddress ?? "",
  businessDistrict: r.business_address_district ?? r.businessDistrict ?? "",
  businessWard: r.business_address_ward ?? r.businessWard ?? "",
  businessTole: r.business_address_tole ?? r.businessTole ?? "",
  citizenshipNo: r.citizenship_no ?? r.citizenshipNo ?? "",
  citizenshipIssueDate: r.citizenship_issue_date ?? r.issuedDate ?? "",
  citizenshipIssueDistrict: r.citizenship_issue_district ?? r.issuedDistrict ?? "",
  municipality: r.municipality ?? MUNICIPALITY.name,
  wardNo: r.ward_no ?? r.wardNo ?? "",
  tole: r.tole ?? "",
  residenceDistrict: r.residence_district ?? r.district ?? "",
  fatherName: r.father_name ?? r.fatherName ?? "",
  spouseName: r.spouse_name ?? r.spouseName ?? "",
  phone: r.phone ?? "",
  mobile: r.mobile ?? "",
  email: r.email ?? "",
  panVat: r.pan_vat ?? r.panVatNo ?? "",
  website: r.website ?? "",
  objective: r.objective ?? "",
  authorizedCapital: r.authorized_capital ?? r.authorizedCapital ?? "",
  currentCapital: r.current_capital ?? r.currentCapital ?? "",
  issuedCapital: r.issued_capital ?? r.issuedCapital ?? "",
  fixedCapital: r.fixed_capital ?? r.fixedCapital ?? "",
  paidCapital: r.paidup_capital ?? r.paidCapital ?? "",
  totalCapital: r.total_capital ?? r.totalCapital ?? "",
  remarks: r.kaifiyat ?? r.remarks ?? "",
  proverName: r.issuing_name ?? r.proverName ?? "",
  proverPost: r.issuing_post ?? r.proverPost ?? "",
  applicantName: r.applicantName ?? r.applicant_name ?? "",
  applicantAddress: r.applicantAddress ?? r.applicant_address ?? "",
  applicantCitizenship: r.applicantCitizenship ?? r.applicant_citizenship ?? "",
  applicantPhone: r.applicantPhone ?? r.applicant_phone ?? "",
  renewDate: r.renew_date ?? r.renewDate ?? r.lastRenewalDate ?? "",
  isClosed: r.isClosed === 1 || r.isClosed === true || r.close_business === true,
  isNew: source === "industry",
});

const BusinessIndustryRegistrationList = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [qName, setQName] = useState("");
  const [page, setPage] = useState(1);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = [
        ["/api/forms/business-industry-registration-form", "industry"],
        ["/api/forms/business-registration-certificate", "certificate"],
      ];
      const results = await Promise.allSettled(
        endpoints.map(([url]) => axios.get(url))
      );
      let merged = [];
      results.forEach((res, i) => {
        if (res.status === "fulfilled") {
          const arr = Array.isArray(res.value.data)
            ? res.value.data
            : Array.isArray(res.value.data?.data)
            ? res.value.data.data
            : [];
          merged = merged.concat(arr.map((r) => normalizeRow(r, endpoints[i][1])));
        }
      });
      // newest first by regDate
      merged.sort((a, b) => (b.regDate || "").localeCompare(a.regDate || ""));
      setRows(merged);
    } catch (err) {
      setError(err.message || "त्रुटि आएको छ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); /* eslint-disable-next-line */ }, []);

  // Client-side filtering
  const filtered = rows.filter((r) => {
    if (dateFrom && (!r.regDate || r.regDate < dateFrom)) return false;
    if (dateTo && (!r.regDate || r.regDate > dateTo)) return false;
    if (qName.trim()) {
      const q = qName.trim().toLowerCase();
      const hit =
        r.businessName?.toLowerCase().includes(q) ||
        r.fullName?.toLowerCase().includes(q) ||
        r.businessAddress?.toLowerCase().includes(q);
      if (!hit) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [dateFrom, dateTo, qName]);

  const handlePrint = (row) => openCertPrint(buildBusinessCertHtml(row, user));

  const handleExport = () => {
    exportRowsCsv(
      filtered,
      [
        ["sn", (r, i) => i + 1],
        ["regDate", (r) => r.regDate],
        ["regNo", (r) => r.regNo],
        ["businessName", (r) => r.businessName],
        ["ownerName", (r) => r.fullName],
        ["address", (r) => r.businessAddress],
        ["capital", (r) => r.totalCapital],
        ["renewDate", (r) => r.renewDate],
        ["type", (r) => (r.isNew ? "नयाँ" : "पुरानो")],
        ["status", (r) => (r.isClosed ? "बन्द" : "सक्रिय")],
        ["mobile", (r) => r.mobile],
        ["email", (r) => r.email],
        ["panVat", (r) => r.panVat],
      ],
      `business_list_${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="birl-container">
        <div className="birl-action-bar">
          <button className="birl-excel-btn" onClick={handleExport}>📥 एक्सेल निर्यात गर्नुहोस्</button>
        </div>

        <div className="birl-filter-bar">
          <div className="birl-filters">
            <div className="birl-filter-group">
              <label>मिति देखि</label>
              <input type="date" className="birl-filter-input birl-date-field" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="birl-filter-group">
              <label>मिति सम्म</label>
              <input type="date" className="birl-filter-input birl-date-field" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="birl-filter-group">
              <label>व्यवसायको नाम</label>
              <input type="text" className="birl-filter-input birl-name-field" placeholder="नाम/व्यवसायी खोज्नुहोस्" value={qName} onChange={(e) => setQName(e.target.value)} />
            </div>
          </div>
          <button className="birl-search-btn" onClick={fetchRows} title="रिफ्रेस">🔍</button>
        </div>

        <div className="birl-table-container">
          {loading ? (
            <div className="birl-loading">लोड हुँदैछ...</div>
          ) : error ? (
            <div className="birl-error">त्रुटि: {error}</div>
          ) : filtered.length === 0 ? (
            <div className="birl-empty">डेटा उपलब्ध छैन</div>
          ) : (
            <>
              <table className="birl-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>दर्ता मिति</th>
                    <th>दर्ता नं</th>
                    <th>व्यवसायको नाम</th>
                    <th>व्यवसायीको नाम</th>
                    <th>व्यवसायको ठेगाना</th>
                    <th>लगाउने पूँजी</th>
                    <th>नविकरण मिति</th>
                    <th>नयाँ/पुरानो</th>
                    <th>अवस्था</th>
                    <th>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row, i) => (
                    <tr key={`${row.source}-${row.id}`}>
                      <td>{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td>{row.regDate || "-"}</td>
                      <td>{row.regNo || "-"}</td>
                      <td>{row.businessName || "-"}</td>
                      <td>{row.fullName || "-"}</td>
                      <td>{row.businessAddress || "-"}</td>
                      <td>{row.totalCapital || "-"}</td>
                      <td>{row.renewDate || "-"}</td>
                      <td><span className={`birl-badge ${row.isNew ? "new" : "old"}`}>{row.isNew ? "नयाँ" : "पुरानो"}</span></td>
                      <td>
                        {row.isClosed
                          ? <span className="birl-badge closed">बन्द</span>
                          : <span className="birl-badge new">सक्रिय</span>}
                      </td>
                      <td>
                        <div className="birl-action-cell">
                          <button className="birl-act-btn view" title="पूर्वावलोकन" onClick={() => handlePrint(row)}>👁</button>
                          <button className="birl-act-btn print" title="प्रमाणपत्र प्रिन्ट" onClick={() => handlePrint(row)}>🖨</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="birl-pagination">
                <button className="birl-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                  .map((p) => (
                    <button key={p} className={`birl-page-btn${p === page ? " birl-active" : ""}`} onClick={() => setPage(p)}>{p}</button>
                  ))}
                <button className="birl-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
              </div>
            </>
          )}
        </div>

        <div className="birl-copyright">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
      </div>
    </>
  );
};

export default BusinessIndustryRegistrationList;