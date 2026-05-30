import React, { useEffect, useState, useRef } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   STYLES  (prefix: guru-)
───────────────────────────────────────────── */
const styles = `
.guru-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  box-sizing: border-box;
}
.guru-page *, .guru-page *::before, .guru-page *::after {
  box-sizing: border-box;
}

.guru-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.guru-title {
  font-size: 18px;
  font-weight: 600;
}

.guru-btn-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.guru-primary-btn {
  background-color: #007b8c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  transition: background 0.15s;
}
.guru-primary-btn:hover:not(:disabled) { background-color: #005f6e; }
.guru-primary-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.guru-filter-bar {
  background-color: #171f33;
  display: flex;
  align-items: flex-end;
  padding: 12px 24px;
  gap: 16px;
  flex-wrap: wrap;
}
.guru-filters {
  display: flex;
  flex: 1;
  gap: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.guru-filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.guru-filter-group label {
  color: #fff;
  font-size: 12px;
}
.guru-filter-group input {
  width: 180px;
  padding: 7px 8px;
  border-radius: 3px;
  border: 1px solid #cfd4da;
  font-size: 13px;
  font-family: inherit;
}
.guru-filter-group.wide input { width: 220px; }

.guru-search-btn {
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}
.guru-search-btn:hover { background-color: #0062cc; }

.guru-table-wrapper {
  margin: 10px 24px 0;
  flex: 1;
}
.guru-scroll { width: 100%; overflow-x: auto; }

.guru-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 980px;
}
.guru-table thead { background-color: #192236; color: #fff; }
.guru-table th,
.guru-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #d5d5d5;
  text-align: left;
  vertical-align: middle;
}
.guru-table th:first-child,
.guru-table td:first-child { text-align: center; width: 48px; }

.guru-even-row { background-color: #f3f3f3; }
.guru-odd-row  { background-color: #dcdcdc; }

.guru-center   { text-align: center !important; }
.guru-ellipsis {
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Status icon (rejected) ── */
.guru-status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #f8d7da;
  color: #c82333;
  font-size: 14px;
  border: 1px solid #f1aeb5;
}

/* ── Action cell — one row of evenly-spaced buttons ── */
.guru-action-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
}
.guru-act-btn {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  transition: filter 0.15s, opacity 0.15s;
}
.guru-act-btn:hover:not(:disabled) { filter: brightness(0.9); }
.guru-act-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.guru-act-btn.view  { background-color: #6f42c1; }
.guru-act-btn.print { background-color: #0a7d5a; }

.guru-state-msg { padding: 24px; color: #555; font-size: 14px; }
.guru-error     { color: crimson; }

.guru-footer {
  margin-top: 18px;
  margin-bottom: 16px;
  padding-right: 24px;
  text-align: right;
  font-size: 12px;
  color: #666;
}

/* ── Print (per-row print opens its own window) ── */
@media print {
  .guru-header .guru-btn-row,
  .guru-filter-bar,
  .guru-action-cell,
  .guru-footer { display: none !important; }
  .guru-table  { font-size: 11px; min-width: unset; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .guru-header    { flex-direction: column; align-items: flex-start; }
  .guru-filter-bar { flex-direction: column; align-items: stretch; }
  .guru-filters   { flex-direction: column; gap: 10px; }
  .guru-filter-group input,
  .guru-filter-group.wide input { width: 100%; }
  .guru-search-btn { width: 100%; padding: 10px; }
  .guru-table-wrapper { margin: 10px 8px 0; }

  .guru-table,
  .guru-table thead,
  .guru-table tbody,
  .guru-table th,
  .guru-table td,
  .guru-table tr { display: block; }
  .guru-table thead tr { display: none; }
  .guru-table tbody tr {
    border: 1px solid #ccc;
    margin-bottom: 12px;
    border-radius: 4px;
    padding: 8px;
    background: #fff;
  }
  .guru-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    text-align: right;
  }
  .guru-table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-align: left;
    flex: 1;
    color: #333;
  }
  .guru-ellipsis { max-width: none; white-space: normal; }
  .guru-action-cell { justify-content: flex-end; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const GovOrganizationRegUnsuccessful = () => {
  const { user } = useAuth();

  const [rows, setRows]           = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [fromDate, setFromDate]   = useState("");
  const [toDate, setToDate]       = useState("");
  const [searchName, setSearchName] = useState("");
  const abortRef = useRef(null);

  const fetchRows = async () => {
    setLoading(true);
    setError("");
    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await axios.get("/api/forms/gov-organization-registration", {
        signal: ac.signal,
      });
      const all = Array.isArray(res.data) ? res.data : [];
      const rejected = all.filter((r) => r.status === "rejected");
      setRows(rejected);
      setFiltered(rejected);
    } catch (e) {
      if (e.name !== "AbortError" && e.name !== "CanceledError") {
        console.error("Fetch error", e);
        setError("डेटा लोड गर्न असफल भयो।");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    fetchRows();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  // Client-side filters
  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
          (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
          (r.headOffice && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate) out = out.filter((r) => (r.date ? r.date.slice(0, 10) >= fromDate : false));
    if (toDate)   out = out.filter((r) => (r.date ? r.date.slice(0, 10) <= toDate   : false));
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  /* ── CSV export — full field set, UTF-8 BOM for Excel ── */
  const toCSV = (rs) => {
    if (!rs?.length) return "";

    const columns = [
      ["sn",                (r, i) => i + 1],
      ["regDate",           (r) => (r.date ? r.date.slice(0, 10) : "")],
      ["letterNo",          (r) => r.letterNo ?? ""],
      ["refNo",             (r) => r.refNo ?? ""],
      ["officerName",       (r) => r.officerName ?? ""],
      ["municipalityName",  (r) => r.municipalityName ?? ""],
      ["proposalName",      (r) => r.proposalName ?? ""],
      ["wardNo",            (r) => r.wardNo ?? ""],
      ["headOffice",        (r) => r.headOffice ?? ""],
      ["branchOffice",      (r) => r.branchOffice ?? ""],
      ["purpose",           (r) => r.purpose ?? ""],
      ["activities",        (r) => r.activities ?? ""],
      ["liability",         (r) => r.liability ?? ""],
      ["femaleMembers",     (r) => r.femaleMembers ?? ""],
      ["maleMembers",       (r) => r.maleMembers ?? ""],
      ["totalShareCapital", (r) => r.totalShareCapital ?? ""],
      ["entranceFee",       (r) => r.entranceFee ?? ""],
      ["applicantName",     (r) => r.applicantName ?? ""],
      ["applicantAddress",  (r) => r.applicantAddress ?? ""],
      ["applicantCitizenship", (r) => r.applicantCitizenship ?? ""],
      ["applicantPhone",    (r) => r.applicantPhone ?? ""],
      ["rejectionReason",   (r) => r.recommendation_note ?? ""],
      ["status",            (r) => r.status ?? "rejected"],
    ];

    const esc = (val) => `"${String(val).replace(/"/g, '""')}"`;
    const headerLine = columns.map(([h]) => esc(h)).join(",");
    const bodyLines = rs.map((r, i) =>
      columns.map(([, accessor]) => esc(accessor(r, i))).join(",")
    );

    return [headerLine, ...bodyLines].join("\r\n");
  };

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("निर्यात गर्न कुनै रेकर्ड छैन।"); return; }
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gov_reg_rejected_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ── Per-row detailed print — same full letter layout as the entry form ── */
  const handleRowPrint = (row) => {
    if (!row) return;

    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const v = (val) => (val === null || val === undefined ? "" : String(val));
    const dateOnly = row.date ? v(row.date).slice(0, 10) : "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सहकारी संस्था दर्ता (अस्वीकृत)</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .status-stamp {
            display: inline-block; border: 2px solid #c82333; color: #c82333;
            font-weight: 700; font-size: 12pt; padding: 4px 16px; border-radius: 4px;
            margin: 10px 0; letter-spacing: 1px;
          }
          .sub-header { text-align: center; font-size: 12pt; margin: 12px 0 16px; line-height: 1.6; border-top: 1px solid #ccc; padding-top: 12px; }
          .meta { display: flex; justify-content: space-between; align-items: flex-start; margin: 12px 0; font-size: 11pt; line-height: 1.8; }
          .meta-left { text-align: left; }
          .meta-right { text-align: right; }
          .top-info { margin: 18px 0; font-size: 11pt; line-height: 2; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .paragraph { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 20px; }
          .section-title { font-weight: bold; font-size: 11pt; margin: 18px 0 10px; }
          .detail-line { font-size: 11pt; line-height: 2; margin-bottom: 4px; }
          .value { font-weight: bold; padding: 0 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 24px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
          .reject-box { margin-top: 20px; border: 1px solid #f1aeb5; background: #fff5f5; padding: 12px 14px; border-radius: 4px; font-size: 11pt; line-height: 1.8; }
          .reject-box strong { color: #c82333; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
          <div class="status-stamp">अस्वीकृत</div>
        </div>

        <div class="sub-header">
          अनुसूची २<br/>
          दर्ता दरखास्तको नमुना
        </div>

        <div class="meta">
          <div class="meta-left">
            <div>पत्र संख्या : <span class="value">${v(row.letterNo) || "2082/83"}</span></div>
          </div>
          <div class="meta-right">
            <div>मिति : <span class="value">${dateOnly}</span></div>
            <div>सन्दर्भ नं. : <span class="value">${v(row.refNo)}</span></div>
          </div>
        </div>

        <div class="top-info">
          श्री दत्ता गर्ने अधिकारी
          <span class="value">${v(row.officerName)}</span>
          ज्यू,<br/>
          <span class="value">${v(row.municipalityName)}</span>
          , नगर कार्यपालिकाको कार्यालय ।
        </div>

        <div class="subject">विषय : सहकारी संस्था दर्ता ।</div>

        <div class="paragraph">
          महोदय,<br/><br/>
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </div>

        <div class="section-title">संस्थासम्बन्धी विवरण</div>

        <div class="detail-line">(क) प्रस्तावित संस्था नामः <span class="value">${v(row.proposalName)}</span></div>
        <div class="detail-line">(ख) ठेगाना: वडा नं. <span class="value">${v(row.wardNo)}</span></div>
        <div class="detail-line">(ग) उद्देश्य: <span class="value">${v(row.purpose)}</span></div>
        <div class="detail-line">(घ) गतिविधि: <span class="value">${v(row.activities)}</span></div>
        <div class="detail-line">(ङ) मुख्य कार्यालय: <span class="value">${v(row.headOffice)}</span></div>
        <div class="detail-line">(च) शाखा कार्यालय: <span class="value">${v(row.branchOffice)}</span></div>
        <div class="detail-line">(छ) दायित्व: <span class="value">${v(row.liability)}</span></div>
        <div class="detail-line">(ज) सदस्य संख्या: महिला: <span class="value">${v(row.femaleMembers)}</span> जना &nbsp; पुरुष: <span class="value">${v(row.maleMembers)}</span> जना</div>
        <div class="detail-line">(झ) कुल शेयर पूँजीको रकमः <span class="value">${v(row.totalShareCapital)}</span></div>
        <div class="detail-line">(ञ) प्राप्त प्रवेश शुल्कको रकमः <span class="value">${v(row.entranceFee)}</span></div>

        <div class="reject-box">
          <strong>अस्वीकृत कारण:</strong> <span class="value">${v(row.recommendation_note) || "—"}</span>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${v(row.applicantName)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${v(row.applicantAddress)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${v(row.applicantCitizenship)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${v(row.applicantPhone)}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
      return;
    }
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="guru-page">

        {/* ── Header ── */}
        <header className="guru-header">
          <div className="guru-title">सहकारी संस्था दर्ता अस्वीकृत सूची ।</div>
          <div className="guru-btn-row">
            <button
              className="guru-primary-btn"
              onClick={handleExport}
              disabled={loading || filtered.length === 0}
            >
              📥 एक्सेल निर्यात
            </button>
          </div>
        </header>

        {/* ── Filter bar ── */}
        <div className="guru-filter-bar">
          <div className="guru-filters">
            <div className="guru-filter-group">
              <label>मिति देखि</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="guru-filter-group">
              <label>मिति सम्म</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="guru-filter-group wide">
              <label>सहकारी संस्थाको नाम</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="नाम/आवेदक खोज्नुहोस्"
              />
            </div>
          </div>
          <button
            className="guru-search-btn"
            aria-label="Search"
            onClick={fetchRows}
          >
            🔍
          </button>
        </div>

        {/* ── Table ── */}
        <div className="guru-table-wrapper">
          {loading ? (
            <div className="guru-state-msg">Loading...</div>
          ) : error ? (
            <div className="guru-state-msg guru-error">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="guru-state-msg">कुनै अस्वीकृत रेकर्ड भेटिएन।</div>
          ) : (
            <div className="guru-scroll">
              <table
                className="guru-table"
                role="table"
                aria-label="Rejected registrations"
              >
                <thead>
                  <tr>
                    <th>क्र. स.</th>
                    <th>दर्ता मिति</th>
                    <th>प्रस्तावित संस्था नाम</th>
                    <th>ठेगाना</th>
                    <th>उद्देश्य</th>
                    <th>मुख्य कार्य</th>
                    <th>प्राप्त सेयर</th>
                    <th>प्राप्त प्रवेश शुल्क</th>
                    <th>अस्वीकृत कारण</th>
                    <th>स्थिति</th>
                    <th>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className={idx % 2 === 0 ? "guru-even-row" : "guru-odd-row"}
                    >
                      <td data-label="क्र. स.">{idx + 1}</td>
                      <td data-label="दर्ता मिति">
                        {row.date ? row.date.slice(0, 10) : "-"}
                      </td>
                      <td data-label="प्रस्तावित संस्था नाम">
                        {row.proposalName || "-"}
                      </td>
                      <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                      <td data-label="उद्देश्य" className="guru-ellipsis">
                        {(row.purpose || "-").slice(0, 40)}
                      </td>
                      <td data-label="मुख्य कार्य" className="guru-ellipsis">
                        {(row.activities || "-").slice(0, 40)}
                      </td>
                      <td data-label="प्राप्त सेयर">
                        {row.totalShareCapital || "-"}
                      </td>
                      <td data-label="प्राप्त प्रवेश शुल्क">
                        {row.entranceFee || "-"}
                      </td>
                      <td data-label="अस्वीकृत कारण" className="guru-ellipsis">
                        {row.recommendation_note || "-"}
                      </td>

                      <td data-label="स्थिति" className="guru-center">
                        <span className="guru-status-icon" title="अस्वीकृत">✖</span>
                      </td>

                      <td data-label="कार्य" className="guru-center">
                        <div className="guru-action-cell">
                          <button
                            className="guru-act-btn view"
                            onClick={() => handleRowPrint(row)}
                            title="पूर्वावलोकन"
                          >
                            👁
                          </button>
                          <button
                            className="guru-act-btn print"
                            onClick={() => handleRowPrint(row)}
                            title="प्रिन्ट / डाउनलोड"
                          >
                            🖨
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="guru-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
};

export default GovOrganizationRegUnsuccessful;